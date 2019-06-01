window['moment-range'].extendMoment(moment);
// * Get references to page elements
// **************************************************
// The '$id' is passed from the htmlRoute request.


// * The API object contains methods for each kind of request we'll make
// **************************************************
var API = {
  // * USER ROUTES
  // This route will return all users from the database
  getAllUsers: () => {
    return $.ajax({
      url: '/users',
      type: 'GET'
    })
  },

  // This route will get all users going on this specific trip
  // Note the id being passed in is the the tripId
  getAttendees: (id) => {
    return $.ajax({
      url: '/trip/attendees/' + id,
      type: 'GET'
    })
  },

  // * TRIP ROUTES

  // This route will return the trip name, start and end dates, location, and trip owner
  // Note this id is the tripId
  getTrip: id => {
    return $.ajax({
      url: '/trip/title/' + id,
      type: 'GET'
    })
  },

  // This route will delete the trip
  // Note the id being passed in is the tripId
  deleteTrip: (id) => {
    return $.ajax({
      url: '/delete/trip/' + id,
      type: 'DELETE'
    })
  },

  // This route will return an object that
  // includes packing list, full itinerary and budget
  // Note you are passing in the tripId
  getTripInfo: (id) => {
    return $.ajax({
      url: '/trip/info/' + id,
      type: 'GET'
    })

  },

  // * PACKING LIST ROUTES

  // This route will return all packing list items for a trip
  // Note you are passing in the tripId
  getPackingList: (id) => {
    return $.ajax({
      url: '/packing/' + id,
      type: 'GET'
    })
  },

  // This route will add a packing list item
  // The data parameter being passed in is an object
  // it needs to include keys of 'item' and 'tripId'
  addPackingList: data => {
    return $.ajax({
      url: '/packing',
      type: 'POST',
      data: data
    })
  },

  // This route will delete a packing list item
  // Note this id is for the actual packing list item
  deletePackingList: id => {
    return $.ajax({
      url: '/packing/' + id,
      type: 'DELETE'
    })
  },

  // This route will edit a packing list item
  // it is structured to take a colName key value and a info key value pair
  // ex. var data = {colName: 'completed', info: true}
  updatePackingList: (id, data) => {
    return $.ajax({
      url: '/packing/' + id,
      type: 'PUT',
      data: data
    })
  },


  // * DAY ROUTES


  // This route will return all the days associated with a given trip
  // Note this id is the tripId
  getDays: id => {
    return $.ajax({
      url: '/days/' + id,
      type: 'GET'
    })
  },

  // This route will add a day to the trip
  // The data object needs to have key value pairs of date, and tripId
  // ex. var data = {date: '2019-01-01', tripId: 1}
  addDay: data => {
    return $.ajax({
      url: '/add/day',
      type: 'POST',
      data: data
    })
  },

  // This route will delete a day
  // Note this id is for the specific day
  deleteDay: id => {
    return $.ajax({
      url: '/delete/day/' + id,
      type: 'DELETE'
    })
  },


  // * EVENT ROUTES


  // This route will return all of the events planned for the entire trip
  // The response will include the dayId of each event so that you can tie them to the proper day
  // Note the id is the tripId
  getEvents: id => {
    return $.ajax({
      url: '/events/' + id,
      type: 'GET'
    })
  },

  // This route will add an event to the database tied to a specific day
  // The data object being passed through needs to have these key value pairs
  // title, time, category, description, dayId, tripId
  addEvent: data => {
    return $.ajax({
      url: '/events/add',
      type: 'POST',
      data: data
    })
  },

  // This route will update a specifc event column 
  // The data object needs the key value pairs of colName and info
  // Note the id is the specific event
  updateEventCol: (id, data) => {
    return $.ajax({
      url: '/events/' + id,
      type: 'PUT',
      data: data
    })
  },

  deleteEvent: id => {
    return $.ajax({
      url: '/events/' + id,
      type: 'DELETE'
    })
  },


  // * BUDGET ROUTES


  // This route gets you the entire budget for the entire trip
  // Note the id is the tripId
  getTripBudget: id => {
    return $.ajax({
      url: '/trip/budget/' + id,
      type: 'GET'
    })
  },

  // This route will get you all of the items on the budget that 
  // are tied to a specific day
  // This will include a total and a daily average
  // Note the id is the tripId
  getAllDaysBudget: id => {
    return $.ajax({
      url: '/alldays/budget/' + id,
      type: 'GET'
    })
  },

  // This route will get you the budget tied to a specific day on the trip
  // Note this id is the dayId you want the budget for
  getDayBudget: id => {
    return $.ajax({
      url: '/day/budget/' + id,
      type: 'GET'
    })
  },

  // This route will add a budget item tied to a specific day 
  // The data object needs the following key value pairs
  // item, cost, dayId, tripId
  addDayBudget: data => {
    return $.ajax({
      url: '/day/budget',
      type: 'POST',
      data: data
    })
  },

  // This route will add a budget item that tied to the trip 
  // This budget item is not tied to a specific day
  // The data object needs the following key value pairs
  // item, cost, tripId
  addTripBudget: data => {
    return $.ajax({
      url: '/trip/budget',
      type: 'POST',
      data: data
    })
  },

  // This route will update a specific budget column's info
  // The data object needs colName and info keys
  // Note the id is for the specific budget item itself
  updateBudget: (id, data) => {
    return $.ajax({
      url: '/budget/' + id,
      type: 'PUT',
      data: data
    })
  },

  // This route will delete a specific budget item
  // Note the id is for the budget item
  deleteBudget: id => {
    return $.ajax({
      url: '/budget/' + id,
      type: 'DELETE'
    })
  },

  // * FLIGHT ROUTES

  // This route will return an array of objects displaying the 
  // cost of the flight and a link to purchase tickets
  // This data object will need the following key value pairs structured as shown below
  // flightClass: 'cabinClass=economy' note economy is an example
  // inboundDate: 'inboundDate=2019-09-10'
  // outboundDate: 'outboundDate=2019-09-01'
  // adults: 'adults=1' if there are more passengers replace 1 with that number
  // origin: 'originPlace=SFO-sky' note the only variable in this is the SFO. it is required to hvae originPlace= and -sky
  // destination: 'destinationPlace=SLC-sky' note the only variable in this is the SLC. it is required to hvae originPlace= and -sky
  getFlights: data => {
    return $.ajax({
      url: '/flights',
      type: 'POST',
      data: data
    })
  }

};

