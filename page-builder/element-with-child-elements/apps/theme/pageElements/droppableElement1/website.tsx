import { PbRenderElementPlugin } from "@webiny/app-page-builder/types";
import { DroppableElement1 } from "./DroppableElement1";

const plugin = {
    name: "pb-render-page-element-droppable-element-1",
    type: "pb-render-page-element",
    elementType: "droppable-element-1",
    render: DroppableElement1
} as PbRenderElementPlugin;

export default plugin;