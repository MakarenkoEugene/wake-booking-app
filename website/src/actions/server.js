import * as C from "../constants/server"

// call middleware only

//server action
export const getClient = (phone) => ({ type: C.GET_CLIENT, phone });