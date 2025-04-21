import React, { useEffect, useState } from "react";
import { useSnackbar } from "@webiny/app-admin";
import { ContentEntryEditorConfig } from "@webiny/app-headless-cms";
import type { CmsDynamicZoneTemplate, CmsModelField } from "@webiny/app-headless-cms/types";
import { AccordionItem } from "@webiny/ui/Accordion";
import { ReactComponent as CopyIcon } from "@material-design-icons/svg/outlined/content_copy.svg";
import { ReactComponent as PasteIcon } from "@material-design-icons/svg/outlined/content_paste.svg";

const { FieldRenderers } = ContentEntryEditorConfig;

interface ClipboardActionsProps {
    value: any;
    template: CmsDynamicZoneTemplate;
}

const CopyToClipboardAction = ({ template, value }: ClipboardActionsProps) => {
    const { showSnackbar } = useSnackbar();

    const copyItem = () => {
        navigator.clipboard.writeText(
            JSON.stringify({
                type: "wby.cms",
                template,
                value
            })
        );
        showSnackbar("Copied to clipboard!");
    };

    return (
        <>
            <AccordionItem.Action icon={<CopyIcon />} onClick={copyItem} tooltip="Copy" />
        </>
    );
};

const WithSingleValueCopy = FieldRenderers.DynamicZone.SingleValue.ItemContainer.createDecorator(
    Original => {
        return function SingleValueItemContainer(props) {
            return (
                <Original
                    {...props}
                    actions={
                        <CopyToClipboardAction template={props.template} value={props.value} />
                    }
                />
            );
        };
    }
);

const WithMultiValueCopy = FieldRenderers.DynamicZone.MultiValue.ItemContainer.createDecorator(
    Original => {
        return function MultiValueItemContainer(props) {
            return (
                <Original
                    {...props}
                    actions={
                        <CopyToClipboardAction template={props.template} value={props.value} />
                    }
                />
            );
        };
    }
);

type CanPaste = { canPaste: true; valueToPaste: any; reason: "known-data" };

type UnknownData = {
    canPaste: false;
    valueToPaste: undefined;
    reason: "unknown-data";
};

type IncompatibleTemplate = {
    canPaste: false;
    valueToPaste: undefined;
    reason: "incompatible-template";
};

const unknownData: UnknownData = {
    canPaste: false,
    valueToPaste: undefined,
    reason: "unknown-data"
};
const incompatible: IncompatibleTemplate = {
    canPaste: false,
    valueToPaste: undefined,
    reason: "incompatible-template"
};

const INTERVAL_IN_MS = 200;

function useCanPaste(field: CmsModelField) {
    const [state, setState] = useState<CanPaste | IncompatibleTemplate | UnknownData>(unknownData);

    useEffect(() => {
        const interval = setInterval(() => {
            navigator.clipboard
                .readText()
                .then(clipboardData => {
                    const { template, value, type } = JSON.parse(clipboardData);

                    if (type !== "wby.cms" || !value) {
                        setState(unknownData);
                        return;
                    }

                    const templates = field.settings?.templates ?? [];
                    const valueTemplate = template as CmsDynamicZoneTemplate;

                    /**
                     * Logic to validate destination. In my DZ fields, I assigned a tag to each template, like `id:hero-1`.
                     * If you're creating models through code, the easiest way to go about this is to
                     * give your templates a unique `id` property (these are auto-generated when models are built
                     * through UI, but through code, you have more control over this).
                     *
                     * When template `id` is defined through code, and is reused across different dynamic zone fields,
                     * it will automatically support copying of nested dynamic zones.
                     *
                     * NOTE: tweak this logic according to your project requirements.
                     */
                    const idTag = valueTemplate.tags?.find(tag => tag.startsWith("id:"));
                    if (!idTag) {
                        setState(incompatible);
                        return;
                    }

                    // Check if the target DZ field has a matching template.
                    // NOTE: tweak this logic according to your project requirements.
                    const targetTemplate = templates.find(tpl => (tpl.tags ?? []).includes(idTag));

                    if (!targetTemplate) {
                        setState(incompatible);
                        return;
                    }

                    const valueToPaste = {
                        ...value,
                        _templateId: targetTemplate.id
                    };

                    setState({
                        canPaste: true,
                        valueToPaste,
                        reason: "known-data"
                    });
                })
                .catch(() => {
                    // Errors can occur due to browser permissions, or clipboard value parsing.
                    // It's up to you to handle errors in a way that makes sense for your project.
                    setState(unknownData);
                });
        }, INTERVAL_IN_MS);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return state;
}

const WithPaste = FieldRenderers.DynamicZone.Container.createDecorator(Original => {
    return function DzContainer(props) {
        const { canPaste, valueToPaste, reason } = useCanPaste(props.field);

        const pasteItem = async () => {
            if (!canPaste) {
                return;
            }

            if (props.field.multipleValues) {
                props.bind.appendValue(valueToPaste);
            } else {
                props.bind.onChange(valueToPaste);
            }

            // Reset clipboard.
            await navigator.clipboard.writeText("");
        };

        const showAction = canPaste || (!canPaste && reason === "incompatible-template");
        const tooltip = canPaste ? "Paste from clipboard" : "No compatible templates were found.";
        const disabled = !canPaste && reason === "incompatible-template";

        return (
            <Original
                {...props}
                actions={
                    showAction ? (
                        <AccordionItem.Action
                            icon={<PasteIcon />}
                            onClick={pasteItem}
                            tooltip={tooltip}
                            disabled={disabled}
                        />
                    ) : undefined
                }
            />
        );
    };
});

export const Extension = () => {
    return (
        <>
            <WithSingleValueCopy />
            <WithMultiValueCopy />
            <WithPaste />
        </>
    );
};
