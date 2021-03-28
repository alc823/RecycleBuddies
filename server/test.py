import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage
import datetime
import requests

# Fetch the service account key JSON file contents
cred = credentials.Certificate("credentials.json")
# cred = credentials.Certificate(config)

# Initialize the app with a service account, granting admin privileges
app = firebase_admin.initialize_app(cred, {
    'storageBucket': 'STORAGE_BUCKET_NAME',
}, name='storage')

bucket = storage.bucket(app=app)
image = "image"
blob = bucket.blob(image)
url = blob.generate_signed_url(datetime.timedelta(seconds=300), method='GET')
print(type(url))
r = requests.get(url)
print(r)
with open("image.jpg", "wb") as f:
    f.write(r.content)

# Source: https://stackoverflow.com/questions/53304517/how-to-retrieve-image-from-firebase-storage-using-python
# source: https://jdhao.github.io/2020/06/17/download_image_from_url_python/

import cv2
import testML
import pandas as pd
import numpy as np
cvimg = cv2.imread('image.jpg')
data_arr = []
data_arr.append((cvimg,-1))
data_pd = pd.DataFrame(data_arr, columns=['image','label'], index=None)
data_pd_reset = data_pd.reset_index(drop=True)
new_img = testML.processing(data_pd_reset)
X = np.reshape(new_img,(1, 40000))
print(X)
prediction = testML.rnd_clf.predict(X)
print(prediction[0])
