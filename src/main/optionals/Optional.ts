import { Consumer, Runnable } from '../types';
import Verify from '../verifies/Verify';

export default class Optional<T> {
  public constructor(private readonly value: T) {
  }

  public static from<G = {}>(value: G): Optional<G> {
    return new Optional<G>(value);
  }

  public ifPresent(func: Consumer<T>): void {
    if (Verify.isNotNullOrUndefined(this.value)) {
      func(this.value);
    }
  }

  public ifPresentOrElse(presentFunc: Consumer<T>, notPresentFunc: Runnable): void {
    if (Verify.isNotNullOrUndefined(this.value)) {
      presentFunc(this.value);
    } else {
      notPresentFunc();
    }
  }
}
