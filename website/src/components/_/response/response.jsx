import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./style.scss";

import { clearResponse } from "../../../actions";

const mapStateToProps = (store) => ({
  response: store.forms.response,
});
const mapDispatchToProps = (dispatch) => ({
  clearResponse: () => dispatch(clearResponse()),
});

function Response({ response, clearResponse }) {
  if (response) {
    const { data, status } = response;
    let bgc = "#e6e6e6";
    let massage = null;
    if (/^2..$/gm.test(status)) bgc = "#00ca5b";
    if (/^4..$/gm.test(status)) bgc = "#ebbd5f";

    if (status === 0) {
      if (data) {
        massage = data.toString();
      } else {
        massage = <p>Необработанная ошибка, обратитесь в техподдержку.</p>;
      }
    } else {
      switch (data.title ? data.title : data) {
        case "PHONE_ALREADY_TAKEN":
          massage = (
            <ul>
              <li>
                <h4>Номер телефона уже используется.</h4>
              </li>
              <li>
                Перейти во <Link to="/login/">Вход</Link>.
              </li>
              <li>
                Не помнете свой пароль? <Link to="/restoreprofile/">Восстановление пароля</Link>
              </li>
              <li>
                Вы не совершали вход в систему, а ваш номер телефона уже занят? Вы можете сбросить пароль в{" "}
                <Link to="/restoreprofile/">этом разделе</Link>
              </li>
              <li>
                Нету ответа на ваш вопрос? <Link to="/feedback/">Оставьте отзыв об этом</Link>
              </li>
            </ul>
          );
          break;

        case "SEEND_PHONE_VERIFICATION":
          massage = (
            <ul>
              <li>
                <h4>На ваш номер телефона было отправлено смс.</h4>
              </li>
              <li>
                <label htmlFor="what_to_do_without_sms">
                  <a>Что делать если смс не приходит?</a>
                </label>
                <input type="checkbox" id="what_to_do_without_sms" className="toggle" />
                <ul className="toggleElem">
                  <li>Проверить связь на вашем телефоне</li>
                  <li>Убедитесь в правильном вводе номера телефона.</li>
                  <li>Если спустя 5 минут смс не пришло. Отправите повторное смс.</li>
                  <li>
                    Повторное смс тоже не пришло? Напишите в <Link to="/feedback/">тех. подержку</Link>
                  </li>
                </ul>
              </li>
            </ul>
          );
          break;

        case "INCORRECT_PHONE_VERIFICATION":
          massage = (
            <ul>
              <li>
                <h4>Код подтверждения телефона неверный.</h4>
              </li>
              <li>
                <label htmlFor="cant_passe_code">
                  <a>Не можете пройти подтверждения телефона?</a>
                </label>
                <input type="checkbox" className="toggle" id="cant_passe_code" />
                <ul className="toggleElem">
                  <li>Вы можете повторно отправить смс с кодом подтверждения телефона.</li>
                  <li>Дождитесь смс если оно приходит с задержкой.</li>
                  <li>
                    Не спешите отправлять повторное смс если первое еще не пришло, возможно что вы водите просроченный
                    код подтверждения.
                  </li>
                  <li>
                    У вас не получается пройти подтверждения телефона. Обратитесь в{" "}
                    <Link to="/feedback/">тех. подержку</Link>
                  </li>
                </ul>
              </li>
            </ul>
          );
          break;

        case "CREATE_NEW_PROFILE":
          massage = (
            <ul>
              <li>
                <h4>Вы успешно прошли подтверждения телефона.</h4>
              </li>
              <li>Нажмите клавишу "Далее" для продолжения регистрации</li>
            </ul>
          );
          break;

        case "TIME_NOT_PASSED":
          massage = (
            <ul>
              <li>
                <h4>Запрос отклонен. Время повторного запроса еще не пришло.</h4>
              </li>
              <li>Подождите несколько минут и повторите запрос.</li>
              <li>
                Это защита от спама. Не повторяйте запрос слишком часто.
                <label htmlFor="protect_of_spam">
                  <a>Это касается 🔗</a>
                </label>
                <input type="checkbox" className="toggle" id="protect_of_spam" />
                <ul className="toggleElem">
                  <li>Отправок смс.</li>
                  <li>Получения данных из сервера</li>
                  <li>Запросов на изменения данных.</li>
                </ul>
              </li>
              <li>
                Уведомление не пропадает при повторных запросах? Обратитесь в <Link to="/feedback/">тех. подержку</Link>
              </li>
            </ul>
          );
          break;

        case "PHONE_NUMBER_MISSING":
          massage = (
            <ul>
              <li>
                <h4>Аккаунт отсутствует.</h4>
              </li>
              <li>Возможно вы ввели неправильно номер телефона.</li>
              <li>
                У вас нету аккаунта? Вы можете его <Link to="/restoreprofile/">создать.</Link>
              </li>
            </ul>
          );
          break;

        case "PASSWORD_NOT_MATCH":
          massage = (
            <ul>
              <li>
                <h4>Неверный пароль.</h4>
              </li>
              <li>
                <label htmlFor="why_cant_log_in">
                  <a>Почему я не могу войти в аккаунт?</a>
                </label>
                <input type="checkbox" className="toggle" id="why_cant_log_in" />
                <ul className="toggleElem">
                  <li>Проверте правильность ввода номера телефона и пароля.</li>
                  <li>Возможно у вас включен "Caps Lock"?</li>
                  <li>Если номер акаунта не пренадлежит вам, пароль могли изминить.</li>
                </ul>
              </li>
              <li>
                <label htmlFor="previously_logged_in">
                  <a>Я ранее входили в систему вводя код подтверждения телефона.</a>
                </label>
                <input type="checkbox" className="toggle" id="previously_logged_in" />
                <p className="toggleElem">
                  Если в аккаунте пользователя нет пароля - для аутентификация используется код подтверждения телефона,
                  если пользователь назначит пароль (для увеличения безопасности). При последующих входах в систему
                  нужно будет вводить - пароль, код подтверждения телефона будет игнорироваться.
                </p>
              </li>
              <li>
                У вас есть доступ к номеру телефона аккаунта? Вы можете{" "}
                <Link to="/restoreprofile/">сбросить пароль</Link>
              </li>
            </ul>
          );

          break;

        case "SUCCESS_SIGN_IN":
          massage = <h4>Вход успешный.</h4>;
          break;

        default:
          massage = <p>{data.title ? data.title.toString() : data.toString()}</p>;
          break;
      }
    }

    const actineClearResponse = (e) => {
      e.preventDefault();

      clearResponse();
    };

    return (
      <div id="response" style={{ backgroundColor: bgc }}>
        <span>code response - {status}</span>
        {massage}
        <button type="button" onClick={(e) => actineClearResponse(e)}>
          ✕
        </button>
      </div>
    );
  }
  return null;
}

export default connect(mapStateToProps, mapDispatchToProps)(Response);
