import React, { useMemo } from "react";
import styled from "@emotion/styled";
import {
    PagesListComponent,
    PagesListPage
} from "@webiny/app-page-builder-elements/renderers/pagesList/types";
import { Link } from "@webiny/react-router";
// import { usePageElements } from "@webiny/app-page-builder-elements";
// import { prevIcon, nextIcon } from "./icons";
import { formatDate } from "./formatDate";

const useArticleComponents = () => {
    return useMemo(() => {
        const ArticleItem = styled.div`
            display: flex;
            flex-direction: row;
            width: 100%;
            height: 200px;
            margin: 20px 0;
        `;

        const ArticleImage = styled.img`
            width: 300px;
            margin-right: 20px;
        `;

        const ArticleInfo = styled.div`
            display: flex;
            flex-direction: column;
        `;

        const ArticleTitle = styled.h3`
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
        `;

        const ArticleSnippet = styled.p``;

        return {
            ArticleItem,
            ArticleImage,
            ArticleInfo,
            ArticleTitle,
            ArticleSnippet
        };
    }, []);
};

interface ArticleProps {
    page: PagesListPage;
}

const Article = ({ page }: ArticleProps) => {
    const { ArticleItem, ArticleImage, ArticleInfo, ArticleTitle, ArticleSnippet } =
        useArticleComponents();

    const image = page.images?.general?.src;

    return (
        <ArticleItem>
            {image ? <ArticleImage src={image} /> : null}
            <ArticleInfo>
                {formatDate(page.publishedOn)}
                <Link to={page.path}>
                    <ArticleTitle>{page.title}</ArticleTitle>
                </Link>
                <ArticleSnippet>{page.snippet}</ArticleSnippet>
            </ArticleInfo>
        </ArticleItem>
    );
};

export const createCardComponent = (): PagesListComponent => {
    const ArticlesList = styled.div`
        margin-top: 50px;
    `;

    return function DefaultPagesListComponent(props) {
        const { data, loading, hasNextPage, nextPage } = props;

        if (!data) {
            return <div>No articles found!</div>;
        }

        return (
            <ArticlesList>
                {data.data.map(page => (
                    <Article key={page.id} page={page} />
                ))}
            </ArticlesList>
        );
    };
};
