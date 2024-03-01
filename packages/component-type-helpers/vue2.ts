export declare const code: string;

export default code;

export {
	ComponentType,
	ComponentProps,
	ComponentEmit,
	ComponentExposed,
} from './index';

export type ComponentSlots<T> =
	T extends new (...angs: any) => { $scopedSlots: infer S; } ? NonNullable<S> :
	T extends (props: any, ctx: { slots: infer S; attrs: any; emit: any; }, ...args: any) => any ? NonNullable<S> :
	{};
