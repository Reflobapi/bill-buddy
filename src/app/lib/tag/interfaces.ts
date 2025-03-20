export enum TagType {
  Green = 'green',
  Grey = 'grey',
  Yellow = 'yellow',
  Blue = 'blue',
  Red = 'red',
}

export interface Tag {
  type: TagType;
  label: string;
}
