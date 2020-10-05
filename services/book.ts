import { Book } from "../model/Book";

export const getTotalDuration = (book: Book) => {
    if (!book)
        return 0;

    return book.tracks.reduce((prev, next) => prev + next.duration, 0);
}