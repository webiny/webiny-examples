import type { SerializedEditorState } from "lexical";

export interface ReadonlyArticle {
    id: string;
    title: string;
    description: string;
    slug: string;
    content: Array<GenericBlock>;
}

// Content blocks

export interface GenericBlock {
    __typename: string;
}

export interface TextWithImageBlock extends GenericBlock {
    title: string;
    content: SerializedEditorState;
    image: string;
}

export interface BannerBlock extends GenericBlock {
    title: string;
    actionUrl: string;
    actionLabel: string;
    image: string;
}

export interface ThreeGridBoxBlock extends GenericBlock {
    boxes: Array<{
        title: string;
        description: string;
        icon: string;
    }>;
}

export interface HeroBlock extends GenericBlock {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    callToActionButtonLabel: string;
    callToActionButtonUrl: string;
}

export interface RichTextBlock extends GenericBlock {
    content: SerializedEditorState;
}
