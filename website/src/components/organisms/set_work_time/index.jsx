import React from "react";
import { connect } from "react-redux";

import TableRow from "./table_row";
import InputTime from "./input_time";

import { setDurationOfSet } from "../../../actions/config";
import "./style.scss";

const mapStateToProps = (store) => ({
  workWeekDayList: store.appSettings.config.workWeekDayList,
  durationOfSet: store.appSettings.config.durationOfSet,
});

const mapDispatchToProps = (dispatch) => ({
  setDurationOfSet: (durationOfSet) => dispatch(setDurationOfSet(durationOfSet)),
});

function SetWorkTime({ workWeekDayList, durationOfSet, setDurationOfSet }) {
  return (
    <div id="set_work_time">
      <h3>Weekly working hours</h3>
      <label htmlFor="sets_step">
        Длительность одного сета:{"  "}
        <select defaultValue={durationOfSet} onChange={(e) => setDurationOfSet(Number(e.target.value))}>
          <option value={5}>5 минут</option>
          <option value={10}>10 минут</option>
          <option value={15}>15 минут</option>
          <option value={20}>20 минут</option>
          <option value={30}>30 минут</option>
          <option value={60}>1 час</option>
        </select>
      </label>

      <table>
        <tbody>
          <tr>
            <th>День</th>
            <th>Открытие</th>
            <th>Закрытие</th>
          </tr>
          {workWeekDayList.map((item, i) => (
            <TableRow item={item} key={item.weekDay} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SetWorkTime);
