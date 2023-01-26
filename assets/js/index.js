const OFFICE_HOUR_START_IN_24 = 9;
const OFFICE_HOUR_END_IN_24 = 17;

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
  const hourEl = $("<span>");
  // get hour string in format of 1PM
  const hourShort = moment().hour(hour).format("hA");

  hourEl.text(hourShort);
  return hourEl;
}

function getTimeblockInputEl(hour) {
  // create an input tag to allow user to type in an event
  const eventInputEl = $("<input>");
  return eventInputEl;
}

function getTimeblockSaveBtnEl() {
  // create a save button to allow user to save an event
  const saveBtn = $("<button>");
  const saveIconEl = $(`<i class="far fa-save">`);
  saveBtn.append(saveIconEl);
  return saveBtn;
}

function getTimeblock(hour) {
  // create a timeblock element
  const timeblockEl = $("<div>");

  // get all elements inside a timeblock
  const hourEl = getTimeblockHourEl(hour);
  const inputEl = getTimeblockInputEl(hour);
  const saveBtnEl = getTimeblockSaveBtnEl();

  // append individual elements into timeblock element
  timeblockEl.append(hourEl);
  timeblockEl.append(inputEl);
  timeblockEl.append(saveBtnEl);

  return timeblockEl;
}

function buildTimeblocks(startingHour, endingHour) {
  console.log("hello");
  // loop throught hours between starting hour and ending hour
  for (let hour = startingHour; hour <= endingHour; hour++) {
    console.log("hour: ", hour);

    // append timeblock in timeblocks container
    $("#timeblocks").append(getTimeblock(hour));
  }
}

// start the application
function start() {
  showCurrentDate();
  buildTimeblocks(OFFICE_HOUR_START_IN_24, OFFICE_HOUR_END_IN_24);
}

start();
