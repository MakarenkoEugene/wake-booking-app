import React from "react";
import { connect } from "react-redux";
import moment, { locale } from "moment";

import ListDays from "./list_days";
import { toggleCalendar, decreaseCalendarDate, increaseCalendarDate } from "../../action";

const mapStateToProps = (store) => ({
  selectedTeacher: store.selectedTeacher,
  selectedDate: store.selectedDate,
  calendarIsOpen: store.calendarIsOpen,
  calendarDate: store.calendarDate,
  locale: store.config.config.locale,
  timeZone: store.config.config.timeZone,
  nonWorkingDays: store.config.config.nonWorkingDays,
  calendarDate: store.date.calendarDate,
  nowDate: store.date.nowDate,
  selectedDate: store.date.selectedDate,
  utcOffset: store.date.utcOffset,
  locale: store.date.locale,
});
const mapDispatchToProps = (dispatch) => ({
  decreaseCalendarDate: () => dispatch(decreaseCalendarDate()),
  increaseCalendarDate: () => dispatch(increaseCalendarDate()),
  toggleCalendar: () => dispatch(toggleCalendar()),
});

function Calendar({
  calendarIsOpen,
  increaseCalendarDate,
  decreaseCalendarDate,
  toggleCalendar,
  calendarDate,
  nowDate,
  selectedDate,
  locale,
  utcOffset,
}) {
  if (!calendarDate || !nowDate) return null;

  const canScrollBack = moment(calendarDate).isAfter(nowDate, "month");

  let listDateRef = null;
  const setListDateRef = (elem) => (listDateRef = elem);
  let textMonthAndYearRef = null;
  const setTextMonthAndYearRef = (elem) => (textMonthAndYearRef = elem);

  const onIncreaseCalendarDate = ({ listDateRef, textMonthAndYearRef }) => {
    const transition = 0.4;
    const translateX = 300;

    listDateRef.style.transition = `${transition}s`;
    listDateRef.style.transform = `translateX(-${translateX}px)`;
    textMonthAndYearRef.style.transition = `${transition}s`;
    textMonthAndYearRef.style.transform = `translateX(-${translateX}px)`;
    setTimeout(() => {
      increaseCalendarDate();
      listDateRef.style.transition = "0s";
      listDateRef.style.transform = `translateX(${translateX}px)`;
      textMonthAndYearRef.style.transition = "0s";
      textMonthAndYearRef.style.transform = `translateX(${translateX}px)`;
    }, transition * 1000 - 50);
    setTimeout(() => {
      listDateRef.style.transition = `${transition}s`;
      listDateRef.style.transform = "translateX(0px)";
      textMonthAndYearRef.style.transition = `${transition}s`;
      textMonthAndYearRef.style.transform = "translateX(0px)";
    }, transition * 1000);
  };

  const onDecreaseCalendarDate = ({ listDateRef, textMonthAndYearRef }) => {
    const transition = 0.4;
    const translateX = 300;

    listDateRef.style.transition = `${transition}s`;
    listDateRef.style.transform = `translateX(${translateX}px)`;
    textMonthAndYearRef.style.transition = `${transition}s`;
    textMonthAndYearRef.style.transform = `translateX(${translateX}px)`;
    setTimeout(() => {
      decreaseCalendarDate();
      listDateRef.style.transition = "0s";
      listDateRef.style.transform = `translateX(-${translateX}px)`;
      textMonthAndYearRef.style.transition = "0s";
      textMonthAndYearRef.style.transform = `translateX(-${translateX}px)`;
    }, transition * 1000 - 50);
    setTimeout(() => {
      listDateRef.style.transition = `${transition}s`;
      listDateRef.style.transform = "translateX(0px)";
      textMonthAndYearRef.style.transition = `${transition}s`;
      textMonthAndYearRef.style.transform = "translateX(0px)";
    }, transition * 1000);
  };

  return (
    <div className={selectedDate ? "" : "m_alert_WB"} id="date">
      <span id="e_text_for_nav">Date</span>
      {!selectedDate && <span id="e_text_for_alert">Select Date</span>}

      <div id="calendar" style={{ height: calendarIsOpen ? "308px" : "0px" }}>
        <div>
          <button
            disabled={!canScrollBack}
            onClick={() => onDecreaseCalendarDate({ listDateRef, textMonthAndYearRef })}
          >
            ←
          </button>
          <span ref={setTextMonthAndYearRef}>
            {moment(calendarDate).locale(locale).utcOffset(utcOffset).format("MMMM YYYY")}
          </span>
          <button onClick={() => onIncreaseCalendarDate({ listDateRef, textMonthAndYearRef })}>→</button>
        </div>
        <ul id="week_day">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((weekDay) => (
            <li key={weekDay}>{weekDay}</li>
          ))}
        </ul>
        <ListDays setListDateRef={setListDateRef} />
      </div>

      <button
        onClick={() => toggleCalendar()}
        id="calendar_btn"
        className="m_selected_WB"
        style={{ display: calendarIsOpen ? "none" : "block" }}
      >
        <span>
          {selectedDate ? moment(selectedDate).locale(locale).utcOffset(utcOffset).format("LL") : "Select Date"}
        </span>
        <svg viewBox="0 0 24 24">
          <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path>
          <path fill="none" d="M0 0h24v24H0z"></path>
        </svg>
      </button>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
