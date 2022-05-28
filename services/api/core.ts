import Parse from 'parse';
import { apiProvider } from './provider';

export class ApiCore {
  model: string = 'ObjectName';

  getAll: Function;

  findBy: Function;

  post: Function;

  patch: Function;

  destroy: Function;

  constructor(options: { model: string }) {
    this.model = options.model;
    this.getAll = (limit: number, page: number) => apiProvider.getAll(this.model, limit, page);
    this.findBy = (findByData: string[], limit: number, page: number) =>
      apiProvider.findBy(this.model, findByData, limit, page);
    this.post = (postValue: string[]) => apiProvider.post(this.model, postValue);
    this.patch = (object: Parse.Object, postValue: string[]) => apiProvider.patch(object, postValue);
    this.destroy = async (id: string) => await apiProvider.destroy(this.model, id);
  }
}
