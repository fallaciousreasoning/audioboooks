import { useCallback, useEffect, useRef, useState } from "react";
import { collect, store, Store } from "react-recollect";
import useLocalForageBlobUrl from "../hooks/useLocalForageBlobUrl";
import { Book } from "../model/Book";
import { Track } from "../model/Track";
import { getDurationToTrack, getProgressForTrack, getTotalDuration, getTrackNumberFromProgress } from "../services/book";

interface Props {
    bookId: string;
    store: Store;
    playing: boolean;
}

const useTrackUrl = (track: Track) => {
    return useLocalForageBlobUrl(track.id);
}

const BookPlayer = (props: Props) => {
    const book = props.store.books[props.bookId];
    const tracks = book.tracks;

    const [currentTrack, setCurrentTrack] = useState(0);
    
    const url = useTrackUrl(tracks[currentTrack]);
    const audioRef = useRef<HTMLAudioElement>();

    // Update the books progress.
    useEffect(() => {
        if (!props.playing)
            return;

        const totalDuration = getTotalDuration(book);
        const priorChapterDuration = book.tracks.slice(0, currentTrack).reduce((prev, next) => prev + next.duration, 0);

        let timeout = undefined;
        const update = () => {
            const totalListened = priorChapterDuration + audioRef.current.currentTime;
            book.progress = totalListened / totalDuration;
            timeout = setTimeout(update, 1000);
        }
        update();

        return () => {
            clearTimeout(timeout);
        }
    }, [currentTrack, book.id, props.playing]);

    useEffect(() => {
        if (book.progress === undefined)
            return;

        const progressDuration = getTotalDuration(book) * book.progress;
        const currentDuration = getDurationToTrack(book, currentTrack) + audioRef.current.currentTime;

        // If the two aren't out of sync, carry on.
        if (Math.abs(progressDuration - currentDuration) <= 1)
            return;

        const newTrackNumber = getTrackNumberFromProgress(book);
        const remainder = progressDuration - getDurationToTrack(book, newTrackNumber);
        setCurrentTrack(newTrackNumber);

        // TODO: Set this after canplay fires, as I'm pretty sure it has no effect until then.
        audioRef.current.currentTime = remainder;
        audioRef.current.autoplay = true;
    }, [book.progress]);

    // Sync the playback rate.
    useEffect(() => {
        audioRef.current.playbackRate = props.store.settings.playbackRate;
    }, [props.store.settings.playbackRate, url]);

    // Sync the play/pause status.
    useEffect(() => {
        if (props.playing && audioRef.current.paused)
            audioRef.current.play();
        if (!props.playing && !audioRef.current.paused)
            audioRef.current.pause();
    }, [props.playing]);

    const maybeNextTrack = useCallback(() => {
        if (currentTrack >= tracks.length - 1)
            return;

        audioRef.current.autoplay = true;
        audioRef.current.currentTime = 0;
        setCurrentTrack(currentTrack + 1);
    }, [currentTrack])

    return <audio
        ref={audioRef}
        src={url}
        onEnded={maybeNextTrack} />
}

export default collect(BookPlayer);