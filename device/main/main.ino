#include <SPI.h>
#include <MFRC522.h>
#include <PubSubClient.h>
#include <WiFi.h>
#include <ArduinoJson.h>
#include "config.h"

WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);

MFRC522 rfid(SS_PIN, RST_PIN);  // Instance of the class

MFRC522::MIFARE_Key key;

// Init array that will store new NUID
byte nuidPICC[4];

void connectToWiFi(const char* ssid, const char* password, int retryInterval, bool reconnecting) {
  Serial.printf("%s to WiFi %s", reconnecting ? "Reconnecting" : "Connecting", ssid);

  // Try to connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(WIFI_RETRY_INTERVAL);
    Serial.print(".");
  }
  Serial.print("\nWiFi connected!\n");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void connectToMQTT(const char* clientId, const char* topic, int retryInterval, bool reconnecting) {
  while (!mqttClient.connected()) {
    Serial.printf("%s to MQTT ...\n", reconnecting ? "Reconnecting" : "Connecting");

    // Try to connect to MQTT
    if (mqttClient.connect(clientId)) {
      Serial.println("Connected to MQTT!");
    } else {
      Serial.printf("Failed (status code = %d)\n", mqttClient.state());
      Serial.printf("Try again in %d miliseconds.\n", retryInterval);
      delay(retryInterval);
    }
  }
}

void setup() {
  Serial.begin(115200);
  while (!Serial) {
    delay(100);
  }
  connectToWiFi(WIFI_SSID, WIFI_PASSWORD, WIFI_RETRY_INTERVAL, false);

  //Setup MQTT
  connectToMQTT(MQTT_CLIENT_ID, MQTT_CLASSROOM_TOPIC, MQTT_RETRY_INTERVAL, false);

  SPI.begin();  // Init SPI bus
  //SPI.beginTransaction(SPISettings(1000000, MSBFIRST, SPI_MODE0));
  rfid.PCD_Init();  // Init MFRC522
  //SPI.endTransaction();

  for (byte i = 0; i < 6; i++) {
    key.keyByte[i] = 0xFF;
  }

  Serial.println(F("This code scan the MIFARE Classsic NUID."));
  Serial.print(F("Using the following key:"));
  printHex(key.keyByte, MFRC522::MF_KEY_SIZE);
}

void loop() {

  //Check WiFi
  if (WiFi.status() != WL_CONNECTED) {
    connectToWiFi(WIFI_SSID, WIFI_PASSWORD, WIFI_RETRY_INTERVAL, true);
  }

  //Check MQTT
  if (!mqttClient.connected()) {
    connectToMQTT(MQTT_CLIENT_ID, MQTT_CLASSROOM_TOPIC, MQTT_RETRY_INTERVAL, true);
  }

  //Copy example
  // Reset the loop if no new card present on the sensor/reader. This saves the entire process when idle.
  if (!rfid.PICC_IsNewCardPresent())
    return;

  // Verify if the NUID has been readed
  if (!rfid.PICC_ReadCardSerial())
    return;

  Serial.print(F("PICC type: "));
  MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);
  Serial.println(rfid.PICC_GetTypeName(piccType));

  // Check is the PICC of Classic MIFARE type
  if (piccType != MFRC522::PICC_TYPE_MIFARE_MINI && piccType != MFRC522::PICC_TYPE_MIFARE_1K && piccType != MFRC522::PICC_TYPE_MIFARE_4K) {
    Serial.println(F("Your tag is not of type MIFARE Classic."));
    return;
  }

  if (rfid.uid.uidByte[0] != nuidPICC[0] || rfid.uid.uidByte[1] != nuidPICC[1] || rfid.uid.uidByte[2] != nuidPICC[2] || rfid.uid.uidByte[3] != nuidPICC[3]) {
    StaticJsonBuffer<300> JSONbuffer;
    JsonObject& JSONencoder = JSONbuffer.createObject();

    JSONencoder["device"] = "ESP32";
    JSONencoder["sensorType"] = "Reader";
    JsonArray& values = JSONencoder.createNestedArray("values");

    values.add(20);
    values.add(21);
    values.add(23);

    char JSONmessageBuffer[100];
    JSONencoder.printTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
    Serial.println("Sending message to MQTT topic..");
    Serial.println(JSONmessageBuffer);

    if (mqttClient.publish(MQTT_CLASSROOM_TOPIC, JSONmessageBuffer) == true) {
      Serial.println("Success sending message");
    } else {
      Serial.println("Error sending message");
    }

    Serial.println(F("A new card has been detected."));

    // Store NUID into nuidPICC array
    for (byte i = 0; i < 4; i++) {
      nuidPICC[i] = rfid.uid.uidByte[i];
    }

    Serial.println(F("The NUID tag is:"));
    Serial.print(F("In hex: "));
    printHex(rfid.uid.uidByte, rfid.uid.size);
    Serial.println();
    Serial.print(F("In dec: "));
    printDec(rfid.uid.uidByte, rfid.uid.size);
    Serial.println();
  } else Serial.println(F("Card read previously."));

  // Halt PICC
  rfid.PICC_HaltA();

  // Stop encryption on PCD
  rfid.PCD_StopCrypto1();
}

void printHex(byte* buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? " 0" : " ");
    Serial.print(buffer[i], HEX);
  }
}

/**
 * Helper routine to dump a byte array as dec values to Serial.
 */
void printDec(byte* buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? " 0" : " ");
    Serial.print(buffer[i], DEC);
  }
}