import React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView";
import CarManufacturersDataList from "./CarManufacturersDataList";
import CarManufacturersForm from "./CarManufacturersForm";

/**
 * Main view component - renders data list and form.
 */

const CarManufacturersView = () => {
    return (
        <SplitView>
            <LeftPanel>
                <CarManufacturersDataList />
            </LeftPanel>
            <RightPanel>
                <CarManufacturersForm />
            </RightPanel>
        </SplitView>
    );
};

export default CarManufacturersView;
