#include "Particle.h"
#include "Adafruit_10DOF_IMU.h"
#include <math.h>

// Assign ID to the sensors
Adafruit_LSM303_Accel_Unified accel = Adafruit_LSM303_Accel_Unified(30301);
Adafruit_L3GD20_Unified       gyro  = Adafruit_L3GD20_Unified(20);

//--------------Setting up TCP Client
TCPClient client;

void ipArrayFromString(byte ipArray[], String ipString) {  //Function to Parse IP address
  int dot1 = ipString.indexOf('.');
  ipArray[0] = ipString.substring(0, dot1).toInt();
  int dot2 = ipString.indexOf('.', dot1 + 1);
  ipArray[1] = ipString.substring(dot1 + 1, dot2).toInt();
  dot1 = ipString.indexOf('.', dot2 + 1);
  ipArray[2] = ipString.substring(dot2 + 1, dot1).toInt();
  ipArray[3] = ipString.substring(dot1 + 1).toInt();
}

int connectToMyServer(String ip) {  //Function to connect to TCP Server
  byte serverAddress[4];
  ipArrayFromString(serverAddress, ip);

  if (client.connect(serverAddress, 9000)) {
    return 1; // successfully connected
  } else {
    return -1; // failed to connect
  }
}
//--------------End setting up TCP Client


//----------------Function stubs
int vibrate(int duration) {
  digitalWrite(D2, HIGH);
  delay(duration);
  digitalWrite(D2, LOW);
  return 1;
}

int LedOn(){
  digitalWrite(D7, HIGH);
  return 1;
}

int LedOff(){
  digitalWrite(D7, LOW);
  return 1;
}

int time_flag = 0;
void time_flag_set(){
  time_flag = 1;
}

int photoCheck(){
  time_flag = 0;
  Timer timer(2000, time_flag_set, 1);
  timer.start();
  while(1){
    if (time_flag == 1) {
      return 0;
    }
    if (analogRead(A0) < 2000){
      return 1;
    }
  }
}

int ButtonCheck(){
  //check for a button press in within the next two seconds
  time_flag = 0;
  Timer timer(2000, time_flag_set, 1);
  timer.start();
  while(1){
    if (time_flag == 1) {
      return 0;
    }
    if (digitalRead(D3) == HIGH){
      return 1;
    }
  }
}

int shakeDetect(){
  sensors_event_t event;
  int i;
  int s = 1;
  float val = 1.0;
  for (i =0; i < 6; i++ ){
    gyro.getEvent(&event);
    if (!(fabs(event.gyro.x) > val || fabs(event.gyro.y) >  val || fabs(event.gyro.z) > val)){
      s = 0;
    }
    delay(100);
  }
  return s;
}

int idleDetect(){
  sensors_event_t event;
  int i;
  int s = 1;
  float val = 0.08;
  for (i =0; i < 6; i++ ){
    gyro.getEvent(&event);
    if (fabs(event.gyro.x) > val || fabs(event.gyro.y) >  val || fabs(event.gyro.z) > val){
      s = 0;
    }
    delay(100);
  }
  return s;
}
//----------------End function stubs


void setup() {
  Particle.function("connect", connectToMyServer); //Setup Photon API function "connect"
  pinMode(D7, OUTPUT); //LED
  pinMode(D2, OUTPUT); //Vibrator
  pinMode(D3, INPUT_PULLDOWN); // Button
  pinMode(A0, INPUT); // Photocell
  digitalWrite(D2, LOW);
  if(!accel.begin())
  {
    while(1); // If no accel detected, just die!
  }
  if(!gyro.begin())
  {
    while(1); // If no gyro detected, just die!
  }
}

void loop() {
  if (client.connected()) {
    if (client.available()) {
      char cmd = client.read();
      if ('a' == cmd) {
        client.write(LedOn());
      } else if ('b' == cmd){
        client.write(LedOff());
      } else if('c' == cmd){
        client.write(ButtonCheck());
      } else if ('d' == cmd){
        client.write(shakeDetect());
      } else if ('e' == cmd){
        client.write(idleDetect());
      } else if ('f' == cmd){
        client.write(vibrate(200));
      } else if ('g' == cmd){
        client.write(photoCheck());
      }
    }
  }
}
