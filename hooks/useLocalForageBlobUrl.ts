import { useEffect, useState } from "react"

import localforage from 'localforage';

export default (key: string) => {
    const [url, setUrl] = useState(undefined);

    useEffect(() => {
        let cancelled = false;
        localforage.getItem(key).then(blob => {
            console.log(blob);
            if (cancelled) return;

            if (blob)
                setUrl(URL.createObjectURL(blob));
            else setUrl(null);
        });

        return () => {
            cancelled = true;
            URL.revokeObjectURL(url);
        }
    }, [key]);

    return url;
}