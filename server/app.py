from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage
import json
import glob
import pandas as pd
import numpy as np
import cv2
import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage
import datetime
import requests
import testML

app = Flask(__name__)

# -------------------- Setup ---------------------------
# Source: https://stackoverflow.com/questions/53304517/how-to-retrieve-image-from-firebase-storage-using-python
cred = credentials.Certificate("credentials.json")
fb_app = firebase_admin.initialize_app(cred, {
    'storageBucket': 'NAME_OF_STORAGE_BUCKET',
}, name='storage')
bucket = storage.bucket(app=fb_app)
image = "image"
blob = bucket.blob(image)


@app.route('/hoohacks/api/v1.0/classify-trash', methods=['PUT','POST','GET'])
def classify_trash():
    # Download and save image from database
    # Source: https://stackoverflow.com/questions/53304517/how-to-retrieve-image-from-firebase-storage-using-python
    # Source: https://jdhao.github.io/2020/06/17/download_image_from_url_python/
    url = blob.generate_signed_url(datetime.timedelta(seconds=300), method='GET')
    r = requests.get(url)
    with open("image.jpg", "wb") as f:
        f.write(r.content)
    # Read and analyze saved image
    cvimg = cv2.imread('image.jpg')
    data_arr = []
    data_arr.append((cvimg, -1))
    data_pd = pd.DataFrame(data_arr, columns=['image', 'label'], index=None)
    data_pd_reset = data_pd.reset_index(drop=True)
    new_img = testML.processing(data_pd_reset)
    X = np.reshape(new_img, (1, 22500))
    prediction = testML.rnd_clf.predict(X)[0]
    print("The latest image was classified as a " + str(prediction) + ".")
    return str(prediction)


if __name__ == '__main__':
    app.run(debug=True)
