export interface LoginElementData {
    type: "login" | "signup" | "login-with-signup";
    signupGroup?: string;
    afterSignupUrl?: string;
}
