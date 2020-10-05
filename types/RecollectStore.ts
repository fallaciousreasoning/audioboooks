import { Book } from "../model/Book";

export interface StoreDef {
  books: { [id: string]: Book }
}

declare module 'react-recollect' {
  interface Store extends StoreDef { }
}