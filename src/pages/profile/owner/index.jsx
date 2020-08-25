import React, { useEffect } from "react";
import ListSteps from "../../../components/form/steps";
import "./style.scss";
import FormCreate from "./create";
import Settings from "./settings";
import { connect } from "react-redux";

const mapStateToProps = (store) => ({
  config: store.appSettings,
});
const mapDispatchToProps = (dispatch) => ({});

function OwnerPage({ config }) {
  useEffect(() => {
    frames.APP.postMessage({ config });
  }, [config]);

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

export default connect(mapStateToProps, mapDispatchToProps)(OwnerPage);
