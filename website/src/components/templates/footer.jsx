import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer id="footer">
      <h4>Баг или опечатка?</h4>
      <p>
        Если у вас есть идеи, как улучшить содержимое сайта, пожалуйста, <Link to="/feedback/">напишите</Link>
      </p>

      <h4>Помощь проекту</h4>
      <p>
        Если у вас заинтересовал проект и вы хотите подержать и ускорить розработку, вы можете это сделать на{" "}
        <a href="https://www.patreon.com/wakebooking">patreon</a>
      </p>
      <br />
      <p>
        Политика в отношении обработки персональных данных: <Link to="/privacy/">Privacy</Link>
      </p>
      <span className="license">
        Copyright © 2020 Makarenko Eugene <Link to="/license/">MIT License</Link>
      </span>
    </footer>
  );
}

export default Footer;
