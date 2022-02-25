#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# lsusb to check device name
#dmesg | grep "tty" to find port name

import firebase_admin
from firebase_admin import credentials, db

cred = credentials.Certificate("projet-embarque-firebase-adminsdk-6kzju-339a157574.json")

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://projet-embarque-default-rtdb.firebaseio.com/'
})
ref = db.reference("temperature-humidity")

import serial,time


if __name__ == '__main__':

    print('Running. Press CTRL-C to exit.')
    with serial.Serial("/dev/ttyACM0", 9600, timeout=1) as arduino:
        time.sleep(0.1) #wait for serial to open
        if arduino.isOpen():
            print("{} connected!".format(arduino.port))
            try:
                while True:
                    data = arduino.readline().decode('utf-8').rstrip()

                    ref.set({"data": line})
                    print(line)
            except KeyboardInterrupt:
                print("KeyboardInterrupt has been caught.")