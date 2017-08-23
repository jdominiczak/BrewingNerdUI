
export function sortArrayByProp(prop,array) {
  let arr = array.slice();
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
