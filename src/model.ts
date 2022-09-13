type Coordinate = Readonly<{
    lat: number,
    lon: number
}>

export type City =  Readonly<{
    id: number,
    name: string,
    country: string,
    population:number,
    sunrise:number,
    sunset:number,
    timezone: number,
    coord: Coordinate,
}>

type Clouds = Readonly<{
    all: number,
}>

type Sys = Readonly<{
    pod: string
 }>
 
 export type Weather = Readonly<{
     description: string,
     icon:string,
     id: number,
     main: string
 }>
 
 type Wind = Readonly<{
     speed: number,
     deg: number,
     gust: number,
 }>
type Rain = Readonly<{
    [key:string]: number
}>
 export type DaySettings = Readonly<{
     feels_like: number,
     grnd_level: number,
     humidity: number,
     pressure: number,
     sea_level: number,
     temp: number,
     temp_kf: number,
     temp_max: number,
     temp_min: number,
 }>

export type Day = Readonly<{
    clouds: Clouds,
    dt: number,
    dt_txt: string,
    pop: number,
    visibility: number,
    main: DaySettings,
    sys: Sys,
    weather: Weather[],
    wind: Wind,
    rain?: Rain
}>


export type ForecastResponse = Readonly<{
    cnt: number,
    cod: string,
    message: number,
    city: City
    list: Day[],
}>

export type Forecast = Omit<ForecastResponse, 'cod' | 'message' | 'cnt'>


export enum Week {
    Sunday = 0,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
}


export interface Map {
    [key: string]: string
}


export interface DateDayMap  {
    [key: string]: {
        [key: string]: Day,
    }
  }

export interface ErrorResponse {
    cod: string,
    message: string,
}

export interface ProcessEnv {
    [key: string]: string | undefined
}