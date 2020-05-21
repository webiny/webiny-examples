import React from "react"
import Layout from "../components/layout"

const IndexPage = ({data}) => {
  const blogPosts = data.webinyHeadlessCms.listBlogPosts.data
  const mainBlogPosts = blogPosts.slice(0, 2)
  const otherBlogPosts = blogPosts.slice(2)

  const MainBlogPosts = mainBlogPosts.map(post => (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  ))

  const OtherBlogPosts = otherBlogPosts
    ? (
        <div style={{marginTop: "64px"}}>
          <h4>You might also like...</h4>
            {otherBlogPosts.map(post => (
              <div style={{ width: "300px", display: "inline-block", verticalAlign: "top" }}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            ))}
        </div>
    )
    : ""

  return (
    <Layout>
      {MainBlogPosts}
      {OtherBlogPosts}
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