import React from "react";
import { connect } from "react-redux";

import { changeSelectedTeacher } from "../action";

const mapStateToProps = (store) => ({
  autoSelectTeacher: store.config.config.autoSelectTeacher,
  teachers: store.config.teachers,
  selectedTeacher: store.selectedTeacher,
  selectedWinch: store.selectedWinch,
});

const mapDispatchToProps = (dispatch) => ({
  changeSelectedTeacher: (indicator) => dispatch(changeSelectedTeacher(indicator)),
});

function Teacher({ teachers, selectedWinch, selectedTeacher, changeSelectedTeacher, autoSelectTeacher }) {
  if (!teachers || !teachers.length) {
    return null;
  }
  const eListTeachers = teachers.map((teacher) => (
    <button
      key={teacher._id}
      className={teacher._id === selectedTeacher ? "m_selected_WB" : ""}
      onClick={() => changeSelectedTeacher(teacher._id)}
      title={teachers.title || ""}
    >
      {teacher.name}
    </button>
  ));
  if (autoSelectTeacher && teachers.length > 1) {
    eListTeachers.push(
      <button
        key="auto"
        className={"auto" === selectedTeacher ? "m_selected_WB" : " "}
        onClick={() => changeSelectedTeacher("auto")}
      >
        Select a teacher automatically
      </button>
    );
  }
  eListTeachers.push(
    <button key="cancel" onClick={() => changeSelectedTeacher(false)}>
      Cancel
    </button>
  );

  if (!selectedWinch) return null;
  return (
    <div id="teacher" className={selectedTeacher === true || selectedTeacher === null ? "m_alert_WB" : ""}>
      <span id="e_text_for_nav">Teacher</span>
      {selectedTeacher === null && <span id="e_text_for_alert">You need a teacher?</span>}
      {selectedTeacher === true && <span id="e_text_for_alert">Сhoose a teacher</span>}
      {(selectedTeacher === null || !selectedTeacher) && (
        <>
          <button onClick={() => changeSelectedTeacher(true)}>Yes</button>
          <button
            className={false === selectedTeacher ? "m_selected_WB" : " "}
            onClick={() => changeSelectedTeacher(false)}
          >
            No
          </button>
        </>
      )}
      {selectedTeacher && eListTeachers}
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Teacher);
