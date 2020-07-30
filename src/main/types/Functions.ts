export type Consumer<Param> = (t: Param) => void;
export type BiConsumer<ParamA, ParamB> = (t: ParamA, u: ParamB) => void;

export type Func<Param, Return> = (t: Param) => Return;
export type BiFunction<ParamA, ParamB, Return> = (t: ParamA, u: ParamB) => Return;
export type TriFunction<ParamA, ParamB, ParamC, Return> = (a: ParamA, b: ParamB, c: ParamC) => Return;

export type UnaryOperator<ParamReturn> = Func<ParamReturn, ParamReturn>;

export type Predicate<Param> = (t: Param) => boolean;
export type BiPredicate<ParamA, ParamB> = (t: ParamA, u: ParamB) => boolean;

export type Supplier<Return> = () => Return;
export type Runnable = () => void;


// Dummy functions to use as fallBack
// eslint-disable-next-line no-unused-vars
export const ConsumerImpl: Consumer<any> = (_) => {
};
export const RunnableImpl: Runnable = () => {
};
