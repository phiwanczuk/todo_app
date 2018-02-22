import firebase from 'firebase'

const  config = {
    apiKey: "AIzaSyCIyHkle4TpODNYNmV08uCQzilDRyT2lmo",
    authDomain: "todoapp-3ca07.firebaseapp.com",
    databaseURL: "https://todoapp-3ca07.firebaseio.com",
    projectId: "todoapp-3ca07",
    storageBucket: "",
    messagingSenderId: "639932237871"
};
firebase.initializeApp(config);

export const database = firebase.database;