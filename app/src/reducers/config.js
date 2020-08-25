import { SET_CONFIG } from "../constants/index";

export default function (state = null, action) {
  return action.type === SET_CONFIG ? action.config : state;
}
// export default (
//   state = {
//     park: "test",
//     winches: [
//       { name: "7м", title: "7 метров", indicator: 1 },
//       { name: "9м", title: "9 метров без фигур", indicator: 2 },
//       // { name: "9м Ф", title: "9 метров с фигурами" },
//     ],
//     // Europe/Kiev
//     timeZone: "Europe/Kiev",
//     // uk-UA, ru-RU, en
//     locale: "en",
//     teachers: [
//       { name: "Eugene", _id: "asdfasd" },
//       { name: "Alex", _id: "asdf13" },
//       { name: "J.B. O'Neill", _id: "asdfas123" },
//     ],
//     calculateAmount: false,
//     times: [
//       { time: "10:00", price: 100 },
//       { time: "10:30", price: 100 },
//       { time: "11:00", price: 100 },
//       { time: "11:30", price: 100 },
//       { time: "12:00", price: 100 },
//       { time: "12:30", price: 100 },
//       { time: "13:00", price: 100 },
//       { time: "13:30", price: 100 },
//       { time: "14:00", price: 100 },
//       { time: "14:30", price: 100 },
//       { time: "15:00", price: 100 },
//       { time: "15:30", price: 100 },
//       { time: "16:00", price: 100 },
//       { time: "16:30", price: 100 },
//       { time: "17:00", price: 100 },
//       { time: "17:30", price: 100 },
//       { time: "18:00", price: 100 },
//       { time: "18:30", price: 100 },
//       { time: "19:00", price: 100 },
//       { time: "19:30", price: 100 },
//     ],
//     nonWorkingDays: ["2021-6-25", "2020-5-25", "2020-7-25", "2020-6-26", "2020-6-25", "2020-6-22"],
//   },
//   action
// ) => state;
