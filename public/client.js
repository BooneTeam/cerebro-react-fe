/* eslint-disable no-console */
/* eslint-disable no-undef */
window.client = (function () {
  function getFurthestActivities(success) {
    return fetch('http://localhost:9000/api/activities/furthest', {
      headers: {
        Accept: 'application/json',
      },
    }).then(checkStatus)
      .then(parseJSON)
      .then(success);
  }

  function getActivitiesByPerson(data,success){

    var query = $.param( data );
    return fetch('http://localhost:9000/api/activities?' + query, {
      method:'get',
      headers: {
        Accept: 'application/json',
      },
    }).then(checkStatus)
        .then(parseJSON)
        .then(success)
  }

  function getActivitiesByQuery(data,success){

    var query = $.param( data );
    return fetch('http://localhost:9000/api/activities?' + query, {
      method:'get',
      headers: {
        Accept: 'application/json',
      },
    }).then(checkStatus)
        .then(parseJSON)
        .then(success)
  }
  
  function getCohorts(data,success){
    var query = $.param( data );
    return fetch('http://localhost:9000/api/activities/cohorts' + query, {
      method:'get',
      headers: {
        Accept: 'application/json',
      },
    }).then(checkStatus)
        .then(parseJSON)
        .then(success)
  }

  function getFurthestActivitiesByCohort(data,success){

    var query = $.param( data );
    return fetch('http://localhost:9000/api/activities?' + query, {
      method:'get',
      headers: {
        Accept: 'application/json',
      },
    }).then(checkStatus)
        .then(parseJSON)
        .then(success)
  }


  function getActivities(success) {
    return fetch('http://localhost:9000/api/activities', {
      headers: {
        Accept: 'application/json',
      },
    }).then(checkStatus)
        .then(parseJSON)
        .then(success);
  }

  function createTimer(data) {
    return fetch('/api/timers', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(checkStatus);
  }

  function updateTimer(data) {
    return fetch('/api/timers', {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(checkStatus);
  }

  function deleteTimer(data) {
    return fetch('/api/timers', {
      method: 'delete',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(checkStatus);
  }

  function startTimer(data) {
    return fetch('/api/timers/start', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(checkStatus);
  }

  function stopTimer(data) {
    return fetch('/api/timers/stop', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(checkStatus);
  }

  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      console.log(error);
      throw error;
    }
  }

  function parseJSON(response) {
    return response.json();
  }

  return {
    getActivities,
    getCohorts,
    getActivitiesByQuery,
    getFurthestActivitiesByCohort,
    getActivitiesByPerson,
    getFurthestActivities,
    createTimer,
    updateTimer,
    startTimer,
    stopTimer,
    deleteTimer,
  };
}());
