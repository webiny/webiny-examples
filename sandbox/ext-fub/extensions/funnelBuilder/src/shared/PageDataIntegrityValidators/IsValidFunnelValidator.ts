import { PbPage } from "../types";
import { withContainer } from "./withContainer";
import { FunnelModel } from "../models/FunnelModel";

export class IsValidFunnelValidator {
    static id = "IsValidFunnelValidator";

    // Ensures sync between field page elements and fields listed in the container element's data.
    static validate(page: PbPage) {
        return withContainer(page, containerElement => {
            const funnel = new FunnelModel(containerElement.data);
            funnel.validate();
        });
    }
}
