const express = require('express');
const router = express.Router()
const { google } = require('googleapis')
const { OAuth2Client } = require('google-auth-library')

const { OAuth2 } = google.auth

require('dotenv').config();

const SCOPES = 'https://www.googleapis.com/auth/calendar';
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY
const GOOGLE_PROJECT_NUMBER = process.env.GOOGLE_PROJECT_NUMBER
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
// const calendar = google.calendar({version: 'v3'})

// const auth = new google.auth.JWT(
//     CREDENTIALS.client_email,
//     null,
//     CREDENTIALS.private_key,
//     SCOPES
// )

router.get('/calendar', (req, res) => {
const jwtClient = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    null,
    GOOGLE_PRIVATE_KEY,
    SCOPES
)})
// Provide the required configuration
const oAuth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET)

oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const calendar = google.calendar({ version: 'v3', auth: process.env.API_KEY})

const eventStartTime = new Date()
eventStartTime.setDate(eventStartTime.getDay() + 2)

const eventEndTime = new Date()
eventEndTime.setDate(eventEndTime.getDay() + 2)
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

const event = {
    summary: 'Meet with David',
    location: '11611 Katy Fwy, Houston, TX 77079',
    description: 'Meeting with David to talk about the new client project ad how to add the google calendar API',
    start: {
        dateTime: eventStartTime,
        timeZone: 'America/Houston'
    },
    end: {
        dateTime: eventEndTime,
        timeZone: 'America/Houston'
    },
    colorId: 1, 

}

calendar.freebusy.query(
    {
        resource: {
            timeMin: eventStartTime,
            timeMax: eventEndTime,
            timeZone: 'America/Houston',
            items: [{id: 'primary'}],
        },
    }, 
    (err, res)  => {
        if (err) return console.log('Free Busy Query Error: ', err);

        const eventsArr = res.data.calendars.primary.busy

        if(eventsArr.length === 0) return calendar.events.insert({calendarId: 'primary', resource: event}, 
        err => {
            if (err) return console.error('Calendar Event Creation Error: ', err);

            return console.log('Calendar Event Created.');
        })
    return console.log('Sorry I\'m busy');
    }
)





// const calendar = google.calendar({
//     version: 'v3',
//     project: GOOGLE_PROJECT_NUMBER,
//     auth: jwtClient
// });

// calendar.events.list({
//     calendarId: GOOGLE_CALENDAR_ID,
//     timeMin: (new Date()).toISOString(),
//     maxResults: 10,
//     singleEvents: true,
//     orderBy: 'startTime',
// }, (error, result) => {
//     if (error) {
//     res.send(JSON.stringify({ error: error }));
//     } else {
//     if (result.data.items.length) {
//         res.send(JSON.stringify({ events: result.data.items }));
//     } else {
//         res.send(JSON.stringify({ message: 'No upcoming events found.' }));
//     }
//     }
// });
// });

module.exports = router