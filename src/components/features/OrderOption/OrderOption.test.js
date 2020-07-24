import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';

describe('Component OrderOption', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderOption type='text'
      name='Lola'/>);
    expect(component).toBeTruthy();
    //console.log(component.debug());
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('should render name props without crashing', () => {
    const expectedName = 'Lorem';
    const expectedType = 'number';
    const component = shallow(<OrderOption name={expectedName} type={expectedType}/>);

    const renderedName = component.find('.title').text();
    expect(renderedName).toEqual(expectedName);
  });
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for(let type in optionTypes){
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;
    
    beforeEach(() => {
      //stworzenie atrapy funkcji:
      mockSetOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });

    /* common tests */
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
      console.log(subcomponent.debug());
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);
        
          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);
        
          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          //Po znalezieniu selecta, wykonujemy na nim metodę .simulate, która przyjmuje jeden lub dwa argumenty. Pierwszym z nich jest rodzaj eventu, jaki ma zostać zasymulowany – w tym wypadku event change. Drugi argument to wartość przekazywana handlerowi tego eventu. Jak zwykle, handler eventu spodziewa się, że otrzyma obiekt event, ale nie musimy mockować całej jego zawartości – ten handler korzysta tylko z właściwości currentTarget, z której pobiera value. Dlatego właśnie jako drugi argument podaliśmy taką atrapę obiektu event
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          //sprawdzamy, czy ta funkcja została wykonana dokładnie jeden raz
          expect(mockSetOrderOption).toBeCalledTimes(1);
          //sprawdzamy, czy ta funkcja została wywołana z poprawnymi argumentami
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }

      case 'icons': {
        /* tests for icons */
        it('contains div with icons class', () => {
          const iconClass = renderedSubcomponent.find('.icon');
          expect(iconClass.length).toBe(testValueNumber);
        });

        it('should run setOrderOption function on click', () => {
          renderedSubcomponent.find('.icon').at(mockProps.values.length).simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue});
        });  
        break;
      }  

      case 'checkboxes': {
        /* tests for checkboxes */
        it('contains div with checkboxes class', () => {
          const checkboxesClass = renderedSubcomponent.find('.checkboxes');
          expect(checkboxesClass.length).toBe(1);
        });
        
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find(`input[value="${testValue}"]`).simulate('change', { currentTarget: { checked: true } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue] });
        });
        break;
      }  

      case 'date': {
        /* tests for date */
        break;
      }  

      case 'number': {
        /* tests for number */
        break;
      }  

      case 'text': {
        /* tests for number */
        break;
      }  

    }
  });
}