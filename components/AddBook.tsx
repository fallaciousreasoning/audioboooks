import { Icon, IconButton } from "@chakra-ui/core"
import React from "react"
import { importToIndexedDB } from "../services/importer";
import pickFolder from "../utils/pickFolder";
import FAB from "./FAB"

const AddBook = () => {
    return <FAB>
        <IconButton shadow="md" variantColor="pink" isRound aria-label="Add Book" icon="add" size="lg" onClick={async () => {
            const files = await pickFolder();
            await importToIndexedDB(files);
        }} />
    </FAB>
}

export default AddBook;