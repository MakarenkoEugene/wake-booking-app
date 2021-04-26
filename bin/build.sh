#!/bin/sh

npm install & npm run build
rm -rf ../wake-booking-server/public/client
mkdir ../wake-booking-server/public/client
cp -r dist/assets ../wake-booking-server/public/client/assets
rm -rf ../wake-booking-server/views/dashboard
mkdir ../wake-booking-server/views/dashboard/
cp -r dist/index.html ../wake-booking-server/views/dashboard/index.html
