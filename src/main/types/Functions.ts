export type Consumer<Param> = (t: Param) => void;
export type BiConsumer<ParamA, ParamB> = (t: ParamA, u: ParamB) => void;
export type OptionalConsumer<Param> = (t?: Param) => void;
export type OptionalBiConsumer<ParamA, ParamB> = (t: ParamA, u?: ParamB) => void;
export type OptionalAllBiConsumer<ParamA, ParamB> = (t?: ParamA, u?: ParamB) => void;

export type Func<Param, Return> = (t: Param) => Return;
export type BiFunc<ParamA, ParamB, Return> = (t: ParamA, u: ParamB) => Return;
export type TriFunc<ParamA, ParamB, ParamC, Return> = (a: ParamA, b: ParamB, c: ParamC) => Return;
export type OptionalFunc<Param, Return> = (t?: Param) => Return;
export type OptionalBiFunc<ParamA, ParamB, Return> = (t: ParamA, u?: ParamB) => Return;
export type OptionalAllBiFunc<ParamA, ParamB, Return> = (t?: ParamA, u?: ParamB) => Return;

export type UnaryOperator<ParamReturn> = Func<ParamReturn, ParamReturn>;
export type OptionalUnaryOperator<ParamReturn> = OptionalFunc<ParamReturn, ParamReturn>;

export type Predicate<Param> = (t: Param) => boolean;
export type BiPredicate<ParamA, ParamB> = (t: ParamA, u: ParamB) => boolean;
export type OptionalPredicate<Param> = (t: Param) => boolean;
export type OptionalBiPredicate<ParamA, ParamB> = (t: ParamA, u?: ParamB) => boolean;
export type OptionalAllBiPredicate<ParamA, ParamB> = (t?: ParamA, u?: ParamB) => boolean;

export type Supplier<Return> = () => Return;
export type Runnable = () => void;


// Dummy functions to use as fallBack
// eslint-disable-next-line no-unused-vars
export function ConsumerImpl<T = any>(_: T): void {}

export const RunnableImpl: Runnable = () => {
};
