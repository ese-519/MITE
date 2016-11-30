// This #include statement was automatically added by the Spark IDE.
#include "Emic2TTS/Emic2TTS.h"

Emic2TtsModule emic;
bool isDemoCompleted = false;

void setup() {
    emic.init();
    pinMode(D7, OUTPUT);
}

void loop() {
    
    if(!isDemoCompleted){
        emic.say("Starting");
       
        EmicVoice ev = BeautifulBetty;
        emic.setVoice(ev);
        emic.setVolume(18);
        emic.say("Sup Bitches");
        ev = FrailFrank;
        emic.setVoice(ev);
        emic.setVolume(18);
        emic.say("Text to Speech is Done");

        isDemoCompleted = true;
    }
    
    digitalWrite(D7, HIGH);
    delay(1000);
    digitalWrite(D7, LOW);
    delay(1000);
}
