import Head from 'next/head'
import { Box, Button, Flex, Grid, Stack, Text } from '@chakra-ui/core'
import AppBar from '../components/AppBar'
import React, { useEffect, useState } from 'react'
import BookIcon from '../components/BookIcon'
import AddBook from '../components/AddBook'
import { getLibrary, Library } from '../services/library'

export default function Home() {
  const [library, setLibrary] = useState<Library>(undefined);
  useEffect(() => {
    getLibrary().then(setLibrary);
  }, [])

  return <div>
    <Head>
      <title>Home</title>
    </Head>
    <AppBar>
      <Text fontSize="xl">Audio Books</Text>
    </AppBar>
    <Flex style={{ gap: '10px'}} padding={1} flexWrap="wrap" justifyContent="space-evenly">
      {library && library.books.map(book => <Box key={book.title} shadow="md" marginTop={1}>
        <BookIcon book={book} progress={book.title.length / 50}/>
      </Box>)}
    </Flex>
    <AddBook/>
  </div>
}
