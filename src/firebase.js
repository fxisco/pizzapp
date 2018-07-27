import firebase from 'firebase/app';
import 'firebase/firestore';
import config from './conf/firebase';

firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };

firestore.settings(settings);

export const database = firestore;

