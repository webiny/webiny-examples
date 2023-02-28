import React, { useCallback, useState } from "react";
import {
    DataList,
    ScrollList,
    ListItem,
    ListItemText,
    ListItemTextSecondary,
    ListItemMeta,
    ListActions
} from "@webiny/ui/List";
import { DeleteIcon } from "@webiny/ui/List/DataList/icons";
import { useRouter } from "@webiny/react-router";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useConfirmationDialog } from "@webiny/app-admin/hooks/useConfirmationDialog";
import { LIST_GROUPS, DELETE_GROUP, LIST_LIMITED_GROUPS } from "./graphql";
import { ButtonIcon, ButtonSecondary } from "@webiny/ui/Button";
import SearchUI from "@webiny/app-admin/components/SearchUI";
import { ReactComponent as AddIcon } from "@webiny/app-admin/assets/icons/add-18px.svg";

interface Group {
    id: string;
    name: string;
    description: string;
    slug: string;
}

export const GroupsDataList: React.FC = () => {
    const [filter, setFilter] = useState("");
    const { history, location } = useRouter();
    const { showSnackbar } = useSnackbar();
    const { showConfirmation } = useConfirmationDialog();

    const { data: listResponse, loading: listLoading } = useQuery(LIST_GROUPS);

    const [deleteIt, { loading: deleteLoading }] = useMutation(DELETE_GROUP, {
        refetchQueries: [{ query: LIST_GROUPS }, { query: LIST_LIMITED_GROUPS }]
    });

    const data = listLoading && !listResponse ? [] : listResponse.security.groups.data;
    const id = new URLSearchParams(location.search).get("id");

    const filterGroup = useCallback(
        ({ name, slug, description }) => {
            return (
                name.toLowerCase().includes(filter) ||
                slug.toLowerCase().includes(filter) ||
                (description && description.toLowerCase().includes(filter))
            );
        },
        [filter]
    );

    const deleteItem = useCallback(
        item => {
            showConfirmation(async () => {
                const { data } = await deleteIt({
                    variables: item
                });

                const { error } = data.security.deleteWebsiteGroup;
                if (error) {
                    return showSnackbar(error.message);
                }

                showSnackbar(`Group "${item.slug}" deleted.`);

                if (id === item.id) {
                    history.push(`/website/groups`);
                }
            });
        },
        [id]
    );

    const filteredData = filter === "" ? data : data.filter(filterGroup);

    return (
        <DataList
            title={`Website Groups`}
            actions={
                <ButtonSecondary onClick={() => history.push("/website/groups?new=true")}>
                    <ButtonIcon icon={<AddIcon />} /> {`New Group`}
                </ButtonSecondary>
            }
            data={filteredData}
            loading={listLoading || deleteLoading}
            search={
                <SearchUI value={filter} onChange={setFilter} inputPlaceholder={`Search Groups`} />
            }
        >
            {({ data }) => (
                <ScrollList>
                    {(data as Group[]).map(item => (
                        <ListItem key={item.id} selected={item.id === id}>
                            <ListItemText
                                onClick={() => history.push(`/website/groups?id=${item.id}`)}
                            >
                                {item.name}
                                <ListItemTextSecondary>{item.description}</ListItemTextSecondary>
                            </ListItemText>

                            <ListItemMeta>
                                <ListActions>
                                    <DeleteIcon onClick={() => deleteItem(item)} />
                                </ListActions>
                            </ListItemMeta>
                        </ListItem>
                    ))}
                </ScrollList>
            )}
        </DataList>
    );
};
