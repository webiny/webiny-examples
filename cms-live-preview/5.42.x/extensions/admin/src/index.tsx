import React from "react";
import { AddPreviewPane } from "./AddPreviewPane";
import { LivePreviewEditor } from "./LivePreviewEditor";

export * from "./useLivePreview";

export const Extension = () => {
  return (
    <>
      <AddPreviewPane />
      <LivePreviewEditor />
    </>
  );
};
