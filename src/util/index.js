import _ from 'lodash'


export function sortArrayByProp(prop,array) {
  let arr = _.values(array)
  //console.log(arr)
  //let arr = array.slice();
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
