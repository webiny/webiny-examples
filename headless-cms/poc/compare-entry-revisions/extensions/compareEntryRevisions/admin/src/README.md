# Compare Entry Revisions Extension - Admin

This directory contains the admin interface for the Compare Entry Revisions extension, which allows users to select and compare content entry revisions with AI-powered analysis.

## File Structure

### Core Files

- **`index.tsx`** - Main entry point that registers the extension with Webiny
- **`CompareRevisionsMenuItem.tsx`** - Main menu item component that orchestrates the entire workflow

### Modal Components

- **`RevisionSelectionModal.tsx`** - Modal displaying a data table for revision selection
- **`ComparisonModal.tsx`** - Modal displaying comprehensive revision analysis results

### Utilities & Configuration

- **`useRevisionComparison.ts`** - Custom hook containing all state management and comparison logic
- **`queries.ts`** - GraphQL queries for API communication
- **`types.ts`** - TypeScript type definitions
- **`styles.ts`** - Styled components for the data table and UI elements

## Architecture

### Component Hierarchy
```
Extension
└── CompareRevisionsMenuItem
    ├── RevisionSelectionModal
    └── ComparisonResultsModal
```

### Data Flow
1. User clicks menu item → Opens revision selection modal
2. User selects 2 revisions → Enables compare button
3. User clicks compare → Calls API with combined content
4. API returns SEO data → Shows results modal
5. User can copy results to clipboard

### State Management
All state is managed in the `useRevisionComparison` hook:
- Modal visibility states
- Revision selection tracking
- Loading states
- API response data

## Key Features

- **Data Table Interface**: Professional table with sticky headers and row selection
- **Smart Selection Logic**: Enforces exactly 2 revision selection with intuitive UX
- **AI-Powered Analysis**: OpenAI integration for intelligent content comparison
- **Comprehensive Reports**: Detailed differences, similarities, and recommendations
- **Error Handling**: Comprehensive error states and user feedback
- **Copy to Clipboard**: One-click copying of comparison reports
- **Loading States**: Visual feedback during API calls

## Usage

The extension automatically appears in the content entry editor menu for blog posts. Users can:

1. Select "Compare Entry Revisions" from the menu
2. Choose exactly 2 revisions from the data table
3. Click "Compare Revisions" to start analysis
4. View comprehensive comparison results in modal
5. Copy full report to clipboard

### Analysis Features

- **Content Summary**: High-level overview of changes between revisions
- **Detailed Differences**: Specific list of what changed between versions
- **Similarities**: Content that remained consistent across revisions
- **Improvement Recommendations**: AI-generated suggestions for content enhancement
- **Full Report Export**: Complete analysis available for clipboard copying

## Dependencies

- `@webiny/app-headless-cms` - Core Webiny CMS functionality
- `@webiny/app-admin` - Admin interface components
- `@webiny/ui/*` - Webiny UI component library
- `@emotion/styled` - Styled components
- `graphql-tag` - GraphQL query definitions