// * Master Trip Object
// **************************************************
let Trip = {
  title: undefined,
  location: undefined,
  startDate: undefined,
  endDate: undefined,
  itinerary: {
    days: undefined,
    events: undefined,
    bookedTimes: []
  },
  attendees: undefined,
  budget: {
    tripItems: [],
    dayItems: [],
    total: 0,
    dayAverage: undefined,
    budgetType: 0
  },

  packingList: undefined,
  flights: undefined,

  // * GET METHODS

  // This method will assign the trip title, location ect. to the object
  getGeneral: id => {
    API.getTrip(id).then(resp => {
      Trip.title = resp.title;
      Trip.location = resp.location;
      Trip.startDate = resp.startDate;
      Trip.endDate = resp.endDate;
    })
  },

  // This method will get all the tab/card info relevant to the trip and assign it to the object
  getTripInfo: (id) => {
    API.getTripInfo(id).then(resp => {
      Trip.itinerary.days = resp.days.date;
      Trip.itinerary.events = resp.days.dayPlan;
      Trip.addBookedTimes(resp.days.bookedTimes);
      Trip.packingList = resp.packing
      Trip.sortBudget(resp.budget.budgets);
      Trip.budget.total = resp.budget.total;
      console.log(Trip)
    })

  },

  // This method will get all the users attending the trip and assign it to the object
  getAttendees: (id) => {
    API.getAttendees(id).then(resp => {
      Trip.attendees = resp;
    })
  },

  getPackingList: id => {
    API.getPackingList(id).then(resp => {
      Trip.packingList = resp;
      console.log(Trip.packingList)
      Trip.displayPackingList()
    })
  },

  // This method will get all the days a user has added on the trip
  getDays: id => {
    API.getDays(id).then(resp => {
      Trip.itinerary.days = resp;
    })
  },

  // This method will get all the planned events
  getEvents: id => {
    API.getEvents(id).then(resp => {
      console.log(resp)
      Trip.itinerary.events = resp.days;
      Trip.itinerary.bookedTimes = resp.times;
      console.log(Trip.itinerary.events)
    })
  },

  // This method will get the total trip budget
  getTotalBudget: id => {
    API.getTripBudget(id).then(resp => {
      Trip.budget.dayAverage = undefined;
      Trip.sortBudget(resp.item);
      Trip.budget.total = resp.total;
      console.log(Trip.budget)
      console.log('adding total')
      Trip.renderTotal();
    })
  },

  getAllDaysBudget: id => {
    API.getAllDaysBudget(id).then(resp => {

      Trip.sortBudget(resp.item)
      Trip.budget.dayAverage = resp.average;
      Trip.budget.total = resp.total;
      console.log(Trip.budget)
    })
  },

  getFlights: data => {
    API.getFlights(data).then(resp => {
      Trip.flights = resp;
      console.log(Trip.flights)
    })
  },

  // * POST METHODS

  addDay: (data, id) => {
    API.addDay(data).then(resp => {
      console.log(resp);
      Trip.getDays(id);
    })
  },

  // This method will add a packing list item to the database and then call the getPackingList method to update the page
  addPackingItem: (data, id) => {
    API.addPackingList(data).then(resp => {
      console.log(resp);
      Trip.getPackingList(id)
    })
  },

  // This method will add an event to the database and then call the getEvents method to update the page
  addEvent: (data, id) => {
    var time = data.time;
    var dayId = data.dayId;
    Trip.validateEventTime(time, dayId, data, id);

  },

  // This method will add an item to the trip budget and then call the getTotalBudget method to update the page
  addTripBudget: (data, id) => {
    API.addTripBudget(data).then(resp => {
      console.log(resp)
      Trip.getTotalBudget(id);
    })
  },

  // This method will add a day budget item and then call the getAllDaysBudget method to update the page
  // Note we may want to add the ability to get the budget for a single day if they are on that days card 
  // because this will return all of the day budget items on the trip
  addDayBudget: (data, id) => {
    API.addDayBudget(data).then(resp => {
      console.log(resp);
      Trip.getTotalBudget(id)
    })
  },


  // * UPDATE METHODS

  // This method will update a packing list item and then call the getPackingList method to update the page
  updatePackingItem: (id, data, tripId) => {
    API.updatePackingList(id, data).then(resp => {
      console.log(resp)
      Trip.getPackingList(tripId)
    })
  },

  // This method will update an event and the call the getEvents method to update the page
  updateEventCol: (id, data, tripId) => {
    API.updateEventCol(id, data).then(resp => {
      console.log(resp);
      Trip.getEvents(tripId)
    })
  },

  // This method will update a budget item and then call the getTotalBudget method to update the page
  // I am thinking about adding another parameter to determine where on the page the user is updating
  // This would dictate whether I call the getTotalBudget or getAllDaysBudget
  updateBudget: (id, data, tripId) => {
    API.updateBudget(id, data).then(resp => {
      console.log(resp);
      Trip.filterBudgetType(Trip.budget.budgetType, tripId);
    })
  },

  // * DELETE METHODS

  // This method will delete a packing list item by id and then call the getPackingList method to update the page
  deletePackingItem: (id, tripId) => {
    API.deletePackingList(id).then(resp => {
      console.log(resp);
      Trip.getPackingList(tripId);
    })
  },

  // This method will delete an event by id and then call the getEvents method to update the page
  deleteEvent: (id, tripId) => {
    API.deleteEvent(id).then(resp => {
      console.log(resp);
      Trip.getEvents(tripId);
    })
  },

  // This method will delete a budget item by id and then call the getTotalBudget method to update the page
  // I am thinking about adding another parameter to determine where on the page the user is updating
  // This would dictate whether I call the getTotalBudget or getAllDaysBudget
  deleteBudgetItem: (id, tripId) => {
    API.deleteBudget(id).then(resp => {
      console.log(resp);
      Trip.getTotalBudget(tripId)
    })
  },


  // * RENDER METHODS

  displayPackingList: () => {
    let rowsToAdd = [];
    Trip.packingList.forEach(item => rowsToAdd.push(createListRow(item)));
    renderPackingList(rowsToAdd);
    $('#packing-item').val('');
  },

  displayItinerary: () => {
    let $daysCol = $('#days-column');
    $daysCol.empty();
    let days = buildDayArr()
    days.forEach(day => buildDayCard($daysCol, day));
  },

  displayTripBudget: (data) => {
    console.log('running')
    $('#trip-budget-items > tbody').empty();
    console.log(data)
    if (data.length) {
      for (var i = 0; i < data.length; i++) {
        var newRow = $("<tr>").append(
          $('<td>').text(data[i].item),
          $('<td>').text(data[i].cost)

        )
        newRow.append(`<td><a class="text-danger delete-budget-item"><i class="fas fa-trash-alt" data-itemId=${data[i].id}></i></a></td>`);

        $('#trip-budget-items > tbody').append(newRow)
      }

    } else {
      var newRow = $('<tr>').append(
        $('<td>').text('No items budgeted')
      )
      $('#trip-budget-items > tbody').append(newRow)
    }

  },

  displayDayBudget: (data) => {
    console.log(data)



    if (data.length) {
      console.log('display day working')
      for (var i = 0; i < data.length; i++) {
        $(`#day-budget-${data[i].dayId} > tbody`).empty();

        var newRow = $("<tr>").append(
          $('<td>').text(data[i].item),
          $('<td>').text(data[i].cost)

        )
        newRow.attr('id', `row-${data[i].id}`).append(`<td><a class="text-danger delete-budget-item"><i class="fas fa-trash-alt" data-itemId=${data[i].id}></i></a></td>`);

        $(`#day-budget-${data[i].dayId} > tbody`).append(newRow)
      }
    }

  },

  renderTotal: () => {
    return $('#budget-total').text(Trip.budget.total);

  },

  renderDayBudget: () => {

    for (var i = 0; i < Trip.itinerary.days.length; i++) {
      $(`#day-budget-${Trip.itinerary.days[i].dayId} > tbody`).empty();

      // console.log(Trip.itinerary.days[i].id)
      // console.log('working')
      var newRow = $('<tr>').append(
        $('<td>').text('No items budgeted')
      )
      $(`#day-budget-${Trip.itinerary.days[i].id} > tbody`).append(newRow)

    }
  },

  // * HELPER METHODS

  // This method will sort the budget responses by whether they are attached to a day
  sortBudget: data => {
    Trip.budget.dayItems = [];
    Trip.budget.tripItems = [];
    for (var i = 0; i < data.length; i++) {
      if (!(data[i].dayId === null)) {

        Trip.budget.dayItems.push(data[i])
        // console.log('sort day')
        // console.log(Trip.budget.dayItems)
      } else {
        Trip.budget.tripItems.push(data[i])
        // console.log('sort trip')
        // console.log(Trip.budget.tripItems)
      }
    }
    Trip.displayDayBudget(Trip.budget.dayItems)
    Trip.displayTripBudget(Trip.budget.tripItems)

  },

  // This method would be used on any post, update, delete budget methods. The data argument can be a number variable passed in depending on
  // where the user is interacting with the budget and will detemine which getMethod for the budget is called to update the page
  filterBudgetType: (data, tripId) => {
    switch (data) {
      case 1:
        Trip.getTotalBudget(tripId);
        break;
      case 2:
        Trip.getAllDaysBudget(tripId);
        break;
    }
  },

  addBookedTimes: (data) => {
    Trip.itinerary.bookedTimes = [];
    for (var i = 0; i < data.length; i++) {
      data[i].forEach(event => {
        Trip.itinerary.bookedTimes.push(event)
      })
    }
  },

  validateEventTime: (time, dayId, data, id) => {
    var times = [];
    for (var i = 0; i < Trip.itinerary.bookedTimes.length; i++) {
      if (Trip.itinerary.bookedTimes[i].dayId == dayId) {
        times.push(Trip.itinerary.bookedTimes[i].time);
      }
    }
    if (!(times.includes(time))) {
      API.addEvent(data).then(resp => {
        console.log(resp);
        Trip.getEvents(id);
      })
    } else {
      alert('You already have an event scheduled at this time')
    }
  },

  rangeOfDays: () => {
    let range = moment.range(Trip.startDate, Trip.endDate);
    let acc = Array.from(range.by('day', { step: 1 }));
    return acc.map(m => m.format('YYYY-MM-DD'));
  }

}

