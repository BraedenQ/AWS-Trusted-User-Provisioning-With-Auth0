#!/bin/bash

#install node/npm
wget https://nodejs.org/dist/latest-v12.x/node-v12.18.3-linux-armv7l.tar.gz
tar -xzf node-v12.18.3-linux-armv7l.tar.gz
sudo cp -R node-v12.18.3-linux-armv7l/* /usr/local/
node -v
rm -rf node-v*

#install iot sdk
git clone https://github.com/aws/aws-iot-device-sdk-js.git

#install node modules
npm install --prefix aws-iot-device-sdk-js/
npm install --prefix local-api 
npm install --prefix mobile-app

#prepare for access point installation
sudo apt-get update
sudo apt-get dist-upgrade
sudo reboot
