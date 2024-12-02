import React from "react";
import { ArticleLivePreview } from "./Article/ArticleLivePreview";

export * from "./types";

export const createLivePreviewRoute = () => {
    return {
        path: "/cms/live-preview",
        element: <ArticleLivePreview />
    };
};
