// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var main = $("#main");

function timeCards() { //function to dynamically create new time blocks given the correct formatting classes.
  for (var i = 9; i < 18; i++) {
    var div = $('<div class = "row time-block">');
    div.attr("id",i);
    var textdiv = $('<div class="col-2 col-md-1 hour text-center py-3">');
    var textarea = $('<textarea class="col-8 col-md-10 description" rows="3">');
    var btn = $('<button class = "btn saveBtn col-2 col-md-1" aria-label="save">');
    var ibtn = $('<i class="fas fa-save" aria-hidden="true">');
    savedEvents = JSON.parse(localStorage.getItem("events"));
    if (savedEvents[i] !== null) {
      textarea.text(savedEvents[i]);
    }
    if (i == 0) {  //The code labels the row blocks by time.  It is created to handle all 24 hours
      textdiv.text("12AM");
    } else if (i < 12) {
      textdiv.text(i + "AM");
    } else if (i == 12) {
      textdiv.text(i + "PM");
    } else {
      textdiv.text((i-12) + "PM");
    }
    btn.append(ibtn); //all the dynamically created elements are apended to the main div
    main.append(div)
    div.append(textdiv)
    div.append(textarea)
    div.append(btn);
  }
}
function currentSlot() {  //simple function to use day.js output to assign past, present, future class to the time cards
  var curTime = dayjs().format("H");
  for (var i = 9; i < 18; i++) {
    if (i < curTime) {
      $("#"+i).addClass("past");
    } else if (i == curTime) {
      $("#"+i).addClass("present");
    } else {
      $("#"+i).addClass("future");
    }
  }
}
$(function () {
  var savedEvents = new Array(24);
  timeCards();
  currentSlot();
  var dynamicUpdatedTime = setInterval(currentSlot,1000);

  $(".saveBtn").click(function(event) {
    var savedParent = this.parentElement;
    var parID = savedParent.id;
    var saved = $("#"+parID).children("textarea").val();
    savedEvents = JSON.parse(localStorage.getItem("events"));
    savedEvents[parID] = saved;
    localStorage.setItem("events", JSON.stringify(savedEvents));

  })
  $("#currentDay").text(dayjs().format("MMM DD, YYYY"));
});
