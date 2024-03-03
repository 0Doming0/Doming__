import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, set, child, get, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
(function () {
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDlbbB4bE3it7f6z2gyPdgf9Z8xFvyfEcA",
    authDomain: "doming-data.firebaseapp.com",
    databaseURL: "https://doming-data-default-rtdb.firebaseio.com/",
    projectId: "doming-data",
    storageBucket: "doming-data.appspot.com",
    messagingSenderId: "677420543825",
    appId: "1:677420543825:web:8b6a3012dc2a3513b52d70",
    measurementId: "G-7L7HYQC1PJ"
};
const app = initializeApp(FIREBASE_CONFIG)
const db = getDatabase(app)
const dbRef = ref(db)
async function get_ () {
  const snapshot = await get(child(dbRef, "restaurant/mesas"))
  console.log (snapshot.val())
}
get_()
})()