import React from 'react';
import styles from './OrderOption.scss';
import OrderOptionCheckboxes from './OrderOptionCheckboxes';
import OrderOptionDropdown from './OrderOptionDropdown';
import OrderOptionIcons from './OrderOptionIcons';
import OrderOptionNumber from './OrderOptionNumber';
import OrderOptionText from './OrderOptionText';
import OrderOptionDate from './OrderOptionDate';

const optionTypes = {
  dropdown: OrderOptionDropdown,
  icons: OrderOptionIcons,
  checkboxes: OrderOptionCheckboxes,
  number: OrderOptionNumber,
  text: OrderOptionText,
  date: OrderOptionDate,
};

const OrderOption = ({name, type, id, setOrderOption, ...otherProps}) => {

  //odczytuje wlasciwosci obiektu optionTypes i zapisuję ją w w stalej OptionComponent
  const OptionComponent = optionTypes[type];
  if(!OptionComponent){
    return null;
  } else {
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{name}</h3>
        <OptionComponent
          {...otherProps}
          //Jest to funkcja strzałkowa, która wywołuje funkcję setOrderOption, przekazując jej obiekt. W tym obiekcie jest jedna właściwość, której kluczem będzie zawartość zmiennej (a w tym wypadku – propsa) id, a wartością – argument funkcji strzałkowej.:
          setOptionValue={value => setOrderOption({[id]: value})}
        />  
      </div>
    );
  }
};

export default OrderOption;