// * JQUERY FUNCTIONS
// Overivew Functions
// Function to populate attendees
const renderAttendees = () => {
  if (!Trip.attendees.length) {
    let foreverAlone = $('<div>').addClass('alert alert-warning');
    foreverAlone.text('Looks like no one has joined this trip yet.')
  } else {
    Trip.attendees.forEach(friend => {
      let $ameliaContainer = $('<div>').addClass('attendee m-3');
      let $amelia = $('<img>').attr('src', '/images/pilot.svg');
      $amelia.attr('alt', `${friend.firstName} ${friend.lastName}`);
      $amelia.data({
        'userId': friend.id,
      });
      let $caption = $('<p>').addClass('text-center').text(`${friend.firstName} ${friend.lastName}`);
      $ameliaContainer.append($amelia, $caption);
      $('#attendees').append($ameliaContainer);
    })
  }
}

const createAllDays = () => {
  let datesArr = Trip.rangeOfDays();
  if (datesArr[0] == Trip.itinerary.days[0].date) return;

  for (var i = 0; i < datesArr.length; i++) {
    Trip.addDay({
      date: datesArr[i], tripId: $id
    }, $id);
  }
};


// ! Packing List Click handlers

// Packing List form methods
const handlePackingFormSubmit = event => {
  event.preventDefault();

  if (!$('#packing-item').val().trim()) return;

  let data = {
    item: $('#packing-item').val().trim(),
    tripId: $id
  }

  Trip.addPackingItem(data, $id);
}

