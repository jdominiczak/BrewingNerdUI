import _ from 'lodash'

export function sortArrayByProp(prop,array, ascending=false) {
  let arr = _.values(array)
  //console.log(arr)
  //let arr = array.slice();
  if(ascending) {
  arr.sort(function (a, b) {
        if (a[prop] < b[prop]) {
            return -1;
        } else if (a[prop] > b[prop]) {
            return 1;
        } else {
            return 0;
        }
    });
    return arr;
  }
  else {
    arr.sort(function (a, b) {
          if (a[prop] > b[prop]) {
              return -1;
          } else if (a[prop] < b[prop]) {
              return 1;
          } else {
              return 0;
          }
      });
      return arr;
  }
};

export function normalizeArray(array, idProperty) {
  //console.log(array)
  let newObject = {}
  array.forEach( function (item) {
    //console.log(item, idProperty)
    newObject[item[idProperty]] = item
  })
  return newObject
}




/*
def gallonsToLiters(gallons):
    return Decimal(gallons) * Decimal(3.785411784)

def litersToGallons(liters):
    return Decimal(liters) * Decimal(0.26417205235815)

def kgToPounds(kg):
    return Decimal(kg) / Decimal(0.45359242)

def poundsToKg(pounds):
    return Decimal(pounds) / Decimal(2.2046224)

def gramsToOz(grams):
    return Decimal(grams) * Decimal(0.035274)

def ozToGrams(oz):
    return Decimal(oz) * Decimal(28.3495)
*/
