import React from "react";
import { connect } from "react-redux";

import Select from "react-select";
import InputToggle from "../atoms/input_toggle";
import SetWorkTime from "../organisms/set_work_time";
import SetWinches from "../organisms/set_winches";
import SetAdmins from "../organisms/set_admins";
import SetTeachers from "../organisms/set_teachers";


import { setShowIconsReserved } from "../../actions/app_settings";

const mapStateToProps = (store) => ({
  showIconsReserved: store.appSettings.config.showIconsReserved,
});
const mapDispatchToProps = (dispatch) => ({
  setShowIconsReserved: (showIconsReserved) => dispatch(setShowIconsReserved(showIconsReserved)),
});

function Settings({ showIconsReserved, setShowIconsReserved }) {
  return (
    <div id="settings">
      <div>
        <p>
          {`Ета страница предназначина для владельцев и администраторов програмы WakeBooking. \nЗдесь находится настройка вашего экземпляра програмы WakeBooking.`}
        </p>
        <h4>Ети параметры вы можете изменять в любое время по вашему желанию</h4>
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
              <h3>Languages</h3>
              <p>Выберете язык которые будет использоватся в програме:</p>
              <Select
                defaultValue={{ value: "en", label: "English" }}
                options={[{ value: "en", label: "English" }]}
                onChange={(e) => i18n.changeLanguage(e.value)}
              />
            </div>

            <SetWinches />

            <SetAdmins />

            <SetTeachers />

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

            <input type="submit" value="Подтвердить Изменения" />
          </form>
        </div>
        <div>
          <iframe name="APP" src="/app.html" scrolling="no" width="320" height="auto" frameBorder="0"></iframe>
        </div>
      </section>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
