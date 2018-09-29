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

  // CALCULATIONS
  // Calculate first Train Time (pushed back 1 year to make sure it comes before current time)
  var firstTrainConverted = moment(firstTrainTime, "hh:mm a").subtract(1, "years");

  // Calculate difference between converted time and current time
  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");

  // Calculate time apart (remainder)
  var trainTimeRemainder = diffTime % frequency;

  // Calculate how many minutes away train is
  var minutesAway = frequency - trainTimeRemainder;

  // Calculate next arrival
  var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");

  // Upload train data to the database
  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency,
    nextArrival: nextArrival,
    minutesAway: minutesAway
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

// Create Firebase event for adding train data to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {

  // Store everything into a variable.
  var train = childSnapshot.val().trainName;
  var dest = childSnapshot.val().destination;
  var time = childSnapshot.val().firstTrainTime;
  var freq = childSnapshot.val().frequency;
  var next = childSnapshot.val().nextArrival;
  var away = childSnapshot.val().minutesAway;

  // Train Info - Testing
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

// Display current time (dynamic)
var datetime = null,
  date = null;

var update = function () {
  date = moment(new Date())
  datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};

$(document).ready(function () {
  datetime = $('#datetime')
  update();
  setInterval(update, 1000);
});
