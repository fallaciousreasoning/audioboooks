import { Box } from "@chakra-ui/core"
import React from "react"
import BookIcon from "./BookIcon"

const FAB = (props: { children: React.ReactChild }) => {
    return <Box position="absolute" bottom="1em" right="1em">
        {props.children}
    </Box>;
}

export default FAB;