import { Box, Flex, Image, Progress } from "@chakra-ui/core";
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { Book } from "../model/Book";
import localforage from 'localforage';
import NoTextWrap from "./NoTextWrap";
import useLocalForageBlobUrl from "../hooks/useLocalForageBlobUrl";

interface Props {
    book: Book;
    progress: number;
}

const BookIcon = (props: Props) => {
    const coverUrl = useLocalForageBlobUrl(props.book.coverId);
    return <Link href={`/player/${props.book.id}`}>
        <Flex height="10em" minWidth="10em" maxWidth="10em" direction="column">
            <NoTextWrap fontSize="xl">{props.book.title}</NoTextWrap>
            <Image src={coverUrl} flexShrink={1} flexGrow={1} minHeight={0} minWidth={0} />
            <Progress value={props.progress * 100} />
        </Flex>
    </Link>
}

export default BookIcon;