import { Book } from "../model/Book";
import localforage from 'localforage';

export interface Library {
    books: Book[];
}

const KEY = "LIBRARY";
const defaultLibrary: Library = {
    books: []
}

export const getLibrary = async (): Promise<Library> => {
    const library = await localforage.getItem<Library>(KEY);

    if (!library)
        return defaultLibrary;

    return library;
}

const setLibrary = async (library: Library) => {
    await localforage.setItem(KEY, library);
}

export const addBook = async (book: Book) => {
    const library = await getLibrary();
    library.books.push(book);
    await setLibrary(library);
}