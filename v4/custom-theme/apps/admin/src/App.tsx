// Import base app template, which contains all the necessary plugins
import adminTemplate from "@webiny/app-template-admin-full";

// Import custom theme plugins
import theme from "theme";

// Import styles which include custom theme styles
import "./App.scss";

export default adminTemplate({
    cognito: {
        region: process.env.REACT_APP_USER_POOL_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
    },
    plugins: [
        theme()
    ]
});
