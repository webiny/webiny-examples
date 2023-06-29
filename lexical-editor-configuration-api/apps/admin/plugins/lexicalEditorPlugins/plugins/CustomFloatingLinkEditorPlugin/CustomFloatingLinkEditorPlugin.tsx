import React, { useCallback, useEffect, useRef, useState } from "react";
import "./CustomFloatingLinkEditorPlugin.css";
import { $isAutoLinkNode, $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $findMatchingParent, mergeRegister } from "@lexical/utils";
import {
    $getSelection,
    $isRangeSelection,
    COMMAND_PRIORITY_CRITICAL,
    COMMAND_PRIORITY_LOW,
    GridSelection,
    LexicalEditor,
    NodeSelection,
    RangeSelection,
    SELECTION_CHANGE_COMMAND
} from "lexical";

import { createPortal } from "react-dom";
import { getSelectedNode } from "../../utils/getSelectedNode";
import { setFloatingElemPosition } from "../../utils/setFloatingElemPosition";
import {LinkPreviewForm} from "../../components/LinkPreviewForm";
import {LinkEditForm} from "../../components/LinkEditForm";


export type InputType = "custom-link-input" | "select-link-input";


function CustomFloatingLinkEditor({
                                editor,
                                anchorElem
                            }: {
    editor: LexicalEditor;
    anchorElem: HTMLElement;
}): JSX.Element {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [linkUrl, setLinkUrl] = useState("");
    const [isEditMode, setEditMode] = useState(false);
    const [lastSelection, setLastSelection] = useState<
        RangeSelection | GridSelection | NodeSelection | null
    >(null);
    const [showInputType, setShowInputType] = useState<InputType>("custom-link-input");

    const updateLinkEditor = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            const node = getSelectedNode(selection);
            const parent = node.getParent();
            if ($isLinkNode(parent)) {
                setLinkUrl(parent.getURL());
            } else if ($isLinkNode(node)) {
                setLinkUrl(node.getURL());
            } else {
                setLinkUrl("");
            }
        }
        const editorElem = editorRef.current;
        const nativeSelection = window.getSelection();
        const activeElement = document.activeElement;

        if (editorElem === null) {
            return;
        }

        const rootElement = editor.getRootElement();

        if (
            selection !== null &&
            nativeSelection !== null &&
            rootElement !== null &&
            rootElement.contains(nativeSelection.anchorNode)
        ) {
            const domRange = nativeSelection.getRangeAt(0);
            let rect;
            if (nativeSelection.anchorNode === rootElement) {
                let inner = rootElement;
                while (inner.firstElementChild != null) {
                    inner = inner.firstElementChild as HTMLElement;
                }
                rect = inner.getBoundingClientRect();
            } else {
                rect = domRange.getBoundingClientRect();
            }

            setFloatingElemPosition(rect, editorElem, anchorElem);
            setLastSelection(selection);
        } else if (!activeElement || activeElement.className !== "custom-link-input") {
            if (rootElement !== null) {
                setFloatingElemPosition(null, editorElem, anchorElem);
            }
            setLastSelection(null);
            setEditMode(false);
            setLinkUrl("");
        }

        return true;
    }, [anchorElem, editor]);

    const removeLink = () => {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
        setEditMode(false);
    };

    useEffect(() => {
        const scrollerElem = anchorElem.parentElement;

        const update = () => {
            editor.getEditorState().read(() => {
                updateLinkEditor();
            });
        };

        window.addEventListener("resize", update);

        if (scrollerElem) {
            scrollerElem.addEventListener("scroll", update);
        }

        return () => {
            window.removeEventListener("resize", update);

            if (scrollerElem) {
                scrollerElem.removeEventListener("scroll", update);
            }
        };
    }, [anchorElem.parentElement, editor, updateLinkEditor]);

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    updateLinkEditor();
                });
            }),

            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                () => {
                    updateLinkEditor();
                    return true;
                },
                COMMAND_PRIORITY_LOW
            )
        );
    }, [editor, updateLinkEditor]);

    useEffect(() => {
        editor.getEditorState().read(() => {
            updateLinkEditor();
            updateLinkEditor();
        });
    }, [editor, updateLinkEditor]);

    useEffect(() => {
        if (isEditMode && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditMode]);

    return (
        <div ref={editorRef} className="custom-link-editor">
            <>
                <h1 className={"custom-link-title"}>My custom link form</h1>
                <div className={"custom-link-menu"}>
                    <button className={`webiny-ui-button webiny-ui-button--secondary mdc-button mdc-button--dense mdc-button--outline ${showInputType === "custom-link-input" ? "mdc-button--unelevated": ""}`}
                            onClick={() => setShowInputType("custom-link-input")}>Custom link</button>
                    <button className={`webiny-ui-button mdc-button mdc-button--dense ${showInputType === "select-link-input" ? "mdc-button--unelevated ": ""}`}
                            onClick={() => setShowInputType("select-link-input")}>Webiny links</button>
                </div>
                {isEditMode ? (
                    <>

                        <LinkEditForm
                            showInputType={showInputType}
                            linkUrl={linkUrl}
                            lastSelection={lastSelection}
                            inputRef={inputRef}
                            setEditMode={setEditMode}
                            editor={editor}
                            setLinkUrl={setLinkUrl}/>
                    </>
                ) : (
                    <>
                        <LinkPreviewForm showPreviewForInputType={showInputType} linkUrl={linkUrl} setEditMode={setEditMode} removeLink={removeLink} />
                    </>
                )}
            </>
        </div>
    );
}

function useFloatingLinkEditorToolbar(
    editor: LexicalEditor,
    anchorElem: HTMLElement
): JSX.Element | null {
    const [activeEditor, setActiveEditor] = useState(editor);
    const [isLink, setIsLink] = useState(false);

    const updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            const node = getSelectedNode(selection);
            const linkParent = $findMatchingParent(node, $isLinkNode);
            const autoLinkParent = $findMatchingParent(node, $isAutoLinkNode);

            // We don't want this menu to open for auto links.
            if (linkParent != null && autoLinkParent == null) {
                setIsLink(true);
            } else {
                setIsLink(false);
            }
        }
    }, []);

    useEffect(() => {
        return editor.registerCommand(
            SELECTION_CHANGE_COMMAND,
            (_payload, newEditor) => {
                updateToolbar();
                setActiveEditor(newEditor);
                return false;
            },
            COMMAND_PRIORITY_CRITICAL
        );
    }, [editor, updateToolbar]);

    return isLink
        ? createPortal(
            <CustomFloatingLinkEditor editor={activeEditor} anchorElem={anchorElem} />,
            anchorElem
        )
        : null;
}

export function CustomFloatingLinkEditorPlugin({
                                             anchorElem = document.body
                                         }: {
    anchorElem?: HTMLElement;
}): JSX.Element | null {
    const [editor] = useLexicalComposerContext();
    return useFloatingLinkEditorToolbar(editor, anchorElem);
}
