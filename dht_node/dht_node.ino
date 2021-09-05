#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include "DHT.h"


#define DHT_PIN 5
#define DHT_TYPE DHT22
#define POWER_PIN 4
#define NAME "Balkongen"

#define SERVER_IP "192.168.31.4:5000"

char wifi_ssid[] = "Honungsburken 2.4GHz";
char wifi_psk[] = "nagalunda";

int sleepTime = 30e6; // 30 seconds
DHT dht(DHT_PIN, DHT_TYPE);

void setup() {
  // Enables the legacy mode of turning off the wifi module immediately on boot
  // This seems to save a couple seconds of on-time compared to calling WiFi.begin()
  // https://arduino-esp8266.readthedocs.io/en/latest/esp8266wifi/generic-class.html#persistent
  enableWiFiAtBootTime();

  Serial.begin(9600);
  Serial.setTimeout(2000);
  while (!Serial) { }

  pinMode(POWER_PIN, OUTPUT);
  digitalWrite(POWER_PIN, HIGH); // Turn on power for the DHT

  dht.begin();

  connect();

  float* data = read();
  digitalWrite(POWER_PIN, LOW);
  postData(data);
  delete[] data;

   Serial.printf("Going to sleep for %d \n", sleepTime);
  ESP.deepSleep(sleepTime);
}

void connect() {
  if (WiFi.SSID() != wifi_ssid) {
    Serial.println("Executing WiFi.begin()...");
    WiFi.persistent(true);
    WiFi.setAutoConnect(true);
    WiFi.setAutoReconnect(true);
    WiFi.begin(wifi_ssid, wifi_psk);
  }

  // wait for WiFi connection
  Serial.println("Waiting for wifi connection");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(WiFi.status());
  }
  Serial.println("");
  Serial.print("Connected! IP address: ");
  Serial.println(WiFi.localIP());
}

// TODO: Use a map instead of array
void postData(float *values) {
  WiFiClient client;
  HTTPClient http;

  // config the target server
  http.begin(client, "http://" SERVER_IP "/sensors");
  http.addHeader("Content-Type", "application/json");

  // Serial.print("[HTTP] POST...\n");
  String body = "{";
  body = body + "\"node_name\":\"" + NAME + "\",\n\"humidity\":" + values[0] + ",\n\"temperature\":" + values[1] + ",\n\"feels_like\":" + values[2] + "}";

  // Serial.println("body=" + body);

  // start connection and send HTTP header and body
  int httpCode = http.POST(body);

  // httpCode will be negative on error
  if (httpCode > 0) {
    // HTTP header has been send and Server response header has been handled
    // Serial.printf("[HTTP] POST... code: %d\n", httpCode);

    // file found at server
    if (httpCode == HTTP_CODE_OK) {
      const String& payload = http.getString();
      // Serial.println("received payload:\n<<");
      // Serial.println(payload);
      // Serial.println(">>");
    }
  } else {
    Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
  }

  http.end();
}

float* read() {
  float* sensors = new float[3];
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    exit(0);
  }

  // Compute heat index in Celsius (isFahreheit = false)
  float hic = dht.computeHeatIndex(t, h, false);

  sensors[0] = h;
  sensors[1] = t;
  sensors[2] = hic;

  return sensors;
}

void loop() {

}
