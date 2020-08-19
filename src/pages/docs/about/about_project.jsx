import React from "react";
import { Link } from "react-router-dom";

import Contact from "../../../components/contact";
import myImg from "./my_small.jpeg";

import './style.scss'

export default function () {
  return (
    <div id="about_project">
      <h2>О проекте</h2>
      <p>
        WakeBooking - это не коммерческий проект, все средства в нем идут на подержание серверов, расширение и улучшение
        проекта.
      </p>
      <Contact />
      <p>
        Ознакомиться значениеоткрытой лицензией <Link to="/license/">MIT License</Link>{" "}
      </p>
      <br />
      <p>
        Текст программы и код для его запуска находятся в открытом доступе на <a href="">GitHub</a>.
      </p>
      <br />
      <p>
        Политика в отношении обработки персональных данных: <Link to="/privacy/">Privacy</Link>
      </p>
      <h4>Основные правила проекта</h4>
      <ul>
        <li>Доступность, легкая установка и пользование электронной очередью.</li>
        <li>Сохранность данных вейк парков.</li>
        <li>Безопасность личных данных пользователя.</li>
        <li>Максимально простой и интуитивно понятный интерфейс.</li>
        <li>Очень подробная документация, с ответами на все вопросы.</li>
      </ul>
      <br />

      <h4>Команда</h4>
      <div id="team">
        <div>
          <img src={myImg} alt="I`m" />
          <big>Евгений Макаренко</big>
          <p>Основатель, Разработчик, Дизайнер, Копирайтер.</p>
        </div>
      </div>
    </div>
  );
}
