#include "OneWire.h"
#include "DallasTemperature.h"
 OneWire oneWire(A1);
DallasTemperature ds(&oneWire);

void setup() {
  Serial.begin(9600);  // définition de l'ouverture du port série
  ds.begin();          // sonde activée
  pinMode(10, OUTPUT);
}

void loop() {
  
  ds.requestTemperatures();
  int t = ds.getTempCByIndex(0);
 
  Serial.print(t+'\n');

  if (t > 25) { digitalWrite(10, HIGH); }
  else { digitalWrite(10, LOW); }
 
  delay(1000);
  
}
