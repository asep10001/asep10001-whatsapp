import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyDMPE4WdYsTujb5AkUQEqeYPPUEVhRuj6E",
  authDomain: "asep10001-whatsapp.firebaseapp.com",
  projectId: "asep10001-whatsapp",
  storageBucket: "asep10001-whatsapp.appspot.com",
  messagingSenderId: "794113925774",
  appId: "1:794113925774:web:8e42f75661d276cbaddfdf"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;