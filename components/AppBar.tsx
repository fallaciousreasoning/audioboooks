import { Box } from "@chakra-ui/core";

const AppBar = (props: { children: React.ReactChild }) => {
    return <Box shadow="md" alignItems="center" padding={1}>
        {props.children}
    </Box>
}

export default AppBar;