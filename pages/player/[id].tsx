import { Box, Flex, Icon, IconButton, Image, Link, Stack } from "@chakra-ui/core";
import Head from "next/head";
import { useRouter } from 'next/router';
import React, { useState } from "react";
import { collect, Store } from "react-recollect";
import AppBar from "../../components/AppBar";
import BookPlayer from "../../components/BookPlayer";
import BookProgress from "../../components/BookProgress";
import PlaybackRateButton from "../../components/PlaybackRateButton";
import TrackPicker from "../../components/TrackPicker";
import useLocalForageBlobUrl from "../../hooks/useLocalForageBlobUrl";
import { getTotalDuration } from "../../services/book";

const Player = (props: { store: Store }) => {
    const router = useRouter();
    const id = router.query.id as string;
    const book = props.store.books[id];
    const totalDuration = getTotalDuration(book);
    const coverUrl = useLocalForageBlobUrl(book && book.coverId);
    const audioUrl = useLocalForageBlobUrl(book && book.tracks[0].id);

    // TODO: Get progress from somewhere.
    const [currentTrack, setCurrentTrack] = useState(0);
    const [playing, setPlaying] = useState(false);
    const currentPosition = book ? book.tracks.slice(0, currentTrack).reduce((prev, next) => prev + next.duration, 0) : 0;
    
    return <div>
        <Head>
            <title>Now Playing</title>
        </Head>
        <Flex shadow="md" flexDirection="column" height="100vh">
            <AppBar>
                <Stack alignItems="center" direction="row" spacing={1}>
                    <Link onClick={() => history.back()}>
                        <Icon name="arrow-back" />
                    </Link>
                    <IconButton isRound aria-label="Sleep Timer" icon="time" />
                    <PlaybackRateButton/>
                </Stack>
            </AppBar>
            <Box flexGrow={1} flexShrink={1} overflow="hidden">
                <Image src={coverUrl}></Image>
            </Box>
            <Box shadow="md">
                {book && <TrackPicker book={book} currentTrack={currentTrack} onTrackChange={setCurrentTrack} />}
                <Box padding={1}>
                    <BookProgress currentTime={currentPosition} totalDuration={totalDuration} />
                </Box>
                <Flex alignItems="center" justifyContent="center" padding={3}>
                    <IconButton isRound aria-label="back" icon="arrow-left" />
                    <IconButton
                        variantColor="pink"
                        isRound
                        aria-label="play/pause"
                        icon={playing ? 'drag-handle' : 'chevron-right'}
                        size="lg"
                        onClick={() => setPlaying(!playing)}/>
                    <IconButton isRound aria-label="forward" icon="arrow-right" />
                </Flex>
            </Box>
        </Flex>
        {book && <BookPlayer bookId={book.id} playing={playing}/>}
    </div>
};

export default collect(Player);