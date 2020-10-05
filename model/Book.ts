import { Chapter } from "./Chapter";
import { Track } from "./Track";

interface IndexedDBSource {
    type: 'indexeddb';
    name: string;
    reimportable: false;
}

type Source = IndexedDBSource;

export interface Book {
    title: string;
    chapters: Chapter[];
    tracks: Track[];

    source: Source;
}