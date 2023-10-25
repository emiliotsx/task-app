import { Injectable, NgZone, OnInit } from '@angular/core';

declare const gapi: any; // Puedes seguir usando gapi para las nuevas bibliotecas
declare const google: any; // Puedes seguir usando gapi para las nuevas bibliotecas

@Injectable({
  providedIn: 'root',
})
export class GoogleCalendarService implements OnInit {

  private CLIENT_ID = '376639665248-l60bh6fgi095nijdsi7ue6u30ut1nn8f.apps.googleusercontent.com'
  private API_KEY = 'AIzaSyC4LoUpSUUpfuCTrsGp8PU7FVvGhMt4m5g'
  private DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
  private SCOPES = 'https://www.googleapis.com/auth/calendar'
  private GAPI: any

  private tokenClient: any

  constructor(private ngZone: NgZone) {

  }

  async ngOnInit(): Promise<void> {
    await this._init()
  }

  async _init() {
    await this.gapiLoaded()
    await this.gisLoaded()
    this.handleAuthClick()
    console.log('-- INIT-FIN --')
  }

  /**
     * Callback after api.js is loaded.
     */
  async gapiLoaded() {
    await gapi.load('client:auth2', this.initializeGapiClient);
  }

  /**
   * Callback after the API client is loaded. Loads the
   * discovery doc to initialize the API.
   */
  async initializeGapiClient() {
    await gapi.client.init({
      apiKey: this.API_KEY,
      discoveryDocs: [this.DISCOVERY_DOC],
    });
  }

  /**
     * Callback after Google Identity Services are loaded.
     */
  async gisLoaded() {
    this.tokenClient = await google.accounts.oauth2.initTokenClient({
      client_id: this.CLIENT_ID,
      scope: this.SCOPES,
      callback: '', // defined later
    });
  }

  /**
     *  Sign in the user upon button click.
     */
  handleAuthClick() {
    this.tokenClient.callback = async (resp: any) => {
      console.log('resp', resp)
      if (resp.error !== undefined) {
        throw (resp);
      }
      // await this.listUpcomingEvents();
    };
    this.GAPI = gapi
    console.log('-----handleAuthClick - gapi', gapi)
    console.log('handleAuthClick - gapi', this.GAPI['client'])
    if (gapi.client.getToken()) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      console.log('== handleAuthClick - IF ==', this.tokenClient)
      this.tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      console.log('== handleAuthClick - ELSE ==', this.tokenClient)
      // Skip display of account chooser and consent dialog for an existing session.
      this.tokenClient.requestAccessToken({ prompt: '' });
    }
  }

  async createEvent(eventDetails: any) {
    await this._init()
    const event = {
      'summary': 'Google I/O 2015',
      'location': '800 Howard St., San Francisco, CA 94103',
      'description': 'A chance to hear more about Google\'s developer products.',
      'start': {
        'dateTime': '2023-10-27T09:00:00-07:00',
        'timeZone': 'America/Los_Angeles'
      },
      'end': {
        'dateTime': '2023-010-27T17:00:00-07:00',
        'timeZone': 'America/Los_Angeles'
      },
      // 'recurrence': [
      //   'RRULE:FREQ=DAILY;COUNT=2'
      // ],
      'attendees': [
        { 'email': 'kgarciac6@miumg.edu.gt' },
      ],
      'reminders': {
        'useDefault': false,
        'overrides': [
          { 'method': 'email', 'minutes': 24 * 60 },
          { 'method': 'popup', 'minutes': 10 }
        ]
      }
    };

    const request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event
    });

    request.execute(function (event: any) {
      console.log('Event created: ' + event.htmlLink);
    });
  }

}
