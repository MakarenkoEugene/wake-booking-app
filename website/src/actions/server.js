import * as C from "../constants/server"

//server action
export const getClient = (phone) => ({ type: C.GET_CLIENT, phone });