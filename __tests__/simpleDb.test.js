import { rm, mkdir } from 'fs/promises';
import { createId } from '../simpleDb.js';

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
    const checkID = new createId(destination);
    const Kiki = {
      name: 'Kiki',
      is: 'a cat',
    };

    return checkID.save(Kiki).then(() => {
      expect(Kiki.id).toEqual(expect.any(String));
    });
  });
});
