import React from "react";
import { connect } from "react-redux";

import { changeSelectedWinch } from "../action";

const mapStateToProps = (store) => ({
  winches: store.config.winches,
  selectedDate: store.date.selectedDate,
  selectedWinch: store.selectedWinch,
});
const mapDispatchToProps = (dispatch) => ({
  changeSelectedWinch: (_id) => dispatch(changeSelectedWinch(_id)),
});

function Winch({ winches, selectedDate, selectedWinch, changeSelectedWinch }) {
  const eListWinches = winches.map((winch) => (
    <button
      key={winch._id}
      className={winch._id === selectedWinch ? "m_selected_WB" : ""}
      onClick={() => changeSelectedWinch(winch._id)}
      title={winch.title || ""}
    >
      {winch.name}
    </button>
  ));
  if (!selectedDate) return null;
  if (winches.length === 1) {
    changeSelectedWinch(winches[0]._id);
    return null;
  }
  return (
    <div id="winch" className={!selectedWinch ? "m_alert_WB" : ""}>
      <span id="e_text_for_nav">Winch</span>
      {!selectedWinch && <span id="e_text_for_alert">Select Winch</span>}
      {eListWinches}
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Winch);
