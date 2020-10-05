import styled from "@emotion/styled";
import { Text } from '@chakra-ui/core'

const NoTextWrap = styled(Text)({
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
});

export default NoTextWrap;