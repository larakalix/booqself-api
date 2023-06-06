import { Observable } from 'rxjs';
import type { IElement, IEntity } from '../entities/generic.entity';
import type { IEndpointProps } from '../dtos/endpoint.props';

export abstract class IService<T> implements IReadableService<T> {
  abstract getAll(props: IEndpointProps): Observable<IElement<T>>;
  abstract get(props: IEndpointProps & IEntity): Observable<T>;
  abstract create(item: T): Observable<T>;
  abstract update(id: string, item: T);
}

export abstract class IReadableService<T> {
  abstract getAll(props: IEndpointProps): Observable<IElement<T>>;
  abstract get(props: IEndpointProps & IEntity): Observable<T>;
}
