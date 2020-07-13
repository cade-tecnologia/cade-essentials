import { Supplier } from '../../types';

export default class AndState<T, Y> {
  protected readonly _validations: Set<Y> = new Set<Y>();
  private __isValid!: boolean

  public constructor(
    private readonly _instance: T,
    private readonly _onValidate: Supplier<boolean>,
  ) { }

  public and(): T {
    return this._instance;
  };

  public validade(): boolean {
    return this._onValidate();
  }

  protected getAnd(): AndState<T, Y> {
    return this;
  }

  protected set _isValid(value: boolean) {
    this.__isValid = value;
  }

  protected get _isValid(): boolean {
    return this.__isValid;
  }
}
