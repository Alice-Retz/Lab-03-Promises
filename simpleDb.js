import { readFile } from 'fs/promises';
import { writeFile } from 'fs/promises';
import path from 'path';
import shortid from 'shortid';

export class simpleDB {
  constructor(instance) {
    this.storeDest = instance;
  }

  filePath(id){
    const fileName = `${id}.json`;
    const filePath = path.join(this.storeDest, fileName);
    return filePath;

  }

  save(obj) {
    obj.id = shortid.generate();
    const filePath = this.filePath(obj.id);
    const jString = JSON.stringify(obj);
    return writeFile(filePath, jString);
  }

  get(id) {
    const getPathById = this.filePath(id);
    return readFile(getPathById, 'utf-8').then(contentText => 
      JSON.parse(contentText)).catch((err) => {
      if (err.code === 'ENOENT') {
        return null;
      }
      throw err;
    });    
  }
}
