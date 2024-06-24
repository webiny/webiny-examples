import { useCallback, useEffect, useRef } from "react";
import { LivePreview, OnData } from "./LivePreview";

export interface UseLivePreviewParams<T> {
    editorOrigin: string;
    onEntry: (entry: T) => void;
}
export function useLivePreview<T>({ editorOrigin, onEntry }: UseLivePreviewParams<T>) {
    const livePreview = useRef(new LivePreview<T>({ origin: editorOrigin }));

    const onMessage: OnData<T> = useCallback(event => {
        if (event.type === "wby:onChange") {
            onEntry(event.data);
        }
    }, []);

    useEffect(() => {
        if (livePreview.current) {
            return livePreview.current.connect(onMessage);
        }

        return () => {
            // Void unmount callback.
        };
    }, [onEntry]);
}
