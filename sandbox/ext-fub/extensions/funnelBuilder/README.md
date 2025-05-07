# Funnel Builder Extension

The Funnel Builder is a Page Builder-based Webiny extension that lets you create multi-step funnels. It provides a set of page elements, admin interfaces, and API extensions to handle funnel creation, form submissions, and conditional logic.

## Structure

The extension is organized into three main folders:

### Backend

Located in `src/backend`, this folder contains API extensions for the Funnel Builder:

- **api**: Contains GraphQL resolvers, content models, and theme settings handlers for the funnel builder functionality.

### Frontend

Located in `src/frontend`, this folder contains admin and website extensions:

- **admin**: Contains React components, hooks, and plugins for the admin interface, including:
  - Theme settings management
  - Condition rules dialog for setting up conditional logic
  - Field settings dialog for configuring form fields
  - Various plugins for the admin panel

- **pageElements**: Contains page builder elements for creating funnels, including:
  - Button elements
  - Container elements for organizing content
  - Form field elements
  - Step elements for multi-step funnels
  - Controls and decorators for the page builder interface

### Shared

Located in `src/shared`, this folder contains shared code used by both backend and frontend:

- **models**: Contains the business logic for the funnel builder, including:
  - Funnel model
  - Step model
  - Field definition models
  - Submission models
  - Condition models for handling conditional logic
  - **Validators** for form validation:
    - Required, MinLength, MaxLength, Pattern
    - Gte (Greater than or equal), Lte (Less than or equal)
  - **Condition Operators** for conditional logic:
    - Eq (Equals), Neq (Not equals)
    - Gt (Greater than), Gte (Greater than or equal)
    - Lt (Less than), Lte (Less than or equal)
    - Includes, NotIncludes
    - Empty, NotEmpty
  - **Condition Actions** that execute when conditions are met:
    - HideField, DisableField
    - OnSubmitActivateStep, OnSubmitEndFunnel
  - **Field Values** for handling different data types:
    - String, StringArray
    - Number, NumberArray
    - Boolean, BooleanArray
  - **Field Types** for form elements:
    - TextField, TextareaField
    - NumberField, CheckboxGroupField

- Utility functions for creating elements, generating IDs, and other common tasks

## Installation

To install the Funnel Builder extension in your Webiny project, run the following command:

```
yarn webiny extension sandbox/ext-fub
```

This will download the extension and link it with your admin and website applications.

Additionally, you need to add the following configuration within the compilerOptions section of your project's root `tsconfig.build.json` file:

```json
"compilerOptions": {
  // ... other options
  "noPropertyAccessFromIndexSignature": false
  // ... other options
}
```

This configuration is required for the Funnel Builder extension to work properly in a Webiny project.

## API Integration

To integrate the Funnel Builder API with your Webiny project, you need to manually update the API extensions file.

In `apps/api/graphql/src/extensions.ts`, add the following:

```typescript
// This file is automatically updated via scaffolding utilities.
import { createExtension as FunnelBuilderExtension } from "funnel-builder/src/api";

// Learn more about extensions: https://webiny.link/extensions
export const extensions = () => {
    return [FunnelBuilderExtension()];
};
```

## Usage

To use the Funnel Builder:

1. Go to the Page Builder and create a new page
2. In the page editor, you'll immediately have access to the initial funnel container
3. Start adding funnel fields, buttons (using the controls element)
4. Configure validators and conditional rules for your fields
5. Preview your funnel to test the user experience
6. Publish your page when you're satisfied with the funnel

The Funnel Builder integrates seamlessly with the Page Builder interface, allowing you to create multi-step funnels with conditional logic, various field types, and custom actions.

## Developer Guide

If you're a developer looking to extend the Funnel Builder with new field types or other functionality, here's how to get started:

### Adding New Field Types

To add a new field type to the Funnel Builder:

1. First, go to `src/shared/models/fields` folder and add a new class that extends the base field class
2. Then, add an admin plugin where you can reference the class and create the actual renderer
3. For a beginner-friendly example, try implementing a radio buttons renderer or something similarly straightforward

Take time to familiarize yourself with the codebase structure. Examine how the existing field types are implemented, from their model definitions to their renderers. This will give you a good understanding of the patterns used throughout the extension.
