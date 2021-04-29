import React, { useState } from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView";
import CarManufacturersDataList from "./CarManufacturersDataList";
import CarManufacturersForm from "./CarManufacturerForm";

const sorters = [
    {
        label: "Newest to oldest",
        value: "createdOn_DESC"
    },
    {
        label: "Oldest to newest",
        value: "createdOn_ASC"
    },
    {
        label: "Tile A-Z",
        value: "title_ASC"
    },
    {
        label: "Title Z-A",
        value: "title_DESC"
    }
];

const CarManufacturers: React.FunctionComponent = () => {
    const [sortBy, setSortBy] = useState(sorters[0].value);
    const [limit, setLimit] = useState(20);
    return (
        <SplitView>
            <LeftPanel>
                <CarManufacturersDataList
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    limit={limit}
                    setLimit={setLimit}
                    sorters={sorters}
                />
            </LeftPanel>
            <RightPanel>
                <CarManufacturersForm sortBy={sortBy} limit={limit} />
            </RightPanel>
        </SplitView>
    );
};

export default CarManufacturers;
