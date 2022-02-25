import serial

arduino = serial.Serial('/dev/ttyACM0')
arduino.baudrate = 9600
time.sleep(1)
line = arduino.readline().decode('utf-8').rstrip()
print(line)
    
