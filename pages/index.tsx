import Head from 'next/head'
import { Box, Flex, Grid, Stack, Text } from '@chakra-ui/core'
import AppBar from '../components/AppBar'
import React from 'react'
import BookIcon from '../components/BookIcon'

export default function Home() {
  const books = [
    "First",
    "Second",
    "Third",
    "Fourth",
    "Fifth",
    "Sixth",
    "Seventh",
    "Eighth",
    "Ninth",
    "Tenth",
    "Eleventh"
  ]

  const extendedProps = { gap: '10px' };
  return <div>
    <Head>
      <title>Home</title>
    </Head>
    <AppBar>
      <Text fontSize="xl">Audio Books</Text>
    </AppBar>
    <Flex style={{ gap: '10px'}} padding={1} flexWrap="wrap" justifyContent="space-evenly">
      {books.map(b => <Box key={b} shadow="md" marginTop={1}>
        <BookIcon title={b} cover={`https://picsum.photos/seed/${b}/200`} progress={b.length / 10}/>
      </Box>)}
    </Flex>
  </div>
}
