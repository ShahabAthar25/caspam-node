import moment from "moment";

console.log(moment().format("MMMM Do, YYYY"));

let given = moment("June 27th, 2022", "MMMM Do, YYYY");
let current = moment().startOf("day");

let diff = moment.duration(given.diff(current)).asDays() * -1;

let num = null;

if (diff === -0) {
  num = 0;
} else {
  num = diff;
}

console.log(num);
