# Custom IdP Extension

> [!IMPORTANT]  
> This extension is designed to work with Webiny `v6.0.0-alpha` exclusively!

This is a reference integration of a custom IdP. The goal of this extension is to demonstrate what Webiny plugins and concepts you need to use to integrate any third pary IdP with Webiny.

> [!WARNING]  
> This is in no way a final implementation as different IdPs have their own specifics, and every project has different requirements. This extension gives a solid foundation you can tweak and build upon.

There are two extensions that form the full integration: an [api](./api) and an [admin](./admin) extension.

## API Extension

The `api` extension has these responsibilities:

- Verification of the `idToken` JWT, and validation of the claims on every request to the Webiny API.
- Mapping of token claims to Webiny Identity, which is then used by Webiny for permission checks, etc.

## Admin Extension

The `admin` extension has these responsibilities:

- Interception of the login screen component (no login form, redirects the user to IdP login page)
- Handling of `idToken` and `refreshToken` via query params
- Background token refreshing
- Attaching the `Authorization` header to all API calls
- Storing tokens in localStorage

## Installation

In your Webiny project, run the following command:

```bash
yarn webiny extension custom-idp/6.0.0-alpha
```

## Configuration

### Interaction with Your IdP

Once the extension is installed, you need to provide implementation for `goToLogin`, `onError`, `onLogout`, and `getFreshTokens`.
In your project, open `extensions/customIdp/admin/src/index.tsx`. Here you'll find a reference implementation which you need to update with the specifics of your IdP (redirects to specific URLs, error code mapping, etc.). This file is also an entrypoint to the extension, and a place to configure the `<CustomIdp/>` component.

> [!TIP]
> If you need to change how some parts of the `<CustomIdp/>` work, start by opening the `extensions/customIdp/admin/src/CustomIdp.tsx` component, and see how it interacts with Webiny and the external IdP.

### `idToken` Verification

To verify the `idToken` signature, this implementation uses a shared secret key. You should set your shared secret key in your project's `.env` file:

```dotenv
WEBINY_API_IDP_SHARED_SECRET=my_shared_secret
```

You can find the verification logic in `extensions/customIdp/api/src/createAuthenticator.ts`. Here you can also implement additional verification of token claims.
