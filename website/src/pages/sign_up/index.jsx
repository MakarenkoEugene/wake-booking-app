import React from "react";
import { Link } from "react-router-dom";

import ListSteps from '../../components/form/steps'
import FirstStep from "./first_step";

import "./sing_up.scss";

export default function SignUp({ response }) {
  return (
    <section id="sign_up">
      <h1>Sign up</h1>
      <span>
        Ваш профиль уже создан? <Link to="/login/">Перейти ко Входу</Link>
      </span>
      <br />
      <br />
      <span>
        Перейти к <Link to="/restoreprofile/">восстановлению пароля</Link>
      </span>

      <ListSteps steps={[{ text: "Подтверждения телефона" }, { text: "Дополнительная информация" }]} />

      <FirstStep />

      {/* <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="name">Имя учётной записи:</label>
        <input type="text" id="name" title="Введите имя вашей учётной записи" required />
        <span className="text_help">
          ⚠️<span>Обязательное поле.</span>
        </span> */}

      {/* <label htmlFor="email">Адрес электронной почты:</label>
        <input type="email" id="email" title="Введите свой адрес электронной почты" />
        <span className="text_help">
          ⚠️<span>Не обязательное поле.</span>
        </span> */}

      {/* <label htmlFor="password">Пароль:</label>
        <input type="password" id="password" pattern="^[A-Za-z0-9]{8,}$" title="Пароль должен состоять не менее, чем из 8 символов. Допустимые символы только латинского алфавита и цифры" required />
        <span className="text_help">
          ⚠️<span>Обязательное поле. Пароль должен состоять не менее, чем из 8 символов. Допустимые символы только латинского алфавита и цифры</span>
        </span>

        <label htmlFor="password_repeat">Повторите пароль:</label>
        <input type="password" id="password_repeat" title="Введите пароль ещё раз. Пароли должны совпадать." required />
        <span className="text_help">
          ⚠️<span>Обязательное поле. Пароли должны совпадать.</span>
        </span> */}

      {/* <label htmlFor="phone">Номер телефона:</label>
        <input type="tel" id="phone" pattern="^380[0-9]{9}$" title="380995693132" required />
        <span className="text_help">
          ⚠️<span>Обязательное поле.</span>
        </span> */}

      {/* <label htmlFor="code">Код потверждения телефона:</label>
        <input type="text" pattern="^[0-9]{4}$" id="code" required />
        <span className="text_help">
          ⚠️<span>Обязательное поле.</span>
        </span> */}

      {/* <label htmlFor="privacy">
          <input type="checkbox" name="privacy" id="privacy" defaultChecked={true} /> Я принимаю{" "}
          <Link to="/privacy/">Privacy</Link>
        </label>

        <input type="submit" value="Зарегистрироваться" />
      </form> */}
    </section>
  );
}
