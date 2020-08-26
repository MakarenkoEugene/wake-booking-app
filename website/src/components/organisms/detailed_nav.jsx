import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Select from "react-select";
import Docs from "../molecules/detailed_nav_docs";
import Profile from "../molecules/detailed_nav_profile";

import { closseNavBar, showNavBar } from "../../actions";

const mapStateToProps = (store) => ({
  isClosse: store.navBar.isClosse,
});

const mapDispatchToProps = (dispatch) => ({
  closseNavBar: () => dispatch(closseNavBar()),
  showNavBar: () => dispatch(showNavBar()),
});

function NavBar({ isClosse, closseNavBar, showNavBar, ...props }) {
  const { t, i18n } = useTranslation();
  if (isClosse)
    return (
      <button id="nav_btn_show" onClick={() => showNavBar()}>
        ❯
      </button>
    );

  return (
    <nav id="left_nav">
      <button style={{ fontSize: "0.7em" }} id="nav_btn_closse" onClick={() => closseNavBar()}>
        ← {t("Close navigation")}
      </button>
      <Switch>
        <Route path="/docs/" component={Docs} />
        <Route path="/profile/" component={Profile} />
      </Switch>

      <ul>
        <li>
          <span>{t("LANGUAGE")}</span>
          <Select
            defaultValue={{ value: "en-US", label: "English" }}
            options={[
              { value: "ru", label: "Руский" },
              { value: "en-US", label: "English" },
              { value: "ua", label: "Українська" },
            ]}
            onChange={(e) => i18n.changeLanguage(e.value)}
          />
        </li>
        <li>
          <hr />
        </li>
        <li>
          <span>{t("OTHER")}</span>
        </li>
        <li>
          <Link to="/changes/">{t("Change log")}</Link>
        </li>
        <li>
          <Link to="/feedback/">{t("Feedback")}</Link>
        </li>
        <li>
          <Link to="/feedback/">{t("Bug or typo?")}</Link>
        </li>
        <li>
          <Link to="/assistance/">{t("Project Assistance")}</Link>
        </li>
      </ul>
    </nav>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
