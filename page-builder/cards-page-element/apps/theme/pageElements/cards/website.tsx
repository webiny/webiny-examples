import { PbRenderElementPlugin } from "@webiny/app-page-builder/types";
import { Cards } from "./Cards";

const plugin = {
    name: "pb-render-page-element-space-x",
    type: "pb-render-page-element",
    elementType: "cards",
    render: Cards
} as PbRenderElementPlugin;

export default plugin;