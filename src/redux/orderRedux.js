// selectors - selektory pozwalające na odczytanie całego zamówienia lub tylko jego opcji,
export const getOrder = ({order}) => order;
export const getOrderOptions = ({order}) => order.options;

// action name creator
const reducerName = 'order';
const createActionName = name => `app/${reducerName}/${name}`;

// action types - akcja będzie służyła do aktualizacji wartości danej opcji w stanie aplikacji,
export const SET_OPTION = createActionName('SET_OPTION');

// action creators
export const setOrderOption = payload => ({ payload, type: SET_OPTION });

// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case SET_OPTION:
      return {
        ...statePart,
        options: {
          ...statePart.options,
          ...action.payload,
        },
      };
    default:
      return statePart;
  }
}
