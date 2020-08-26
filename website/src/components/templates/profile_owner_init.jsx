import React from "react";
import Select from "react-select";

export default function OwnerPage() {
  return (
    <form id="form_create">
      <p>
        {`Ета страница предназначина для людей которые хотят стать владельцами програмы WakeBooking. 
        Заполнив форму вы получите достуб к своее личной програме и её настроики.
        В дальнейшем на етой странице будет настройка вашей програмы WakeBooking.`}
      </p>
      <h3>Чтобы стать владельцем програмы WakeBooking вам нужно заполнить форму.</h3>
      <h3>Ето ключевые настроики вы не сможете изменить их в будушем.</h3>
      <label htmlFor="park_name">
        Введите название вашего вейк парка:
        <input type="text" name="park_name" placeholder="" id="park_name" />
      </label>

      <div id="select_region">
        <p>Выберете регион в котором находится вейк парк:</p>
        <Select
          defaultValue={{ value: "ua", label: "Ukraine" }}
          options={[{ value: "ua", label: "Ukraine" }]}
          onChange={(e) => i18n.changeLanguage(e.value)}
        />
      </div>

      <input type="submit" value="Next ➞" />
    </form>
  );
}
