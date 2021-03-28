# sources: We referenced code from both of the websites below and used their steps to process the images.
# https://iq.opengenus.org/basics-of-machine-learning-image-classification-techniques/
# https://towardsdatascience.com/image-pre-processing-c1aec0be3edf
# data: We use data from two Kaggle sites listed below
# https://www.kaggle.com/techsash/waste-classification-data
# https://www.kaggle.com/asdasdasasdas/garbage-classification

import os
import numpy as np
# import matplotlib.pyplot as plt
# import matplotlib.image as mpimg
# importing libraries
from pathlib import Path
import glob
import pandas as pd
import cv2
import random

images_dir = Path('glass')
images = images_dir.glob("*.jpg")

glass = []

for img in images:
    imgUMat = cv2.imread(str(img))
    glass.append((imgUMat, 0))

# converting data into pandas dataframe for easy visualization
glass = pd.DataFrame(glass, columns=['image', 'label'], index=None)

images_dir = Path('metal')
images = images_dir.glob("*.jpg")

metal = []

for img in images:
    imgUMat = cv2.imread(str(img))
    metal.append((imgUMat, 0))

# converting data into pandas dataframe for easy visualization
metal = pd.DataFrame(metal, columns=['image', 'label'], index=None)

images_dir = Path('O_test')
images = images_dir.glob("*.jpg")

paper = []

for img in images:
    imgUMat = cv2.imread(str(img))
    paper.append((imgUMat, 0))

# converting data into pandas dataframe for easy visualization
paper = pd.DataFrame(paper, columns=['image', 'label'], index=None)

images_dir = Path('plastic')
images = images_dir.glob("*.jpg")

plastic = []

for img in images:
    imgUMat = cv2.imread(str(img))
    plastic.append((imgUMat, 0))

# converting data into pandas dataframe for easy visualization
plastic = pd.DataFrame(plastic, columns=['image', 'label'], index=None)

images_dir = Path('trash')
images = images_dir.glob("*.jpg")

organic = []

for img in images:
    imgUMat = cv2.imread(str(img))
    organic.append((imgUMat, 1))

# converting data into pandas dataframe for easy visualization
organic = pd.DataFrame(organic, columns=['image', 'label'], index=None)

images_dir = Path('paper')
images = images_dir.glob("*.jpg")

trash = []

for img in images:
    imgUMat = cv2.imread(str(img))
    trash.append((imgUMat, 2))

# converting data into pandas dataframe for easy visualization
trash = pd.DataFrame(trash, columns=['image', 'label'], index=None)

train_data = pd.concat([glass, metal, organic, paper, plastic, trash])

train_data = train_data.reset_index(drop=True)


# Preprocessing
def processing(data):
    # setting dim of the resize
    height = 200
    width = 200
    dim = (width, height)
    res_img = []
    for i in range(len(data)):
        res = cv2.resize(data.loc[i, 'image'], dim, interpolation=cv2.INTER_AREA)
        res_img.append(res)
    no_noise = []
    for i in range(len(res_img)):
        blur = cv2.GaussianBlur(res_img[i], (5, 5), 0)
        blur = cv2.cvtColor(blur, cv2.COLOR_BGR2GRAY)
        no_noise.append(blur)
    return no_noise


new_img = processing(train_data)
X = np.reshape(new_img, (3525, 40000))

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

y = np.array(train_data['label'])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# rnd_clf = RandomForestClassifier(criterion="entropy", random_state=100)
rnd_clf = RandomForestClassifier()

from sklearn.metrics import accuracy_score

rnd_clf.fit(X_train, y_train)
y_pred = rnd_clf.predict(X_test)
print(rnd_clf.__class__.__name__, accuracy_score(y_test, y_pred))