export interface CmsLivePreviewIncomingEvent<T> {
    type: "wby:onChange";
    data: T;
}

export interface OnData<T> {
    (data: CmsLivePreviewIncomingEvent<T>): void;
}

interface LivePreviewConfig {
    origin: string;
}

export class LivePreview<T> {
    private params: LivePreviewConfig;

    constructor(params: LivePreviewConfig) {
        this.params = params;
    }

    connect(onData: OnData<T>) {
        const listener = (event: MessageEvent<CmsLivePreviewIncomingEvent<T>>) => {
            // We need to filter window messages, because various dev tools are sending messages to the window.
            // We only want to catch the events coming from Webiny.
            if (!event.data.type?.startsWith("wby:")) {
                return;
            }

            onData(event.data);
        };

        // Listen for window message, and only handle `wby:` messages.
        window.addEventListener("message", listener);

        // Report to the parent window.
        window.parent.postMessage(
            {
                type: "wby:onPreviewReady"
            },
            {
                targetOrigin: this.params.origin
            }
        );

        return () => {
            window.removeEventListener("message", listener);
        };
    }
}
