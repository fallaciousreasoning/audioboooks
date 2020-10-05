import { supportedTrackTypes, Track } from "../model/Track";
import { read as readMediaTags } from 'jsmediatags';
import { resolvable } from "../utils/promise";
import { TagType } from "jsmediatags/types";
import { v4 as uuid } from 'uuid'
import localforage from 'localforage';
import hash from "../utils/hash";
global['localforage'] = localforage;

const getTags = async (file: File) => {
    const { resolve, reject, promise } = resolvable<TagType>();

    readMediaTags(file, {
        onSuccess: resolve,
        onError: reject
    });

    return promise;
}

const toTrack = async (file: File): Promise<Track> => {
    const tagInfo = await getTags(file);
    const title = tagInfo.tags.title?.valueOf() ?? file.name;
    const trackNumber = tagInfo.tags.track?.valueOf();
    const fileHash = await hash(file);
    
    const track = {
        id: fileHash,
        duration: 0,
        title: title,
        trackNumber: parseInt(trackNumber),
        type: file.type,
    };

    // Copy the file to indexed db.
    localforage.setItem(track.id, file);

    return track;
}

export const generateFallbackOrdering = async (files: File[]) => {
    return files.sort((f1, f2) => f1.name.localeCompare(f2.name));
}

export const importToIndexedDB = async (files: FileList) => {
    const filtered = Array.from(files).filter(f => supportedTrackTypes.some(suffix => f.name.endsWith(suffix)));
    console.log("Filtered files to", filtered);

    for (const file of filtered) {
        const track = await toTrack(file);
    }
}