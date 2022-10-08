import Action from "./Action";

interface ActionGenerator<PayloadType extends {}> {
  (payload?: PayloadType): Action<PayloadType>;
  type: string;
  match(a: Action<PayloadType>): a is Action<PayloadType>;
}

export default ActionGenerator;
