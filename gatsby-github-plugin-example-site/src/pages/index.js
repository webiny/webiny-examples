import React from "react"
import { graphql } from "gatsby"
import "../styles/main.css"

export default function Home({ data }) {
  return (
    <div className="container">
      <h1 className="heading">
        Creating a GitHub contributors widget for gatsby.js
      </h1>
      <div className="grid">
        {data.allContributor.nodes.map(contributor => (
          <div
            className="contributor-card"
            key={contributor.id}
            onClick={() => {
              window.open(contributor.html_url, "_blank", "noopener noreferrer")
            }}
            onKeyDown={event => {
              if (event.key === "Enter") {
                window.open(
                  contributor.html_url,
                  "_blank",
                  "noopener noreferrer"
                )
              }
            }}
            tabIndex="0"
            role="button"
          >
            <img
              src={contributor.avatar_url}
              alt={contributor.login}
              className="card__img"
            />
            <h5 className="card__name">{contributor.login}</h5>
          </div>
        ))}
      </div>
    </div>
  )
}

export const query = graphql`
  {
    allContributor {
      nodes {
        id
        login
        contributions
        url
        type
        html_url
        gravatar_id
        avatar_url
      }
    }
  }
`
