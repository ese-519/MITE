#include "Particle.h"
#include "Adafruit_10DOF_IMU.h"
#include <math.h>
/* Assign a unique ID to the sensors */
Adafruit_LSM303_Accel_Unified accel = Adafruit_LSM303_Accel_Unified(30301);
Adafruit_L3GD20_Unified       gyro  = Adafruit_L3GD20_Unified(20);

int shakeDetect(){
  sensors_event_t event;
  int i;
  int s = 1;
  float val = 1.0;
  for (i =0; i < 5; i++ ){
    gyro.getEvent(&event);
    if (!(fabs(event.gyro.x) > val || fabs(event.gyro.y) >  val || fabs(event.gyro.z) > val)){
      s = 0;
    }
    delay(100);
  }
  return s;
}


void setup(void)
{
  Serial.begin(115200);
  Serial.println(F("Adafruit 10DOF Tester")); Serial.println("");

  /* Initialise the sensors */
  if(!accel.begin())
  {
    /* There was a problem detecting the ADXL345 ... check your connections */
    Serial.println(F("Ooops, no LSM303 detected ... Check your wiring!"));
    while(1);
  }

  if(!gyro.begin())
  {
    /* There was a problem detecting the L3GD20 ... check your connections */
    Serial.print("Ooops, no L3GD20 detected ... Check your wiring or I2C ADDR!");
    while(1);
  }
}

void loop(void)
{

  if (shakeDetect()){
    Serial.println(" ***Shake that booty*** ");
  }
  else {
    Serial.println(" Mama asleep ");
  }

}
