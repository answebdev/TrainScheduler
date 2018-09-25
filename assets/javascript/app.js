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
  database.ref().push({
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

// Create Firebase event for adding train data to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var train = childSnapshot.val().trainName;
  var dest = childSnapshot.val().destination;
  var time = childSnapshot.val().firstTrainTime;
  var freq = childSnapshot.val().frequency
  //placeholder for minutes away
  var away = childSnapshot.val().frequency

  // Train Info
  console.log(train);
  console.log(dest);
  console.log(time);
  console.log(freq);
  console.log(away);

  //   // Prettify the employee start
  // var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

  // // Calculate the months worked using hardcore math
  // // To calculate the months worked
  // var empMonths = moment().diff(moment(empStart, "X"), "months");
  // console.log(empMonths);

  // // Calculate the total billed rate
  // var empBilled = empMonths * empRate;
  // console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(train),
    $("<td>").text(dest),
    $("<td>").text(freq),
    $("<td>").text(time),
    $("<td>").text(away)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});


// Show current time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
console.log("Current Time: " + moment(currentTime).format('MMMM Do YYYY, h:mm:ss a'));

// Display current time in browser
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
