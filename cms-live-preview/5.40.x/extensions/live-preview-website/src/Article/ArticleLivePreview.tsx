import React, { useState } from "react";
import { useRouter } from "@webiny/react-router";
import { ReadonlyArticle } from "@demo/website";
import { Article } from "./Article";
import { useLivePreview } from "../useLivePreview";

export const ArticleLivePreview = () => {
    const router = useRouter();
    const [article, setArticle] = useState<ReadonlyArticle | undefined>(undefined);

    const [search] = router.search;

    const editorOrigin = search.get("origin");
    if (!editorOrigin) {
        return <div>Missing `origin` in query parameters! Live Preview is DISABLED!</div>;
    }

    useLivePreview<ReadonlyArticle>({
        editorOrigin,
        onEntry: setArticle
    });

    if (!article) {
        return null;
    }

    return <Article article={article} />;
};
