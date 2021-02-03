#!/bin/sh

npm install & npm run build
rm -rf ../iec-generator-server/public
cp -r dist ../iec-generator-server/public
