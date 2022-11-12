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
    if (i == 0) {
      textdiv.text("12AM");
    } else if (i < 12) {
      textdiv.text(i + "AM");
    } else if (i == 12) {
      textdiv.text(i + "PM");
    } else {
      textdiv.text((i-12) + "PM");
    }
    btn.append(ibtn);
    main.append(div)
    div.append(textdiv)
    div.append(textarea)
    div.append(btn);
  }
}
function currentSlot() {
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
  var dynamicUpdatedTime = setInterval(currentSlot,1000);
  // $(".saveBtn").click(function(event) {
  //   var clickEvt = event.currentTarget;
  //   var savedParent = clickEvt.parentElement;
  //   var parID = savedParent.id;
  //   var saved = $("#"+parID).children("textarea").val();
  //   savedEvents = JSON.parse(localStorage.getItem("events"));
  //   savedEvents[parID] = saved;
  //   localStorage.setItem("events", JSON.stringify(savedEvents));

  // })
  $(".saveBtn").click(function(event) {
    var savedParent = this.parentElement;
    var parID = savedParent.id;
    var saved = $("#"+parID).children("textarea").val();
    savedEvents = JSON.parse(localStorage.getItem("events"));
    savedEvents[parID] = saved;
    localStorage.setItem("events", JSON.stringify(savedEvents));

  })
  $("#currentDay").text(dayjs().format("MMM DD, YYYY"));
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
