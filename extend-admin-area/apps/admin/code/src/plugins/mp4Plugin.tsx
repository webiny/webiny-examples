import React from "react";
import { FileManagerFileTypePlugin } from "@webiny/app-admin/plugins/FileManagerFileTypePlugin";

export default [
    new FileManagerFileTypePlugin({
        types: ["video/mp4"],
        render({ file }) {
            return (
                <div style={{ paddingTop: "40%" }}>
                    <strong>My MP4</strong>
                    <br />
                    <span>{file.name}</span>
                    <br />
                    <span>{file.size} bytes</span>
                </div>
            );
        }
    })
];
