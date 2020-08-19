import React from "react";
import { connect } from "react-redux";

import { deleteReservationTimeItem } from "../../action";

function TimesList({ timesList, date, recentlySaved, deleteReservationTimeItem }) {
  const sortTimeList = timesList.sort((a, b) => {
    const ar = a.time.split(":");
    const br = b.time.split(":");
    if (ar[0] < br[0]) return -1;
    if (ar[0] > br[0]) return 1;
    if (ar[1] < br[1]) return -1;
    if (ar[1] > br[1]) return 1;
    return 0;
  });

  return sortTimeList.map((item) => (
    <tr
      key={item.time}
      className={
        recentlySaved && recentlySaved.date === date && recentlySaved.timesList.includes(item.time)
          ? "recentlySaved"
          : ""
      }
    >
      <td>{item.park.name}</td>
      <td>{item.winch.name}</td>
      <td>{item.time}</td>
      <td>{item.teacher && item.teacher !== "false" ? item.teacher.name : "-"}</td>
      <td>
        <button
          onClick={() =>
            deleteReservationTimeItem({
              date,
              time: item.time,
              winchId: item.winch.winchId,
              teacherId: item.teacher ? item.teacher.teacherId : null,
            })
          }
        >
          ⌫
        </button>
      </td>
    </tr>
  ));
}

const mapStateToProps = (store) => ({
  recentlySaved: store.clientNav.recentlySaved,
});

const mapDispatchToProps = (dispatch) => ({
  deleteReservationTimeItem: (deleteItem) => dispatch(deleteReservationTimeItem(deleteItem)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimesList);
