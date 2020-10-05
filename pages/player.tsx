import Head from "next/head"
import { Box, Stack, Image, Button, Icon, IconButton, Link, Grid, Flex, Select } from "@chakra-ui/core"
import React from "react"


const Player = () => {
    return <div>
        <Head>
            <title>Now Playing</title>
        </Head>
        <Flex shadow="md" flexDirection="column" height="100vh">
            <Stack alignItems="center" direction="row" shadow="md" padding={1} spacing={1}>
                <Link onClick={() => history.back()}>
                    <Icon name="arrow-back" />
                </Link>
                <IconButton isRound aria-label="Sleep Timer" icon="time" />
                <IconButton isRound aria-label="Playback Speed" icon="repeat-clock" />
            </Stack>
            <Box flexGrow={1}>
                <Image src="album-art"></Image>
            </Box>
            <div>
                <Flex direction="row" padding={1}>
                    <IconButton variant="link" aria-label="Previous Track" icon="chevron-left" />
                    <Select variant="flushed">
                        <option value="0">Track 1</option>
                        <option value="1">Track 2</option>
                        <option value="2">Track 3</option>
                    </Select>
                    <IconButton variant="link" aria-label="Next Track" icon="chevron-right" />
                </Flex>
            </div>
        </Flex>
    </div>
};

export default Player;