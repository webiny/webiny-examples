import React, { useCallback, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { FileManagerFileItem, FileManagerRenderer, OverlayLayout } from "@webiny/app-admin";
import { createDecorator } from "@webiny/app-serverless-cms";
import { PanelUISdk, AttachmentDto } from "@brandfolder-panel/sdk";

const BrandfolderContainer = styled.div`
    overflow-y: scroll;
    height: inherit;
`;

const token = "{YOUR_API_KEY}";

export const Brandfolder = createDecorator(FileManagerRenderer, () => {
    return function BrandfolderRenderer(props) {
        const ref = useRef<HTMLDivElement | null>(null);
        const sdk = useRef<PanelUISdk | undefined>(undefined);

        /**
         * Handle file selection. Once a file is selected in the Brandfolder UI, we need to map the data to the format required by Webiny File Manager.
         */
        const onSelect = useCallback((dto: AttachmentDto) => {
            const keys = Object.keys(dto) as Array<keyof AttachmentDto>;
            /**
             * Map Brandfolder file DTO to Webiny File Manager file item.
             * Only `id` and `src` are the required properties, `meta` is optional.
             */
            const fmDto: FileManagerFileItem = {
                id: dto.id,
                src: dto.url,
                meta: keys.map(key => ({
                    key,
                    value: dto[key]
                }))
            };

            if (props.onChange) {
                /**
                 * Webiny File Manager supports selection of single and multiple files.
                 * If the File Manager is requesting multiple files, then we must return an array.
                 */
                if (props.multiple) {
                    props.onChange([fmDto]);
                } else {
                    props.onChange(fmDto);
                }
            }

            props.onClose && props.onClose();
        }, []);

        /**
         * Set up the Brandfolder Panel UI SDK, and immediately open the UI (call `selectAttachments`).
         */
        useEffect(() => {
            if (!ref.current) {
                console.warn("Can't mount Brandfolder Panel! Missing target DOM element.");
                return;
            }

            sdk.current = new PanelUISdk({
                appName: "test",
                anchorElement: ref.current,
                authParameters: { token }
            });

            sdk.current.selectAttachments({
                allowedMimeTypes: props.accept,
                onSelect
            });

            return () => {
                sdk.current && sdk.current.closePanel();
            };
        }, []);

        return (
            <OverlayLayout onExited={() => props.onClose && props.onClose()}>
                <BrandfolderContainer>
                    <div ref={ref} id="panel-root" />
                </BrandfolderContainer>
            </OverlayLayout>
        );
    };
});
