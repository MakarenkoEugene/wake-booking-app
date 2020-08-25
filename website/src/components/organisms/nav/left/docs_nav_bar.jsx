import React from "react";

export default function DocsNavBar(params) {
  return (
    <ul>
      <li>
        <span>Навигация по Документации</span>
      </li>
      <li>
        <a href="/docs/#docs">Введение</a>
      </li>
      <li>
        <a href="/docs/#why_need">Зачем мне прогрмма?</a>
      </li>
      <li>
        <a href="/docs/#how_works">Как это работает?</a>
        <ul>
          <li>
            <a href="/docs/#server">Серевер</a>
          </li>
          <li>
            <a href="/docs/#data_base">База Данных</a>
          </li>
          <li>
            <a href="/docs/#function_server">Функцыии сервера</a>
          </li>
        </ul>
      </li>
      <li>
        <a href="/docs/#grow_plan">План развития</a>
      </li>
      <li>
        <a href="/docs/#security">Защита</a>
      </li>
      <li>
        <a href="/docs/#more_services">Доп. услуги</a>
      </li>
      <li>
        <a href="/docs/#about_project">О проекте</a>
        <hr />
      </li>
    </ul>
  );
}
