export abstract class IRepository<T> implements IReadableRepository<T> {
  abstract getAll(): Promise<T[]>;
  abstract get(id: string): Promise<T>;
  abstract create(item: T): Promise<T>;
  abstract update(id: string, item: T);
}

export abstract class IReadableRepository<T> {
  abstract getAll(): Promise<T[]>;
  abstract get(id: string): Promise<T>;
}
