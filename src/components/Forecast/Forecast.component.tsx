import React, {useState, useCallback} from 'react';
import { debounce } from 'lodash';
import Days from '../Days/Days.component';
import Error from '../Error/Error.component';
import Spinner from '../Spinner/Spinner.component';
import { useWeather } from '../../hooks/useWeather.hook';
import { Styled } from './Forecast.styles';


const Forecast: React.FC<{}> = ()=> {
    const [cityName, setCityName] = useState('');
    const { isLoading, error, city, daysByDate } = useWeather(cityName);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement> ) => { 
        const cityName = event.target.value;
        if (event.target.value !== city.name) {
            setCityName(cityName);
        }
    };

    const debouncedChangeHandler = useCallback(
        debounce(changeHandler, 500)
      , []);

    const renderForecast = !isLoading && !error && Object.keys(daysByDate).length > 0;

    return (
            <Styled.Wrapper >   
                <Styled.Input 
                    onChange={debouncedChangeHandler} 
                    type="text" 
                    placeholder="Type a city"
                />
                {error && <Error error={error} />}
                <Spinner isLoading={isLoading} />
                { renderForecast && 
                <>
                    <h1>{city?.name}</h1>
                    <Days 
                        daysByDate={daysByDate}
                    />
                </>
                }
            </Styled.Wrapper >
        )
}
export default Forecast;