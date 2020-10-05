import { supportedTrackTypes, Track } from "../model/Track";
import { read as readMediaTags } from 'jsmediatags';
import { resolvable } from "../utils/promise";
import { PictureType, TagType } from "jsmediatags/types";
import { v4 as uuid } from 'uuid'
import localforage from 'localforage';
import hash from "../utils/hash";
import duration from "../utils/duration";
import { Book } from "../model/Book";
import { title } from "process";
global['localforage'] = localforage;

const getTags = async (file: File) => {
    const { resolve, reject, promise } = resolvable<TagType>();

    readMediaTags(file, {
        onSuccess: resolve,
        onError: reject
    });

    return promise;
}

const getPicture = (picture: PictureType) => {
    if (!picture)
        return undefined;

    const data = new Uint8Array(picture.data);
    const blob = new Blob([data], { type: picture.format });
    return blob;
}

const getBookMetaData = async (files: File[]): Promise<{ author?: string, title?: string, coverId?: string }> => {
    const result = {
        title: '',
        author: '',
        coverId: '',
    };

    for (const file of files) {
        const metaData = await getTags(file);
        const newTitle = metaData.tags?.album?.valueOf();
        const newAuthor = metaData.tags?.artist?.valueOf();

        result.title = result.title || newTitle;
        result.author = result.author || newAuthor;

        if (!result.coverId) {
            const blob = getPicture(metaData.tags.picture);
            
            if (blob) {
                const md5 = await hash(blob);
                await localforage.setItem(md5, blob);
                result.coverId = md5;
            }
        }

        if (result.title && result.author && result.coverId)
            break;
    }

    // No album info, we'll try fall back to a folder/file name.
    if (!result.title) {
        // We should have a name in all browsers.
        result.title = files[0].name;

        // Most browsers will have this if we have a folder.
        if (files[0]['webkitRelativePath']) {
            const path: string = files[0]['webkitRelativePath'];
            const slash = path.indexOf('/');
            if (slash !== -1) {
                result.title = path.substr(0, slash);
            }
        }
    }

    return result;
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

export const importToIndexedDB = async (files: FileList): Promise<Book> => {
    const filteredFiles = Array.from(files).filter(f => supportedTrackTypes.some(suffix => f.name.endsWith(suffix)));

    const metaData = await getBookMetaData(filteredFiles);
    const tracks = (await Promise.all(filteredFiles.map(t => toTrack(t))))
        .sort(trackOrdering);

    const book: Book = {
        chapters: [],
        coverId: metaData.coverId,
        source: {
            reimportable: false,
            type: 'indexeddb'
        },
        title: metaData.title,
        author: metaData.author,
        tracks: tracks
    };

    console.log(book);

    return book;
}