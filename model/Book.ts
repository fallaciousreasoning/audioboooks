import { Chapter } from "./Chapter";
import { Track } from "./Track";

interface IndexedDBSource {
    type: 'indexeddb';
    reimportable: false;
}

type Source = IndexedDBSource;

export interface Book {
    id: string;

    title: string;
    author?: string;
    coverId?: string;

    chapters: Chapter[];
    tracks: Track[];

    source: Source;

    progress: number;
}