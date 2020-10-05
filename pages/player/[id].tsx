import Head from "next/head"
import { Box, Stack, Image, Button, Icon, IconButton, Link, Grid, Flex, Select } from "@chakra-ui/core"
import React from "react"
import BookProgress from "../../components/BookProgress"
import { hours, minutes } from "../../utils/time";
import AppBar from "../../components/AppBar";
import { useRouter } from 'next/router'

const Player = () => {
    const router = useRouter();
    const id = router.query.id;
    
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
                <Flex direction="row" padding={1}>
                    <IconButton variant="link" aria-label="Previous Track" icon="chevron-left" />
                    <Select variant="flushed">
                        <option value="0">Track 1</option>
                        <option value="1">Track 2</option>
                        <option value="2">Track 3</option>
                    </Select>
                    <IconButton variant="link" aria-label="Next Track" icon="chevron-right" />
                </Flex>
                <Box padding={1}>
                    <BookProgress currentTime={hours(4) - minutes(3)} totalDuration={hours(10)} />
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