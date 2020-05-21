import React from "react"

import Layout from "../components/layout"

const IndexPage = ({data}) => {
  const blogPosts = data.webinyHeadlessCms.listBlogPosts.data
  const BlogPosts = blogPosts.map(post => (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  ))

  console.log(blogPosts)

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