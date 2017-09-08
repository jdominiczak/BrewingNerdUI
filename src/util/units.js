export default class Units {
  static litersToGallons(liters) {
    return liters * 0.26417205235815;
  }
  static gallonsToLiters(gallons) {
    return gallons * 3.7854117839999;
  }
  static kgToPounds(kg) {
    return kg / 0.45359242;
  }
  static poundsToKg(pounds) {
    return pounds / 2.2046224;
  }
  static gramsToOz(grams) {
    return grams * 0.035274;
  }
  static ozToGrams(oz) {
    return oz * 28.3495;
  }
  static kgToOz(kg) {
    return this.gramsToOz(kg * 1000.0);
  }

  static kgToTextPoundsOz(kg) {
    const oz = this.kgToPounds(kg) * 16;
    let lbs = Math.floor(oz / 16);
    let remOz = (oz % 16).toFixed(1);
    let stringReturn = '';

    if (remOz === '16.0') {
      lbs += 1;
      remOz = 0;
    }
    if (lbs !== 0) {
      stringReturn += `${lbs}lb `;
    }
    if (remOz !== 0) {
      stringReturn += `${remOz} oz`;
    }
    return stringReturn;
  }

  static celsiusToFahrenheit(cel, precision = 2) {
    return Number(Number((cel * 1.8) + 32).toFixed(precision));
  }
}
