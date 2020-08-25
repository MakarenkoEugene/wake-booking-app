import { SIGN_UP_REQ, GET_USER, SIGN_IN_REQ } from "../constants";
import { setLoading, signUpRes, setDelaySendingRepeatedSMS, setUser } from "../actions";

export default () => (next) => (action) => {
  const option = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(action.data),
  };

  switch (action.type) {
    case SIGN_IN_REQ:
      next(setLoading(true));
      fetch(`${process.env.SERVER_PATH}client/signin`, option)
        .then((res) => {
          res.json().then((data) => {
            console.log(data, status);
            if (data.user) next(setUser(data.user));
            next(signUpRes({ status: res.status, data }));
          });
        })
        .catch((error) => next(signUpRes({ status: 0, massage: error })))
        .finally(() => next(setLoading(false)));

      break;

    case SIGN_UP_REQ:
      next(setLoading(true));

      fetch(`${process.env.SERVER_PATH}client/signup`, option)
        .then((res) => {
          res.json().then((data) => {
            if (data.needToWait) next(setDelaySendingRepeatedSMS(Math.ceil(data.needToWait / 1000)));
            if (data === "CREATE_NEW_PROFILE" || (data && data.title === "CREATE_NEW_PROFILE")) {
              next(setUser(data.user));
            }

            next(signUpRes({ status: res.status, data }));
          });
        })
        .catch((error) => next(signUpRes({ status: 0, massage: error })))
        .finally(() => next(setLoading(false)));

      break;

    case GET_USER:
      fetch(`${process.env.SERVER_PATH}client/`)
        .then((res) => {
          if (res.status === 200) {
            res.json().then((data) => {
              console.log(data);
              next(setUser((data && data.client) || data));
            });
            return;
          }
          console.log("CLIENT_SESSION_IS_EMPTY");
        })
        .catch((err) => console.log(err));

      break;

    default:
      next(action);
  }
};