// Function to handle packing item checkbox click
const packedCheckHandler = function (event) {
  let itemId = $(this).data('itemid');
  let updatedData = {
    colName: 'completed',
    info: true
  }
  Trip.updatePackingItem(itemId, updatedData, $id);
}

// Function to handle packing item delete click
const deleteItemHandler = (event) => {
  let itemId = event.target.dataset.itemid

  Trip.deletePackingItem(itemId, $id);
}

// ! Packing Form Methods

// Function to create table row for Packing List
const createListRow = data => {
  let newRow = $('<tr>');
  newRow.data('packing-item-id', data.id);
  newRow.append(`<td>${data.item}</td>`);
  if (!data.completed) {
    newRow.append(`<td><input type="checkbox" class="form-control unpacked" data-itemId="${data.id}"></td>`)
  } else {
    newRow.append(`<td><input type="checkbox" class="form-control" data-itemId="${data.id}" checked disabled></td>`)
  }
  newRow.append(`<td><a class="text-danger delete-item"><i class="fas fa-trash-alt" data-itemId=${data.id}></i></a></td>`);

  return newRow;
}

// Function to render packing list table
const renderPackingList = rows => {
  $('#packingListBody').children().not(':last').remove();
  $('.alert').remove();
  if (rows.length) {
    $('#packingListBody').prepend(rows);
  } else {
    renderEmptyPklist();
  }
};

