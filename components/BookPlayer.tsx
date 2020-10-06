import { useCallback, useEffect, useRef, useState } from "react";
import { collect, Store } from "react-recollect";
import useLocalForageBlobUrl from "../hooks/useLocalForageBlobUrl";
import { Book } from "../model/Book";
import { Track } from "../model/Track";

interface Props {
    bookId: string;
    store: Store;
}

const useTrackUrl = (track: Track) => {
    return useLocalForageBlobUrl(track.id);
}

const BookPlayer = (props: Props) => {
    const book = props.store.books[props.bookId];
    const tracks = book.tracks;

    const [currentTrack, setCurrentTrack] = useState(0);
    const [trackPosition, setTrackPosition] = useState(0);

    const url = useTrackUrl(tracks[currentTrack]);
    const audioRef = useRef<HTMLAudioElement>();

    // Sync the playback rate.
    useEffect(() => {
        audioRef.current.playbackRate = props.store.settings.playbackRate;
    }, [props.store.settings.playbackRate]);

    const maybeNextTrack = useCallback(() => {
        if (currentTrack >= tracks.length - 1)
            return;
        setCurrentTrack(currentTrack + 1);
        setTrackPosition(0);
        console.log("Next!")
    }, [currentTrack])

    console.log("Here!")
    return <audio
        autoPlay
        ref={audioRef}
        src={url}
        onEnded={maybeNextTrack} />
}

export default collect(BookPlayer);