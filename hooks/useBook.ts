import { useEffect, useState } from "react"
import { Book } from "../model/Book";
import { getLibrary, Library } from "../services/library"

export default (id: string): Book => {
    // TODO: Connect to redux instead of this hackery.
    const [library, setLibrary] = useState<Library>(undefined);

    useEffect(() => {
        getLibrary().then(setLibrary);
    }, []);

    return library ?
        library.books[id]
        : undefined;
}