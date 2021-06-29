export type GenObj = {
    [key: string]: any
};

export function removeFromObject (obj: GenObj, keyToRemove: string): GenObj {
    const newObject: GenObj = {};

    Object.keys(obj).forEach(key => {
        if (keyToRemove !== key) {
            newObject[key] = obj[key];
        }
    });

    return newObject;
}
