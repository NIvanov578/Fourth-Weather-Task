import { mockForcast } from "../mockData/mockData";
import { groupByDate } from "../../utils/groupByDate";
import Days from './Days.component';
import { DateDayMap, Day } from "../../model";
import { Styled } from './Days.styles';
import {  mount } from "enzyme";

describe('Days component', ()=> {
    let daysByDate: DateDayMap = mockForcast.list.reduce(groupByDate, {});

    it('should render days', ()=> {
        const wrapper = mount(<Days daysByDate={daysByDate} />);
        expect(wrapper.find(Styled.DayBox)).toHaveLength(6)
    })

    it('should render days and change weather for second day', ()=> {
        const wrapper = mount(<Days daysByDate={daysByDate} />);
        const option = wrapper.find('select').at(1).find('option').at(1);
        const value = option.prop('value') as string;
        wrapper.find('select').at(1).simulate('change', {
            target: { value },
        });
        wrapper.update();
        const mainWeather = Object.values(daysByDate)[1][value].weather[0].main;
        expect(wrapper.find(Styled.DayBox).at(1).find(Styled.Row).at(3).text()).toEqual(mainWeather)
    });

    it('should not render days', ()=> {
        const wrapper = mount(<Days daysByDate={{}} />);
        expect(wrapper.find(Styled.DayBox)).toHaveLength(0)
    })
})