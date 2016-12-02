#include "Particle.h"
#include "Adafruit_10DOF_IMU.h"
#include <math.h>
#include "Emic2TTS.h"
#include "LPD8806.h"

// LED strip
uint16_t nLEDs = 8; // Number of RGB LEDs in strand
uint8_t spi_num  = 0; // Chose SPI port to control LEDs
lpd8806 strip = lpd8806(nLEDs, spi_num); // declare a strip object

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
    for (int i=0 ; i < 4 ; i++){
      colorWipe(strip.Color(  0,   0, 20), 0);  // Blue
      delay(100);
      colorWipe(strip.Color(  0,   0, 0), 0);
      delay(100);
    }
    setSolidLeds();
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
  emic.say("Play with me!");
  theaterChase(strip.Color(10, 10, 10), 20); // White
  theaterChase(strip.Color(20, 0, 0), 20); //red
  rainbowCycle(0);
  setSolidLeds();
}
Timer idleWatchDog(1000, idleCheckQuick);
void idleCheckQuick(){
  sensors_event_t event;
  float val = 0.08;
  gyro.getEvent(&event);
  if (fabs(event.gyro.x) > val || fabs(event.gyro.y) >  val || fabs(event.gyro.z) > val){
    idleTimer.reset();
  }
}


int vibrate(int duration, char c) {
  digitalWrite(D2, HIGH);
  int n = ceil(duration / 240.0);
  if (c == 'r') {
    for (int i =0; i < n ; i++){
      theaterChase(strip.Color(40, 0, 0), 20);
    }
  }
  if (c == 'g') {
    for (int i =0; i < n ; i++){
      theaterChase(strip.Color(0, 40, 0), 20);
    }
  }
  if (c == 'b') {
    for (int i =0; i < n ; i++){
      theaterChase(strip.Color(0, 0, 40), 20);
    }
  }
  digitalWrite(D2, LOW);
  setSolidLeds();
  return 1;
}

int vibrateLongRed(int duration){
  vibrate(duration,'r');
  return 1;
}

int vibrateLongGreen(int duration){
  vibrate(duration,'g');
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
  colorWipe(strip.Color(  10,  10, 10), 0);  // White
  Timer timer(2000, time_flag_set, 1);
  timer.start();
  while(1){
    if (time_flag == 1) { // Timeout condition
      colorWipe(strip.Color(  0,  0, 0), 0);  // off
      setSolidLeds();
      return 0;
    }
    if (analogRead(A0) < 2000){
      scoreUp = true;
      timer.dispose();    // Get rid of the timer
      colorWipe(strip.Color(  0,  0, 0), 0);  // off
      setSolidLeds();
      return 1; // Positive input sensed, stop
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
    theaterChase(strip.Color(10,   10, 10), 10);
    //delay(100);
  }
  if (s <= 3) {
    scoreUp = true;
  }
  setSolidLeds();
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
    for (int i=0 ; i < 4 ; i++){
      colorWipe(strip.Color(  0,  20, 0), 0);  // Blue
      delay(100);
      colorWipe(strip.Color(  0,   0, 0), 0);
      delay(100);
    }
    setSolidLeds();
		return 1;
	}
	delay(100);
  }
  emic.say("So tired");
  for (int i=0 ; i < 4 ; i++){
    colorWipe(strip.Color(  20,  0, 0), 0);  // red
    delay(100);
    colorWipe(strip.Color(  0,   0, 0), 0);
    delay(100);
  }
  setSolidLeds();
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
    for (int j = 0; j < 2; j++){
      digitalWrite(D7, HIGH);
      delay(25);
      digitalWrite(D7, LOW);
      delay(25);
    }
    theaterChase(strip.Color(10,   10, 10), 18);
    //delay(200);
    myServo.write(60);
    for (int j = 0; j < 2; j++){
      digitalWrite(D7, HIGH);
      delay(25);
      digitalWrite(D7, LOW);
      delay(25);
    }
    theaterChase(strip.Color(10,   10, 10), 18);
    //delay(200);
  }
  myServo.write(30);
  setSolidLeds();
}

//----------------End function stubs

//------------------------------LED strip functions
void rainbow(uint8_t wait) {
  int i, j;

  for (j=0; j < 384; j++) {     // 3 cycles of all 384 colors in the wheel
    for (i=0; i < strip.numPixels(); i++) {
      strip.setPixelColor(i, Wheel( (i + j) % 384));
    }
    strip.show();   // write all the pixels out
    delay(wait);
  }
}

// Slightly different, this one makes the rainbow wheel equally distributed
// along the chain
void rainbowCycle(uint8_t wait) {
  uint16_t i, j;

  for (j=0; j < 384 * 5; j++) {     // 5 cycles of all 384 colors in the wheel
    for (i=0; i < strip.numPixels(); i++) {
      // tricky math! we use each pixel as a fraction of the full 384-color wheel
      // (thats the i / strip.numPixels() part)
      // Then add in j which makes the colors go around per pixel
      // the % 384 is to make the wheel cycle around
      strip.setPixelColor(i, Wheel( ((i * 384 / strip.numPixels()) + j) % 384) );
    }
    strip.show();   // write all the pixels out
    delay(wait);
  }
}

