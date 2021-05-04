import { Plugin } from "@webiny/plugins/types";
import menus from "./menus";
import routes from "./routes";
import permissions from "./permissions";

export default (): Plugin[] => [menus(), routes(), permissions];
