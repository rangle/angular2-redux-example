import {
  describe,
  expect,
  it,
} from '@angular/core/testing';
import {
  TypedRecord,
  makeTypedFactory,
  immutify,
} from './record.factory';

interface IPet {
  name: string;
  type: string;
};

interface IPetRecord extends TypedRecord<IPetRecord>, IPet {};

interface IPerson {
  name: string;
  pet?: IPet;
};

interface IPersonRecord extends TypedRecord<IPersonRecord>, IPerson {};


describe('Records factory', () => {

  describe('When creating a TypedRecord with a default value', () => {
    it('should allow creation providing an interface as its type', () => {
      const immITest = immutify<IPerson, IPersonRecord>({
        name: 'Darth Vader'
      });
      expect(immITest.name).toBe('Darth Vader');
    });
  });

  describe('When creating a TypedRecord with a default and current values',
    () => {
      it('should create a TypedRecord that has a current value', () => {
        const immITest = immutify<IPerson, IPersonRecord>(
          {
            name: 'Han Solo'
          }, {
            name: 'Ben Organa Solo'
          }
        );
        expect(immITest.name).toBe('Ben Organa Solo');
      });
    }
  );

  describe('When modeling data structure with TypedRecords', () => {
    it('should not reference other TypedRecords', () => {
      const immITest = immutify<IPerson, IPersonRecord>({
        name: 'Luke Skywalker',
        pet: immutify<IPet, IPetRecord>({
          name: 'Artoo',
          type: 'Droid'
        })
      });
      expect(immITest.name).toBe('Luke Skywalker');
      expect(immITest.pet.name).toBe('Artoo');
      expect(immITest.pet.type).toBe('Droid');
    });
  });

  describe('When creating multiples TypedRecords', () => {
    it('should get the Factory reference to generate instances', () => {
      const LukeRecordFactory = makeTypedFactory<IPerson, IPersonRecord>({
        name: 'Luke'
      });
      const master = LukeRecordFactory({
        name: 'Master Luke'
      });
      const councilMaster = LukeRecordFactory({
        name: 'Council Master Luke'
      });
      expect(master.name).toBe('Master Luke');
      const notMaster = master.delete('name');
      expect(notMaster.name).toBe('Luke');
      expect(councilMaster.name).toBe('Council Master Luke');

    });
  });

});
