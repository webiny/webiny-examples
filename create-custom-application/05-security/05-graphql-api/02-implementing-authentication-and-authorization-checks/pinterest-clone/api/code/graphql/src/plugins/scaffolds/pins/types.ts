import { SecurityIdentity } from "@webiny/api-security";

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
    createdBy: Pick<SecurityIdentity, "id" | "type" | "displayName">;

    webinyVersion: string;
}
