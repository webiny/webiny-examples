import { PbRenderElementPlugin } from "@webiny/app-page-builder/types";
import { Login } from "./Login";

export default {
    name: "pb-render-page-element-login",
    type: "pb-render-page-element",
    elementType: "login",
    render: Login
} as PbRenderElementPlugin;
