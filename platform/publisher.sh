#!/bin/sh

# Usage example: ./publisher.sh v1/buildings/d/classrooms/d2 bVRwToprDLBcE2hwU1PU "{cardId: "47-32-68-49", scanTime: 1717439275326, classroom: "d2"}"

topic=$1
access=$2
data=$3

mosquitto_pub -d -q 1 -h 161.53.19.19 -p 45883 -t "$topic" -u "$access" -m "$data"
