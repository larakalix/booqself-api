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
