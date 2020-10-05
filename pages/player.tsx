import Head from "next/head"
import { Box, Stack, Image, Button, Icon, IconButton, Link, Grid, Flex } from "@chakra-ui/core"
import React from "react"
import styles from '../styles/Player.module.css'
console.log(styles)
const Player = () => {
    return <div>
        <Head>
            <title>Now Playing</title>
        </Head>
        <Flex shadow="md" flexDirection="column" className={styles.root}>
            <Box className={styles['controls-row']} shadow="md">
                <Link onClick={() => history.back()}>
                    <Icon name="arrow-back" />
                </Link>
                <IconButton isRound aria-label="Sleep Timer" icon="time" />
                <IconButton isRound aria-label="Playback Speed" icon="repeat-clock" />
            </Box>
            <Image src="album-art"></Image>
            <div className={styles.cover}>

            </div>
            <div className={styles.playback}>
                Foo
            </div>
        </Flex>
    </div>
};

export default Player;