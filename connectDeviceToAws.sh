#!/bin/bash

# Triggered when the user interrupts the script to stop it.
trap quitjobs INT
quitjobs() {
    echo ""
    pkill -P $$
    echo "Killed all running jobs".
    scriptCancelled="true"
    trap - INT
    exit
}
# Wait for user input so the jobs can be quit afterwards.
scriptCancelled="false"
waitforcancel() {
    while :
    do
        if [ "$scriptCancelled" == "true" ]; then
            return
        fi
        sleep 1
    done
}

node aws-iot-device-sdk-js/examples/device-example -k "credentials/privateKey.pem" -c "credentials/cert.pem" -i "client-id-1" -a "credentials/AmazonRootCA1.pem" -H "at4mjfd94yslw-ats.iot.us-east-1.amazonaws.com" -p 8883 -T "AuthTest" --test-mode 1 &
node aws-iot-device-sdk-js/examples/device-example -k "credentials/privateKey.pem" -c "credentials/cert.pem" -i "client-id-2" -a "credentials/AmazonRootCA1.pem" -H "at4mjfd94yslw-ats.iot.us-east-1.amazonaws.com" -p 8883 -T "AuthTest" --test-mode 2

# Trap the input and wait for the script to be cancelled.
waitforcancel
return 0