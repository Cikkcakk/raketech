export const isStringEnumValue = <T extends object>(
  type: T,
  value: string
): boolean => {
  const keys = Object.keys(type);
  const string_keys = keys.filter((t) => isNaN(Number(t)));
  const match = string_keys.filter((v) => type[v as keyof T] === value);
  return match.length > 0;
};

export const isNumberEnumValue = <T extends object>(
  type: T,
  value: number
): boolean => {
  const keys = Object.keys(type);
  const string_keys = keys.filter((t) => isNaN(Number(t)));
  const match = string_keys.filter((v) => type[v as keyof T] === value);
  return match.length > 0;
};

export const enumValues = <T extends object>(type: T): T[] => {
  return Object.values(type).filter((v) => isNaN(Number(v)));
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Mandatory<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export const isString = (val: any) => {
  return typeof val === 'string';
};