import React, { useEffect } from "react";
import { connect } from "react-redux";

import { init } from "./action/";

import Info from "./components/info";
import ClientNav from "./components/client_nav/client_nav";
import Calendar from "./components/date/calendar";
import Winch from "./components/winch";
import Teacher from "./components/teacher";
import TimesList from "./components/time/times_list";
import Form from "./components/form/form";
import Alert from "./components/alert";

import "./style/style.scss";
import "./style/reset.scss";

function App({ init, loading, showClinetNav, config, container, accessDenied }) {
  useEffect(() => {
    const listenerMassageEvent = ({ data }) => init(data);

    window.addEventListener("message", listenerMassageEvent);

    return () => window.removeEventListener("message", listenerMassageEvent);
  });

  if (accessDenied)
    return (
      <div style={{ textTransform: "none" }}>
        <br />
        <h2>🚨 Access Denied...</h2>
        <br />
        <p>
          Please check{" "}
          <a href="https://wakebooking.space/" style={{ color: "#4285f4" }}>
            Your setting
          </a>
          .
        </p>
        <br />
        <a href="https://wakebooking.space/" style={{ color: "#4285f4" }}>
          Or subscription passed.
        </a>
        <br />
        <br />
        <a href="https://wakebooking.space/" style={{ color: "#4285f4", textAlign: "right", fontSize: "9px" }}>
          Wakebooking
        </a>
      </div>
    );
  if (!config) return null;
  for (const key in config.config.color) container.style.setProperty(`--${key}`, `#${config.config.color[key]}`);

  return (
    <div className={loading ? "loading" : ""} ref={this.container}>
      <Info />
      <Alert />
      {showClinetNav ? (
        <ClientNav />
      ) : (
        <>
          <Calendar />
          <Winch />
          <Teacher />
          <TimesList />
          <Form />
        </>
      )}
    </div>
  );
}

const mapStateToProps = (store) => ({
  accessDenied: store.accessDenied,
  loading: store.loading,
  config: store.config,
  showClinetNav: store.clientNav.isShow,
});

const mapDispatchToProps = (dispatch) => ({
  init: (data) => dispatch(init(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
