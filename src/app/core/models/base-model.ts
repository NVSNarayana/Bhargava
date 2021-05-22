export class BaseModel<T> {

      constructor(obj: Partial<T>) {
          Object.assign(this, obj);
  
      }
  }
  