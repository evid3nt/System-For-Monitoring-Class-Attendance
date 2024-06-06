import sys
import json
import time
import random
from multiprocessing import Process
import paho.mqtt.client as paho

broker_ip = "161.53.19.19"
port = 45883
client_ids = {"b1":"ef92b500-21d3-11ef-a963-a37ba3a57ce2", "a102":"fe545350-21d3-11ef-a963-a37ba3a57ce2", "d2":"0cb88f60-21d4-11ef-a963-a37ba3a57ce2"}
access_tokens = {"b1":"rhXxYKw6T1tKhAokpnYP", "a102":"KtR42P6B9CFYyjm0fBVj", "d2":"bVRwToprDLBcE2hwU1PU"}


def connect_to_MQTT(classroom):
    client = paho.Client(client_id=client_ids[classroom], callback_api_version=paho.CallbackAPIVersion.VERSION2)
    client.username_pw_set(access_tokens[classroom])
    client.connect(broker_ip, port)
    return client


def simulate_scan(client, classroom):
    payload = {}
    payload["cardId"] = "-".join([str(random.randint(0, 255)) for i in range(4)])
    payload["classroom"] = classroom
    payload["scanTime"] = int(time.time() * 1000)
    payload_json = json.dumps(payload)

    topic = f"v1/buildings/{classroom[0]}/classrooms/{classroom}"
    res = client.publish(topic=topic, payload=payload_json, qos=1)
    print(f"Student scanned! {payload_json}")


if __name__ == "__main__":
    classroom = sys.argv[1]
    num_students = int(sys.argv[2])
    client = connect_to_MQTT(classroom)


    print(f"{num_students} students about to scan in {classroom}...")
    for i in range(num_students):
        simulate_scan(client, classroom)
        time.sleep(1)
            





