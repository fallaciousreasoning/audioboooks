import { Flex, Progress } from "@chakra-ui/core";
import React from "react";
import { humanTime } from "../utils/time";

interface Props {
    totalDuration: number;
    currentTime: number;
}

const BookProgress = (props: Props) => <Flex direction="row" alignItems="center">
    <span>{humanTime(props.currentTime * 1000)}</span>
    <Progress isAnimated={false} marginLeft={1} marginRight={1} value={props.currentTime / props.totalDuration * 100} flex={1}/>
    <span>{humanTime(props.totalDuration * 1000)}</span>
</Flex>;

export default BookProgress;