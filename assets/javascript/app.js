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

// Grab user input
$("#submit").on("click", function () {
  trainName = $("#trainInput").val().trim();
  destination = $("#destinationInput").val().trim();
  firstTrainTime = $("#timeInput").val().trim();
  frequency = $("#frequencyInput").val().trim();

  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  // Upload train data to the database
  firebase.database().ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  })
  // Clears all of the text-boxes
  $("#trainInput").val("");
  $("#destinationInput").val("");
  $("#timeInput").val("");
  $("#frequencyInput").val("");
  // Because we have a type="submit" button, it's going to reload the page
  // whenever we click it. So, we need "return false" so that it won't
  // reload the page whenever we click submit
  return false;
})


// firebase.database().ref().on("value", function (snapshot) {
//   $("#name-display").html(snapshot.val().trainName);
//   $("#destination-display").html(snapshot.val().destination);
//   $("#frequency-display").html(snapshot.val().firstTrainTime);
//   $("#arrival-display").html(snapshot.val().frequency);
//   // $("#minutes-display").html(snapshot.val().name);
// })



// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
// firebase.database.ref().on("child_added", function(childSnapshot) {
//   console.log(childSnapshot.val());

//   // Store everything into a variable.
//   var train = childSnapshot.val().trainName;
//   var dest = childSnapshot.val().destination;
//   var time = childSnapshot.val().firstTrainTime;
//   var freq = childSnapshot.val().frequency

//   // Employee Info
//   console.log(train);
//   console.log(dest);
//   console.log(time);
//   console.log(freq);
// });



//   // Prettify the employee start
//   var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

//   // Calculate the months worked using hardcore math
//   // To calculate the months worked
//   var empMonths = moment().diff(moment(empStart, "X"), "months");
//   console.log(empMonths);

//   // Calculate the total billed rate
//   var empBilled = empMonths * empRate;
//   console.log(empBilled);

//   // Create the new row
//   var newRow = $("<tr>").append(
//     $("<td>").text(empName),
//     $("<td>").text(empRole),
//     $("<td>").text(empStartPretty),
//     $("<td>").text(empMonths),
//     $("<td>").text(empRate),
//     $("<td>").text(empBilled)
//   );

//   // Append the new row to the table
//   $("#employee-table > tbody").append(newRow);
// });