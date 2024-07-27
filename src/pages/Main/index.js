import { useState } from 'react';

const Main = () => {
    const [isStartHovered, setIsStartHovered] = useState(false);
    const [isStartSmallHovered, setIsStartSmallHovered] = useState(false);
    const [isGoogleCalendarConnected, setIsGoogleCalendarConnected] = useState(false);

    const handleConnectToGoogleCalendar = () => {
        // Initialize Google API client
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
                clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
                scope: "https://www.googleapis.com/auth/calendar"
            }).then(() => {
                const authInstance = window.gapi.auth2.getAuthInstance();
                if (!authInstance.isSignedIn.get()) {
                    authInstance.signIn().then(() => {
                        setIsGoogleCalendarConnected(true);
                    });
                } else {
                    setIsGoogleCalendarConnected(true);
                }
            });
        });
    };

    const handleExportToGoogleCalendar = () => {
        if (!isGoogleCalendarConnected) {
            alert("Please connect to Google Calendar first.");
            return;
        }

        // Initialize Google Calendar API
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
                clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
                scope: "https://www.googleapis.com/auth/calendar"
            }).then(() => {
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

                window.gapi.auth2.getAuthInstance().signIn().then(() => {
                    const request = window.gapi.client.calendar.events.insert({
                        'calendarId': 'primary',
                        'resource': event
                    });

                    request.execute((event) => {
                        console.log('Event created: ' + event.htmlLink);
                    });
                });
            });
        });
    };

    return (
        <>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
            </style>

            <div
                style={{
                    height: 'fit-content',
                    borderBottom: '1px solid #000',
                }}
            >
                <div
                    style={{
                        marginLeft: 16,
                    }}
                >
                    <p
                        style={{
                            margin: 0,
                            marginTop: 2,
                            fontSize: 45,
                            fontWeight: 'bold',
                            fontFamily: 'Open sans'
                        }}
                    >
                        Timescribe
                    </p>
                    <p
                        style={{
                            marginLeft: 6,
                            marginTop: 4,
                            marginBottom: 10,
                            fontSize: 20,
                            fontFamily: 'Open sans'
                        }}
                    >
                        A tool for organization and workflow efficiency.
                    </p>
                </div>
            </div>

            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        display: 'block',
                        textAlign: 'center',
                    }}
                >
                    <p
                        style={{
                            marginLeft: 6,
                            marginTop: 20,
                            marginBottom: 20,
                            fontWeight: 'bold',
                            fontSize: 30,
                            fontFamily: 'Open sans'
                        }}
                    >
                        You have no currently timescribed events or meetings.
                    </p>

                    <button
                        style={{
                            fontWeight: 'bold',
                            fontSize: 50,
                            fontFamily: 'Open sans',
                            paddingLeft: 64,
                            paddingRight: 64,
                            paddingTop: 8,
                            paddingBottom: 8,
                            backgroundColor: isStartHovered ? '#6ad4dd' : '#0f6cbd',
                            cursor: isStartHovered ? 'pointer' : 'auto',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 16,
                            transition: 'all 0.25s ease-out',
                        }}
                        onMouseEnter={() => setIsStartHovered(true)}
                        onMouseLeave={() => setIsStartHovered(false)}
                    >
                        Start Scribing
                    </button>
                </div>
            </div>

            <div
                style={{
                    position: 'fixed',
                    width: '100%',
                    bottom: 0,
                    left: 0,
                    backgroundColor: '#7aa2e3',
                    height: 50,
                    padding: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div>
                    <button
                        style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            height: 50,
                            fontFamily: 'Open sans',
                            backgroundColor: '#7aa2e3',
                            color: '#fff',
                            border: '1px solid #fff',
                            marginRight: 'auto',
                            cursor: isStartSmallHovered ? 'pointer' : 'auto',
                        }}
                        onMouseEnter={() => setIsStartSmallHovered(true)}
                        onMouseLeave={() => setIsStartSmallHovered(false)}
                    >
                        Start Scribing
                    </button>
                </div>

                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'right',
                        justifyContent: 'right',
                        gap: 8,
                        paddingRight: 16,
                    }}
                >
                    <button
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            height: 50,
                            fontFamily: 'Open sans',
                            backgroundColor: '#fff',
                            color: '#000',
                            border: '1px solid #fff',
                            cursor: isStartSmallHovered ? 'pointer' : 'auto',
                        }}
                        onMouseEnter={() => setIsStartSmallHovered(true)}
                        onMouseLeave={() => setIsStartSmallHovered(false)}
                        onClick={handleConnectToGoogleCalendar}
                    >
                        Connect to Google Calendar
                    </button>
                    <button
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            height: 50,
                            fontFamily: 'Open sans',
                            backgroundColor: '#fff',
                            color: '#000',
                            border: '1px solid #fff',
                            cursor: isStartSmallHovered ? 'pointer' : 'auto',
                        }}
                        onMouseEnter={() => setIsStartSmallHovered(true)}
                        onMouseLeave={() => setIsStartSmallHovered(false)}
                        onClick={handleExportToGoogleCalendar}
                    >
                        Export to Google Calendar
                    </button>
                </div>
            </div>
        </>
    );
};

export default Main;
