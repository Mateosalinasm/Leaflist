const express = require('express');
const router = express.Router()
const { google } = require('googleapis')
const { OAuth2Client } = require('google-auth-library')

const { OAuth2 } = google.auth

const oAuth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET)

oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})

const calendar = google.calendar({ version: 'v3', auth: OAuth2Client})

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



module.exports = router