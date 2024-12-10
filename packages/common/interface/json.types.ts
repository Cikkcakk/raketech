export type JSONValue =
    | boolean
    | number
    | string
    | Date
    | JSONArray
    | JSONObject;

export interface JSONObject {
    [x: string]: JSONValue;
}

export interface JSONArray extends Array<JSONValue> {}

export const isJSONArray = (value: unknown): value is JSONArray => {
    return Array.isArray(value);
};

export const isJSONObject = (value: unknown): value is JSONObject => {
    const obj = value as JSONObject;
    return (
        typeof value === 'object' &&
        !Array.isArray(value) &&
        Object.keys(obj).length > 0
    );
};

export const numberJSONValue = (value?: JSONValue): number | undefined => {
    return typeof value === 'number' ? value : undefined;
};

export const stringJSONValue = (value?: JSONValue): string | undefined => {
    return typeof value === 'string' ? value : undefined;
};

export const booleanJSONValue = (value?: JSONValue): boolean | undefined => {
    return typeof value === 'boolean' ? value : undefined;
};

export const dateJSONValue = (value?: JSONValue): Date | undefined => {
    return value instanceof Date ? value : undefined;
};

export const arrayJSONValue = (value?: JSONValue): JSONArray | undefined => {
    return Array.isArray(value) ? value : undefined;
};

export const objectJSONValue = (value?: JSONValue): JSONObject | undefined => {
    return typeof value === 'object' ? (value as JSONObject) : undefined;
};
