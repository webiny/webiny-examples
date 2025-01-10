import React from "react";
import { Website } from "@webiny/app-website";
import { createLivePreviewRoute } from "@demo/live-preview-website";
import "./App.scss";

export const App = () => {
  return <Website routes={[createLivePreviewRoute()]} />;
};
