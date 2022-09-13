import { Day, DateDayMap } from "../model";

export const groupByDate = (prevValue: DateDayMap, currentValue: Day) => {
    const date = new Date(currentValue.dt_txt).getDate();

    return {
        ...prevValue,
        [date]: { 
            ...prevValue[date],
            [currentValue.dt] : {                      
                ...currentValue,
            },
        },

    }
}