import React from "react";
import {
    DataList,
    ScrollList,
    ListItem,
    ListItemText,
    ListItemMeta,
    ListActions,
    ListItemTextSecondary
} from "@webiny/ui/List";
import { DeleteIcon } from "@webiny/ui/List/DataList/icons";
import { ButtonIcon, ButtonSecondary } from "@webiny/ui/Button";
import SearchUI from "@webiny/app-admin/components/SearchUI";
import { ReactComponent as AddIcon } from "@webiny/app-admin/assets/icons/add-18px.svg";
import { useLanguageList } from "./useLanguageList";
import { useLanguageNavigate } from "./useLanguageNavigate";
import { Language } from "../../features";

const BaseLanguage = ({ language }: { language: Language }) => {
    return language.isBaseLanguage ? <>(base language)</> : null;
};

export const LanguageDataList = () => {
    const { loading, languages, activeLanguageCode, deleteLanguage, filter, setFilter } =
        useLanguageList();
    const { navigateToCreateLanguage, navigateToEditLanguage } = useLanguageNavigate();

    return (
        <DataList
            title={"Languages"}
            loading={loading}
            data={languages}
            search={
                <SearchUI
                    value={filter}
                    onChange={setFilter}
                    inputPlaceholder={"Search languages"}
                />
            }
            showOptions={{ refresh: false }}
            actions={
                <ButtonSecondary onClick={navigateToCreateLanguage}>
                    <ButtonIcon icon={<AddIcon />} /> New Language
                </ButtonSecondary>
            }
        >
            {({ data }: { data: Language[] }) => (
                <ScrollList>
                    {data.map(item => (
                        <ListItem key={item.code} selected={item.code === activeLanguageCode}>
                            <ListItemText onClick={() => navigateToEditLanguage(item)}>
                                {item.name}
                                <ListItemTextSecondary>
                                    {item.code} <BaseLanguage language={item} />
                                </ListItemTextSecondary>
                            </ListItemText>
                            <ListItemMeta>
                                <ListActions>
                                    <DeleteIcon onClick={() => deleteLanguage(item)} />
                                </ListActions>
                            </ListItemMeta>
                        </ListItem>
                    ))}
                </ScrollList>
            )}
        </DataList>
    );
};
