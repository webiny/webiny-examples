import React, { useCallback, useMemo } from "react";
import { Grid, Cell } from "@webiny/ui/Grid";
import { Select } from "@webiny/ui/Select";
import { PermissionInfo, gridNoPaddingClass } from "@webiny/app-admin/components/Permissions";
import { Form } from "@webiny/form";
import { SecurityPermission } from "@webiny/app-security/types";

const FULL_ACCESS = "full";
const NO_ACCESS = "no";

export interface AdminUsersPermissionsProps {
    value: SecurityPermission[];
    onChange: (value: SecurityPermission[]) => void;
    permissionName: string;
}
export const PermissionAccessSwitcher: React.FC<AdminUsersPermissionsProps> = ({
    value,
    onChange,
    permissionName
}) => {
    const onFormChange = useCallback(
        data => {
            let newValue: SecurityPermission[] = [];
            if (Array.isArray(value)) {
                // Let's just filter out the relevant permission objects, it's easier to build new ones from scratch.
                newValue = value.filter(item => !item.name.startsWith(permissionName));
            }

            const permissions = [];
            if (data.accessLevel === FULL_ACCESS) {
                permissions.push({ name: permissionName });
            }

            if (permissions && permissions.length) {
                newValue.push(...permissions);
            }

            onChange(newValue);
        },
        [value]
    );

    /**
     * This function creates a form-friendly object from the permissions array, which allows us to easily render form UI.
     */
    const formData = useMemo(() => {
        if (!Array.isArray(value)) {
            return { accessLevel: NO_ACCESS };
        }

        /**
         * If the specified `permissionName` is found in the permissions array, it means "full access" is given.
         */
        const hasFullAccess = value.find(item => item.name === permissionName);

        return { accessLevel: hasFullAccess ? FULL_ACCESS : NO_ACCESS };
    }, []);

    return (
        <Form data={formData} onChange={onFormChange}>
            {({ Bind }) => {
                return (
                    <Grid className={gridNoPaddingClass}>
                        <Cell span={6}>
                            <PermissionInfo title={`Access Level`} />
                        </Cell>
                        <Cell span={6}>
                            <Bind name={"accessLevel"}>
                                <Select label={`Access Level`}>
                                    <option value={NO_ACCESS}>{`No access`}</option>
                                    <option value={FULL_ACCESS}>{`Full access`}</option>
                                </Select>
                            </Bind>
                        </Cell>
                    </Grid>
                );
            }}
        </Form>
    );
};
