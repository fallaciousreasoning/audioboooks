import Head from "next/head"
import { Box, Stack, Image } from "@chakra-ui/core"

export default () => {
    return <div>
        <Head>
            <title>Now Playing</title>
        </Head>
        <Stack shadow="md">
            <div className="controls-row">
                Sleep Timer | Playback Speed
            </div>
            <Image src="album-art"></Image>
            <div className="playback">

            </div>
        </Stack>
    </div>
}