import { Identity } from "@webiny/api-authentication/types";

export interface PinEntity {
    PK: string;
    SK: string;
    id: string;
    title: string;
    description?: string;
    coverImage?: string;
    createdOn: string;
    savedOn: string;

    // For the `PinEntity` type, let's be specific and specify which fields are accepted.
    createdBy: Pick<Identity, "id" | "type" | "displayName">;

    webinyVersion: string;
}
