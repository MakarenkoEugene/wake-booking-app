import React from "react";
import { connect } from "react-redux";
import moment from "moment";

import TimeItem from "./time_item";

const mapStateToProps = (store) => ({
  teachers: store.config.teachers,
  workWeekDayList: store.config.config.workWeekDayList,
  selectedTeacher: store.selectedTeacher,
  selectedWinch: store.selectedWinch,
  selectedTimes: store.selectedTimes,
  selectedDate: store.date.selectedDate,

  winchTurn: store.buffer.winchTurn,
  teacherTurn: store.buffer.teacherTurn,
  clientReservationList: store.client && store.client.reservationList,
});

const mapDispatchToProps = (dispatch) => ({});

function TimesList({
  selectedTeacher,
  selectedWinch,
  selectedDate,
  workWeekDayList,
  selectedTimes,
  winchTurn,
  teacherTurn,
  teachers,
  clientReservationList,
}) {
  if (!selectedDate) return null;
  if (!selectedWinch) return null;
  if (teachers.length) {
    if (!((selectedTeacher && selectedTeacher.length === 24) || selectedTeacher === false)) return null;
  }

  const date = moment(selectedDate).format("YYYY-M-D");

  const clientReservationListDate = clientReservationList && clientReservationList.find((item) => item.date === date);
  const winchTurnDate = winchTurn.find((item) => item.date === date);
  const teacherTurnDate = teacherTurn.find((item) => item.date === date);

  const clientDateTurn = clientReservationListDate ? clientReservationListDate.timesList : [];
  const winchDateTurn = winchTurnDate ? winchTurnDate.dateTurn.map((item) => item.time) : [];
  const teacherDateTurn = teacherTurnDate ? teacherTurnDate.dateTurn.map((item) => item.time) : [];

  const weekDay = moment(selectedDate).format("e");
  const { timesList } = workWeekDayList[weekDay];

  return (
    <div className={selectedTimes.length ? "" : "m_alert_WB"} id="time">
      <span id="e_text_for_nav">Time</span>
      {!selectedTimes.length && <span id="e_text_for_alert">Select Time</span>}

      {timesList.map(({ time }) => (
        <TimeItem
          key={time}
          time={time}
          teacherDateTurn={teacherDateTurn}
          clientDateTurn={clientDateTurn}
          winchDateTurn={winchDateTurn}
        />
      ))}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TimesList);
