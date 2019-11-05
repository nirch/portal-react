import { LOGIN, LOGOUT } from "./actions";

export default function activeUserReducer(state = null, action) {
  let newState = state;
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      newState = payload.activeUser;
      break;
    case LOGOUT:
      newState = null;
      break;
  }

  return newState;
}