// Function to render alert if packing list is empty
const renderEmptyPklist = () => {
  let emptyMsg = $('<div>');
  emptyMsg.addClass('alert alert-danger');
  emptyMsg.text('Your packing list is currently empty!');
  $('#packing-list').append(emptyMsg);
}

// * ITINERARY FUNCTIONS
// *==================================================
// ! Itinerary click handlers

const staticAddEventHandler = function (event) {
  event.preventDefault();

  let formData = {
    title: $('#event-title').val().trim(),
    category: $('#event-category').val(),
    description: $('#event-desc').val().trim(),
    dayId: $('#event-day').val()
  }

  let $li = $('<li>').addClass('list-group-item').attr({ 'type': 'button', 'data-toggle': 'collapse', 'data-target': `#eventTest` });
  $li.text(`${formData.title}`);

  let $collapseContainer = $('<div>').addClass('collapse').attr('id', `eventTest`);

  let $collapseBody = $('<div>').addClass('card-body');
  $collapseBody.text(formData.description);
  $collapseContainer.append($collapseBody);
  $(`#${formData.dayId}`).append($li, $collapseContainer);

  // ! Clear Form
  $('#event-title').val('');
  $('#event-time').val('');
  $('#event-category').val('');
  $('#event-desc').val('');
  $('#event-day').val('');
  $('#event-budget').val('');

}

