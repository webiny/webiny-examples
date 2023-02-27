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
import { LIST_USERS, DELETE_USER } from "./graphql";
import SearchUI from "@webiny/app-admin/components/SearchUI";
import { User } from "./types";

export const UsersDataList: React.FC = () => {
    const [filter, setFilter] = useState("");
    const { history, location } = useRouter();
    const { showSnackbar } = useSnackbar();
    const { showConfirmation } = useConfirmationDialog();

    const { data: listResponse, loading: listLoading, refetch } = useQuery(LIST_USERS);

    const [deleteIt, { loading: deleteLoading }] = useMutation(DELETE_USER, {
        refetchQueries: [{ query: LIST_USERS }]
    });

    const data = listLoading && !listResponse ? [] : listResponse.security.listWebsiteUsers.data;
    const id = new URLSearchParams(location.search).get("id");

    const deleteItem = useCallback(
        item => {
            showConfirmation(async () => {
                const { data } = await deleteIt({
                    variables: item
                });

                const { error } = data.security.deleteWebsiteUser;
                if (error) {
                    return showSnackbar(error.message);
                }

                showSnackbar(`User "${item.email}" deleted.`);

                if (id === item.id) {
                    history.push(`/website/users`);
                }
            });
        },
        [id]
    );

    const listWithFilter = useCallback(() => {
        refetch({ email: filter });
    }, [filter, refetch]);

    return (
        <DataList
            title={`Website Users`}
            data={data}
            refresh={listWithFilter}
            loading={listLoading || deleteLoading}
            search={
                <SearchUI
                    value={filter}
                    onChange={setFilter}
                    inputPlaceholder={`Search By Email`}
                    onEnter={listWithFilter}
                />
            }
        >
            {({ data }) => (
                <ScrollList>
                    {(data as User[]).map(item => (
                        <ListItem key={item.id} selected={item.id === id}>
                            <ListItemText
                                onClick={() => history.push(`/website/users?id=${item.id}`)}
                            >
                                {item.firstName} {item.lastName}
                                <ListItemTextSecondary>{item.email}</ListItemTextSecondary>
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
