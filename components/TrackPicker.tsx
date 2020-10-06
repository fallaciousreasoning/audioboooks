import { Flex, IconButton, Select } from "@chakra-ui/core";
import React, { useCallback } from "react";
import { collect, Store } from "react-recollect";
import { Book } from "../model/Book";
import { getProgressForTrack, getTrackNumberFromProgress } from "../services/book";

interface Props {
    bookId: string;
    store: Store;
}

const TrackPicker = (props: Props) => {
    const book = props.store.books[props.bookId];
    const currentTrack = getTrackNumberFromProgress(book);

    const changeTrack = (to: number) => {
        book.progress = getProgressForTrack(book, to);
    }

    return <Flex direction="row" padding={1}>
        <IconButton variant="link"
            aria-label="Previous Track"
            icon="chevron-left"
            isDisabled={currentTrack === 0}
            onClick={() => changeTrack(currentTrack - 1)}/>
        <Select variant="flushed" value={currentTrack} onChange={e => changeTrack(parseInt(e.target.value))}>
            {book.tracks.map((track, index) => <option key={index} value={index}>
                {track.title}
            </option>)}
        </Select>
        <IconButton
            variant="link"
            aria-label="Next Track"
            icon="chevron-right"
            isDisabled={currentTrack === book.tracks.length - 1}
            onClick={() => changeTrack(currentTrack + 1)}/>
    </Flex>
}

export default collect(TrackPicker);