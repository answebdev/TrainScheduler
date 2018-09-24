// Initialize Firebase
var config = {
  apiKey: "AIzaSyCwUY21eQZK8mwi7h9Ibq4N5QoS7K-q-l4",
  authDomain: "trainscheduler-6b06e.firebaseapp.com",
  databaseURL: "https://trainscheduler-6b06e.firebaseio.com",
  projectId: "trainscheduler-6b06e",
  storageBucket: "trainscheduler-6b06e.appspot.com",
  messagingSenderId: "853801615807"
};

firebase.initializeApp(config);

// Create a variable to reference the database
// var database = firebase.database();
// console.log(database);

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;

$("#submit").on("click", function () {
  trainName = $("#trainInput").val().trim();
  destination = $("#destinationInput").val().trim();
  firstTrainTime = $("#timeInput").val().trim();
  frequency = $("#frequencyInput").val().trim();

  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  // Because we have a type="submit" button, it's going to reload the page
  // whenever we click it. So, we need "return false" so that it won't
  // reload the page whenever we click submit.
  // return false;

  firebase.database().ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency

  })
  return false;
})

firebase.database().ref().on("value", function (snapshot) {
  $("#name-display").html(snapshot.val().trainName);
  $("#destination-display").html(snapshot.val().destination);
  $("#frequency-display").html(snapshot.val().firstTrainTime);
  $("#arrival-display").html(snapshot.val().frequency);
  // $("#minutes-display").html(snapshot.val().name);
})