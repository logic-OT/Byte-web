# Byte-web

<b>This is the web implemenation of the [byte framework](https://github.com/logic-OT/Byte/tree/update)</b> 

![VID-20230608-WA0005_exported_25463](https://github.com/logic-OT/Byte-web/assets/61668807/13c7f2bc-64b8-4798-b9a0-17d9eced7e56)


# Website
See the implementation [here](http://bytenets.pythonanywhere.com/)
## Description
Byte is framework that faciliates data transmission via audible sound waves.

## How It Works
This project takes the input from the user, encodes it into binary and then modulates it into sound. The sound is then transmitted wirelessly through the speakers of the device. The transmitted sound is then received and recorded by the microphone of the demodulation device. The recorded sound is then demodulated and decoded to get the original message.

Encoding and decoding was done with Frequency Shift Keying (FSK)

## Dependencies
This package uses the following libraries.
* Python 3.9
* numpy
* scipy
* sounddevice
* flask
* flask_cors

## Installing and Executing program

1. Clone repository
    ```
    git clone git@github.com:logic-ot/Byte-web.git
    ```
2. Installing Depedencies
    ```
    virtualenv myenv
    myenv\scripts\activate    
    pip install -r requirements.txt
    ```
3. Run flask
   ```
   flask --app app.py --debug run
   ```
  ## Limitations

- Works flawlessly from phone-to-laptop communication but has a problem with phone-to-phone communication

# Motivation
I was heavily inspired to pursue this project after [Jerry Buaba](https://github.com/buabaj) told me about it. I  subsequently inspected his repo and fixed some issues with the demodulator and...voila, it works.
