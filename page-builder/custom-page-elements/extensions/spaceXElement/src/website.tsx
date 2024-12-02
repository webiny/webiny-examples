import React from "react";
import { PbRenderElementPlugin } from "@webiny/app-website";
import { SpaceX } from "./SpaceX";

export const Extension = () => <PbRenderElementPlugin elementType={"spaceX"} render={SpaceX} />;
