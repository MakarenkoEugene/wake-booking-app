// import * as C from "../constants/server";
// import { setLoading, signUpRes, setDelaySendingRepeatedSMS, setUser } from "../actions";

// export default () => (next) => async (action) => {
//   switch (action.type) {
//     // need change
//     // case SIGN_IN_REQ:
//     //   next(setLoading(true));
//     //   fetch(`${process.env.SERVER_PATH}client/signin`, option)
//     //     .then((res) => {
//     //       res.json().then((data) => {
//     //         console.log(data, status);
//     //         if (data.user) next(setUser(data.user));
//     //         next(signUpRes({ status: res.status, data }));
//     //       });
//     //     })
//     //     .catch((error) => next(signUpRes({ status: 0, massage: error })))
//     //     .finally(() => next(setLoading(false)));

//     //   break;

//     // // need change
//     // case SIGN_UP_REQ:
//     // next(setLoading(true));

//     // fetch(`${process.env.SERVER_PATH}client/signup`, option)
//     //   .then((res) => {
//     //     res.json().then((data) => {
//     //       if (data.needToWait) next(setDelaySendingRepeatedSMS(Math.ceil(data.needToWait / 1000)));
//     //       if (data === "CREATE_NEW_PROFILE" || (data && data.title === "CREATE_NEW_PROFILE")) {
//     //         next(setUser(data.user));
//     //       }

//     //       next(signUpRes({ status: res.status, data }));
//     //     });
//     //   })
//     //   .catch((error) => next(signUpRes({ status: 0, massage: error })))
//     //   .finally(() => next(setLoading(false)));

//     // break;

//     case C.GET_CLIENT:
//       try {
//         next(setLoading(true));

//         const res = await fetch(`${process.env.SERVER_PATH}client/${action.phone}`);
//         if (res.status !== 200) throw res;
//         const client = await res.json();
//         console.log(client);
//       } catch (error) {
//         console.log("CLIENT_NOT_FOUND", error);
//       } finally {
//         next(setLoading(false));
//       }
//       break;

//     default:
//       next(action);
//   }
// };

class API {
  constructor() {
    this.SERVER_PATH = process.env.SERVER_PATH;
  }

  async getClient(phone) {
    try {
      const res = await fetch(`${this.SERVER_PATH}client/${phone}`);
      if (res.status !== 200) throw res;

      return await res.json();
    } catch (error) {
      return error;
    }
  }
}

export default new API();
