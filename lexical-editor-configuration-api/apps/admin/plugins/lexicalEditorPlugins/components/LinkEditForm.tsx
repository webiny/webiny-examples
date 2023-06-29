
import React, {useEffect} from "react";
import {TOGGLE_LINK_COMMAND} from "@lexical/link";

import {GridSelection, LexicalEditor, NodeSelection, RangeSelection} from "lexical";
import {InputType} from "../plugins/CustomFloatingLinkEditorPlugin/CustomFloatingLinkEditorPlugin";
import {sanitizeUrl} from "../utils/sanitizeUrl";
import {LinkSelect} from "./LinkSelect";

interface LinkFormProps {
    linkUrl: string,
    setEditMode: (mode: boolean) => void;
    lastSelection: RangeSelection | GridSelection | NodeSelection | null,
    inputRef: React.Ref<HTMLInputElement>;
    setLinkUrl: (url: string) => void;
    editor: LexicalEditor;
    showInputType: InputType
}

export const LinkEditForm = ({  showInputType, editor, lastSelection, linkUrl, inputRef, setEditMode, setLinkUrl }: LinkFormProps) => {

    const setUrlToLinkNode = (value: string, editMode = false) => {
        if (lastSelection !== null) {
            if (linkUrl !== "") {
                editor.dispatchCommand(
                    TOGGLE_LINK_COMMAND,
                    sanitizeUrl(value)
                );
            }
            setEditMode(editMode);
        }
    }

    const onChange = (e:  React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        // update state
        setLinkUrl(newValue);
        // update node
        setUrlToLinkNode(newValue);
    }

    return (
        <>
            {showInputType === "custom-link-input" &&
                <input
                    ref={inputRef}
                    className="custom-link-input"
                    value={linkUrl}
                    onChange={event => {
                        setLinkUrl(event.target.value);
                    }}
                    onKeyDown={event => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            setUrlToLinkNode(linkUrl);
                        } else if (event.key === "Escape") {
                            event.preventDefault();
                            setEditMode(false);
                        }
                    }}
                />}
            {showInputType === "select-link-input" &&
                <LinkSelect url={linkUrl} onChange={(e) => onChange(e)} />}
        </>
    )
}
