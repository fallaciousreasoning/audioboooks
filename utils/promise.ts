export const resolvable = <T>() => {
    let resolve: (result: T) => void;
    let reject: (error?: any) => void;

    const promise = new Promise<T>((res, rej) => {
        resolve = res;
        reject = rej;
    });
    
    return {
        resolve,
        reject,
        promise
    }
}