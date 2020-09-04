import Head from 'next/head'
import { Box, Stack } from '@chakra-ui/core'

export default function Home() {
  return <div>
    <Head>
      <title>Home</title>
    </Head>
    <Stack spacing={1}>
      <div>First</div>
      <div>Second</div>
    </Stack>
  </div>
}
