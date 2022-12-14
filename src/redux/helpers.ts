import { Dispatch } from "redux";

import Action from "./types/Action";
import ActionGenerator from "./types/ActionGenerator";

export function createAction<PayloadType extends {}>(
  name: string,
  prepare = (payload?: PayloadType) => payload,
) {
  const action: ActionGenerator<PayloadType> = (
    payload?: PayloadType,
  ): Action<PayloadType> => ({
    type: name,
    payload: prepare(payload),
  });

  action.match = (a: Action<PayloadType>): a is Action<PayloadType> =>
    a.type === action.type;

  action.type = name;
  action.toString = () => name;

  return action;
}

export function createAsyncAction<ResultType, PayloadType extends {}>(
  dispatch: Dispatch<any>,
  action: Action<PayloadType>,
) {
  return new Promise<ResultType>((res, rej) => {
    dispatch({
      ...action,
      next: (err: unknown, data: ResultType) => {
        if (err) {
          rej(err);
        } else {
          res(data);
        }
      },
    });
  });
}
