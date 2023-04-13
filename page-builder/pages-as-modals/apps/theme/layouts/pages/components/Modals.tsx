import React from "react";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { PageProvider, Page } from "@webiny/app-page-builder-elements";
import { isPrerendering } from "@webiny/app-website";

const GET_PUBLISHED_PAGE = gql`
  query PbGetPublishedPage($path: String, $preview: Boolean) @ps(cache: true) {
    pageBuilder {
      getPublishedPage(path: $path, preview: $preview) {
        data {
          content
        }
        error {
          code
          message
          data
        }
      }
    }
  }
`;

// For this example, we quickly styled our own simple modal.
// Usually, a ready-made Modal component would be used instead.
const Modal = styled.div`
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  margin: auto;
  background: white;
  height: 500px;
  width: 500px;
  z-index: 10;
`;

// Renders the modal via the following two steps:
// 1. via Page Builder's GraphQL API, retrieves the page and its content
// 2. renders the page (modal content) with the low-level `Page` React component
export const Modals = () => {
  if (isPrerendering()) {
    // We don't need this component to do anything if the page is
    // being prerendered (e.g. after a page has been published).
  }

  // We fetch the page by its path. This was hardcoded for this example.
  // The fetching logic can be made in a more robust fashion.
  const getPublishedPageQuery = useQuery(GET_PUBLISHED_PAGE, {
    variables: {
      path: "/modals/modal-1/",
      preview: true
    }
  });

  // Ultimately, we render the modal if a page was received. Otherwise we exit.
  const page = getPublishedPageQuery.data?.pageBuilder?.getPublishedPage?.data;
  if (!page) {
    return null;
  }

  return (
    <Modal>
      {/* It's recommended we also assign the `page` to `PageProvider` because */}
      {/* some of the page elements might need to access the whole page. */}
      <PageProvider page={page}>
        {/* Render retrieved page's content. */}
        <Page page={page} />
      </PageProvider>
    </Modal>
  );
};
