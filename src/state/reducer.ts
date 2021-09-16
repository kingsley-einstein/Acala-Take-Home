import { State } from ".";

interface Action {
  type: "CHANGE_ENDPOINT" | "EVENT_FETCHED" | "API_INJECTED";
  payload: any;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "CHANGE_ENDPOINT":
      return {
        ...state,
        endpoint: action.payload
      };
    case "EVENT_FETCHED":
      return {
        ...state,
        events: action.payload
      };
    case "API_INJECTED":
      return {
        ...state,
        api: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
