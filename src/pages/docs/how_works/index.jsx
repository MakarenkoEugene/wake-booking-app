import React from "react";

import ModelDb from "./model_db/model_bd";
import FunctionServer from "./function_server";

export default function () {
  return (
    <div id="how_works">
      <div id="server">
        <h2>Как это работает?</h2>
        <h3>Серевер</h3>
        <p>
          Саревер запушеный на сервисе <a href="https://aws.amazon.com/ru/ec2/">Amazon EC2</a>. Также используется{" "}
          <a href="https://aws.amazon.com/elasticloadbalancing/?nc1=h_ls">LoadBalancers</a> - это даст возможность легко
          расширяться и работать без отключения и перезагрузки серверов.
        </p>
      </div>

      <div id="data_base">
        <h3>База Данных</h3>
        <p>
          Все данные про клиентов и очереди на вейк парках хранятся на <a href="https://www.mongodb.com/">mongodb</a>.{" "}
          <br />
        </p>

        <h3>Модель бызза данных выглядит так:</h3>
        <ModelDb />
      </div>

      <div id="function_server">
        <h3>Основные функцыии сервера:</h3>
        <FunctionServer />
      </div>
    </div>
  );
}
