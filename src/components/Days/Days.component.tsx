import React, {useState, useEffect} from 'react';
import Image from '../Image/Image.component'
import { Styled } from './Days.styles';
import { Week, Map } from '../../model';
import { DaysProps } from './Days.model';


const Days: React.FC<DaysProps> = ({ daysByDate })=> {
    const [selectedTimes, setSelectedTimes] = useState<Map>({} as Map);
    const formatTempeture = (cel: number) => `${Math.round(cel)}\xB0C.`;

    useEffect(()=> {
        const createSelectedTimes: Map = {} as Map;
        const keys =  Object.keys(daysByDate);
        if (keys.length) {

            keys.forEach((dateKey:string) => {
                createSelectedTimes[dateKey] = Object.values(daysByDate[dateKey])[0].dt.toString();
            });
    
            setSelectedTimes(createSelectedTimes)
        }

    }, [daysByDate])

    const selectDateWeather = (dayKey:string, timeStampKey:string) => {
        setSelectedTimes({
            ...selectedTimes,
            [dayKey]: timeStampKey
        })
    }

    return (  
            <Styled.DaysWrapper>
                {Object.keys(selectedTimes).map((dayTime :string, index)=> {
                    const currentTime = selectedTimes[dayTime];
                    const day = daysByDate[dayTime][currentTime];
                    const dayTimeOptions = Object.keys(daysByDate[dayTime]);

                    return (
                        <Styled.DayBox key={index}>
                            <Image src={`https://${process.env.REACT_APP_URL}/img/wn/${day.weather?.[0].icon}@2x.png`} />
                            <Styled.Row>{Week[new Date(day.dt_txt).getDay()]}</Styled.Row>
                            <Styled.Row>Current Temp: {formatTempeture(day.main.temp)}</Styled.Row>
                            <Styled.Row>Feels Like: {formatTempeture(day.main.feels_like)}</Styled.Row>
                            <Styled.Row>{day.weather?.[0].main}</Styled.Row>
                            <Styled.Row>Wind speed: {day.wind.speed} m/s</Styled.Row>
                            <Styled.Row>
                                <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => selectDateWeather(dayTime, e.target.value.toString())}>
                                    {dayTimeOptions.map((timeStamp, indexY)=> {
                                        const today = new Date(+timeStamp * 1000);
                                        return(<option key={`${index}.${indexY}`} value={timeStamp} >{today.toLocaleTimeString()}</option>)
                                    })}
                                </select>
                            </Styled.Row>
                    </Styled.DayBox>
                    )
                })}

            </Styled.DaysWrapper>
        )
}

export default Days;