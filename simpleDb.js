import path from 'path';
import shortid from 'shortid';

export class createId {
  constructor(destination) {
    const filename = `${shortid.generate()}.txt`;
    this.newFile = path.join(destination, filename);
  }
}
