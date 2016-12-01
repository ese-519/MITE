#include "Particle.h"
#include "Adafruit_10DOF_IMU.h"
#include <math.h>
#include "Emic2TTS.h"

Emic2TtsModule emic;  // TTS module
Servo myServo;  //declare a servo
int score = 0;
bool scoreUp = false;

// Assign ID to the sensors
Adafruit_LSM303_Accel_Unified accel = Adafruit_LSM303_Accel_Unified(30301);
Adafruit_L3GD20_Unified       gyro  = Adafruit_L3GD20_Unified(20);
Adafruit_LSM303_Mag_Unified   mag   = Adafruit_LSM303_Mag_Unified(30302);

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
Timer idleTimer(15000, getAttention);
void getAttention() {
  // say something, do stuff
  //emic.say("Play with me!");
}
Timer idleWatchDog(1000, idleCheckQuick);
void idleCheckQuick(){
  sensors_event_t event;
  float val = 0.08;
  gyro.getEvent(&event);
  Serial.println(event.gyro.x);
  Serial.println(event.gyro.y);
  Serial.println(event.gyro.z);
  if (fabs(event.gyro.x) > val || fabs(event.gyro.y) >  val || fabs(event.gyro.z) > val){
    Serial.println("idleTimer reset");
    idleTimer.reset();
  }
}




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
// General purpose timer callback function for use in timed sensing
int time_flag = 0;
void time_flag_set(){
  time_flag = 1;
}

int photoCheck(){
  time_flag = 0;
  Timer timer(2000, time_flag_set, 1);
  timer.start();
  while(1){
    if (time_flag == 1) { // Timeout condition
      return 0;
    }
    if (analogRead(A0) < 2000){
      scoreUp = true;
      timer.dispose();    // Get rid of the timer
      return 1; // Positive input sensed, stop
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
      scoreUp = true;
      timer.dispose();    // Get rid of the timer
      return 1;
    }
  }
}

int shakeDetect(){
  sensors_event_t event;
  int i;
  int s = 0;
  float val = 1.0;
  for (i =0; i < 8; i++ ){
    gyro.getEvent(&event);
    if (!(fabs(event.gyro.x) > val || fabs(event.gyro.y) >  val || fabs(event.gyro.z) > val)){
      s += 1;
    }
    delay(100);
  }
  if (s <= 3) {
    scoreUp = true;
  }
  return (s <= 3);
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

int magCheck(){
  sensors_event_t event;
  float val = -100.0;
  for (int i = 0; i < 6; i++) {
	mag.getEvent(&event);
	if (event.magnetic.y < val || event.magnetic.x < val || event.magnetic.z < val){
    scoreUp = true;
    emic.say("I feel better!");
		return 1;
	}
	delay(100);
  }
  emic.say("So tired");
  return 0;
}

int servoDown(){
  myServo.write(30);
  return 1;
}

int servoUp(){
  myServo.write(115);
  return 1;
}

int servoMid(){
  myServo.write(60);
  return 1;
}

int punch(int n) {
  myServo.write(60);
  delay(200);
  for (int i = 0; i < n; i++) {
    myServo.write(85);
    delay(200);
    myServo.write(60);
    delay(200);
  }
  myServo.write(30);
}

//----------------End function stubs



void setup() {
  Serial.begin(115200);
  Particle.function("connect", connectToMyServer); //Setup Photon API function "connect"
  pinMode(D7, OUTPUT); //LED
  pinMode(D2, OUTPUT); //Vibrator
  pinMode(D3, INPUT_PULLDOWN); // Button
  pinMode(A0, INPUT); // Photocell
  digitalWrite(D2, LOW);
  emic.init();
  int servoPin = A5;
  myServo.attach(servoPin);
  idleTimer.start();
  idleWatchDog.start();
  if(!mag.begin())
  {
    while(1); // If no mag detected, just die!
  }
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
      } else if ('h' == cmd){
        client.write(magCheck());
      } else if ('i' == cmd){
        client.write(servoUp());
      } else if ('j' == cmd){
        client.write(servoDown());
      } else if ('k' == cmd){
        client.write(1);
        vibrate(900);
      } else if ('l' == cmd){
        client.write(1);
        punch(7);
      } else if ('m' == cmd) {
		    client.write(servoMid());
	    }
    }
  }
  if (scoreUp) {
    score += 1;
    scoreUp = false;
    if (score == 1) {
      //level 1
      emic.say("1");
    } else if (score == 2) {
      //level 2
      emic.say("2");
    } else if (score > 2) {
      //level 3 - do crazy stuff here
      emic.say("3");
      score = 0; // reset to 0
    }
}
}
