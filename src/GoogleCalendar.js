import React, { useEffect } from 'react';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar";

function GoogleCalendar() {
  useEffect(() => {
    function handleClientLoad() {
      if (window.gapi) {
        window.gapi.load('client:auth2', initClient);
      } else {
        console.error('Google API library not loaded');
      }
    }

    function initClient() {
      window.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then(() => {
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        
        const authorizeButton = document.getElementById('authorize_button');
        const signoutButton = document.getElementById('signout_button');
        const addEventButton = document.getElementById('add_event_button');
        
        if (authorizeButton) {
          authorizeButton.onclick = handleAuthClick;
        }
        if (signoutButton) {
          signoutButton.onclick = handleSignoutClick;
        }
        if (addEventButton) {
          addEventButton.onclick = addEvent;
        }
      }).catch((error) => {
        console.error('Error initializing Google API client:', JSON.stringify(error, null, 2));
      });
    }

    function updateSigninStatus(isSignedIn) {
      const authorizeButton = document.getElementById('authorize_button');
      const signoutButton = document.getElementById('signout_button');
      const addEventButton = document.getElementById('add_event_button');

      if (authorizeButton) {
        authorizeButton.style.display = isSignedIn ? 'none' : 'block';
      }
      if (signoutButton) {
        signoutButton.style.display = isSignedIn ? 'block' : 'none';
      }
      if (addEventButton) {
        addEventButton.style.display = isSignedIn ? 'block' : 'none';
      }
    }

    function handleAuthClick() {
      window.gapi.auth2.getAuthInstance().signIn();
    }

    function handleSignoutClick() {
      window.gapi.auth2.getAuthInstance().signOut();
    }

    function addEvent() {
      const event = {
        'summary': 'Sample Event',
        'description': 'A description of the event.',
        'start': {
          'dateTime': '2024-07-28T09:00:00-07:00',
          'timeZone': 'America/Los_Angeles'
        },
        'end': {
          'dateTime': '2024-07-28T10:00:00-07:00',
          'timeZone': 'America/Los_Angeles'
        }
      };

      if (window.gapi && window.gapi.client && window.gapi.client.calendar) {
        const request = window.gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event
        });

        request.execute((event) => {
          if (event.error) {
            console.error('Error creating event:', event.error);
          } else {
            console.log('Event created: ' + event.htmlLink);
          }
        });
      } else {
        console.error('Google API client not initialized or calendar API not loaded.');
      }
    }

    handleClientLoad();
  }, []);

  return (
    <div>
      <button id="authorize_button" style={{ display: 'none' }}>Authorize</button>
      <button id="signout_button" style={{ display: 'none' }}>Sign Out</button>
      <button id="add_event_button" style={{ display: 'none' }}>Add Event</button>
    </div>
  );
}

export default GoogleCalendar;
