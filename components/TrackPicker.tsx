import { Flex, IconButton, Select } from "@chakra-ui/core";
import React, { useCallback } from "react";
import { Book } from "../model/Book";

interface Props {
    book: Book;

    currentTrack: number;
    onTrackChange: (newTrack: number) => void;
}

const TrackPicker = (props: Props) => {
    
    return <Flex direction="row" padding={1}>
        <IconButton variant="link"
            aria-label="Previous Track"
            icon="chevron-left"
            isDisabled={props.currentTrack === 0}
            onClick={() => props.onTrackChange(props.currentTrack - 1)}/>
        <Select variant="flushed" value={props.currentTrack} onChange={e => props.onTrackChange(parseInt(e.target.value))}>
            {props.book.tracks.map((track, index) => <option key={index} value={index}>
                {track.title}
            </option>)}
        </Select>
        <IconButton
            variant="link"
            aria-label="Next Track"
            icon="chevron-right"
            isDisabled={props.currentTrack === props.book.tracks.length - 1}
            onClick={() => props.onTrackChange(props.currentTrack + 1)}/>
    </Flex>
}

export default TrackPicker;