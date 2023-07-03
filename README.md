# bemlops-LoRa32
BeMLesp32.ino contains Arduino code for connecting ESP32 Heltec board to The Things Network (TTN) and sending a set of data.
TTN_decoder.js contains code for decoding payload coming to TTN from the board.

# setting up Arduino environment
1. In your Arduino IDE, go to File > Preferences > Additional Board Manager URLs > enter https://github.com/Heltec-Aaron-Lee/WiFi_Kit_series/releases/download/0.0.7/package_heltec_esp32_index.json
2. Tools > Board > Boards Manager… > search for Heltec ESP32 Series Dev-boards and install it
3. Choose Tools > Board > ESP 32 Arduino > WiFi Lora 32 (V3)
![obraz](https://github.com/Denefa/bemlops-LoRa32/assets/50846875/69af514d-65c2-4e53-a7ea-7b654a41af21)

# adding Heltec ESP32 to TTN

