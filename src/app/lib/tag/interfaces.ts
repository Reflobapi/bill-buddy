export enum TagType {
  Green = 'green',
  Grey = 'grey',
  Yellow = 'yellow',
  Red = 'red',
}

export interface Tag {
  type: TagType;
  label: string;
}
