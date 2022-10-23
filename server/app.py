import argparse
import io
from PIL import Image
import torch
from flask import Flask, request
import cockroach
import os
import json
import psycopg2
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

DETECTION_URL = "/analyze"
custom_path = os.getcwd() + '/thegoat.pt'
# model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)  # force_reload = recache latest code
model = torch.hub.load(os.getcwd() + '/yolov5', 'custom', path=custom_path, source='local')
model.eval()

DATABASE_URL="postgresql://matt:Qd9RhxiNMvQDZOcwq44ZPw@free-tier11.gcp-us-east1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dbulky-shaman-2489"
conn = psycopg2.connect(DATABASE_URL)

dummy = [
    {},
    [
        "",
        -1,
        "",
        0,
        "",
    ]
]

def queryFishDB(query): 
    query = "SELECT * FROM fishdb.fish WHERE name='{}' ".format(query)
    with conn.cursor() as cur:
        cur.execute(query)
        res = cur.fetchall()
        conn.commit()
        return res

@app.route("/example", methods=["GET"])
@cross_origin()
def example():
    return [
        {},
        [
            "Atlantic Cod",
            1,
            "August 1 - April 30",
            22,
            "In the Northwest Atlantic, cod range from Greenland to Cape Hatteras, North Carolina. In U.S. waters, cod is most common on Georges Bank and in the western Gulf of Maine. Cod is an iconic fish of New England and in recent years, Atlantic cod stocks in our region have declined dramatically. NOAA Fisheries is working to rebuild this population. (Source: fisheries.noaa.gov)",
        ]
    ]

@app.route(DETECTION_URL, methods=["POST"])
@cross_origin()
def predict():
    if not request.method == "POST":
        return

    app.logger.info('%s', request.files)
    if request.files.get("image"):
        image_file = request.files["image"]
        image_bytes = image_file.read()
        img = Image.open(io.BytesIO(image_bytes))
        results = model(img, size=640)
        if (len(results) == 0):
            return dummy
        data = results.pandas().xyxy[0].to_json(orient="records")   
        data_json = json.loads(data)
        if(len(data_json) > 0): 
            cockroach_data = queryFishDB(data_json[0]['name'])
            if(len(cockroach_data) > 0):
                data_json.append(cockroach_data[0])
        return data_json
    app.logger.info('failed to load files')
    return dummy


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Flask api exposing yolov5 model")
    parser.add_argument("--port", default=8000, type=int, help="port number")
    args = parser.parse_args()
    app.run(host="0.0.0.0", port=args.port)  # debug=True causes Restarting with stat
