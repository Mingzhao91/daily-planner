function showCurrentDate() {
  $(function () {
    // Format current date in the format of Monday, December 13th
    const currDateStr = moment().format("dddd, MMMM Do");
    // set the text in currentDay paragraph
    $("#currentDay").text(currDateStr);
  });
}

showCurrentDate();
