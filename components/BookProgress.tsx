import { Flex, Progress } from "@chakra-ui/core";
import React from "react";
import { collect, Store } from "react-recollect";
import { Book } from "../model/Book";
import { getTotalDuration } from "../services/book";
import { humanTime } from "../utils/time";

interface Props {
    bookId: string;
    store: Store;
}

const BookProgress = (props: Props) => {
    const book = props.store.books[props.bookId];
    const totalDuration = getTotalDuration(book);
    const currentTime = totalDuration * book.progress;
    return <Flex direction="row" alignItems="center">
        <span>{humanTime(currentTime * 1000)}</span>
        <Progress isAnimated={false} marginLeft={1} marginRight={1} value={book.progress * 100} flex={1} />
        <span>{humanTime(totalDuration * 1000)}</span>
    </Flex>;
}

export default collect(BookProgress);