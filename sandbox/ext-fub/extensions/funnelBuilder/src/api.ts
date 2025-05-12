import { createModelGroup } from "./backend/api/contentModelGroup";
import { createThemeSettingsModel } from "./backend/api/createThemeSettingsModel";
import { getThemeSettings } from "./backend/api/getThemeSettings";
import { validatePageDataIntegrity } from "./backend/api/validatePageDataIntegrity";
import { setInitialPageContent } from "./backend/api/setInitialPageContent";

export const createExtension = () => {
    return [
        createModelGroup(),
        createThemeSettingsModel(),
        getThemeSettings(),
        validatePageDataIntegrity(),
        setInitialPageContent()
    ];
};
