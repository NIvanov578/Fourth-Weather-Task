import { useState, useCallback, useEffect } from "react";
import axios, { AxiosError } from 'axios';
import { ForecastResponse, City, DateDayMap, ErrorResponse } from "../model";
import { useLocation } from "./useLocation.hook";
import { groupByDate } from '../utils/groupByDate';

type UseWeatherResult = Readonly<{
    isLoading: boolean,
    error: string,
    daysByDate: DateDayMap,
    city: City,
}>

type UseWeather = (city: string) => UseWeatherResult;

export const useWeather: UseWeather  = (cityName) => {
    const { latitude, longitude, error: locationError } = useLocation();
    const [city, setCity] = useState<City>({} as City);
    const [daysByDate, setGroupByDate] = useState<DateDayMap>({} as DateDayMap)
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(locationError);

    const fetchWeatherByLocation = useCallback(async () => {
        if (latitude && longitude) {
            setLoading(true);

            try {
                const { data: response } = await axios.get<ForecastResponse>(`https://api.${process.env.REACT_APP_URL}/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`);
                setGroupByDate(response.list.reduce(groupByDate, {} as DateDayMap));
                setCity(response.city);
              } catch (error) {
                const err = error as AxiosError;
                const data = (err.response?.data as ErrorResponse)
                setError(data?.message || err.message)
              }
              setLoading(false);  
        }
    }, [latitude, longitude]);

    const fetchWeatherByCity = useCallback(async () => {
        if (cityName) {
            setLoading(true);

            try {
                const { data: response } = await axios.get<ForecastResponse>(`https://api.${process.env.REACT_APP_URL}/data/2.5/forecast?q=${cityName}&units=metric&appid=${process.env.REACT_APP_API_KEY}`);
                setGroupByDate(response.list.reduce(groupByDate, {} as DateDayMap));
                setCity(response.city);
              } catch (error) {
                const err = error as AxiosError;
                const data = (err.response?.data as ErrorResponse)

                setError(data?.message || err.message)
              }
              setLoading(false); 
        }
         
    }, [cityName]);

    useEffect(()=> {
         fetchWeatherByLocation();
    },[fetchWeatherByLocation])

    useEffect(()=> {
        setError('');
        setGroupByDate({});
        setCity({} as City);
        fetchWeatherByCity();
    },[fetchWeatherByCity]);

    return {
        isLoading,
        error,
        city,
        daysByDate
    }
}

