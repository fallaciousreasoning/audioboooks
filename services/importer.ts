import { supportedTrackTypes, Track } from "../model/Track";
import { read as readMediaTags } from 'jsmediatags';
import { resolvable } from "../utils/promise";
import { TagType } from "jsmediatags/types";
import { v4 as uuid } from 'uuid'
import localforage from 'localforage';
import hash from "../utils/hash";
import duration from "../utils/duration";
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
        duration: await duration(file),
        title: title,
        trackNumber: parseInt(trackNumber),
        type: file.type,
    };

    // Copy the file to indexed db.
    localforage.setItem(track.id, file);

    return track;
}

export const trackOrdering = (track1: Track, track2: Track) => {
    if (track1.trackNumber && track2.trackNumber)
        return track1.trackNumber - track2.trackNumber;

    return track1.title.localeCompare(track2.title);
}

export const importToIndexedDB = async (files: FileList) => {
    const filtered = Array.from(files).filter(f => supportedTrackTypes.some(suffix => f.name.endsWith(suffix)));

    const tracks = (await Promise.all(filtered.map(t => toTrack(t))))
        .sort(trackOrdering);
    console.log(tracks);
}