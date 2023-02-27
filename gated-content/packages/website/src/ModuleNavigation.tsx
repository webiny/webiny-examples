import React, { useState } from "react";
import styled from "@emotion/styled";
import { createComponentPlugin, makeComposable } from "@webiny/app-website";
import { Link } from "@webiny/react-router";
import {
    Drawer as BaseDrawer,
    DrawerContent,
    DrawerHeader as BaseDrawerHeader
} from "@webiny/ui/Drawer";
import { List, ListItem } from "@webiny/ui/List";
import { IconButton } from "@webiny/ui/Button";
import { ReactComponent as MenuIcon } from "./assets/hamburger.svg";
import { useWebsiteSecurity } from "./WebsiteSecurity";

const Drawer = styled(BaseDrawer)`
    top: 0;
`;

export const DrawerHeader = styled(BaseDrawerHeader)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    background-color: var(--mdc-theme-surface);
    border-bottom: 1px solid var(--mdc-theme-on-surface);
    font-size: 18px;
    text-transform: uppercase;
`;

const Bottom = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;
`;

interface MenuItem {
    path: string;
    label: string;
}

export interface MenuItemsProps {
    items: MenuItem[];
    onItemClick: () => void;
}

export const MenuItems = makeComposable<MenuItemsProps>("MenuItems", ({ items, onItemClick }) => {
    const { identity } = useWebsiteSecurity();

    return (
        <List>
            {items.map(item => {
                return (
                    <Link to={item.path} key={item.path} onClick={onItemClick}>
                        <ListItem>{item.label}</ListItem>
                    </Link>
                );
            })}
            <Bottom>
                {identity ? null : (
                    <Link to={"/create-an-account"} onClick={onItemClick}>
                        <ListItem>Create Account</ListItem>
                    </Link>
                )}
                <Link to={"/terms-of-service"} onClick={onItemClick}>
                    <ListItem>Terms of Service</ListItem>
                </Link>
                {/* This is a trick to trigger /login page content preloading. */}
                <Link to={"/login"} onClick={onItemClick} style={{ display: "none" }}>
                    <ListItem>Login</ListItem>
                </Link>
            </Bottom>
        </List>
    );
});

export interface CreateMenuItem {
    label: string;
    path: string;
    permission?: string;
}

export const createMenuItem = ({ label, path, permission }: CreateMenuItem) => {
    return createComponentPlugin(MenuItems, Original => {
        return function MenuItem({ items, ...props }) {
            const { getPermission } = useWebsiteSecurity();

            if (permission && !getPermission(permission)) {
                return <Original {...props} items={items} />;
            }

            return <Original {...props} items={[{ label, path }, ...items]} />;
        };
    });
};

export const ModuleNavigation = () => {
    const [sidebarIsOpened, setSidebarIsOpened] = useState(false);

    return (
        <>
            <IconButton icon={<MenuIcon />} onClick={() => setSidebarIsOpened(true)} />
            <Drawer modal open={sidebarIsOpened} onClose={() => setSidebarIsOpened(false)}>
                <DrawerHeader>Main Menu</DrawerHeader>
                <DrawerContent>
                    <MenuItems items={[]} onItemClick={() => setSidebarIsOpened(false)} />
                </DrawerContent>
            </Drawer>
        </>
    );
};
