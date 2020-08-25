import React from "react";
import { connect } from "react-redux";
import InputPhone from "../form/input_phone";

import { addAdmin, setAdminRights, removeAdmin } from "../../../actions/config";
import { getClient } from "../../../actions/config";
import "./style.scss";

const mapStateToProps = (store) => ({
  admins: store.appSettings.admins,
});

const mapDispatchToProps = (dispatch) => ({
  getClient: (phone) => dispatch(getClient(phone)),
  addAdmin: (admin) => dispatch(addAdmin(admin)),
  setAdminRights: (_id, rights) => dispatch(setAdminRights(_id, rights)),
  removeAdmin: (_id) => dispatch(removeAdmin(_id)),
});

function SetAdmins({ admins, getClient, addAdmin, setAdminRights, removeAdmin }) {
  const HasMoreOneOwner = !!(admins.filter((admin) => admin.rights.includes("OWNER")).length - 1);
  const [inputTelValue, onChangeInputTelValue] = React.useState({ value: "+380", valid: false });

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
          <big style={{ backgroundColor: "var(--orange)" }}>
            ВАЖНО: Не давайте эту возможность не провереным людям, они могут завладеть вашей програмой.
          </big>
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
        <br />
        <InputPhone value={inputTelValue} onChangeValue={onChangeInputTelValue} />
      </label>
      <button
        disabled={!inputTelValue.valid}
        onClick={(e) => {
          e.preventDefault();
          console.log(e.target.validity.valid);
          console.log(e.target.value);
          // getClient();
        }}
      >
        Give Rights
      </button>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SetAdmins);
