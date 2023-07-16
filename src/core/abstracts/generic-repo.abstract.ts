import type { IElement, IEntity } from '../entities/generic';
import type { IEndpointProps } from '../dtos/endpoint';

export abstract class IService<T> implements IReadableService<T> {
  abstract getAll(props: IEndpointProps): Promise<IElement<T>>;
  abstract get(props: IEndpointProps & IEntity): Promise<T>;
  abstract create(item: T): Promise<T>;
  abstract update(id: string, item: T);
}

export abstract class IReadableService<T> {
  abstract getAll(props: IEndpointProps): Promise<IElement<T>>;
  abstract get(props: IEndpointProps & IEntity): Promise<T>;
}
