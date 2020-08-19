import React from "react";
import "./style.scss";
import Select from "react-select";
import SetWorkTime from "../../../../components/set_work_time";

export default function OwnerPage() {
  return (
    <div id="settings">
      <div>
        <p>
          {`Ета страница предназначина для владельцев и администраторов програмы WakeBooking. \nЗдесь находится настройка вашего экземпляра програмы WakeBooking.`}
        </p>
        <h3>Ети параметры вы можете изменять в любое время по вашему желанию</h3>
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
              <p>Выберете язык которые будет использоватся в програме:</p>
              <Select
                defaultValue={{ value: "en", label: "English" }}
                options={[{ value: "en", label: "English" }]}
                onChange={(e) => i18n.changeLanguage(e.value)}
              />
            </div>

            <SetWorkTime />

            <input type="datetime-local" />

            <input type="submit" value="Подтвердить Изменения" />
          </form>
        </div>
        <div></div>
      </section>
    </div>
  );
}