const addEventHandler = function (event) {

  event.preventDefault();

  // ! Format Data
  let formData = {
    // properties: title, time, category, description, dayId, tripId
    title: $('#event-title').val().trim(),
    time: moment($('#event-time').val(), 'hh:mm a').format('hh:mm a'),
    category: $('#event-category').val(),
    description: $('#event-desc').val().trim(),
    dayId: Number($('#event-day').val()),
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

  setTimeout(function () {
    Trip.getTripInfo($id);
    Trip.getAllDaysBudget($id);

    setTimeout(() => {
      Trip.displayItinerary();
    }, 500)

  }, 500);

}

const deleteEventHandler = (event) => {

  let eventId = event.target.dataset.eventid;
  Trip.deleteEvent(eventId, $id);

}


const buildDayArr = () => {
  // ! start building the array with the basic day data
  let days = Trip.itinerary.days;

  // ! hold all trip events somewhere
  let allEventArrs = Trip.itinerary.events;

  // ! add events to day object...
  days.forEach(day => {
    // ! in each day object, create an empty array bound to events property.
    day.events = [];

    // ! loop through all trip event arrays...
    allEventArrs.forEach(eventArr => {
      // ! and then every event in each array...
      eventArr.forEach(event => {
        // ! ...and push event into day events array if day id matches
        if (event.dayId === day.id) day.events.push(event);
      })
    })

    // ! bring in avgBudget
    day.avgBudget = Trip.budget.dayAverage;
  })

  return days
}

const buildDayCard = (container, dayObj) => {
  let $col = $('<div>').addClass('col');
  let $card = $('<div>').addClass('card day');

  let $cardHeader = $('<div>').addClass('card-header d-flex justify-content-between align-items-center');
  $cardHeader.text(moment(dayObj.date).format('dddd, MMMM DD'));
  let $avgBudget = $('<div>').addClass('badge badge-success badge-pill').text(`${dayObj.avgBudget} daily average`);
  $cardHeader.append($avgBudget);

  let $eventUl = $('<ul>').addClass('list-group list-group-flush');

  buildEventList($eventUl, dayObj.events);

  $card.append($cardHeader, $eventUl);

  $col.append($card);

  return container.append($col);
}

const buildEventList = (container, eventsArr) => {
  eventsArr.forEach(event => {
    let $li = $('<li>').addClass('list-group-item').attr({ 'type': 'button', 'data-toggle': 'collapse', 'data-target': `#event${event.id}` });
    $li.text(`${event.title} at ${event.time}`);

    let $collapseContainer = $('<div>').addClass('collapse').attr('id', `event${event.id}`);

    let $collapseBody = $('<div>').addClass('card-body');
    if (event.description) $collapseBody.text(event.description);

    $collapseContainer.append($collapseBody);
    container.append($li, $collapseContainer)
  })
}

// ***************************************************
// code for the budget tab

function renderModal() {
  var days = Trip.itinerary.days;

  for (var i = 0; i < days.length; i++) {
    var day = moment(days[i].date).format('dddd, MMMM Do YYYY');
    var option = $('<option>').attr('data-id', days[i].id).text(day)
    option.val(day)
    $('#day-select').append(option);

  }

}

function addBudgetItem(data) {
  console.log(data)

  if (!(data.dayId === null)) {
    Trip.addDayBudget(data, $id)
  } else {
    Trip.addTripBudget(data, $id)
  }
}

function searchFlight(data) {
  Trip.getFlights(data)
}


function deleteBudgetItem(event) {
  let itemId = event.target.dataset.itemid;
  console.log(itemId)
  $(`#row-${itemId}`).html('<td> No items budgeted </td>')
  Trip.deleteBudgetItem(itemId, $id);
}

function dayHandler() {
  console.log('working')
  $('#day-select').find(':selected').val($(this).data('date'));
}


function renderBudgetDays() {
  var days = Trip.itinerary.days;



  for (var i = 0; i < days.length; i++) {
    var day = moment(days[i].date).format('dddd, MMMM Do YYYY');
    var card = $('<div>').addClass('card');
    var cardHeader = $('<div>').addClass('card-header').attr("id", days[i].id);
    var head = $(`<h2 class="d-inline">  <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${days[i].id}" aria-expanded="false">` + day + `</h2>  <a class="open-modal float-right" data-date="${day}" data-target="#add-budget" data-toggle="modal"> <i class="far fa-plus-square mb-3" style="font-size: 2rem"> </i> </a>`);

    var div = $('<div>').addClass("collapse").attr("id", `collapse${days[i].id}`).attr("data-parent", "#day-budget")
    var body = $('<div>').addClass("card-body")
    var budgetItems = $('<table>').addClass('table bg-light shadow-lg p-3 mb-2 bg-white rounded').attr('id', `day-budget-${days[i].id}`);
    var tableHead = $('<thead>').addClass('border-bottom text-white mb-3 border-dark bg-success rounded');
    var tr = $('<tr> <th scope="col"> Item </th> <th scope="col"> Cost </th> <th scope="col"> </th>');
    var tbody = $('<tbody>');
    tableHead.append(tr);
    budgetItems.append(tableHead).append(tbody)
    body.append(budgetItems)
    div.append(body)
    cardHeader.append(head)
    card.append(cardHeader).append(div)

    $('#day-budget').append(card)

  }

}




// * ON LOAD
// * Initialize Object Data
// ***************************************************

Trip.getGeneral($id);
Trip.getTripInfo($id);
Trip.getAttendees($id);
Trip.getAllDaysBudget($id);


$(function () {

  // ! This is a quick and dirty trick to get around the async problem.
  $('body').toggle()
  setTimeout(function () {
    $('body').fadeIn('slow');

    $("#invite-link").val(window.location.href);
    $('.trip-title').text(Trip.title);
    $('.trip-location').text(Trip.location);
    $('#trip-dates').text(`${moment(Trip.startDate).format("MMMM DD")} to ${moment(Trip.endDate).format("MMMM DD, YYYY")}`)
    renderAttendees();
    createAllDays();
    Trip.displayPackingList();
    renderModal();
    Trip.getTotalBudget();
    Trip.displayItinerary();

    // Click listener for Add Packing Item Button
    $('#add-packing-item').on('click', handlePackingFormSubmit);
    $(document).on('click', '.unpacked', packedCheckHandler);
    $(document).on('click', '.delete-item', deleteItemHandler);
    $(document).on('click', '.delete-budget-item', deleteBudgetItem)

    // Click listener for Add Event
    $('#add-event').on('click', staticAddEventHandler);
    $(document).on('click', '.delete-button', deleteEventHandler);

    $(document).on('click', '#submit-budget-item', function (event) {
      console.log($('#day-select'))
      var data = {
        item: $('#budget-name').val().trim(),
        cost: $('#budget-cost').val().trim(),
        dayId: $('#day-select').find(":selected").attr('data-id'),
        tripId: $id
      }

      if (data.dayId === 'None') {
        data.dayId = null;
      }
      console.log(data)
      addBudgetItem(data);
    })

    $('.open-modal').click(() => {
      $('#add-budget').modal();
    })

  }, 1000)
});