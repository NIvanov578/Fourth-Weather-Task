import React from 'react';
import { mount, shallow} from 'enzyme';
import Forecast from './components/Forecast/Forecast.component';
import App from './App';
test('renders learn react link', () => {
  const wrapper = shallow(<App />);

  expect(wrapper.find(Forecast)).toHaveLength(1)
});
