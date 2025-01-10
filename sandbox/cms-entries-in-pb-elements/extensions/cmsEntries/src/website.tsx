import React from "react";
import { PbRenderElementPlugin } from "@webiny/app-website";
import { CmsEntries } from "./CmsEntries";

export const Extension = () => <PbRenderElementPlugin elementType={"cms-entries"} renderer={CmsEntries} />;