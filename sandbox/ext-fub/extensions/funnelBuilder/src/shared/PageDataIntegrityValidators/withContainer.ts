import { ElementTreeTraverser } from "../ElementTreeTraverser";
import { isContainerElementType } from "../constants";
import { PbPage, PbPageElement } from "../types";
import { FunnelModelDto } from "../models/FunnelModel";

export type ContainerElement = PbPageElement<FunnelModelDto>;

export const withContainer = (
    page: PbPage,
    callback: (containerElement: ContainerElement) => void
) => {
    const traverser = new ElementTreeTraverser();
    let container: ContainerElement | null = null;
    traverser.traverse(page.content, element => {
        if (isContainerElementType(element.type)) {
            container = element as PbPageElement<FunnelModelDto>;
            return false;
        }
        return;
    });

    if (container) {
        return callback(container);
    }
};
