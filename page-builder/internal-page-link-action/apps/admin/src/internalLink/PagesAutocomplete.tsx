/**
 * This file is just an example of a page autocomplete component. Feel free to modify it to fit your requirements.
 * This example simply lists pages that match the `search` query, and generates Autocomplete options from those pages.
 *
 * When an option is selected in the dropdown, we pass an `{ id, path }` object into the `onChange` callback.
 * You're free to modify this to contain any data you might need, and also add more fields to `listPages` field selection.
 */

import React, { useState } from "react";
import { AutoComplete, AutoCompleteProps } from "@webiny/ui/AutoComplete";
import { Typography } from "@webiny/ui/Typography";
import gql from "graphql-tag";
import { get } from "lodash";
import { useQuery } from "@apollo/react-hooks";
import { debounce } from "lodash";

const LIST_PAGES = gql`
    query ListPages($search: PbListPagesSearchInput) {
        pageBuilder {
            listPages(search: $search) {
                data {
                    path
                    id: uniquePageId
                    status
                    name: title
                }
                error {
                    code
                    message
                    data
                }
            }
        }
    }
`;

interface PageData {
    id: string;
    name: string;
    status: string;
    path: string;
}

interface PagesAutocompleteProps extends Partial<AutoCompleteProps> {
    onChange(value: { id: string; path: string } | null): void;
    trailingIcon?: React.ReactNode;
}

const createOptions = (pages: PageData[]) => {
    return pages.map(page => ({ ...page, aliases: [page.name, page.path] }));
};

export const PagesAutocomplete: React.FC<PagesAutocompleteProps> = props => {
    const [query, setQuery] = useState<string>();
    const listPagesQuery = useQuery(LIST_PAGES, {
        variables: {
            search: {
                query
            }
        }
    });

    const pages: PageData[] = get(listPagesQuery, "data.pageBuilder.listPages.data", []);

    const currentValue = pages.find(page => page.id === props.value?.id);

    return (
        <AutoComplete
            {...props}
            options={createOptions(pages)}
            onInput={debounce(query => typeof query === "string" && setQuery(query), 250)}
            renderItem={(item: PageData) => (
                <div>
                    <Typography use={"body2"} tag={"div"}>
                        {item.name}
                    </Typography>
                    <Typography use={"subtitle2"}>{item.path}</Typography>
                </div>
            )}
            value={currentValue}
            placeholder={"Type to search for pages"}
            onChange={(id, selection) => {
                if (!id) {
                    props.onChange(null);
                } else {
                    props.onChange({ id, path: selection.path });
                }
            }}
        />
    );
};
