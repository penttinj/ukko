#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <map>
#include <iterator>



#define ONE_WIRE_BUS 5
#define POWER_PIN 4
#define NAME "Bastu"

#define SERVER_IP "192.168.31.4:5000"

char wifi_ssid[] = "Honungsburken 2.4GHz";
char wifi_psk[] = "nagalunda";
int sleepTime = 120e6; // 120 seconds
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);


std::map<String, float> read() {
  std::map<String, float> m;
  sensors.requestTemperatures(); // Send the command to get temperature readings
  
  float t = sensors.getTempCByIndex(0);
  m.insert(std::make_pair("temperature", t));
  /////////////////////////////////////Serial.printf("Temperature is %f \n", t);

  // Check if any reads failed and exit early (to try again).
  if (isnan(t)) {
    Serial.println("Failed to read from ds18b20 sensor!");
    exit(0);
  }

  return m;
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
  /////////////////////////////////////Serial.println("Waiting for wifi connection");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    /////////////////////////////////////Serial.print(WiFi.status());
  }
  /////////////////////////////////////Serial.println("");
  /////////////////////////////////////Serial.print("Connected! IP address: ");
  /////////////////////////////////////Serial.println(WiFi.localIP());
}


void postData(std::map<String, float> data) {
  WiFiClient client;
  HTTPClient http;

  // config the target server
  http.begin(client, "http://" SERVER_IP "/sensors");
  http.addHeader("Content-Type", "application/json");

  String body = "{";
  body = body + "\"node_name\":\"" + NAME + "\",\n";
  std::map<String, float>::iterator iter = data.begin();
  // Push the the values to a json string
  while (iter != data.end()) {
    body = body + "\"" + iter->first + "\":" + iter->second + ",\n";
    iter++;
  }

  body.remove(body.length() - 3);

  body = body + "}";

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

  sensors.begin();

  connect();

  std::map<String, float> data = read();
  digitalWrite(POWER_PIN, LOW);
  postData(data);
  //delete[] data;

  if (data.find("temperature")->second > 35) {
    /////////////////////////////////////Serial.println("Temperature is over 35, setting sleep to 120s");
    sleepTime = 60e6;
  } else {
    /////////////////////////////////////Serial.println("Temperature is under 35, setting sleep to 10 mins");
    sleepTime = 600e6;
  }

  /////////////////////////////////////Serial.printf("Going to sleep for %d \n", sleepTime);
  ESP.deepSleep(sleepTime);
}




void loop() {

}
