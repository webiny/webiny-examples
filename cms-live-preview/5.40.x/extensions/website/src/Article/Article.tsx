import React from "react";
import styled from "@emotion/styled";
import { ReadonlyArticle } from "@demo/website";

import {
    BannerBlockComponent,
    HeroBlockComponent,
    isBannerBlock,
    isHeroBlock,
    isRichTextBlock,
    isTextWithImageBlock,
    isThreeGridBoxBlock,
    RichTextBlockComponent,
    TextWithImageBlockComponent,
    ThreeGridBoxBlockComponent
} from "./Blocks";

const ArticlesContainer = styled.div`
    margin: 0 auto;
    padding: 10px;
    display: flex;
    max-width: 1100px;
    flex-direction: column;
    -webkit-font-smoothing: antialiased;
    h1, h2, h3, h4, h5 {
        font-family: ${({ theme }) => theme.styles.typography["headings"][0].styles.fontFamily}
    }
    
    p {
        font-family: ${({ theme }) => theme.styles.typography["paragraphs"][0].styles.fontFamily}
        line-height: 1.35;
        color: rgb(107 114 128);
    }
    
    a, button {
        font-family: ${({ theme }) => theme.styles.typography["paragraphs"][0].styles.fontFamily}
    }
`;

interface ArticleProps {
    article: ReadonlyArticle;
}

export const Article = ({ article }: ArticleProps) => {
    return (
        <ArticlesContainer>
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                    {article.title ?? "Untitled"}
                </span>
            </h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                {article.description ?? ""}
            </p>

            {(article.content || []).map((block, index) => {
                if (isRichTextBlock(block)) {
                    return <RichTextBlockComponent key={index} block={block} />;
                }
                if (isTextWithImageBlock(block)) {
                    return <TextWithImageBlockComponent key={index} block={block} />;
                }
                if (isBannerBlock(block)) {
                    return <BannerBlockComponent key={index} block={block} />;
                }
                if (isHeroBlock(block)) {
                    return <HeroBlockComponent key={index} block={block} />;
                }
                if (isThreeGridBoxBlock(block)) {
                    return <ThreeGridBoxBlockComponent key={index} block={block} />;
                }
                return <pre key={index}>{JSON.stringify(block)}</pre>;
            })}
        </ArticlesContainer>
    );
};
