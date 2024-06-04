#!/bin/sh

# Usage example: ./subscriber.sh v1/buildings/d/classrooms/d2 bVRwToprDLBcE2hwU1PU client1

topic=$1
access=$2
client=$3

mosquitto_sub -d -q 1 -h 161.53.19.19 -p 45883 -t "$topic" -u "$access"  -i "$client"
