#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 10
#define RST_PIN 9

MFRC522 rfid(SS_PIN, RST_PIN);

// LED pins
const int LED2 = 2;
const int LED3 = 3;
const int LED4 = 4;
const int LED5 = 5;
const int LED6 = 6;
const int LED7 = 7;
const int LED8 = 8;

// Tag UIDs
byte tag1[4] = {0x1D, 0x13, 0xC6, 0x95}; // France -> LED 8
byte tag2[4] = {0x2D, 0x7D, 0xC4, 0x95}; // Netherlands -> LED 7
byte tag3[4] = {0xCD, 0x80, 0xC8, 0x95}; // Poland -> LED 6
byte tag4[4] = {0x8D, 0x6E, 0xC7, 0x95}; // Switzerland -> LED 5
byte tag5[4] = {0x5D, 0x10, 0xC5, 0x95}; // Czech Republic -> LED 4
byte tag6[4] = {0x2D, 0x0C, 0xC4, 0x95}; // Denmark -> LED 3 + LED 2
byte tag7[4] = {0xCD, 0xFD, 0xC6, 0x95}; // Belgium -> LED 8
byte tag8[4] = {0xAD, 0x17, 0xC9, 0x95}; // Austria -> LED 5
byte tag9[4] = {0x2D, 0x0B, 0xC3, 0x95}; // Germany -> LED 3 + LED 2

void setup() {
  Serial.begin(9600);
  SPI.begin();
  rfid.PCD_Init();

  pinMode(LED2, OUTPUT);
  pinMode(LED3, OUTPUT);
  pinMode(LED4, OUTPUT);
  pinMode(LED5, OUTPUT);
  pinMode(LED6, OUTPUT);
  pinMode(LED7, OUTPUT);
  pinMode(LED8, OUTPUT);

  allLedsOff();

  Serial.println("READY");
}

void loop() {
  if (!rfid.PICC_IsNewCardPresent()) return;
  if (!rfid.PICC_ReadCardSerial()) return;

  Serial.print("UID:");
  for (byte i = 0; i < rfid.uid.size; i++) {
    Serial.print(" ");
    if (rfid.uid.uidByte[i] < 0x10) Serial.print("0");
    Serial.print(rfid.uid.uidByte[i], HEX);
  }
  Serial.println();

  allLedsOff();

  if (uidMatches(tag1)) {
    digitalWrite(LED8, HIGH);
    sendCountry("France");
  }
  else if (uidMatches(tag2)) {
    digitalWrite(LED7, HIGH);
    sendCountry("Netherlands");
  }
  else if (uidMatches(tag3)) {
    digitalWrite(LED6, HIGH);
    sendCountry("Poland");
  }
  else if (uidMatches(tag4)) {
    digitalWrite(LED5, HIGH);
    sendCountry("Switzerland");
  }
  else if (uidMatches(tag5)) {
    digitalWrite(LED4, HIGH);
    sendCountry("Czech Republic");
  }
  else if (uidMatches(tag6)) {
    digitalWrite(LED3, HIGH);
    digitalWrite(LED2, HIGH);
    sendCountry("Denmark");
  }
  else if (uidMatches(tag7)) {
    digitalWrite(LED8, HIGH);
    sendCountry("Belgium");
  }
  else if (uidMatches(tag8)) {
    digitalWrite(LED5, HIGH);
    sendCountry("Austria");
  }
  else if (uidMatches(tag9)) {
    digitalWrite(LED3, HIGH);
    digitalWrite(LED2, HIGH);
    sendCountry("Germany");
  }
  else {
    Serial.println("COUNTRY:Unknown");
  }

  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();

  delay(500);
}

bool uidMatches(byte expectedUID[4]) {
  if (rfid.uid.size != 4) return false;

  for (byte i = 0; i < 4; i++) {
    if (rfid.uid.uidByte[i] != expectedUID[i]) {
      return false;
    }
  }
  return true;
}

void allLedsOff() {
  digitalWrite(LED2, LOW);
  digitalWrite(LED3, LOW);
  digitalWrite(LED4, LOW);
  digitalWrite(LED5, LOW);
  digitalWrite(LED6, LOW);
  digitalWrite(LED7, LOW);
  digitalWrite(LED8, LOW);
}

void sendCountry(const char* country) {
  Serial.print("COUNTRY:");
  Serial.println(country);
}