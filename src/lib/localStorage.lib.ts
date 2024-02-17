export default class LocalStorageUtil {
    static setItem(key: string, value: any): void {
        const stringValue = JSON.stringify(value);
        localStorage.setItem(key, stringValue);
    }

    static getItem<T>(key: string): T | null {
        const stringValue = localStorage.getItem(key);
        if (stringValue) {
            try {
                return JSON.parse(stringValue) as T;
            } catch {
                console.error('Error parsing JSON from local storage');
                return null;
            }
        }
        return null;
    }

    static appendToArray(key: string, value: any): void {
        const currentArray: any[] = LocalStorageUtil.getItem<any[]>(key) || [];
        currentArray.push(value);
        LocalStorageUtil.setItem(key, currentArray);
    }

    static removeFromArray(key: string, valueToRemove: any): void {
        let array = LocalStorageUtil.getItem<any[]>(key);
        if (array) {
            array = array.filter(item => item !== valueToRemove);
            LocalStorageUtil.setItem(key, array);
        }
    }

    static clearItem(key: string): void {
        localStorage.removeItem(key);
    }

    static clearAll(): void {
        localStorage.clear();
    }
}
