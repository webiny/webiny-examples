import React from "react";
import { PbRenderElementPlugin } from "@webiny/app-page-builder/types";

import IFrame from "./components/iFrame";

export default () =>
    ({
        name: "pb-render-page-element-iframe",
        type: "pb-render-page-element",
        elementType: "iframe",
        render({ element }) {
            return <IFrame element={element} />;
        }
    } as PbRenderElementPlugin);
