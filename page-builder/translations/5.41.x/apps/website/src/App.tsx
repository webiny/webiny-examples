import React from "react";
import { Website } from "@webiny/app-website";
import { createLanguageProvider, createPageRoute, Translations } from "@demo/translations-website";
import "./App.scss";

export const App = () => {
    return (
        <Website providers={[createLanguageProvider()]} routes={[createPageRoute()]}>
            <Translations />
        </Website>
    );
};
