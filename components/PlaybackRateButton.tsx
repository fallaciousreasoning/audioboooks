import { Button, IconButton, Menu, MenuButton, MenuItem, MenuList, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/core";
import React from "react";
import { collect, Store } from "react-recollect";

const PlaybackRateButton = ({ store }: { store: Store }) => {

    return <Popover>
        <PopoverTrigger>
            <IconButton isRound icon="repeat-clock" aria-label="Playback Rate" />
        </PopoverTrigger>
        <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>Playback Rate: {store.settings.playbackRate}</PopoverHeader>
            <PopoverBody>
                <Slider value={store.settings.playbackRate} min={0.3} max={3} step={0.1} onChange={value => {
                    store.settings.playbackRate = value;
                }}>
                    <SliderTrack />
                    <SliderFilledTrack />
                    <SliderThumb />
                </Slider>
            </PopoverBody>
        </PopoverContent>
    </Popover>
}

export default collect(PlaybackRateButton);