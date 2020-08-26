import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import InputPhone from "../atoms/input_phone";

import { getClientForAdmin, setAdminRights, removeAdmin } from "../../actions/app_settings";

const mapStateToProps = (store) => ({
  admins: store.appSettings.admins,
});

const mapDispatchToProps = (dispatch) => ({
  getClientForAdmin: (phone) => dispatch(getClientForAdmin(phone)),
  setAdminRights: (_id, rights) => dispatch(setAdminRights(_id, rights)),
  removeAdmin: (_id) => dispatch(removeAdmin(_id)),
});

function SetAdmins({ admins, getClientForAdmin, setAdminRights, removeAdmin }) {
  const HasMoreOneOwner = !!(admins.filter((admin) => admin.rights.includes("OWNER")).length - 1);

  const [inputTelValue, setInputTelValue] = useState({ value: "+380", valid: false });
  const [phoneAlredyTaked, setPhoneAlredyTaked] = useState(false);

  useEffect(() => {
    setPhoneAlredyTaked(() => !!admins.find((item) => item.phone === inputTelValue.value.slice(1)));
  });

  return (
    <div id="set_admins">
      <h3>Admins</h3>

      <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
        <li>SEE - видеть все ваши очереди на лебедках</li>
        <li>ADD - добавлять клиентов в очередь</li>
        <li>REMOVE - удалаять клиентов из очереди</li>
        <li>
          OWNER - с этой способность администратор может изменять настройки приложения ( назначать тренеров, других
          администраторов, изменять время работы, и внешний вид ).
          <big>ВАЖНО: Не давайте эту возможность не провереным людям, они могут завладеть вашей програмой.</big>
        </li>
      </ul>

      <table>
        <tbody>
          <tr>
            <th>Info</th>
            <th>See</th>
            <th>Add</th>
            <th>Remove</th>
            <th>owner</th>
          </tr>
          {admins.map((admin) => {
            return (
              <tr key={admin._id}>
                <td>
                  {admin.name}
                  <br />
                  {admin.phone}
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="see"
                    checked={admin.rights.includes("SEE")}
                    disabled={admin.rights.includes("ADD")}
                    onChange={(e) => {
                      removeAdmin(admin._id);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="add"
                    checked={admin.rights.includes("ADD")}
                    disabled={admin.rights.includes("REMOVE")}
                    onChange={(e) => {
                      const rights = ["SEE"];
                      if (e.target.checked) rights.push("ADD");
                      setAdminRights(admin._id, rights);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="Remove"
                    checked={admin.rights.includes("REMOVE")}
                    disabled={admin.rights.includes("OWNER")}
                    onChange={(e) => {
                      const rights = ["SEE", "ADD"];
                      if (e.target.checked) rights.push("REMOVE");
                      setAdminRights(admin._id, rights);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="Owner"
                    checked={admin.rights.includes("OWNER")}
                    disabled={!HasMoreOneOwner && admin.rights.includes("OWNER")}
                    onChange={(e) => {
                      const rights = ["SEE", "ADD", "REMOVE"];
                      if (e.target.checked) rights.push("OWNER");
                      setAdminRights(admin._id, rights);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>
        Чтобы назначить администратора, он должен зарегистрироваться в wakebooking, после чего вы сможете его найти и
        дать права администратора.
      </p>
      <label>
        Введите номер телефона клиента, которому вы хотите предоставить права администратора. <br />
        {phoneAlredyTaked && <big>Администратор с таким номером телефона уже добавлен</big>}
        <br />
        <InputPhone value={inputTelValue} onChangeValue={setInputTelValue} />
      </label>
      <button
        disabled={!inputTelValue.valid || phoneAlredyTaked}
        onClick={(e) => {
          e.preventDefault();
          if (!phoneAlredyTaked) getClientForAdmin(inputTelValue.value.slice(1));
          setInputTelValue({ value: "+380", valid: false });
        }}
      >
        Give Rights
      </button>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SetAdmins);
