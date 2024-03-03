import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCvKajU2W5BmrjTfnsi-jPDueZoFPzNfkc",
  authDomain: "cocola-412510.firebaseapp.com",
  databaseURL: "https://cocola-412510-default-rtdb.firebaseio.com",
  projectId: "cocola-412510",
  storageBucket: "cocola-412510.appspot.com",
  messagingSenderId: "120187789227",
  appId: "1:120187789227:web:bab9fc396b23f3d3833cee",
  measurementId: "G-GLHVZJQGG3",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
