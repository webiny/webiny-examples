import { PbPageElementPagesListComponentPlugin } from "@webiny/app-page-builder/types";
import { createCardComponent } from "./createCardComponent";

export const pagesListCardPlugin = {
    name: "pb-page-element-pages-list-component-card",
    type: "pb-page-element-pages-list-component",
    title: "Card",
    componentName: "card",
    component: createCardComponent()
} as PbPageElementPagesListComponentPlugin;
