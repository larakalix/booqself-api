export interface IEntity {
  id: string;
}

export interface IElement<T> {
  elements: T[];
  href: string;
}

export interface ICreatedAt {
  createdAt: string;
}

export interface IDatable<T> {
  data: T;
}

export interface IAttributable<T> {
  attributes: T;
}

export interface IServiceable {
  name: string;
  cloverId: string;
  price: string;
}
