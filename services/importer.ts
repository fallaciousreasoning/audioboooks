import { supportedTrackTypes } from "../model/Track";
import { read as readMediaTags } from 'jsmediatags';
import { resolvable } from "../utils/promise";
import { TagType } from "jsmediatags/types";

const getTags = async (file: File) => {
    const { resolve, reject, promise } = resolvable<TagType>();

    readMediaTags(file, {
        onSuccess: resolve,
        onError: reject
    });

    return promise;
}

export const generateFallbackOrdering = async (files: File[]) => {
    return files.sort((f1, f2) => f1.name.localeCompare(f2.name));
}

export const importToIndexedDB = async (files: FileList) => {
    const filtered = Array.from(files).filter(f => supportedTrackTypes.some(suffix => f.name.endsWith(suffix)));
    console.log("Filtered files to", filtered);

    const tags = await getTags(filtered[0]);
    console.log(tags);
}