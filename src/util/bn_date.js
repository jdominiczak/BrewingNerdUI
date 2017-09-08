
export default class BnDate {
  static getMonths() { return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; }
  static getDays() { return ['Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat', 'Sun']; }
  static getDaysFull() { return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; }


  // returns M/D/YYYY with no leading 0's  8/01/2017
  static toPrettyDate(dateTime) {
    // return (dateTime.getMonth() + 1) + "/" + dateTime.getDate() + "/" + dateTime.getFullYear();
    return `${(dateTime.getMonth() + 1)}/${dateTime.getDate()}/${dateTime.getFullYear()}`;
  }

  // return Monday 11 Aug 2017
  static toWordsDateAndDay(dateTime) {
    return `${this.getDaysFull()[dateTime.getDay()]} ${dateTime.getDate()} \
      ${this.getMonths()[dateTime.getMonth()]} ${dateTime.getFullYear()}`;
  }

  // return Monday 11 Aug 2017 15:24
  static toWordsDateAndDayAndTime(dateTime) {
    return `${this.getDaysFull()[dateTime.getDay()]} ${dateTime.getDate()} \
    ${this.getMonths()[dateTime.getMonth()]} ${dateTime.getFullYear()} ${this.toPrettyTime(dateTime)}`;
  }

  // return 11 Aug. 2017
  static toWordsDate(dateTime) {
    return `${dateTime.getDate()} ${this.getMonths()[dateTime.getMonth()]} ${dateTime.getFullYear()}`;
  }

  // return HH:MM WITH leading 0's on Minutes, Hours in 24hrs eg. 5:04
  static toPrettyTime(dateTime) {
    let hours = dateTime.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (dateTime.getMinutes() < 10) {
      return `${hours}:0${dateTime.getMinutes()}`;
    }
    return `${hours}:${dateTime.getMinutes()}`;
  }

  static toPrettyDateTime(dateTime) {
    return `${this.toPrettyDate(dateTime)} ${this.toPrettyTime(dateTime)}`;
  }


  // Return an array with [year, month, day, hour, min ] between them
  static diffDate(date1, date2) {
    //  console.log(date1, date2)
    //  let diff = date2 - date1  //diff in ms
    //  let yearDiff = date2.getFullYear()-date1.getFullYear()
    return [date2.getFullYear() - date1.getFullYear(),
      date2.getMonth() - date1.getMonth(),
      date2.getDate() - date1.getDate(),
      date2.getHours() - date1.getHours(),
      date2.getMinutes() - date1.getMinutes()];
  }
}
