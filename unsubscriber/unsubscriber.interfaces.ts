// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConstructableForMixin = new (...args: any[]) => {
    ngOnDestroy(): void;
};
