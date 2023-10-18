export type Person = {
  name: string,
  height: number,
  mass: number,
  hair_color: string,
  isFavorite: boolean,
};

export type ChangedPerson = string | Person;
