import React, { useEffect } from "react";
import { createComponentPlugin, isPrerendering, MainContent } from "@webiny/app-website";
import { useRouter } from "@webiny/react-router";
import { usePage } from "@webiny/app-page-builder-elements";

// POINT OF INTEREST:
// We're hooking into the `MainContent` component. This helps us reduce the amount of security checks,
// as this component is only mounted if the user is authorized to view the page content.
// This also helps us avoid tracking early redirects, as those happen much earlier than the `MainContent` is mounted.
export const AnalyticsTracker = createComponentPlugin(MainContent, Original => {

    // We don't want to track events during prerendering.
    if (isPrerendering()) {
        return Original;
    }

    return function AnalyticsTracker(props) {
        const { location } = useRouter();
        const { page } = usePage();

        useEffect(() => {
            console.log(`[Analytics] Track Event`, {
                id: page.id,
                slug: page.path,
                pathname: location.pathname
            });
        }, [location.pathname]);

        return <Original {...props} />;
    };
});
