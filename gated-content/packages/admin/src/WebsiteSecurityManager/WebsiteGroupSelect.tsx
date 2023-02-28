import React from "react";
import { Select, SelectProps } from "@webiny/ui/Select";
import { useQuery } from "@apollo/react-hooks";
import { LIST_LIMITED_GROUPS } from "./Groups/graphql";

type GroupSelectProps = Partial<SelectProps>;

interface ListLimitedGroups {
    security: {
        listLimitedWebsiteGroups: {
            data: Array<{ name: string; slug: string }>;
        };
    };
}

export const WebsiteGroupSelect: React.FC<GroupSelectProps> = props => {
    const { data, loading } = useQuery<ListLimitedGroups>(LIST_LIMITED_GROUPS);

    const groups = loading || !data ? [] : data.security.listLimitedWebsiteGroups.data;

    return (
        <Select
            {...props}
            options={[
                { value: "", label: "None" },
                ...groups.map(group => ({ value: group.slug, label: group.name }))
            ]}
            value={loading ? undefined : props.value}
        />
    );
};
