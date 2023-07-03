# bemlops-LoRa32
BeMLesp32.ino contains Arduino code for connecting ESP32 Heltec board to The Things Network (TTN) and sending a set of data.
TTN_decoder.js contains code for decoding payload coming to TTN from the board.

# setting up Arduino environment
docs: https://docs.heltec.org/en/dev_kits/esp32_arduino/quick_start.html#via-arduino-board-manager
1. In your Arduino IDE, go to File > Preferences > Additional Board Manager URLs > enter https://github.com/Heltec-Aaron-Lee/WiFi_Kit_series/releases/download/0.0.7/package_heltec_esp32_index.json
2. Tools > Board > Boards Manager… > search for Heltec ESP32 Series Dev-boards and install it
3. Choose Tools > Board > ESP 32 Arduino > WiFi Lora 32(V3) / Wireless shell(V3) / Wireless stick lite (V3)
![obraz](https://github.com/Denefa/bemlops-LoRa32/assets/50846875/69af514d-65c2-4e53-a7ea-7b654a41af21)
4. Now you should be able to find examples for this board in File > Examples > Heltec-Example
 
# adding Heltec ESP32 to TTN
More detailed docs: https://docs.heltec.org/en/node/esp32/lorawan/index.html

1. Create account at https://console.cloud.thethings.network/
2. Go to applications and create an application
3. Register end device
   device -> heltec
   model -> wifi-lora-32-class-a-otaa
   Frequency plan -> Europe 863-870 MHz

4. Enter or generate AppEUI (can be just a set of zeros), DevEUi, AppKey, make sure to later change these keys in Arudino code to match with what you entered (and then flash the board again).
5. If there is a public LoRaWAN gateway in your area, the board should be able to connect to the TTN server. Map of gateways for Bremen: https://www.thethingsnetwork.org/community/bremen/
6. Go to Payload formatters -> Uplink and copy the code from TTN_decoder.js

# Pushing data to BEEP/beeobsverer servers
   
BEEP devices communicate via TTN by default and this is handled entirely by the BEEP app. Adding an own device is a more complex issue.\
This is what BEEP docs suggest:\
https://beepsupport.freshdesk.com/en/support/solutions/articles/60000633884-add-your-own-sensor-data-to-the-beep-app \
Since TTN was updated to v3, there is no way to do a simple HTTP REST POST request from TTN. It has been replaced by Integrations -> Webhooks. The TTN documentation seems to be outdated in this respect. It's probably still possible as the BEEP devices still use TTN, but it's unclear how and I couldn't find an answer in the BEEP API docs. It might be a good idea to ask questions about this problem to the BEEP community as they have suggested in their docs. For now the workaround is to use ThingSpeak. \
You can create a ThingSpeak channel using your Matlab account (ThingSpeak is a service provided Mathworks) \
Detailed docs how to send data from TTN to ThingSpeak: https://www.thethingsnetwork.org/docs/applications/thingspeak/ \
Your webhook -> Enable event type -> uplink message 

In the ThingSpeak: 
1. Apps -> ThingHTTP -> new ThingHTTP \
   URL for BEEP: https://api.beep.nl/api/sensors?key="YOUR SENSOR KEY" \
   URL for Bob: https://bee-observer.org/api/sensors?key="YOUR SENSOR KEY" \
   Method: Post \
   Content Type: application/json \
   Body: { \
           "t": %%channel_YOUR CHANNEL NUMBER_field_2%%, \
           "t_i_1": %%channel_YOUR CHANNEL NUMBER_field_3%%, \
           "t_i_2": %%channel_YOUR CHANNEL NUMBER_field_4%%, \
           "t_i_3": %%channel_YOUR CHANNEL NUMBER_field_5%%, \
           "t_i_4": %%channel_YOUR CHANNEL NUMBER_field_6%%, \
           "weight_kg": %%channel_YOUR CHANNEL NUMBER_field_8%%, \
           "h": %%channel_YOUR CHANNEL NUMBER_field_7%% \
          } 
2. Apps -> React -> New React 
   Set some condition, for example numeric, that you know will always be fulfilled.\
   Set Action as ThingHTTP you've created in previous step.\
   Set "Run action each time condition is met".


Now ThingSpeak should send REST POST request every time it receives data from TTN. \
Disadvantage of this workaround are: \
 - can send only 8 variables/sensor data \
 - it requires to manually type in a sensor key to URL path \

# Future improvments
- find a way to send POST requests directly from TTN to BEEP/Bob servers
- add sensor integration and send real sensor data in payload
