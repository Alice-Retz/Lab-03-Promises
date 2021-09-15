import path from 'path';
import shortid from 'shortid';

export class simpleDB {
  constructor(destination) {
    const filename = `${shortid.generate()}.txt`;
    this.newFile = path.join(destination, filename);
  }
}
