import React from "react";
import { FileManagerViewConfig, useFile } from "@webiny/app-file-manager";

// You can destructure child components to make the code more readable and easier to work with.
const { Browser, FileDetails } = FileManagerViewConfig;

const VideoQtFileType = () => {
    const { file } = useFile();
    return (
        <div>
            <p style={{ fontSize: 50 }}>📽️</p>
            <br />
            <p>{file.name}</p>
            <p>{file.size} bytes</p>
        </div>
    );
};

export const Extension = () => (
    <>
        <FileManagerViewConfig>
            <Browser.Grid.Item.Thumbnail type={"video/quicktime"} element={<VideoQtFileType />} />
            <FileDetails.Preview.Thumbnail type={"video/quicktime"} element={<VideoQtFileType />} />
        </FileManagerViewConfig>
    </>
);

