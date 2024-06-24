import React from "react";
import { Website } from "@webiny/app-website";
import { createLivePreviewRoute } from "@demo/website";
import "./App.scss";

export const App = () => {
  return <Website routes={[createLivePreviewRoute()]} />;
};
