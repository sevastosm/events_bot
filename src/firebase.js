var firebase = require("firebase/app");
require("firebase/database");

const config = {
    apiKey: "AIzaSyAkmofSeYBvuuagB2HxjD9cxRUTTypEyfM",
    authDomain: "kifisia8.firebaseapp.com",
    databaseURL: "https://kifisia8.firebaseio.com",
    projectId: "kifisia8",
    storageBucket: "kifisia8.appspot.com",
    messagingSenderId: "225216978624",
    appId: "1:225216978624:web:3e786c49f54217005a9725",
    measurementId: "G-99Y597T3BJ"
  };

  firebase.initializeApp(config);

  const database = firebase.database()
  module.exports = database




// firebase.database().ref('users/' + '-MRBaAr-fxehLTXM2g3p').remove((error) => {
//     if (error) {
//       // The write failed...
//     } else {
//       // Data saved successfully!
//       console.log('Data removed successfully!')
//     }
// });
  // [START rtdb_write_new_user_completion]
 // var mostViewedPosts = firebase.database().ref('posts').orderByChild('metrics/views');
 //const ref =firebase.database().collection('users')
 //const dd = ref.orderByChild('name').equalTo('user_name1');


// dd.get((error,data) => {
//     if (error) {
//       // The write failed...
//     } else {
//       // Data saved successfully!
//       console.log("DATA",data)
//     }
//   });
// async function getDocument() {
//     // [START get_document]
//     // [START firestore_data_get_as_map]
//     const cityRef = dd;
//     const doc = await cityRef.get();
//     if (!doc.exists) {
//       console.log('No such document!');
//     } else {
//       console.log('Document data:', doc);
//     }
//     // [END firestore_data_get_as_map]
//     // [END get_document]
//   }
//   getDocument()
// //module.exports = writeUserData

const rooRef = firebase.database().ref()
const twooRef= rooRef.child('users').orderByChild('username').equalTo('user_nam545')
twooRef.once('value').then((snapshot) => {
    // Now simply find the parent and return the name.
    console.log(snapshot.toJSON())
 // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  // ...
});

