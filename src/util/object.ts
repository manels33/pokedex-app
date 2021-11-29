export function jsonCopy<T>(object: T): JsonObj<T> {
    return JSON.parse(JSON.stringify(object));
}

export type JsonObj<T> = {[key in keyof T]?: T[key]};