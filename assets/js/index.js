const OFFICE_HOUR_START_IN_24 = 9;
const OFFICE_HOUR_END_IN_24 = 17;

// start the application
function start() {
  showCurrentDate();
}

// show the current date in the title session
function showCurrentDate() {
  $(function () {
    // Format current date in the format of Monday, December 13th
    const currDateStr = moment().format("dddd, MMMM Do");
    // set the text in currentDay paragraph
    $("#currentDay").text(currDateStr);
  });
}

start();
