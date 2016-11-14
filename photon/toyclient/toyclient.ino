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
//----------------Function stubs
int LedOn(){
  digitalWrite(D7, HIGH);
  return 1;
}

int LedOff(){
  digitalWrite(D7, LOW);
  return 0;
}

int time_flag = 0;
void time_flag_set(){
  time_flag = 1;
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
    if (digitalRead(D0) == HIGH){
      return 1;
    }
  }
}
//----------------End function stubs


void setup() {
  Particle.function("connect", connectToMyServer);
  pinMode(D7, OUTPUT); //LED
  pinMode(D0, INPUT_PULLDOWN); //Button
}

void loop() {
  if (client.connected()) {
    if (client.available()) {
      //char pin = client.read() - '0' + D0;
      char cmd = client.read();
      if ('a' == cmd) {
        client.write(LedOn());
      } else if ('b' == cmd){
        client.write(LedOff());
      } else if('c' == cmd){
        int k=ButtonCheck();
        client.write(k);
      }
    }
  }
}
