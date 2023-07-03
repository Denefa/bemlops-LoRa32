# bemlops-LoRa32
BeMLesp32.ino contains Arduino code for connecting ESP32 Heltec board to The Things Network (TTN) and sending a set of data.
TTN_decoder.js contains code for decoding payload coming to TTN from the board.

# setting up Arduino environment
docs: https://docs.heltec.org/en/dev_kits/esp32_arduino/quick_start.html#via-arduino-board-manager
1. In your Arduino IDE, go to File > Preferences > Additional Board Manager URLs > enter https://github.com/Heltec-Aaron-Lee/WiFi_Kit_series/releases/download/0.0.7/package_heltec_esp32_index.json
2. Tools > Board > Boards Manager… > search for Heltec ESP32 Series Dev-boards and install it
3. Choose Tools > Board > ESP 32 Arduino > WiFi Lora 32(V3)
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

4. Type in or generate AppEUI, DevEUi, AppKey, make sure to later change these keys in Arudino code to match with what you entered (and then flash the board again).
5. If you have a public LoRaWAN gatway in your vicinity the board should soon establish connection woth TTN server. Map of gateways for Bremen: https://www.thethingsnetwork.org/community/bremen/
6. Go to Payload formatters -> Uplink and copy the code from TTN_decoder.js

# Pushing data to BEEP/beeobsverer servers
   
