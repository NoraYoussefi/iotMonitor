import serial, string, time
#In this example /dev/ttyUSB0 is used
#This may change in your case to /dev/ttyUSB1, /dev/ttyUSB2, etc.
ser = serial.Serial('/dev/ttyACM0', 9600)
#The following block of code works like this:
#If serial data is present, read the line, decode the UTF8 data,
#...remove the trailing end of line characters
#...split the data into temperature and humidity
#...remove the starting and ending pointers (< >)
#...print the output
while True:
        if ser.in_waiting > 0:
            rawserial = ser.readline()
            temperature = rawserial.decode('utf-8').strip('\r\n')
            print(temperature)