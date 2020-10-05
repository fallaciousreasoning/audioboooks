import { Flex, IconButton, Select } from "@chakra-ui/core";
import React from "react";
import { Book } from "../model/Book";

interface Props {
    book: Book;
}

const TrackPicker = (props: Props) => <Flex direction="row" padding={1}>
    <IconButton variant="link" aria-label="Previous Track" icon="chevron-left" />
    <Select variant="flushed">
        {props.book.tracks.map(track => <option key={track.trackNumber} value={track.trackNumber}>
            {track.title}
        </option>)}
    </Select>
    <IconButton variant="link" aria-label="Next Track" icon="chevron-right" />
</Flex>

export default TrackPicker;