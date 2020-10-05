export const supportedTrackTypes = [
    "mp3",
    "ogg",
    "aac",
    "wav",
    "mp4",
    "webm",
    "flac"
];

export interface Track {
    id: string;
    title: string;
    duration: number;
}