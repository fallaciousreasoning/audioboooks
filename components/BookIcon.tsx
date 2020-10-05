import { Flex, Image, Progress } from "@chakra-ui/core";
import Link from 'next/link';
import React from "react";

interface Props {
    title: string;
    progress: number;
    cover: string;
}

const BookIcon = (props: Props) => {
    return <Link href="/player">
        <Flex height="10em" minWidth="10em" maxWidth="10em" direction="column">
            <div>{props.title}</div>
            <Image src={props.cover} flexShrink={1} flexGrow={1} minHeight={0} minWidth={0} />
            <Progress value={props.progress * 100} />
        </Flex>
    </Link>
}

export default BookIcon;