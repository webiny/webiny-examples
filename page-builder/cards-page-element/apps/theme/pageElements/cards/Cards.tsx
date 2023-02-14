import React from "react";
import { createRenderer, useRenderer } from "@webiny/app-page-builder-elements";
import styled from "@emotion/styled";
import { typography } from "theme/theme";

// It's often useful to type the data that the page element will carry.
export interface CardsElementData {
    variables: {
        cards: Array<{ title: string; image: Partial<{ src: string; id: string }> }>;
    };
}

const CardsList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  li {
    padding: 10px;
    box-sizing: border-box;
    display: block;
    flex-basis: 33.333333%;

    img {
      width: 100%;
    }

    h3 {
      ${typography.heading3}
    }
`;

// The renderer React component.
export const Cards = createRenderer(() => {
    // We need the element in order to retrieve the list of cards chosen by the user.
    const { getElement, theme } = useRenderer();
    const element = getElement<CardsElementData>();

    return (
        <CardsList theme={theme}>
            {element.data.variables.cards.map((item, index) => (
                <li key={index}>
                    {/* We added `?width=500` so that we don't fetch large images unnecessarily. */}
                    <img src={`${item.image.src}?width=500`} />
                    <h3>{item.title}</h3>
                </li>
            ))}
        </CardsList>
    );
});
