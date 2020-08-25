import React from "react";
import { connect } from "react-redux";

import "./style.scss";
import InputTime from "./input_time";

import { setOpenWorkTime, setClosseWorkTime } from "../../../actions/config";

const mapStateToProps = (store) => ({
  durationOfSet: store.appSettings.config.durationOfSet,
});

const mapDispatchToProps = (dispatch) => ({
  setOpenWorkTime: ({ weekDay, minutes }) => dispatch(setOpenWorkTime({ weekDay, minutes })),
  setClosseWorkTime: ({ weekDay, minutes }) => dispatch(setClosseWorkTime({ weekDay, minutes })),
});

function TableRow({ item: { weekDay, timesList }, durationOfSet, setOpenWorkTime, setClosseWorkTime }) {
  if (!weekDay || !timesList) return null;
  const getMinutes = (time) => time.split(":")[0] * 60 + Number(time.split(":")[1]);
  const startTime = timesList.length ? getMinutes(timesList[0].time) : 0;
  const endTime = timesList.length ? getMinutes(timesList[timesList.length - 1].time) + durationOfSet : 0;

  let tableRowRef = null;

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
