import React from "react"
import { graphql } from 'gatsby'
import Layout from "../components/layout"

const IndexPage = ({data}) => {
  const blogPosts = data.webinyHeadlessCms.listBlogPosts.data

  const BlogPosts = blogPosts.map(post => (
    <div key={`post-${post.id}`}>
      <h1>{post.title}</h1>
      <p style={{whiteSpace: "pre-wrap"}}>{post.body}</p>
    </div>
  ))

  return (
    <Layout>
      {BlogPosts}
    </Layout>
  )
}

export default IndexPage

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