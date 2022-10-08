export enum CounterAction {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  INCREMENT_ASYNC = 'INCREMENT_ASYNC',
}

export enum ScriptActions {
  START_SCRIPT = 'START_SCRIPT',
  STOP_SCRIPT = 'STOP_SCRIPT',
}

export enum LoggerActions {
  CODE = 'CODE',
  DEBUG = 'DEBUG',
  ERROR = 'ERROR',
  CLEAR = 'CLEAR',
}

export enum WorkerTypes {
  START = 'START',
  START_ERROR = 'ERROR',
  START_SUCCESSFUL = 'SUCCESSFUL',
  CLEAR_MESSAGE = 'CLEAR_MESSAGE',
}
