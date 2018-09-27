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
var database = firebase.database();

var currentTime = moment().format("hh:mm a");

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

  //========================================================================================
  //First Train Time (pushed back 1 year to make sure it comes before current time)
  var firstTrainConverted = moment(firstTrainTime, "hh:mm a").subtract(1, "years");
  console.log("CONVERTED TIME: " + moment(firstTrainConverted).format("hh:mm a"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var trainTimeRemainder = diffTime % frequency;
  console.log("TRAIN REMAINDER: " + trainTimeRemainder);

  //Calculation of how main minutes away the train is
  var minutesAway = frequency - trainTimeRemainder;
  console.log("MINUTES AWAY: " + minutesAway);

  //Calculation of next arrival store in variable.
  var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");
  console.log("NEXT ARRIVAL: " + nextArrival);

  //========================================================================================

  // Upload train data to the database
  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency,
    nextArrival: nextArrival,
    minutesAway: minutesAway
  })
  // alert("Train added");

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

// Create Firebase event for adding train data to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var train = childSnapshot.val().trainName;
  var dest = childSnapshot.val().destination;
  var time = childSnapshot.val().firstTrainTime;
  var freq = childSnapshot.val().frequency;
  var next = childSnapshot.val().nextArrival;
  var away = childSnapshot.val().minutesAway;

  // Train Info
  console.log("Name of Train: " + train);
  console.log("Destination: " + dest);
  console.log("First Train Time: " + time);
  console.log("Frequency: " + freq);
  console.log("Next Arrival: " + next);
  console.log("Minutes Away: " + away);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(train),
    $("<td>").text(dest),
    $("<td>").text(freq),
    $("<td>").text(next),
    $("<td>").text(away)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});


// Show current time
// var currentTime = moment();
// console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
// console.log("Current Time: " + moment(currentTime).format('MMMM Do YYYY, h:mm:ss a'));

// Display current time in browser

// var currentTime = moment();

var datetime = null,
  date = null;

var update = function () {
  date = moment(new Date())
  datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
  // datetime.html("<p>Current time: " + date.format('dddd, MMMM Do YYYY, h:mm:ss a') + "</p>");
};

$(document).ready(function () {
  datetime = $('#datetime')
  update();
  setInterval(update, 1000);
});

// Calculations
// console.log(currentTime);
// var future = moment(currentTime).add(3, 'hours');
// var future = moment(currentTime).add(3, 'minutes');
// console.log(future);

// var nextArrival = firstTrainTime + frequency;
// var minutesAway = nextArrival - currentTime; 

// 3:00
// 30 min
// currentTime: 5:15
// minutesAway = 

