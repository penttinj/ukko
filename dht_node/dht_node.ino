#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include "DHT.h"

#define DHT_PIN 5
#define DHT_TYPE DHT22
#define NAME "Balcony"

#define SERVER_IP "192.168.31.4:5000"

#ifndef STASSID
#define STASSID "Honungsburken 2.4GHz"
#define STAPSK  "nagalunda"
#endif

int readDelay = 30e6; // 30 seconds
DHT dht(DHT_PIN, DHT_TYPE);


void setup() {

  Serial.begin(9600);
  Serial.setTimeout(2000);

  while (!Serial) { }

  dht.begin();

  Serial.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  Serial.println("NodeMCU started");

  connect();

  if ((WiFi.status() == WL_CONNECTED)) {
    float* data = read();
    postData(data);

    delete[] data;

  }

  ESP.deepSleep(readDelay);
}

void connect() {
  WiFi.begin(STASSID, STAPSK);

  // wait for WiFi connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected! IP address: ");
  Serial.println(WiFi.localIP());
}

// TODO: Use a map instead of array
void postData(float *values) {
  WiFiClient client;
  HTTPClient http;

  // Serial.print("[HTTP] begin...\n");

  // config the target server
  http.begin(client, "http://" SERVER_IP "/sensors");
  http.addHeader("Content-Type", "application/json");

  // Serial.print("[HTTP] POST...\n");
  String body = "{";
  body = body + "\"node_name\":\"" + NAME + "\",\n\"humidity\":" + values[0] + ",\n\"temperature\":" + values[1] + ",\n\"feels_like\":" + values[2] + "}";

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
    // Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
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
    // Serial.println("Failed to read from DHT sensor!");
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
