import { Supplier } from '../../types';
import AndState from './AndState';

export default class And<T, Y> extends AndState<T, Y> {
  public constructor(
    protected readonly instance: T,
    protected readonly onValidate: Supplier<boolean>
  ) {
    super(instance, onValidate);
  }

  public get validations(): Set<Y> {
    return this._validations;
  }

  public get andInstance(): AndState<T, Y> {
    return this.getAnd();
  }

  public set isValid(value: boolean) {
    this._isValid = value;
  }

  public get isValid(): boolean {
    return this._isValid;
  }
}
