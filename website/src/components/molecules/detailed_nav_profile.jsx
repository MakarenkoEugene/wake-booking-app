import React from "react";
import { Link } from "react-router-dom";

export default function DocsNavBar() {
  return (
    <ul>
      <li>
        <span>Навигация по Профилю</span>
      </li>
      <li>
        <Link to="/profile/">Клиент</Link>
      </li>
      <li>
        <Link to="/profile/teacher/">Тренер</Link>
      </li>
      <li>
        <Link to="/profile/admin/">Админ</Link>
      </li>
      <li>
        <Link to="/profile/owner/">Владелец</Link>
        <hr />
      </li>
    </ul>
  );
}
