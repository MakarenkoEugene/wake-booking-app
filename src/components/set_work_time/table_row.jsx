import React from "react";
import { connect } from "react-redux";

import "./style.scss";
import InputTime from "./input_time";

import { setOpenWorkTime, setClosseWorkTime } from "../../actions/config";

const mapStateToProps = (store) => ({
  durationOfSet: store.config.durationOfSet,
});

const mapDispatchToProps = (dispatch) => ({
  setOpenWorkTime: ({ weekDay, minutes }) => dispatch(setOpenWorkTime({ weekDay, minutes })),
  setClosseWorkTime: ({ weekDay, minutes }) => dispatch(setClosseWorkTime({ weekDay, minutes })),
});

function TableRow({ item: { weekDay, timesList }, durationOfSet, setOpenWorkTime, setClosseWorkTime, setWarning }) {
  if (!weekDay || !timesList) return null;
  const getMinutes = (time) => time.split(":")[0] * 60 + Number(time.split(":")[1]);
  const startTime = timesList.length ? getMinutes(timesList[0].time) : 0;
  const endTime = timesList.length ? getMinutes(timesList[timesList.length - 1].time) + durationOfSet : 0;

  let tableRowRef = null;

  // const activeSetWorkTime = (e) => {
  //   e.preventDefault();
  //   const weekDay = e.target.id.split("_")[0];
  //   const isOpen = e.target.id.split("_")[1] === "open";
  //   const value = e.target.value;
  //   const valueInMinute = Number(value.split(":")[0]) * 60 + Number(value.split(":")[1]);

  //   if (valueInMinute % durationOfSet) {
  //     tableRowRef.title = "The opening and closing times of the wake park must be a multiple of the raiders time.";
  //     tableRowRef.className = "m_warning";
  //   } else {
  //     tableRowRef.className = "";
  //     tableRowRef.title = "";
  //   }

  //   if (isOpen) {
  //     setOpenWorkTime({ weekDay, time: value });
  //     return;
  //   }

  //   setClosseWorkTime({ weekDay, time: value });
  // };
  return (
    <tr ref={(elem) => (tableRowRef = elem)}>
      <td>{weekDay}</td>
      <td>
        <InputTime
          step={durationOfSet}
          max={endTime}
          value={startTime}
          onChangeValue={(minutes) => setOpenWorkTime({ weekDay, minutes })}
        />
      </td>
      <td>
        <InputTime
          step={durationOfSet}
          min={startTime}
          value={endTime}
          onChangeValue={(minutes) => setClosseWorkTime({ weekDay, minutes })}
        />
      </td>
    </tr>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRow);
