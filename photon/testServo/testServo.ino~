int servoPin = A5;
Servo myServo;
int servoPos = 0;

void setup() {
    
    myServo.attach(servoPin);
    Spark.function("ang",angle);
    pinMode(D7, OUTPUT);
    
}

void loop() {
    
}

int angle(String command){
    if (command == "180"){
        //for(servoPos=0; servoPos<=180; servoPos+=5){
            myServo.write(115); //89; 110
            digitalWrite(D7, HIGH);
            return 1;
        
    }

    if (command == "0"){
        //for(servoPos=180; servoPos<=0; servoPos-=5){
            myServo.write(30);  //46; 30
            digitalWrite(D7, LOW);
            return 0;
    }
    
}

