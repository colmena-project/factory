// import { handleResponse, handleError } from './response';
import Parse, { Error } from 'parse';
import { ParseServer } from '../../lib/parse';

const getAll = async (model: string, displayLimit: number, page: number) => {
  const ParserObject = ParseServer.Object.extend(model);
  const query = new ParseServer.Query(ParserObject);
  query.limit(displayLimit);
  query.skip(page * displayLimit);
  query.withCount();
  const results = await query.find();
  return results;
};

const findBy = async (model: string, findByData: string[], displayLimit: number, page: number) => {
  const ParserObject = ParseServer.Object.extend(model);
  const query = new ParseServer.Query(ParserObject);
  // console.log(findByData);
  Object.entries(findByData).forEach((entry) => {
    // console.log(entry);
    const [key, value] = entry;
    // console.log(value);
    query.startsWith(key, value);
  });
  query.limit(displayLimit);
  query.skip(page * displayLimit);
  query.withCount();
  const results = await query.find();
  return results;
};

const post = (model: string, resource: string[]) => {
  const ParserObject = ParseServer.Object.extend(model);
  const parseData = new ParserObject();
  parseData.save(resource).then(
    (data: Parse.Object) => {
      throw `New object created with objectId: ${data.id}`;
    },
    (error: Error) => {
      throw `Failed to create new object, with error code: ${error.message}`;
    }
  );

  return parseData;
};

const patch = (parseData: Parse.Object, resource: string[]) => {
  Object.entries(resource).forEach((entry) => {
    const [key, value] = entry;
    parseData.set(key, value);
  });

  parseData.save().then(
    (parseData) => {
      console.info(`Update object created with objectId: ${parseData.id}`);
    },
    (error) => {
      console.error(`Failed to create update object, with error code: ${error.message}`);
    }
  );

  return parseData;
};

const destroy = async (model: string, id: string) => {
  const ParserObject = ParseServer.Object.extend(model);
  const query = new Parse.Query(ParserObject);
  query.equalTo('objectId', id);
  const results2 = await query.first();
  const status = results2.destroy().then(
    (myObject) => {
      return true;
    },
    (error) => {
      return error;
    }
  );
  return status;
};

export const apiProvider = {
  getAll,
  findBy,
  post,
  patch,
  destroy,
};
