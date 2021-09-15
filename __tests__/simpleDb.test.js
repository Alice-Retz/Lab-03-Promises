import { rm, mkdir } from 'fs/promises';
import { simpleDB } from '../simpleDb.js';

describe('Routes for simple-db api', () => {
  // create a link to destination folder
  // set up beforeEach to have a clean working slate
  // First test: does saved object have id?
  // Write the function
  // Second test: save and get objects
  // Write the function

  const destination = './__tests__/dest/';

  beforeEach(() => {
    return rm(destination, { force: true, recursive: true }).then(() => {
      return mkdir(destination);
    });
  });

  it('should check if a saved object has an id', () => {
    const checkID = new simpleDB(destination);
    const Kiki = {
      name: 'Kiki',
      is: 'a cat',
    };

    return checkID.save(Kiki).then(() => {
      expect(Kiki.id).toEqual(expect.any(String));
    });
  });

  it('should save and retrieve an object', () => {
    const savedInstance = new SavedObject(destination);
    const getInstance = new GetObject(id);
    const Kiki = {
      name: 'Kiki',
      is: 'a cat',
    };

    return savedInstance
      .save(Kiki)
      .then(() => {
        return getInstance.get();
      })
      .then((booger) => {
        //Kiki.id?
        expect(booger).toEqual(Kiki);
      });
  });

  it('should return null if no object was returned', () => {
    const getInstance = new GetObject(id);

    return getInstance.get().then((booger) => {
      expect(booger).toBeNull();
    });
  });
});
