import { rm, mkdir } from 'fs/promises';
import { simpleDB } from '../simpleDb.js';

describe('Routes for simple-db api', () => {
  const storeDest = '../store';

  beforeEach(() => {
    return rm(storeDest, { force: true, recursive: true }).then(() => {
      return mkdir(storeDest);
    });
  });

  it('should check if a saved object has an id', () => {
    const checkID = new simpleDB(storeDest);
    const Kiki = {
      name: 'Kiki',
      is: 'a cat',
    };

    return checkID.save(Kiki).then(() => {
      expect(Kiki.id).toEqual(expect.any(String));
    });
  });

  it('should save and retrieve an object', () => {
    const savedInstance = new simpleDB(storeDest);
    const Kiki = {
      name: 'Kiki',
      is: 'a cat',
    };

    return savedInstance
      .save(Kiki)
      .then(() => {
        return savedInstance.get(Kiki.id);
      })
      .then((booger) => {
        expect(booger).toEqual(Kiki);
      });
  });

  it('should return null if no object was returned', () => {
    const getInstance = new simpleDB(storeDest);

    return getInstance.get().then((booger) => {
      expect(booger).toBeNull();
    });
  });

  it('should return all saved objects', () => {
    const savedInstance = new simpleDB(storeDest);
    const Kiki = {
      name: 'Kiki',
      is: 'a cat',
    };
    const Professor = {
      name: 'Professor Pepperoni Pizza',
      is: 'a cat',
    };

    return savedInstance
      .save(Kiki)
      .then(() => {
        savedInstance.save(Professor);
      })
      .then(() => {
        return savedInstance.getAll();
      })
      .then((catObj) => {
        expect(catObj).toEqual(expect.arrayContaining([Kiki, Professor]));
      });
  });
});
