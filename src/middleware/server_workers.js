// const serverPath = "https://93.78.248.60:80/wbapp/";
const serverPath = "https://localhost:80/wbapp/";

import { stringify } from "./function";

export const setSession = (session) => localStorage.setItem("SESSION", JSON.stringify(session));
const getSession = () => JSON.parse(localStorage.getItem("SESSION"));

export function setReservationTime({ date, timesList, winchId, parkId, teacherId }) {
  const data = { _session: getSession(), date, timesList, winchId, parkId };
  if (teacherId) data.teacherId = teacherId;

  const option = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: stringify(data),
  };

  return fetch(`${serverPath}client/settimes`, option).then((res) => {
    if (res.status === 200) return res.json();
    throw res;
  });
}

export function deleteReservationTimeItem({ date, time, winchId, teacherId }) {
  const data = { _session: getSession(), date, time, winchId };
  if (teacherId) data.teacherId = teacherId;

  const option = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: stringify(data),
  };

  return fetch(`${serverPath}client/deletetime`, option).then((res) => {
    if (res.status === 200) return res.json();
    throw res;
  });
}

export function signOut() {
  const data = { _session: getSession() };
  const option = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: stringify(data),
  };

  return fetch(`${serverPath}client/signout`, option)
    .then((res) => {
      if (res.status === 200) return res.json();
      throw res;
    })
    .then(({ _session, ...arg }) => {
      setSession(_session);
      return arg;
    });
}

export function cleanSession() {
  const data = { _session: getSession() };
  const option = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: stringify(data),
  };

  return fetch(`${serverPath}client/cleansession`, option)
    .then((res) => {
      if (res.status === 200) return res.json();
      throw res;
    })
    .then(({ _session, ...arg }) => {
      setSession(_session);
      return arg;
    });
}

export function signUp({ phone, codeVerification }) {
  const data = { phone: phone, _session: getSession() };
  if (codeVerification) data.codeVerification = codeVerification;

  const option = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: stringify(data),
  };

  return fetch(`${serverPath}client/signup`, option)
    .then((res) => {
      if (res.status === 200 || res.status === 201) return res.json();
      throw res;
    })
    .then(({ _session, ...arg }) => {
      setSession(_session);
      return arg;
    });
}

export function update({ name, password }) {
  const data = { _session: getSession() };

  if (name) data.name = name;
  if (password) data.password = password;
  console.log(data);
  const option = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: stringify(data),
  };

  return fetch(`${serverPath}client/update`, option)
    .then((res) => {
      if (res.status === 200) return res.json();
      throw res;
    })
    .then(({ _session, ...arg }) => {
      setSession(_session);
      return arg;
    });
}

export function signIn(form) {
  const data = { _session: getSession() };

  if (form) {
    const { inputPhoneValue, inputCodeVerificationValue, inputPasswordValue, inputNameValue } = form;

    if (inputPhoneValue) data.phone = inputPhoneValue.slice(1);
    if (inputNameValue) data.name = inputNameValue;
    if (inputPasswordValue) data.password = inputPasswordValue;
    if (inputCodeVerificationValue) data.codeVerification = inputCodeVerificationValue;
  }

  const option = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: stringify(data),
  };

  return fetch(`${serverPath}client/signin`, option)
    .then((res) => {
      if (res.status === 200) return res.json();
      throw res.json();
    })
    .then(({ _session, ...arg }) => {
      setSession(_session);
      return arg;
    });
}

export function checkPhone(phone) {
  return fetch(`${serverPath}client/${phone}`).then((res) => {
    if (res.status === 200) return res.json();
    throw res;
  });
}

export function getConfig(park) {
  return fetch(`${serverPath}/${park}/config`).then((res) => {
    if (res.status === 200) return res.json();
    throw res;
  });
}

export function getWinchTurnDate(winchId, date) {
  return fetch(`${serverPath}/winch/${winchId}/${date}`).then((res) => {
    if (res.status === 200) return res.json();
    throw res;
  });
}

export function getTeacherTurnDate(teacherId, date) {
  return fetch(`${serverPath}/teacher/${teacherId}/${date}`).then((res) => {
    if (res.status === 200) return res.json();
    throw res;
  });
}
