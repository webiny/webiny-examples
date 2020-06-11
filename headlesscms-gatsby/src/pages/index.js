import React from "react"
import { graphql } from 'gatsby'
import Layout from "../components/layout"

// The IndexPage component that renders our blog posts
const IndexPage = ({data}) => {
  // GraphQL queried data is automatically inserted into the `data` parameter used below
  const blogPosts = data.webinyHeadlessCms.listBlogPosts.data

  // We render a nice list of blog posts
  const BlogPosts = blogPosts.map(post => (
    <div key={`post-${post.id}`}>
      <h1>{post.title}</h1>
      <p style={{whiteSpace: "pre-wrap"}}>{post.body}</p>
    </div>
  ))

  return (
    {/* We use Gatsby's Layout to make our Blog look nice */}
    <Layout>
      {BlogPosts}
    </Layout>
  )
}

export default IndexPage

// A GraphQL query that fetches our blogs' data
export const query = graphql`{
  webinyHeadlessCms {
    listBlogPosts {
      data {
        id
        createdOn
        title
        body
      }
    }
  }
}`
