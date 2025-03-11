export enum TagType {
  Green = 'green',
  Yellow = 'yellow',
  Red = 'red',
}

export interface Tag {
  type: TagType;
  label: string;
}
