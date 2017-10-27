import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCSc05b7gFUVn2z45FyHApUtu2SHfjCTwo",
    authDomain: "meu-app-jp.firebaseapp.com",
    databaseURL: "https://meu-app-jp.firebaseio.com",
    projectId: "meu-app-jp",
    storageBucket: "meu-app-jp.appspot.com",
    messagingSenderId: "1085422814597"

})

const database = firebaseApp.database()
const auth = firebase.auth()

export { firebaseApp, database, auth };