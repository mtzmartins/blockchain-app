
import type { Action } from './types';

export const SET_USER = 'SET_USER';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_BALANCE = 'SET_BALANCE';

export function setUser(user:string):Action {
  return {
    type: SET_USER,
    payload: user,
  };
}

export function setToken(token:string):Action {
  console.log("Recebendo TOKEN2",token)
  return {
    type: SET_TOKEN,
    payload: token,
  };
}

export function setBalance(balance:number):Action {
  console.log("Recebendo TOKEN2",balance)
  return {
    type: SET_BALANCE,
    payload: balance,
  };
}


