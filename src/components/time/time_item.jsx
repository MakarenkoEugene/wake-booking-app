import React from "react";
import { connect } from "react-redux";
import moment from "moment";

import { changeSelectedTime, deleteReservationTimeItem } from "../../action";

function TimeItem({
  time,
  nowDate,
  selectedWinch,
  selectedDate,
  selectedTimes,
  changeSelectedTime,
  showIconsReserved,
  deleteReservationTimeItem,

  teacherDateTurn,
  clientDateTurn,
  winchDateTurn,
}) {
  // winchDateTurn teacherDateTurn clientDateTurn 
  const nowTime = moment(nowDate).format("HH:mm");

  const checkTimePassed = ({ time, nowTime }) => {
    const timeArr = time.split(":");
    const nowTimeArr = nowTime.split(":");
    if (+timeArr[0] < +nowTimeArr[0]) return true;
    if (+timeArr[0] > +nowTimeArr[0]) return false;
    return +timeArr[1] <= +nowTimeArr[1];
  };

  const timePassed = moment(nowDate).isSame(selectedDate, "date") && checkTimePassed({ time, nowTime });

  if (timePassed)
    return (
      <div className="button_taken_passed" title="Time has passed">
        {time}
      </div>
    );

  const timeAlreadyTakenAtClient = clientDateTurn.find((item) => item.time === time);

  if (timeAlreadyTakenAtClient && timeAlreadyTakenAtClient.winch.winchId === selectedWinch) {
    return (
      <button
        onClick={() => {
          deleteReservationTimeItem({
            date: moment(selectedDate).format("YYYY-M-D"),
            time: timeAlreadyTakenAtClient.time,
            winchId: timeAlreadyTakenAtClient.winch.winchId,
            teacherId: timeAlreadyTakenAtClient.teacher && timeAlreadyTakenAtClient.teacher.teacherId,
          });
        }}
        className="button_taken_client"
      >
        {time}

        <span className="clear">⌫</span>
        {showIconsReserved && timeAlreadyTakenAtClient.teacher && <span className="teacher">🆃</span>}
      </button>
    );
  }

  const timeAlreadyTakenAtWinch = winchDateTurn.includes(time);
  const timeAlreadyTakenAtTeacher = teacherDateTurn.includes(time);

  if (timeAlreadyTakenAtWinch || timeAlreadyTakenAtTeacher || timeAlreadyTakenAtClient) {
    return (
      <div className="button_taken_clossed">
        {time}
        {showIconsReserved && timeAlreadyTakenAtClient && <span className="client">🅲</span>}
        {showIconsReserved && timeAlreadyTakenAtWinch && <span className="winch">🆆</span>}
        {showIconsReserved && timeAlreadyTakenAtTeacher && <span className="teacher">🆃</span>}
      </div>
    );
  }

  return (
    <button onClick={() => changeSelectedTime(time)} className={selectedTimes.includes(time) ? "m_selected_WB" : ""}>
      {time}
    </button>
  );
}

const mapStateToProps = (store) => ({
  showIconsReserved: store.config.config.showIconsReserved,
  selectedDate: store.date.selectedDate,
  selectedTimes: store.selectedTimes,
  selectedWinch: store.selectedWinch,
});

const mapDispatchToProps = (dispatch) => ({
  changeSelectedTime: (time) => dispatch(changeSelectedTime(time)),
  deleteReservationTimeItem: (deleteItem) => dispatch(deleteReservationTimeItem(deleteItem)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeItem);
