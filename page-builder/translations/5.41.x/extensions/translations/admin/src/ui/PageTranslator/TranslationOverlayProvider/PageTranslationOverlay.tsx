import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useSnackbar } from "@webiny/app-admin";
import { OverlayLayout } from "@webiny/app-admin/components/OverlayLayout";
import { usePage } from "@webiny/app-page-builder/admin";
import { Typography } from "@webiny/ui/Typography";
import { CircularProgress } from "@webiny/ui/Progress";
import { PageTranslationEditor } from "./PageTranslationEditor";
import { useListLanguages } from "../../../features";

interface PageTranslationOverlayProps {
    pageId: string;
    onClose: () => void;
}

const Title = styled(Typography)`
    color: var(--mdc-theme-text-primary-on-background);
    padding-left: 8px;
    line-height: 48px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const PageTitle = ({ title }: { title: string }) => {
    return (
        <Title tag={"h1"} use={"headline6"}>
            {title}
        </Title>
    );
};

export const PageTranslationOverlay = ({ pageId, onClose }: PageTranslationOverlayProps) => {
    const { loading: pageLoading, page, error } = usePage(pageId);
    const { loading: languagesLoading, languages } = useListLanguages();
    const { showSnackbar } = useSnackbar();

    const loading = pageLoading || languagesLoading;

    useEffect(() => {
        if (error) {
            onClose();
            showSnackbar(error.message);
        }
    }, [error]);

    return (
        <OverlayLayout
            barLeft={loading ? null : page ? <PageTitle title={page.title} /> : null}
            onExited={onClose}
        >
            {loading ? (
                <CircularProgress label={"Loading editor..."} />
            ) : page ? (
                <PageTranslationEditor page={page} languages={languages} />
            ) : null}
        </OverlayLayout>
    );
};
