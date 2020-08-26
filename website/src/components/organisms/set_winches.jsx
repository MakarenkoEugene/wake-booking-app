import React from "react";
import { connect } from "react-redux";

import { setWinchData, addWinch, removeWinch } from "../../actions/app_settings";

const mapStateToProps = (store) => ({
  winches: store.appSettings.winches,
});

const mapDispatchToProps = (dispatch) => ({
  setWinchData: (winch) => dispatch(setWinchData(winch)),
  addWinch: () => dispatch(addWinch()),
  removeWinch: (_id) => dispatch(removeWinch(_id)),
});

function SetWinches({ winches, addWinch, removeWinch, setWinchData }) {
  return (
    <div id="set_winches">
      <h3>Winches</h3>
      {!winches.length && (
        <h4 style={{ color: "var(--red)", marginBottom: "20px" }}>At least one winch must be created</h4>
      )}
      {winches.length === 1 && (
        <h4 style={{ color: "var(--orange)", marginBottom: "20px" }}>
          One winch will be automatically selected for the client
        </h4>
      )}
      <ul>
        {winches.map((item, i) => {
          return (
            <li key={item._id}>
              <span className="order_index">{i + 1}</span>
              <div>
                <label>
                  <span>Name:</span>
                  <input
                    type="text"
                    name="winch_name"
                    onChange={(e) => {
                      e.preventDefault();
                      setWinchData({ ...item, name: e.target.value });
                    }}
                    value={item.name}
                  />
                </label>
                <label>
                  <span>Description:</span>
                  <textarea
                    name="winch_title"
                    value={item.title}
                    onChange={(e) => {
                      e.preventDefault();
                      setWinchData({ ...item, title: e.target.value });
                    }}
                    cols="30"
                    rows="3"
                  ></textarea>
                </label>
              </div>
              <button
                className="button_remove"
                onClick={(e) => {
                  e.preventDefault();
                  removeWinch(item._id);
                }}
              >
                ✕
              </button>
            </li>
          );
        })}
      </ul>

      <button
        onClick={(e) => {
          e.preventDefault();
          addWinch();
        }}
      >
        Add Winch
      </button>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SetWinches);
