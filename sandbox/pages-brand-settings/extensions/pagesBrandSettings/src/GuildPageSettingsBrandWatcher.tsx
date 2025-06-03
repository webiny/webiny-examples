import React, { useContext, useEffect, useMemo } from "react";

import { useQuery } from "@apollo/react-hooks";
import { usePageSettings } from "@webiny/app-page-builder/pageEditor/hooks/usePageSettings";
import { PbEditorToolbarBottomPlugin, PbPageDetailsPlugin } from "@webiny/app-page-builder/types";
import { useParams, useLocation } from "@webiny/react-router";
import { gql } from "graphql-tag";
import qs from "qs";

import { GuildPageSettingsBrandContext } from "./GuildPageSettingsBrandProvider";
import { GuildPageSettingsBrandContextValue } from "./types";

const GET_PAGE_SETTINGS_BRAND = gql`
    query PbGetPageSettingsBrand($id: ID!) {
        pageBuilder {
            getPage(id: $id) {
                data {
                    id
                    settings {
                        brand {
                            buttonColor
                            buttonHoverColor
                            pictogramStrokeColor
                            pictogramCircleColor
                            employerNickname
                            employerFullName
                            employerUuid
                            isTaxGrossUp
                        }
                    }
                }
            }
        }
    }
`;

/**
 * A simple view-less component that updates the page brand settings whenever it gets new query data
 * @param data data output from the GET_PAGE_SETTINGS_BRAND query
 * @returns null
 */
const GuildPageSettingsBrandWatcher = ({ data }: any) => {
    const pageBrandContext = useContext<GuildPageSettingsBrandContextValue>(
        GuildPageSettingsBrandContext
    );

    useEffect(() => {
        const pageBrand = data?.pageBuilder?.getPage?.data?.settings?.brand;
        if (pageBrand) {
            pageBrandContext.setPageBrand(pageBrand);
        }
    }, [data, pageBrandContext]);

    return null;
};

/**
 * Component used specifically in the pb editor views to fetch the relevant page brand settings data
 * and pass it to the brand context updater component
 *
 * it gets the page id from the route params
 */
const GuildPageSettingsBrandEditorQueryWatcher = () => {
    const { id } = useParams<{ id: string }>();
    const { pageData } = usePageSettings();
    const { data, refetch } = useQuery(GET_PAGE_SETTINGS_BRAND, {
        fetchPolicy: "no-cache",
        variables: { id: decodeURIComponent(id!) }
    });

    // The editor brand watcher needs to be able to know when the settings are changed
    // when it gets a settings save event it refetches the brand settings query
    useEffect(() => {
        refetch();
    }, [refetch, pageData]);

    return <GuildPageSettingsBrandWatcher data={data} />;
};

// plugin for the editor
export const guildPageSettingsBrandEditorWatcher = {
    name: "pb-editor-brand-watcher",
    type: "pb-editor-toolbar-bottom",
    renderAction() {
        return <GuildPageSettingsBrandEditorQueryWatcher />;
    }
} as PbEditorToolbarBottomPlugin;

/**
 * Component used specifically in the pb render views to fetch the relevant page brand settings data
 * and pass it to the brand context updater component
 *
 * it gets the page id from query params
 */
const GuildPageSettingsBrandRenderQueryWatcher = () => {
    const { search } = useLocation();
    const queryParams: any = useMemo(() => qs.parse(search, { ignoreQueryPrefix: true }), [search]);
    const { data } = useQuery(GET_PAGE_SETTINGS_BRAND, {
        fetchPolicy: "no-cache",
        variables: { id: decodeURIComponent(queryParams?.id) }
    });

    return <GuildPageSettingsBrandWatcher data={data} />;
};

// plugin for the render
export const guildPageSettingsBrandRenderWatcher = {
    name: "pb-render-brand-watcher",
    type: "pb-page-details",
    render() {
        return <GuildPageSettingsBrandRenderQueryWatcher />;
    }
} as PbPageDetailsPlugin;
