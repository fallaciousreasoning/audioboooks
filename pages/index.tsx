import Head from 'next/head'
import { Box, Stack } from '@chakra-ui/core'
import AppBar from '../components/AppBar'

export default function Home() {
  return <div>
    <Head>
      <title>Home</title>
    </Head>
    <AppBar>
      Foo
    </AppBar>
    <Stack spacing={1}>
      <div>First</div>
      <div>Second</div>
    </Stack>
  </div>
}
