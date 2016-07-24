import {
  Map,
  Record,
  Iterable,
} from 'immutable';

/**
 * Interface that inherit from Immutable.Map overriding all methods that would
 * return a new version of the Immutable.Map itself, returning <T> instead.
 * Although it is possible to do, this interface is not currently
 * supporting a different Immutable.Map rather than Map<string, any>. Thus
 * all TypedRecord<T> operators will have <any> as the object type and
 * notSetValue argument, when performing functional programming changes.
 * Key will always be a string.
 *
 * Map<string, any> is a very flexible combination that supports basically
 * everything. However another interface can be created between TypedRecord
 * and Immutable.Map to support the generic Map arguments <K> and <V>.
 *
 * The implementation of this interface requires two interfaces. One
 * representing the target data structure, and another the Record itself.
 *
 * For instance:
 *   interface IPerson {
 *     name: string;
 *   }
 *
 *   interface IPersonRecord extends from TypedRecord<IPersonRecord>, IPerson {}
 *
 * @see Test for examples
 */
export interface TypedRecord<T extends TypedRecord<T>>
extends Map<string, any> {

  set: (prop: string, val: any) => T;
  delete: (key: string) => T;
  remove: (key: string) => T;
  clear: () => T;
  update: {
    (updater: (value: T) => any): T;
    (key: string, updater: (value: any) => any): T;
    (key: string, notSetValue: any, updater: (value: any) => any): T;
  };
  merge: (obj: any) => T;
  mergeWith: (
    merger: (previous?: any, next?: any, key?: string) => any,
    obj: any
  ) => T;
  mergeDeep: (obj: any) => T;
  mergeDeepWith: (
    merger: (previous?: any, next?: any, key?: string) => any,
    obj: T
  ) => T;
  setIn: (keyPath: any[] | Iterable<any, any>, value: any) => T;
  deleteIn: (keyPath: Array<any> | Iterable<any, any>) => T;
  removeIn: (keyPath: Array<any> | Iterable<any, any>) => T;
  updateIn: {
    (keyPath: any[] | Iterable<any, any>, updater: (value: any) => any): T;
    (
      keyPath: any[] | Iterable<any, any>,
      notSetValue: any,
      updater: (value: any) => any
    ): T
  };
  mergeIn: (keyPath: any[] | Iterable<any, any>, obj: T) => T;
  mergeDeepIn: (keyPath: any[] | Iterable<any, any>, obj: T) => T;
  withMutations: (mutator: (mutable: T) => any) => T;
  asMutable: () => T;
  asImmutable: () => T;
};

/**
 * Enables creation of a speficied TypedRecord factory. Every record instance 
 * produced from the returned function, will have defined all values of the 
 * provided argment {obj} as the default values of an Immutable.Record. The 
 * arguments required to create another instance of the TypedRecord are typed to
 * the <E>.
 *
 * This function is also necessary to decouple the Record "type" creation
 * from the instance creation, making possible to generate a TypedRecord with
 * the default intended value and from that generate multiple other Records of
 * the same type.
 *
 * The caller must provide two interfaces described below:
 *
 * <T> is the interface that is extending TypedRecord<T> and send itself
 * as its generic argument, filling the gap between the <E> (entity) and
 * the TypedRecord<T>.
 *
 * <E> is the data structure, POJO, entity, or model object that <T> MUST also
 * extend from, so that it inherits all of its properties and the {immutify}
 * method can also have a typed <E> argument.
 *
 * @param obj is a plain JS that meets the requirements described in the
 * provided <E> interface. This object is used to set the default values of the
 * Immutable.Record
 * @returns {function(E=): T} a function Factory to produce instances of a
 * TypedRecord<T>
 * @see immutify
 */
export function makeTypedFactory<E, T extends TypedRecord<T> & E>(obj: E):
  (val?: E) => T {

  const ImmutableRecord = Record(obj);
  return function TypedFactory(val: E = null): T {
    return new ImmutableRecord(val) as T;
  };
}

/**
 * Utility function to generate an Immutable object for the provided type.
 * The caller must provide two interfaces described below:
 *
 * <T> is the interface that is extending TypedRecord<T> and send itself
 * as its generic argument, filling the gap between the <E> (entity) and
 * the TypedRecord<T>.
 *
 * <E> is the data structure, POJO, entity, or model object that <T> MUST also
 * extend from, so that it inherits all of its properties and this immutify
 * method can also have a typed <E> argument.
 *
 * This Method also does not return the TypedFactory, which means that it will
 * be impossible to generate new instances of the same TypedFactory. This is
 * ideal for scenarios where you are performing an operation that produces
 * one instance of <T>, with either a default or current val see the following
 * params:
 *
 * @param defaultVal is the default value for the created record type.
 * @param val is an optional attribute representing the current value for this
 * Record.
 * @returns {T} that is the new created TypedRecord
 */
export function immutify<E, T extends TypedRecord<T> & E>(
  defaultVal: E,
  val: E = null): T {

  const TypedRecordFactory = makeTypedFactory<E, T>(defaultVal);
  return val ? TypedRecordFactory(val) : TypedRecordFactory();
};
