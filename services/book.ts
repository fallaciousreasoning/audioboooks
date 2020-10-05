import { Book } from "../model/Book";
import localforage from 'localforage';

const KEY = "books";

export const getTotalDuration = (book: Book) => {
    if (!book)
        return 0;

    return book.tracks.reduce((prev, next) => prev + next.duration, 0);
}

export const loadBooks = async () => {
    const books = await localforage.getItem<{ [id: string]: Book }>(KEY);
    return books || {};
}

export const saveBooks = async (books: { [id: string]: Book }) => {
    await localforage.setItem(KEY, books);
}