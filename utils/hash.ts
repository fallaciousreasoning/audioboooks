import { resolvable } from './promise';

let bmf;

export default async (file: File) => {
    if (!bmf) {
        const { default: BMF } = await import('browser-md5-file');
        bmf = new BMF();
    }

    const { resolve, reject, promise } = resolvable<string>();

    bmf.md5(file, (error, md5) => {
        if (error)
            reject(error);
        else resolve(md5);
    })

    return promise;
}