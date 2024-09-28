/**
 * Type definitions for the OpenWeather One Call API
 *
 * Original source: https://gist.github.com/TheJoeFin/5d9be4cb2d5ca0136021cb9ce2a9c9e5
 * Author: Joseph Finney (TheJoeFin) | https://github.com/TheJoeFin
 * Retrieved on: 2024-09-23
 *
 * Changes from original:
 * - Properties within interfaces alphabetized for easier reference
 * - Converted everything to `interfaces` for consitency
 * - Added `OpenWeatherAPI` interface
 * - Abstracted a `Location` interface from OneCallResponse and extended it
 * - Added type Direct Geocoding API
 * - Added a `Unit` type
 */

export type Unit = 'imperial' | 'metric' | 'standard'

export interface OpenWeatherAPI {
	data?: OneCallResponse | {}
	error?: string
	loading: boolean
}

export interface OneCallResponse extends Location {
	alerts: Alert[]
	current: CurrentWeather
	daily: Daily[]
	hourly: Hourly[]
	minutely: Minutely[]
}

export interface Location {
	lat: number
	lon: number
	timezone_offset: number
	timezone: string
}

export interface CurrentWeather {
	clouds: number
	dew_point: number
	dt: number
	feels_like: number
	humidity: number
	pressure: number
	rain?: rain1hr
	snow?: snow1hr
	sunrise: number
	sunset: number
	temp: number
	uvi: number
	visibility: number
	weather: Weather[]
	wind_deg: number
	wind_gust?: number
	wind_speed: number
}

export interface rain1hr {
	'1h': number // rain volume in mm
}

export interface snow1hr {
	'1h': number // snow volume in mm
}

export interface Weather {
	description: string
	icon: string
	id: number
	main: string
}

export interface Minutely {
	dt: number
	precipitation: number
}

export interface Hourly {
	clouds: number
	dew_point: number
	dt: number
	feels_like: number
	humidity: number
	pop: number
	pressure: number
	rain?: rain1hr
	snow?: snow1hr
	temp: number
	uvi: number
	visibility: number
	weather: Weather[]
	wind_deg: number
	wind_gust?: number
	wind_speed: number
}

export interface Daily {
	clouds: number
	dew_point: number
	dt: number
	feels_like: DayFeelsLike
	humidity: number
	moon_phase: number
	moonrise: number
	moonset: number
	pop: number
	pressure: number
	rain?: number // rain volume in mm
	snow?: number // snow volume in mm
	summary: string
	sunrise: number
	sunset: number
	temp: DayTemp
	uvi: number
	weather: Weather[]
	wind_deg: number
	wind_gust?: number
	wind_speed: number
}

export interface DayTemp {
	day: number
	eve: number
	max: number
	min: number
	morn: number
	night: number
}

export interface DayFeelsLike {
	day: number
	eve: number
	morn: number
	night: number
}

export interface Alert {
	description: string
	end: number
	event: string
	sender_name: string
	start: number
	tags: string[]
}

export interface DirectGeocodingResponse {
	country: string
	lat: number
	local_names?: LocalNames
	lon: number
	name: string
	state?: string
}

export interface LocalNames {
	[languageCode: string]: string | undefined
	ascii?: string
	feature_name?: string
}

/*
Example response from OpenWeather API one call 3.0:
https://openweathermap.org/api/one-call-3
{
   "lat":33.44,
   "lon":-94.04,
   "timezone":"America/Chicago",
   "timezone_offset":-18000,
   "current":{
      "dt":1684929490,
      "sunrise":1684926645,
      "sunset":1684977332,
      "temp":292.55,
      "feels_like":292.87,
      "pressure":1014,
      "humidity":89,
      "dew_point":290.69,
      "uvi":0.16,
      "clouds":53,
      "visibility":10000,
      "wind_speed":3.13,
      "wind_deg":93,
      "wind_gust":6.71,
      "weather":[
         {
            "id":803,
            "main":"Clouds",
            "description":"broken clouds",
            "icon":"04d"
         }
      ]
   },
   "minutely":[
      {
         "dt":1684929540,
         "precipitation":0
      },
      ...
   ],
   "hourly":[
      {
         "dt":1684926000,
         "temp":292.01,
         "feels_like":292.33,
         "pressure":1014,
         "humidity":91,
         "dew_point":290.51,
         "uvi":0,
         "clouds":54,
         "visibility":10000,
         "wind_speed":2.58,
         "wind_deg":86,
         "wind_gust":5.88,
         "weather":[
            {
               "id":803,
               "main":"Clouds",
               "description":"broken clouds",
               "icon":"04n"
            }
         ],
         "pop":0.15
      },
      ...
   ],
   "daily":[
      {
         "dt":1684951200,
         "sunrise":1684926645,
         "sunset":1684977332,
         "moonrise":1684941060,
         "moonset":1684905480,
         "moon_phase":0.16,
         "summary":"Expect a day of partly cloudy with rain",
         "temp":{
            "day":299.03,
            "min":290.69,
            "max":300.35,
            "night":291.45,
            "eve":297.51,
            "morn":292.55
         },
         "feels_like":{
            "day":299.21,
            "night":291.37,
            "eve":297.86,
            "morn":292.87
         },
         "pressure":1016,
         "humidity":59,
         "dew_point":290.48,
         "wind_speed":3.98,
         "wind_deg":76,
         "wind_gust":8.92,
         "weather":[
            {
               "id":500,
               "main":"Rain",
               "description":"light rain",
               "icon":"10d"
            }
         ],
         "clouds":92,
         "pop":0.47,
         "rain":0.15,
         "uvi":9.23
      },
      ...
   ],
    "alerts": [
    {
      "sender_name": "NWS Philadelphia - Mount Holly (New Jersey, Delaware, Southeastern Pennsylvania)",
      "event": "Small Craft Advisory",
      "start": 1684952747,
      "end": 1684988747,
      "description": "...SMALL CRAFT ADVISORY REMAINS IN EFFECT FROM 5 PM THIS\nAFTERNOON TO 3 AM EST FRIDAY...\n* WHAT...North winds 15 to 20 kt with gusts up to 25 kt and seas\n3 to 5 ft expected.\n* WHERE...Coastal waters from Little Egg Inlet to Great Egg\nInlet NJ out 20 nm, Coastal waters from Great Egg Inlet to\nCape May NJ out 20 nm and Coastal waters from Manasquan Inlet\nto Little Egg Inlet NJ out 20 nm.\n* WHEN...From 5 PM this afternoon to 3 AM EST Friday.\n* IMPACTS...Conditions will be hazardous to small craft.",
      "tags": [
      ]
    },
    ...
  ]
*/
