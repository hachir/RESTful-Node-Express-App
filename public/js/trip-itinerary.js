// ! Itinerary click handlers

const addEventHandler = function (event) {

  event.preventDefault();

  // ! Format Data
  let formData = {
    // properties: title, time, category, description, dayId, tripId
    title: $('#event-title').val().trim(),
    time: moment($('#event-time').val(), 'hh:mm a').format('hh:mm a'),
    category: $('#event-category').val(),
    description: $('#event-desc').val().trim(),
    dayId: $('#event-day').val(),
    tripId: $id,
    budget: Number($('#event-budget').val().trim())
  }

  let budgetData = {
    item: formData.title,
    cost: formData.budget,
    dayId: formData.dayId,
    tripId: formData.tripId
  }

  // ! API Calls
  Trip.addEvent(formData, $id);
  Trip.addDayBudget(budgetData, $id);

  // ! Clear Form
  $('#event-title').val('');
  $('#event-time').val('');
  $('#event-category').val('');
  $('#event-desc').val('');
  $('#event-day').val('');
  $('#event-budget').val('');
}

// ! Click listeners
$('#add-event').on('click', addEventHandler);