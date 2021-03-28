import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import * as firebase from "firebase";
import {Navigation} from "./Navigation.js";
import {APIKEY, AUTHDOMAIN, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID, APPID, MEASUREMENTID} from "@env";
const fireBaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
  measurementId: MEASUREMENTID
};

if (!firebase.apps.length) {
  firebase.initializeApp(fireBaseConfig);
}

export default function App() {
  return <Navigation />;
}