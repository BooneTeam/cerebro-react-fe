var config = require('./config.js');
/* eslint-disable no-console */
/* eslint-disable no-undef */
var Client = function () {
    function getFurthestActivities(success) {
        return fetch(config.backend + 'api/activities/furthest', {
            headers: {
                Accept: 'application/json',
            },
        }).then(checkStatus)
            .then(parseJSON)
            .then(success);
    }

    function getActivitiesByPerson(data, success) {

        var query = $.param(data);
        return fetch(config.backend + 'api/activities?' + query, {
            method: 'get',
            headers: {
                Accept: 'application/json',
            }
        }).then(checkStatus)
            .then(parseJSON)
            .then(success)
    }

    function getActivitiesByQuery(data, success) {

        var query = $.param(data);
        return fetch(config.backend + 'api/activities?' + query, {
            method: 'get',
            headers: {
                Accept: 'application/json',
            },
        }).then(checkStatus)
            .then(parseJSON)
            .then(success)
    }

    function getCohorts(data, success) {
        var query = $.param(data);
        return fetch(config.backend + 'api/activities/cohorts' + query, {
            method: 'get',
            headers: {
                Accept: 'application/json',
            },
        }).then(checkStatus)
            .then(parseJSON)
            .then(success)
    }

    function getFurthestActivitiesByCohort(data, success) {

        var query = $.param(data);
        return fetch(config.backend + 'api/activities?' + query, {
            method: 'get',
            headers: {
                Accept: 'application/json',
            },
        }).then(checkStatus)
            .then(parseJSON)
            .then(success)
    }


    function getActivities(success) {
        return fetch(config.backend + 'api/activities', {
            headers: {
                Accept: 'application/json'
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
            const error = new Error('HTTP Error' + response.statusText);
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
        getActivities: getActivities,
        getCohorts: getCohorts,
        getActivitiesByQuery: getActivitiesByQuery,
        getFurthestActivitiesByCohort: getFurthestActivitiesByCohort,
        getActivitiesByPerson: getActivitiesByPerson,
        getFurthestActivities: getFurthestActivities,
        createTimer: createTimer,
        updateTimer: updateTimer,
        startTimer: startTimer,
        stopTimer: stopTimer,
        deleteTimer: deleteTimer
    };
};

module.exports = Client();