// Fill the dots progressively along the strip.
void colorWipe(uint32_t c, uint8_t wait) {
  int i;

  for (i=0; i < strip.numPixels(); i++) {
      strip.setPixelColor(i, c);
      strip.show();
      delay(wait);
  }
}

// Chase one dot down the full strip.
void colorChase(uint32_t c, uint8_t wait) {
  int i;

  // Start by turning all pixels off:
  for(i=0; i<strip.numPixels(); i++) strip.setPixelColor(i, 0);

  // Then display one pixel at a time:
  for(i=0; i<strip.numPixels(); i++) {
    strip.setPixelColor(i, c); // Set new pixel 'on'
    strip.show();              // Refresh LED states
    strip.setPixelColor(i, 0); // Erase pixel, but don't refresh!
    delay(wait);
  }

  strip.show(); // Refresh to turn off last pixel
}

//Theatre-style crawling lights.
void theaterChase(uint32_t c, uint8_t wait) {
  for (int j=0; j<4; j++) {  //do 4 cycles of chasing
    for (int q=0; q < 3; q++) {
      for (int i=0; i < strip.numPixels(); i=i+3) {
        strip.setPixelColor(i+q, c);    //turn every third pixel on
      }
      strip.show();

      delay(wait);

      for (int i=0; i < strip.numPixels(); i=i+3) {
        strip.setPixelColor(i+q, 0);        //turn every third pixel off
      }
    }
  }
}

//Theatre-style crawling lights with rainbow effect
void theaterChaseRainbow(uint8_t wait) {
  for (int j=0; j < 384; j++) {     // cycle all 384 colors in the wheel
    for (int q=0; q < 3; q++) {
        for (int i=0; i < strip.numPixels(); i=i+3) {
          strip.setPixelColor(i+q, Wheel( (i+j) % 384));    //turn every third pixel on
        }
        strip.show();

        delay(wait);

        for (int i=0; i < strip.numPixels(); i=i+3) {
          strip.setPixelColor(i+q, 0);        //turn every third pixel off
        }
    }
  }
}
/* Helper functions */

//Input a value 0 to 384 to get a color value.
//The colours are a transition r - g -b - back to r

uint32_t Wheel(uint16_t WheelPos)
{
  byte r, g, b;
  switch(WheelPos / 128)
  {
    case 0:
      r = 127 - WheelPos % 128;   //Red down
      g = WheelPos % 128;      // Green up
      b = 0;                  //blue off
      break;
    case 1:
      g = 127 - WheelPos % 128;  //green down
      b = WheelPos % 128;      //blue up
      r = 0;                  //red off
      break;
    case 2:
      b = 127 - WheelPos % 128;  //blue down
      r = WheelPos % 128;      //red up
      g = 0;                  //green off
      break;
  }
  r = (r /128.0)*20;
  g = (g /128.0)*20;
  b = (b /128.0)*20;
  return(strip.Color(r,g,b));
}

void setSolidLeds(){
  if (score == 1) {
    colorWipe(strip.Color(20,   20,   0), 50);  // Yellow
  } else if (score == 2) {
    colorWipe(strip.Color(0,   20,   20), 50);  // Cyan
  } else if (score == 0) {
    colorWipe(strip.Color(0,   0,   0), 50);  // off
  }
}

//----------------------------------END of LED strip functions

void setup() {
  Serial.begin(115200);
  Particle.function("connect", connectToMyServer); //Setup Photon API function "connect"
  pinMode(D7, OUTPUT); //LED
  pinMode(D2, OUTPUT); //Vibrator
  pinMode(A0, INPUT); // Photocell
  digitalWrite(D2, LOW);
  emic.init();
  strip.begin(); // Start up the LED strip
  strip.show(); // Update the strip, to start they are all 'off'
  int servoPin = D3;
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

  // setup light show
  colorChase(strip.Color(  0, 20, 10), 20); // Cyan
  colorChase(strip.Color(  0,   0, 20), 20); // Blue
  colorChase(strip.Color(20,   0, 10), 20); // Violet
  colorWipe(strip.Color(0,   0,   0), 0);  // off
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
        //client.write(ButtonCheck());
      } else if ('d' == cmd){
        client.write(shakeDetect());
      } else if ('e' == cmd){
        client.write(idleDetect());
      } else if ('f' == cmd){
        client.write(vibrate(200,'b'));
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
        vibrateLongRed(900);
      } else if ('l' == cmd){
        client.write(1);
        vibrateLongGreen(900);
      } else if ('m' == cmd){
        client.write(1);
        punch(7);
      } else if ('n' == cmd) {
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
      setSolidLeds();
    } else if (score == 2) {
      //level 2
      emic.say("2");
      setSolidLeds();
    } else if (score > 2) {
      //level 3 - do crazy stuff here
      emic.say("3");
      rainbowCycle(1);
      score = 0; // reset to 0
      setSolidLeds();
    }
}
}
