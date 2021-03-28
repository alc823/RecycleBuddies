import os
import numpy as np
# importing libraries
from pathlib import Path
import glob
import pandas as pd
import cv2
import random

# 0 for compostable
# 1 for recyclable
# 2 for trash

# reading images from path
images_dir = Path('O_test')
images = images_dir.glob("*.jpg")

train_data1 = []

for img in images:
    imgUMat = cv2.imread(str(img))
    train_data1.append((imgUMat, 0))

# converting data into pandas dataframe for easy visualization
train_data1 = pd.DataFrame(train_data1, columns=['image', 'label'], index=None)

train1 = train_data1.sample(1000)

# reading images from path
images_dir = Path('R_test')
images2 = images_dir.glob("*.jpg")

train_data2 = []

for img in images2:
    imgUMat = cv2.imread(str(img))
    train_data2.append((imgUMat, 1))

# converting data into pandas dataframe for easy visualization 
train_data2 = pd.DataFrame(train_data2, columns=['image', 'label'], index=None)

train2 = train_data2.sample(1000)

# reading images from path
images_dir = Path('trash')
images3 = images_dir.glob("*.jpg")

train_data3 = []

for img in images3:
    imgUMat = cv2.imread(str(img))
    train_data3.append((imgUMat, 2))

# converting data into pandas dataframe for easy visualization 
train_data3 = pd.DataFrame(train_data3, columns=['image', 'label'], index=None)

train_data = pd.concat([train1, train2, train_data3])
train_data = train_data.reset_index(drop=True)


# Preprocessing
def processing(data):
    # setting dim of the resize
    height = 150
    width = 150
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
X = np.reshape(new_img, (2137, 22500))

from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import VotingClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC

y = np.array(train_data['label'])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

kn_clf = KNeighborsClassifier(n_neighbors=10)
rnd_clf = RandomForestClassifier(n_estimators=100)
svm_clf = SVC(probability=True, kernel='rbf')

# voting_clf = VotingClassifier(estimators=[('kn', kn_clf), ('rf', rnd_clf), ('svc', svm_clf)], voting='soft')

from sklearn.metrics import accuracy_score

rnd_clf.fit(X_train,y_train)
print("done")
# for clf in (kn_clf, rnd_clf, svm_clf, voting_clf):
#     clf.fit(X_train, y_train)
#     y_pred = clf.predict(X_test)
#     print(clf.__class__.__name__, accuracy_score(y_test, y_pred))