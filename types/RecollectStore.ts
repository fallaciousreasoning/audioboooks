import { Book } from "../model/Book";

export interface Settings {
  playbackRate: number;
}
export interface StoreDef {
  books: { [id: string]: Book }
  settings: Settings;
}

declare module 'react-recollect' {
  interface Store extends StoreDef { }
}