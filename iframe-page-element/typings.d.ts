declare module "*.svg" {
    import { FunctionComponent, SVGProps } from "react";
    export const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement> & {
        alt?: string;
    }>;
    const src: string;
    export default src;
}