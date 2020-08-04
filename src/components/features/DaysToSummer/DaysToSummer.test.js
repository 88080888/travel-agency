import React from 'react';
import {shallow} from 'enzyme';
import DaysToSummer from './DaysToSummer';

const select = {
  daysDescription: '.daysDescription',
};

const mockProps = {
  daysDescription: 'XXX days to summer',
};

describe('Component DaysToSummer', () => {
  it('should render without crashing', () => {
    const component = shallow (<DaysToSummer />);
    expect(component).toBeTruthy();
  });

  it('should render description', () => {
    const component = shallow (<DaysToSummer />);
    expect(component.exists(select.daysDescription)).toEqual(true);
  });

});

const trueDate = Date;
const mockDate = customDate => class extends Date {
  constructor(...args) {
    if(args.length) {
      super(...args);
    } else {
      super(customDate);
    }
    return this;
  }
  static now(){
    return (new Date(customDate)).getTime();
  }
};

const checkDaysAtDate = (date, expectedDescription) => {
  it(`should show correct at ${date}`, () => {
    global.Date = mockDate(`${date}T00:00:00.135Z`);

    const component = shallow(<DaysToSummer {...mockProps} />);
    const renderedTime = component.find(select.daysDescription).text();
    expect(renderedTime).toEqual(expectedDescription);

    global.Date = trueDate;
  });
};

beforeAll(() => {
  const utilsModule = jest.requireActual('../../../utils/formatDays.js');
  utilsModule.formatDays = jest.fn(days => days);
});

describe('Component DaysToSummer with mocked Date', () => {
  checkDaysAtDate('2019-06-20', '1');
  checkDaysAtDate('2019-12-22', '182');
  checkDaysAtDate('2018-10-04', '260');
});