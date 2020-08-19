import React, { Component } from "react";
import ListSteps from "../../../components/form/steps";
import "./style.scss";
import FormCreate from "./create";
import Settings from "./settings";

export default function OwnerPage() {
  return (
    <div id="owner">
      <ListSteps
        steps={[
          { text: "Основное" },
          { text: "Время работы" },
          { text: "Персонал" },
          { text: "Описание" },
          { text: "Доп. Опции" },
          { text: "Внешний вид" },
          { text: "Оплата" },
        ]}
      />
      <h1>Owner</h1>
      {/* <FormCreate /> */}
      <Settings />
    </div>
  );
}

{
  /* <div id="select_leng">
<p>Выберете язык который будет использоватся в програме:</p>
<Select
  defaultValue={{ value: "en-US", label: "English" }}
  options={[{ value: "en", label: "English" }]}
  onChange={(e) => i18n.changeLanguage(e.value)}
/>
</div> */
}
