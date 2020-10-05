import { Flex, Progress } from "@chakra-ui/core";
import React from "react";

interface Props {
    totalDuration: number;
    currentTime: number;
}

const BookProgress = (props: Props) => <Flex direction="row" alignItems="center">
    <span>{props.currentTime}</span>
    <Progress marginLeft={1} marginRight={1} value={props.currentTime / props.totalDuration * 100} flex={1}/>
    <span>{props.totalDuration}</span>
</Flex>;

export default BookProgress;