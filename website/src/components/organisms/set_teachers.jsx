import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import InputPhone from "../atoms/input_phone";

import { getClientForTeacher, removeTeacher } from "../../actions/app_settings";

const mapStateToProps = (store) => ({
  teachers: store.appSettings.teachers,
});

const mapDispatchToProps = (dispatch) => ({
  getClientForTeacher: (phone) => dispatch(getClientForTeacher(phone)),
  removeTeacher: (_id) => dispatch(removeTeacher(_id)),
});

function SetTeachets({ teachers, getClientForTeacher, removeTeacher }) {
  const [inputTelValue, setInputTelValue] = useState({ value: "+380", valid: false });
  const [phoneAlredyTaked, setPhoneAlredyTaked] = useState(false);

  useEffect(() => {
    setPhoneAlredyTaked(() => !!teachers.find((item) => item.phone === inputTelValue.value.slice(1)));
  });

  return (
    <div id="set_teachers">
      <h3>Teachers</h3>
      <ul>
        {teachers.map((teacher) => {
          return (
            <li key={teacher._id}>
              <img src="" alt="" />
              <a href="">
                {teacher.name}
                <br />
                {teacher.phone}
              </a>
              <button onClick={() => removeTeacher(teacher._id)} className="button_text" title="Take Off">
                ✕
              </button>
            </li>
          );
        })}
      </ul>

      <label>
        Введите номер телефона клиента, которому вы хотите предоставить возможность преподавать на вашом парке.
        <br />
        После подтверждения заявки в своем профиле он станит вашим тренером.
        <br />
        {phoneAlredyTaked && <big>Тренер с таким номером телефона уже добавлен</big>}
        <br />
        <InputPhone value={inputTelValue} onChangeValue={setInputTelValue} />
      </label>
      <button
        disabled={!inputTelValue.valid || phoneAlredyTaked}
        onClick={(e) => {
          e.preventDefault();
          if (!phoneAlredyTaked) getClientForTeacher(inputTelValue.value.slice(1));
          setInputTelValue({ value: "+380", valid: false });
        }}
      >
        To Invite
      </button>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SetTeachets);
