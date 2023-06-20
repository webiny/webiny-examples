import React from "react";
import {InputType} from "../plugins/CustomFloatingLinkEditorPlugin/CustomFloatingLinkEditorPlugin";
import {LinkSelect} from "./LinkSelect";

interface LinkFormProps {
    linkUrl: string,
    setEditMode: (mode: boolean) => void;
    removeLink: () => void;
    showPreviewForInputType: InputType;
}

export const LinkPreviewForm = ({ showPreviewForInputType, linkUrl, setEditMode, removeLink }: LinkFormProps) => {
  return (
      <>

          {showPreviewForInputType === "custom-link-input" &&
          <div className="custom-link-input">
              <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                  {linkUrl}
              </a>
              <div
                  className="custom-link-edit"
                  role="button"
                  tabIndex={0}
                  onMouseDown={event => event.preventDefault()}
                  onClick={() => {
                      setEditMode(true);
                  }}
              />
              <div
                  className="custom-link-unlink"
                  role="button"
                  tabIndex={0}
                  onMouseDown={event => event.preventDefault()}
                  onClick={() => {
                      removeLink();
                  }}
              />
          </div>}
          {showPreviewForInputType === "select-link-input" &&
              <LinkSelect disabled={true} url={linkUrl}  />
          }
      </>
  )
}
