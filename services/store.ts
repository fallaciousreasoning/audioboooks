import { store } from "react-recollect"
import { Book } from "../model/Book";
import { loadBooks, saveBooks } from "./book";

export const maybeInitStore = () => {
    if (!store.books) {
        store.books = {};
        loadBooks().then(books => store.books = books);
    }
}

export const addBook = (book: Book) => {
    store.books = {
        ...store.books,
        [book.id]: book
    };

    saveBooks(store.books);
}