import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import { CircularProgress } from "@webiny/ui/Progress";

const LivePreviewContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--mdc-theme-on-background);
`;

const Location = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px;
    border-bottom: 1px solid var(--mdc-theme-on-background);
    background: repeating-linear-gradient(45deg, #606dbc, #606dbc 15px, #515ebb 15px, #515ebb 30px);
`;

const AddressBar = styled.input`
    height: 27px;
    padding: 0 5px;
    width: 100%;
    border: 1px solid var(--mdc-theme-on-background);
    border-radius: 5px;
    box-sizing: border-box;
`;

const ReloadPreview = styled.button`
    padding: 0 5px;
    height: 27px;
    border-radius: 5px;
    border: none;
`;

const IframeContainer = styled.div`
    display: block;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    > iframe {
        height: 100%;
    }
`;

export interface PreviewProps {
    previewUrl: string;
}

export const PreviewPane = (props: PreviewProps) => {
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState(props.previewUrl);
    const [previewUrl, setPreviewUrl] = useState(props.previewUrl);
    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    const reload = () => {
        const iframe = iframeRef.current;

        if (!iframe) {
            return;
        }

        setLoading(true);
        const newSrc = new URL(iframe.src ?? previewUrl);
        newSrc.searchParams.set("ts", Date.now().toString());

        iframe.src = newSrc.toString();
    };

    const onLoadFinish = (e: any) => {
        setLoading(false);
    };

    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") {
            return;
        }

        setPreviewUrl(e.currentTarget.value);
        setLoading(true);
    };

    return (
        <LivePreviewContainer>
            <Location>
                <AddressBar
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    onKeyDown={onEnter}
                />
                <ReloadPreview onClick={reload}>Reload</ReloadPreview>
            </Location>
            <IframeContainer>
                {loading ? <CircularProgress label={"Connecting to Live Preview..."} /> : null}
                <iframe
                    onLoad={onLoadFinish}
                    ref={ref => (iframeRef.current = ref)}
                    id={"live-preview-iframe"}
                    sandbox={"allow-same-origin allow-scripts allow-forms"}
                    src={previewUrl}
                    width="100%"
                    height="100%"
                />
            </IframeContainer>
        </LivePreviewContainer>
    );
};
