
import type { Action } from '../actions/types';
import { SET_USER , SET_TOKEN, SET_BALANCE} from '../actions/user';

export type State = {
    name: string,
    token: string
}

const initialState = {
  name: '',
  token:''
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_USER) {
    return {
      ...state,
      name: action.payload,
    };
  }

  if (action.type === SET_TOKEN) {
    console.log("Recebendo TOKEN1")
    return {
      ...state,
      token: action.payload,
    };
    
  }

  if (action.type === SET_BALANCE) {
    console.log("Recebendo TOKEN1")
    return {
      ...state,
      balance: action.payload,
    };
    
  }
  
  return state;
}
