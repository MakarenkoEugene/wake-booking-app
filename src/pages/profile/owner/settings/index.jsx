import React from "react";
import "./style.scss";
import Select from "react-select";
<<<<<<< HEAD
import InputToggle from "../../../../components/form/input_toggle";
import SetWorkTime from "../../../../components/set_work_time";
import SetWinches from "../../../../components/set_winches";
import SetAdmins from "../../../../components/set_admins";

import { connect } from "react-redux";

import { setShowIconsReserved } from "../../../../actions/config";

const mapStateToProps = (store) => ({
  showIconsReserved: store.appSettings.config.showIconsReserved,
});
const mapDispatchToProps = (dispatch) => ({
  setShowIconsReserved: (showIconsReserved) => dispatch(setShowIconsReserved(showIconsReserved)),
});

function Settings({ showIconsReserved, setShowIconsReserved }) {
=======
import SetWorkTime from "../../../../components/set_work_time";

export default function OwnerPage() {
>>>>>>> fd73a7a4c780ac691b15ad0cea22a298f1b72905
  return (
    <div id="settings">
      <div>
        <p>
          {`Ета страница предназначина для владельцев и администраторов програмы WakeBooking. \nЗдесь находится настройка вашего экземпляра програмы WakeBooking.`}
        </p>
<<<<<<< HEAD
        <h4>Ети параметры вы можете изменять в любое время по вашему желанию</h4>
=======
        <h3>Ети параметры вы можете изменять в любое время по вашему желанию</h3>
>>>>>>> fd73a7a4c780ac691b15ad0cea22a298f1b72905
        <p>
          Ети изменения вступят в силу после нажатия клавиши "Подтвердить Изменения" после этого доступ к прошлой версии
          вашей програмы будет закрыт, всем клиентам которые используют вашу програму в данный момент нужно будет
          перезагрузить страницу чтобы получить новые изменения.
        </p>
      </div>
      <section>
        <div>
          <form id="form_settings">
            <div id="select_lent">
<<<<<<< HEAD
              <h3>Languages</h3>
=======
>>>>>>> fd73a7a4c780ac691b15ad0cea22a298f1b72905
              <p>Выберете язык которые будет использоватся в програме:</p>
              <Select
                defaultValue={{ value: "en", label: "English" }}
                options={[{ value: "en", label: "English" }]}
                onChange={(e) => i18n.changeLanguage(e.value)}
              />
            </div>

<<<<<<< HEAD
            <SetWinches />

            <SetAdmins />

            <div>
              <h3>Teachers</h3>
            </div>

            <SetWorkTime />

            <div>
              <h3>Weekend</h3>
            </div>

            <div>
              <h3>Price</h3>
            </div>

            <div>
              <h3>Visual Appearance</h3>
              <InputToggle
                label={"Show Icons Reserved for teachers, winches and client: "}
                checked={showIconsReserved}
                onChangeChecked={setShowIconsReserved}
              />
            </div>
=======
            <SetWorkTime />

            <input type="datetime-local" />
>>>>>>> fd73a7a4c780ac691b15ad0cea22a298f1b72905

            <input type="submit" value="Подтвердить Изменения" />
          </form>
        </div>
<<<<<<< HEAD
        <div>
          <iframe name="APP" src="/app.html" scrolling="no" width="320" height="auto" frameBorder="0"></iframe>
        </div>
=======
        <div></div>
>>>>>>> fd73a7a4c780ac691b15ad0cea22a298f1b72905
      </section>
    </div>
  );
}
<<<<<<< HEAD

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
=======
>>>>>>> fd73a7a4c780ac691b15ad0cea22a298f1b72905
