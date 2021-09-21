import { readFile, writeFile, readdir } from 'fs/promises';
import path from 'path';
import shortid from 'shortid';

export class simpleDB {
  constructor(instance) {
    this.storeDest = instance;
  }

  filePath(id) {
    return `${this.storeDest}/${id}.json`;
  }

  save(obj) {
    obj.id = shortid.generate();
    const filePath = this.filePath(obj.id);
    const jString = JSON.stringify(obj);
    return writeFile(filePath, jString)
      .then(() => {
        return obj.id;
      });
  }

  get(id) {
    const getPathById = this.filePath(id);
    return readFile(getPathById, 'utf-8')
      .then((contentText) => JSON.parse(contentText))
      .catch((err) => {
        if (err.code === 'ENOENT') {
          return null;
        }
        throw err;
      });
  }

  getAll() {
    const source = './store';

    return readdir(this.storeDest).then(cats => {
      return Promise.all(
        cats.map(catObj => {
          return path.join(source, catObj);
        })
      )
        .then((whatever) => {
          return Promise.all(
            whatever.map(catIds => {
              return readFile(catIds, 'utf-8')
                .then((contentText) => JSON.parse(contentText));
            })
          );
        });
    });
  }
}
