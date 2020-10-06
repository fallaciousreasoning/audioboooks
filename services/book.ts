import { Book } from "../model/Book";
import localforage from 'localforage';

const KEY = "books";

export const getTotalDuration = (book: Book) => {
    if (!book)
        return 0;

    return book.tracks.reduce((prev, next) => prev + next.duration, 0);
}

export const getTrackNumberFromProgress = (book: Book): number => {
    const totalDuration = getTotalDuration(book);
    let elapsed = 0;
    let index = 0;

    while ((elapsed + book.tracks[index].duration) / totalDuration < book.progress && index < book.tracks.length - 1) {
        elapsed += book.tracks[index].duration;
        index += 1;
    }

    return index;
}

export const getProgressForTrack = (book: Book, trackNumber: number) => {
    const totalDuration = getTotalDuration(book);
    return book.tracks.slice(0, trackNumber).reduce((prev, next) => prev + next.duration, 0) / totalDuration;
}

export const loadBooks = async () => {
    const books = await localforage.getItem<{ [id: string]: Book }>(KEY);
    return books || {};
}

export const saveBooks = async (books: { [id: string]: Book }) => {
    await localforage.setItem(KEY, JSON.parse(JSON.stringify(books)));
}