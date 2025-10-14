# Compare Entry Revisions Extension - API

This directory contains the API implementation for the Compare Entry Revisions extension, which provides GraphQL endpoints for comparing content entry revisions using OpenAI.

## File Structure

### Core Files

- **`index.ts`** - Main entry point that exports all API functions
- **`compareEntryRevisions.ts`** - Revision comparison with detailed analysis

## API Endpoints

### compareEntryRevisions
**Query**: `compareEntryRevisions(input: CompareRevisionsInput!): ComparisonData`

Comprehensive revision comparison with AI analysis.

**Input**:
```graphql
input CompareRevisionsInput {
    revisionId1: String!
    revisionId2: String!
    modelId: String!
}
```

**Output**:
```graphql
type ComparisonData {
    summary: String
    differences: [String]
    similarities: [String]
    recommendations: [String]
}
```

## Implementation Details

### OpenAI Integration

The endpoint uses OpenAI's GPT-3.5-turbo model with specialized prompts:

- **compareEntryRevisions**: Performs comprehensive content analysis and comparison

### Content Extraction

The `compareEntryRevisions` endpoint includes a helper function `extractContentFromRevision()` that:

1. Extracts meaningful content from revision objects
2. Prioritizes common content fields (title, content, body, description)
3. Handles various content structures gracefully
4. Provides fallback to JSON stringification

### CMS Integration

The API integrates with Webiny's CMS context to:

- Fetch content entries by revision ID
- Access the CMS storage layer
- Handle authentication and permissions
- Manage tenant isolation

## Error Handling

Comprehensive error handling includes:

- OpenAI API failures
- CMS data access errors
- Invalid revision IDs
- Missing content data
- JSON parsing errors

## Environment Variables

Required environment variable:
- `WEBINY_API_OPEN_AI_API_KEY` - OpenAI API key for GPT access

## Usage Examples

### Revision Comparison
```graphql
query {
    compareEntryRevisions(input: {
        revisionId1: "entry123#1"
        revisionId2: "entry123#2"
        modelId: "blogPost"
    }) {
        summary
        differences
        similarities
        recommendations
    }
}
```

## AI Prompts

### Revision Comparison Prompt
Comprehensive analysis prompt that provides:
- Change summary
- Detailed differences list
- Content similarities
- Content improvement suggestions

## Dependencies

- `@webiny/api-headless-cms` - CMS integration
- `@webiny/api-serverless-cms` - Serverless context
- `openai` - OpenAI API client

## Future Enhancements

Potential improvements:
- Support for more content models
- Batch revision comparison
- Historical change tracking
- Custom analysis templates
- Integration with content workflows
