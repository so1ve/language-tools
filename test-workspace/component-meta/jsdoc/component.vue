<script setup lang="ts">
type E = {
  /**
	 * Emitted when foo...
	 * @abstract
	 */
  foo111: [value: string];
	// /**
	//  * Emitted when foo...
	//  * @abstract
	//  */
	// (e: 'bar', data: number): void;
}
const emit = defineEmits<E>();
emit('foo111', '')
type RecordToUnion<T extends Record<string, any>> = T[keyof T];
type a = RecordToUnion<{
	foo111: {
		/** a */
		(evt: 'foo111', ...args: []): void;
	},
	foo1112222: {
		/** a22323 */
		(evt: 'foo222', ...args: [123]): void;
	}
}>
type ShortEmits<T extends Record<string, any>> = UnionToIntersection<RecordToUnion<{
	[K in keyof T]: {
		/** a */
		(evt: K, ...args: T[K]): void;
	}
}>>;
type ccc= ShortEmits
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type c = UnionToIntersection<a>
// type ShortEmits<T extends Record<string, any>> = {
// 	(evt: K, ...args: T[K]): void;
// };
// type b = ShortEmits<{
//   /**
// 	 * Emitted when foo...
// 	 * @abstract
// 	 */
//   foo111: [value: string];
// }>

const aaa= {} as c
aaa('foo111')


defineProps<{
  /** Some prop... */
  foo: string
}>();
</script>