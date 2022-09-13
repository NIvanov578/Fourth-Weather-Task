import { mockForcast } from "../../mockData/mockData";
import { groupByDate } from "../../utils/groupByDate";
import * as hooks from '../../hooks/useWeather.hook';
import { shallow } from "enzyme";
import Forecast from './Forecast.component'
import { DateDayMap, City } from "../../model";
import { Styled } from './Forecast.styles';
import { act } from 'react-dom/test-utils';

jest.useFakeTimers('modern')

describe('Forcast component', ()=> {
    let daysByDate: DateDayMap;

    beforeEach(() => {
        daysByDate = mockForcast.list.reduce(groupByDate, {})
        jest.spyOn(hooks, 'useWeather').mockImplementation(() => ({
            isLoading: false,
            error: '',
            city: mockForcast.city, 
            daysByDate
        }));   
    });

    it('should show city name and forecast per day', ()=> {
        const wrapper = shallow(<Forecast />);
        expect(wrapper.find('h1').text()).toEqual(mockForcast.city.name)
        expect(wrapper.find('Days')).toHaveLength(1);
    });

    it('should search for new city forecast', async ()=> {
        jest.spyOn(hooks, 'useWeather').mockImplementation((cityName) => ({
            isLoading: false,
            error: '',
            city: {
                ...mockForcast.city,
                name: cityName || mockForcast.city.name
            }, 
            daysByDate
        })); 
        
        const wrapper = shallow(<Forecast />);
        
        wrapper.find(Styled.Input).simulate('change', {target: {value: "London" }});
        act(() => {
            jest.runOnlyPendingTimers();
        });
        expect(wrapper.find('h1').text()).toEqual('London');
        expect(hooks.useWeather).toHaveBeenCalledTimes(2);
        expect(wrapper.find('Days')).toHaveLength(1);
    });

    it('should search for new city forecast and show error', async ()=> {
        jest.spyOn(hooks, 'useWeather').mockImplementation((cityName) => ({
            isLoading: false,
            error: cityName ? 'some error' : '',
            city: mockForcast.city, 
            daysByDate
        })); 
        
        const wrapper = shallow(<Forecast />);
        
        wrapper.find(Styled.Input).simulate('change', {target: {value: "London" }});
        act(() => {
            jest.runOnlyPendingTimers();
        });
        expect(wrapper.find('h1')).toHaveLength(0);
        expect(wrapper.find('Days')).toHaveLength(0);
        expect(wrapper.find('Error')).toHaveLength(1)
    })

    it('should show error component', () => {
        jest.spyOn(hooks, 'useWeather').mockImplementation(() => ({
            isLoading: false,
            error: 'Some error',
            city: {} as City, 
            daysByDate: {} as DateDayMap
        }));  
        const wrapper = shallow(<Forecast />);
        expect(wrapper.find('h1')).toHaveLength(0);
        expect(wrapper.find('Days')).toHaveLength(0);
        expect(wrapper.find('Error')).toHaveLength(1)
    });

    it('should show spinner', () => {
        jest.spyOn(hooks, 'useWeather').mockImplementation(() => ({
            isLoading: true,
            error: '',
            city: {} as City, 
            daysByDate: {} as DateDayMap
        })); 
        const wrapper = shallow(<Forecast />);
        expect(wrapper.find('h1')).toHaveLength(0);
        expect(wrapper.find('Days')).toHaveLength(0);
        expect(wrapper.find('Spinner')).toHaveLength(1);
    });
});
