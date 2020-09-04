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
npm run start --prefix local-api &
HTTPS=true npm start --prefix mobile-app

# Trap the input and wait for the script to be cancelled.
waitforcancel
return 0