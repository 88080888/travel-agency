import pricing from '../data/pricing.json';
import {parseOptionPrice} from './parseOptionPrice';

//Funkcja calculateTotal iteruje przez wszystkie opcje zapisane w stanie aplikacji, dla każdej nich sprawdzając jej ustawienia w pricing.json.
export const calculateTotal = (tripCost, options) => {
  let total = parseOptionPrice(tripCost).value;
  let multiplier = 0;
  for (let option of pricing) {
    const currentValue = options[option.id];
    if (typeof (currentValue) != 'undefined') {
      //jeśli wartość opcji w stanie aplikacji jest tablicą, a w pricing.json jest tablica values dla tej opcji, to bierzemy pod uwagę cenę każdego z zaznaczonych wariantów – ta sytuacja będzie dotyczyła opcji typu checkboxes,
      if (Array.isArray(currentValue) && Array.isArray(option.values)) {
        for (let optionId of currentValue) {
          const value = option.values.filter(opt => opt.id == optionId)[0];
          const price = parseOptionPrice(value.price);
          if (price.type == 'multiplier') {
            multiplier += price.value;
          }
          else if (price.type == 'number') {
            total += price.value;
          }
        }
      }
      //jeśli wartość opcji w stanie aplikacji nie jest tablicą, ale w pricing.json jest tablica values dla tej opcji, to znajdujemy ten element z values, który ma id zapisane jako wartość tej opcji w stanie aplikacji (czyli robimy to samo, co powyżej, tyle że bez pętli, bo jest tylko jeden możliwy wybór), i wtedy bierzemy pod uwagę cenę tego wariantu opcji,
      else if (currentValue !== '' && Array.isArray(option.values)) {
        const value = option.values.filter(opt => opt.id == currentValue)[0];
        const price = parseOptionPrice(value.price);
        if (price.type == 'multiplier') {
          multiplier += price.value;
        }
        else if (price.type == 'number') {
          total += price.value;
        }
      }
      //wreszcie, jeśli mamy do czynienia z opcją typu number, to mnożymy jej wartość przez cenę zawartą w pricing.json dla tej opcji.
      else if (option.type == 'number') {
        const price = parseOptionPrice(option.price);
        if (price.type == 'multiplier') {
          multiplier += price.value * currentValue;
        }
        else if (price.type == 'number') {
          total += price.value * currentValue;
        }
      }
    }
  }
  return total * multiplier;
};
