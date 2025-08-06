import { ButtonActionDefinition } from "../types";

// Mock function to simulate email verification.
const mockVerifyEmail = async (email: string | undefined): Promise<void> => {
    // Simulate an email verification check.
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!email || email !== "me@forth.com") {
                reject(new Error("Please verify your email before continuing."));
            } else {
                console.log(`Email ${email} has been verified.`);
                resolve();
            }
        }, 1000);
    });
};

// Mock function to simulate saving user data to CRM.
const mockSaveUserToCrm = async (enteredEmail: string): Promise<void> => {
    // Simulate saving user data to CRM.
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`User with email ${enteredEmail} saved to CRM.`);
            resolve();
        }, 1000);
    });
};

export const saveUserToCrmButtonAction: ButtonActionDefinition = {
    type: "saveUserToCrm",
    name: "Save User to CRM",
    description:
        "Verifies the user's email and saves their data to the CRM. Must have a field with 'email' field ID present in the form.",
    canAdd: ({ element }) => {
        // Can only be added if there are no "saveUserToCrm" actions already present.
        const actions = element.data.actions;
        return !actions.some(action => action.type === "saveUserToCrm");
    },
    action: async ({ funnelSubmissionVm }) => {
        // We're mocking the email verification check here.
        const enteredEmail = funnelSubmissionVm.getField("email").getRawValue() as
            | string
            | undefined;

        // If one of these throw, the action chain will stop.
        await mockVerifyEmail(enteredEmail);
        await mockSaveUserToCrm(enteredEmail!);

        // Ultimately, we return true to indicate that the action was successful.
        return true;
    }
};
