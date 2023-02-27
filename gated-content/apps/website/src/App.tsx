import React from "react";
import { Website } from "@webiny/app-website";
import { configureWebsiteSecurity, WebsiteTenancy, AnalyticsTracker } from "@demo/website";

const WebsiteSecurity = configureWebsiteSecurity({
    modules: [
        { baseRoute: "/news", label: "News" },
        { baseRoute: "/articles", label: "Articles", permission: "cp.apps.articles" }
    ]
});

export const App: React.FC = () => {
    return (
        <Website providers={[WebsiteTenancy, WebsiteSecurity]}>
            <AnalyticsTracker />
        </Website>
    );
};
