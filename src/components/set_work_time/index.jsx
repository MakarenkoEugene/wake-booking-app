import React from "react";
import { connect } from "react-redux";

import TableRow from "./table_row";
import InputTime from "./input_time";

import { setDurationOfSet } from "../../actions/config";
import "./style.scss";

const mapStateToProps = (store) => ({
<<<<<<< HEAD
  workWeekDayList: store.appSettings.config.workWeekDayList,
  durationOfSet: store.appSettings.config.durationOfSet,
=======
  workWeekDayList: store.config.workWeekDayList,
  durationOfSet: store.config.durationOfSet,
>>>>>>> fd73a7a4c780ac691b15ad0cea22a298f1b72905
});

const mapDispatchToProps = (dispatch) => ({
  setDurationOfSet: (durationOfSet) => dispatch(setDurationOfSet(durationOfSet)),
});

<<<<<<< HEAD
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
=======
class SetWorkTime extends React.Component {
  constructor() {
    super();
    this.state = {
      warningArr: [],
      warning: null,
    };
  }

  setWarning = (warning, i) => {
    const { warningArr } = this.state;
    const warningForIndex = warningArr.find((warning) => (warning.index = i));
    if (warningForIndex) {
      this.setState({ warningForIndex: [...warningForIndex] });
    }
  };

  render() {
    const { workWeekDayList, durationOfSet, setDurationOfSet } = this.props;
    const { warning } = this.state;

    return (
      <div id="set_work_time">
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
        {warning && <p className="m_warning">{warning}</p>}

        <table>
          <tbody>
            <tr>
              <th>День</th>
              <th>Открытие</th>
              <th>Закрытие</th>
            </tr>
            {workWeekDayList.map((item, i) => (
              <TableRow item={item} key={item.weekDay} setWarning={(warning) => this.setWarning(warning, i)} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
>>>>>>> fd73a7a4c780ac691b15ad0cea22a298f1b72905
}

export default connect(mapStateToProps, mapDispatchToProps)(SetWorkTime);
