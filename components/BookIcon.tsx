import { Box, Flex, Image, Progress } from "@chakra-ui/core";
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { Book } from "../model/Book";
import localforage from 'localforage';
import NoTextWrap from "./NoTextWrap";
import useLocalForageBlobUrl from "../hooks/useLocalForageBlobUrl";
import { collect, Store } from "react-recollect";

interface Props {
    bookId: string;
    store: Store;
}

const BookIcon = (props: Props) => {
    const book = props.store.books[props.bookId];
    const coverUrl = useLocalForageBlobUrl(book.coverId);
    return <Link href={`/player/${book.id}`}>
        <Flex height="10em" minWidth="10em" maxWidth="10em" direction="column">
            <NoTextWrap fontSize="xl">{book.title}</NoTextWrap>
            <Image src={coverUrl} flexShrink={1} flexGrow={1} minHeight={0} minWidth={0} />
            <Progress value={book.progress*100} />
        </Flex>
    </Link>
}

export default collect(BookIcon);