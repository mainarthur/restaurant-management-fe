export default interface Action<PayloadType extends {} = {}> {
  type: string;
  payload?: PayloadType;
}
