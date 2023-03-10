const OFFICE_HOUR_START_IN_24 = 9;
const OFFICE_HOUR_END_IN_24 = 17;
const APP_ID = "daily-planner";

// show the current date in the title session
function showCurrentDate() {
  $(function () {
    // Format current date in the format of Monday, December 13th
    const currDateStr = moment().format("dddd, MMMM Do");
    // set the text in currentDay paragraph
    $("#currentDay").text(currDateStr);
  });
}

function getTimeblockHourEl(hour) {
  // create span tag to show offcie hour
  const hourEl = $(
    "<span class='col-2 col-md-1 d-flex align-items-center hour'>"
  );
  // get hour string in format of 1PM
  const hourShort = moment().hour(hour).format("hA");

  hourEl.text(hourShort);
  return hourEl;
}

// get an event from local storage
function getEventFromLocalStorage(date) {
  const ISOStr = moment(date).toISOString();
  // get local storage, if it's null then create a new object
  let storageObj = localStorage.getItem(APP_ID)
    ? JSON.parse(localStorage.getItem(APP_ID))
    : {};
  return storageObj[ISOStr] || "";
}

function getTimeblockTextareaEl(hour) {
  // create an input tag to allow user to type in an event
  const eventTextareaEl = $("<textarea class='col-8 col-md-10'>");
  // date JS Date using the hour
  const currDate = moment(hour, "h").toDate();
  // restore event
  eventTextareaEl.val(getEventFromLocalStorage(currDate));

  // get current hour for comparison
  const currHour = moment().hour();

  // set colour on each input based on past, present, and future
  eventTextareaEl.addClass(
    currHour > hour ? "past" : currHour === hour ? "present" : "future"
  );
  return eventTextareaEl;
}

function getTimeblockSaveBtnEl() {
  // create a save button to allow user to save an event
  const saveBtn = $("<button class='col-2 col-md-1 saveBtn'>");
  const saveIconEl = $(`<i class="far fa-save">`);
  saveBtn.append(saveIconEl);
  return saveBtn;
}

function getTimeblock(hour) {
  // create a timeblock element
  const timeblockEl = $("<div class='row time-block'>");

  // get all elements inside a timeblock
  const hourEl = getTimeblockHourEl(hour);
  const textareaEl = getTimeblockTextareaEl(hour);
  const saveBtnEl = getTimeblockSaveBtnEl();

  // append individual elements into timeblock element
  timeblockEl.append(hourEl);
  timeblockEl.append(textareaEl);
  timeblockEl.append(saveBtnEl);

  return timeblockEl;
}

// add each timeblock into the timeblocks div
function buildTimeblocks(startingHour, endingHour) {
  // loop throught hours between starting hour and ending hour
  for (let hour = startingHour; hour <= endingHour; hour++) {
    // append timeblock in timeblocks container
    $("#timeblocks").append(getTimeblock(hour));
  }
}

// save an event
function saveEventToLocalStorage(date, eventStr) {
  const ISOStr = moment(date).toISOString();
  // get local storage, if it's null then create a new object
  let storageObj = localStorage.getItem(APP_ID)
    ? JSON.parse(localStorage.getItem(APP_ID))
    : {};

  // store an event using ISO string is a key and event is a string
  storageObj[ISOStr] = eventStr;

  // save an event into local storage
  localStorage.setItem(APP_ID, JSON.stringify(storageObj));
}

// show message to tell user that event is added/deleted
function showMessage(messageId) {
  // show message to the user
  $(`#${messageId}`).removeClass("d-none");
  setTimeout(function () {
    // hide message after 4 seconds
    $(`#${messageId}`).addClass("d-none");
  }, 4000);
}

// listener on click to find which button is clicked
$(document).on("click", ".saveBtn", function (e) {
  // get the timeblock that the button is in
  const timeblockEl = $(e.currentTarget).parent();
  // get the input value inside the timeblock
  const inputVal = timeblockEl.find("textarea").val();
  // get the hour of the timeblock
  const currHourStr = timeblockEl.find(".hour").text();
  // date JS Date using the hour string
  const currDate = moment(currHourStr, "hA").toDate();

  // check if there's a event stored previously
  const hasPreviousEvent = getEventFromLocalStorage(currDate) !== "";

  // save event in local storage
  saveEventToLocalStorage(currDate, inputVal);

  if (inputVal !== "") {
    // show message if an event is added
    showMessage("event-added-msg");
  } else {
    // show message if an event is deleted
    if (hasPreviousEvent) {
      showMessage("event-deleted-msg");
    }
  }
});

// start the application
function start() {
  showCurrentDate();
  buildTimeblocks(OFFICE_HOUR_START_IN_24, OFFICE_HOUR_END_IN_24);
}

start();
