# Byte-web

<b>This is the web implemenation of the [byte framework](https://github.com/logic-OT/Byte/tree/update)</b> 

![](https://miro.medium.com/max/702/0*3_J7YH5beFVmpxBg.png)

# Website
See the implementation [here](http://bytenets.pythonanywhere.com/)
## Description
Byte is framework that faciliates data transmission via audible sound waves.

## How It Works
This project takes the input from the user, encodes it into binary and then modulates it into sound. The sound is then transmitted wirelessly through the speakers of the device. The transmitted sound is then received and recorded by the microphone of the demodulation device. The recorded sound is then demodulated and decoded to get the original message.

Encoding and decoding was done with Frequency Shift Keying (FSK)

## Dependencies
This package uses the following libraries.
* Python 3.8
* numpy

## Installing and Executing program

1. Clone repository
    ```
    git clone git@github.com:logic-ot/Generic-Naive-Bayes.git
    ```
2. Installing Depedencies
    ```
    virtualenv myenv
    myenv\scripts\activate    
    pip install -r requirements.txt
    ```
3. Import the model
   ```
   from generic_bayes import bayesian_classifier
   ```
4. Instantiate the model and pass in your data. This automatcailly fits the training data to the model
    ```
    model = bayesian_classifier(X_train,Y_train)
    ```
5. Use the fitted model to predict a class using a sequence of features 
    ```
    model.predict(X_target.iloc[10])
    ```
### Example code
    from generic_bayes import bayesian_classifier
    import numpy as np

    model = bayesian_classifier(np.array([[1,1],[2,1],[3,2]]), np.array([1,2,2]))

    print(model.predict(np.array([1,1,1,1,1,3,1])))

    OUTPUT: [1]

    
  ## Limitations

- Doesn't have a system to detect continuous data and throw an error
