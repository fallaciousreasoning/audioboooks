import Head from "next/head"
import { Box, Stack, Image, Button, Icon, IconButton, Link } from "@chakra-ui/core"
import React from "react"

export default () => {
    return <div>
        <Head>
            <title>Now Playing</title>
        </Head>
        <Stack shadow="md">
            <div className="controls-row">
                <Link href="javascript:history.back()">
                    <Icon name="arrow-back" />
                </Link>
                <IconButton isRound aria-label="Sleep Timer" icon="time" />
                <IconButton isRound aria-label="Playback Speed" icon="repeat-clock" />
            </div>
            <Image src="album-art"></Image>
            <div className="playback">

            </div>
        </Stack>
    </div>
}