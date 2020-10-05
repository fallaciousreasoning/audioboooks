import { resolvable } from "./promise";

export default (file: File) => {
    const blobURL = URL.createObjectURL(file);
    const audio = new Audio();
    audio.preload = true as any;

    const { resolve, reject, promise } = resolvable<number>();
    const finalize = () => {
        URL.revokeObjectURL(blobURL);
    }

    audio.oncanplay = () => {
        if (isNaN(audio.duration)) {
            // See if we get the duration on canplaythrough
            return;
        }
        resolve(audio.duration);
        finalize();
    }

    audio.oncanplaythrough = () => {
        resolve(audio.duration);
        finalize();
    }

    audio.onerror = err => {
        reject(err);
        finalize();
    }

    audio.src = blobURL;

    return promise;
}