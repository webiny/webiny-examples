import React, { useEffect } from "react";
import { useBind } from "@webiny/form";
import { plugins } from "@webiny/plugins";
import { PbPageElementActionTypePlugin } from "@webiny/app-page-builder/types";
import { PagesAutocomplete } from "./PagesAutocomplete";

/**
 * This component contains the UI that will be rendered when `internalPage` action type is selected in the
 * Page Builder button element settings. The UI can contain more than one element, so feel free to expand this
 * example to fit your requirements.
 */
const InternalLinkForm = () => {
    const hrefBind = useBind({
        name: "href"
    });

    const bind = useBind({
        name: "internalPage",
        afterChange(value) {
            if (value) {
                hrefBind.onChange(`https://my-domain.com${value.path}`);
            } else {
                hrefBind.onChange(null);
            }
        }
    });

    return <PagesAutocomplete value={bind.value} onChange={bind.onChange} />;
};

/**
 * This component will register a new `PbPageElementActionTypePlugin`.
 */
export const ActionHandlerPlugin = () => {
    const actionHandler: PbPageElementActionTypePlugin = {
        name: "pb-page-element-action-type-internal-link",
        type: "pb-page-element-action-type",
        actionType: {
            name: "internalLink",
            label: "Internal link",
            element: <InternalLinkForm />
        }
    };

    useEffect(() => {
        plugins.register(actionHandler);
        return () => {
            plugins.unregister(actionHandler.name!);
        };
    }, []);

    return null;
};
