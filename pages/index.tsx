import Head from 'next/head'
import { Box, Button, Flex, Grid, Stack, Text } from '@chakra-ui/core'
import AppBar from '../components/AppBar'
import React, { useEffect, useMemo, useState } from 'react'
import BookIcon from '../components/BookIcon'
import AddBook from '../components/AddBook'
import { collect, Store } from 'react-recollect'

const Home = ({ store }: { store: Store }) => {
  const books = store.books;
  const booksArray = useMemo(() => Object.values(store.books), [books]);

  return <div>
    <Head>
      <title>Home</title>
    </Head>
    <AppBar>
      <Text fontSize="xl">Audio Books</Text>
    </AppBar>
    <Flex style={{ gap: '10px' }} padding={1} flexWrap="wrap" justifyContent="space-evenly">
      {booksArray.map(book => <Box key={book.id} shadow="md" marginTop={1}>
        <BookIcon book={book} progress={book.title.length / 50} />
      </Box>)}
    </Flex>
    <AddBook />
  </div>
}

export default collect(Home);
