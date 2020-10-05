import Head from "next/head"
import { Box, Stack, Image, Button, Icon, IconButton, Link, Grid, Flex, Select } from "@chakra-ui/core"
import React from "react"
import BookProgress from "../../components/BookProgress"
import { hours, minutes } from "../../utils/time";
import AppBar from "../../components/AppBar";
import { useRouter } from 'next/router'
import useBook from "../../hooks/useBook";
import { getTotalDuration } from "../../services/book";
import TrackPicker from "../../components/TrackPicker";

const Player = () => {
    const router = useRouter();
    const id = router.query.id as string;
    const book = useBook(id);
    const totalDuration = getTotalDuration(book);

    // TODO: Get progress from somewhere.
    const currentPosition = totalDuration * 0.12;
    
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
                <Image src="album-art"></Image>
            </Box>
            <Box shadow="md">
                {book && <TrackPicker book={book} />}
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