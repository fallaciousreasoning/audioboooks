import Head from "next/head"
import { Box, Stack, Image, Button, Icon, IconButton, Link, Grid, Flex, Select } from "@chakra-ui/core"
import React, { useState } from "react"
import BookProgress from "../../components/BookProgress"
import { hours, minutes } from "../../utils/time";
import AppBar from "../../components/AppBar";
import { useRouter } from 'next/router'
import useBook from "../../hooks/useBook";
import { getTotalDuration } from "../../services/book";
import TrackPicker from "../../components/TrackPicker";
import useLocalForageBlobUrl from "../../hooks/useLocalForageBlobUrl";
import { loadGetInitialProps } from "next/dist/next-server/lib/utils";

const Player = () => {
    const router = useRouter();
    const id = router.query.id as string;
    const book = useBook(id);
    const totalDuration = getTotalDuration(book);
    const coverUrl = useLocalForageBlobUrl(book && book.coverId);

    // TODO: Get progress from somewhere.
    const [currentTrack, setCurrentTrack] = useState(0);
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
                    <IconButton isRound aria-label="Playback Speed" icon="repeat-clock" />
                </Stack>
            </AppBar>
            <Box flexGrow={1}>
                <Image src={coverUrl}></Image>
            </Box>
            <Box shadow="md">
                {book && <TrackPicker book={book} currentTrack={currentTrack} onTrackChange={setCurrentTrack} />}
                <Box padding={1}>
                    <BookProgress currentTime={currentPosition} totalDuration={totalDuration} />
                </Box>
                <Flex alignItems="center" justifyContent="center" padding={3}>
                    <IconButton isRound aria-label="back" icon="arrow-left" />
                    <IconButton variantColor="pink" isRound aria-label="play/pause" icon="chevron-right" size="lg" />
                    <IconButton isRound aria-label="forward" icon="arrow-right" />
                </Flex>
            </Box>
        </Flex>
    </div>
};

export default Player;