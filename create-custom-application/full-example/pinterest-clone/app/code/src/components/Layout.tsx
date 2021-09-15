import React, { useState, useCallback } from "react";
import { Menu, Avatar, Button, Divider, Dropdown } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "@webiny/react-router";
import { useSecurity } from "@webiny/app-security";
import Auth from "@aws-amplify/auth";
import logo from "~/images/logo.png";
import NewPinModal from "./NewPinModal";

/**
 * The default layout component which you can use on any page.
 * Feel free to customize it or create additional layout components.
 */
const Layout: React.FC<{ className: string }> = (props) => {
    const [visible, setVisible] = useState(false);
    const { identity } = useSecurity();
    const signIn = useCallback(() => Auth.federatedSignIn(), []);
    const signOut = useCallback(() => identity.logout, [identity]);

    return (
        <div className="layout">
            {/* We're using the `nav` tag for rendering the header. */}
            <nav>
                <div>
                    <Link to={"/"}>
                        <img src={logo} className="logo" alt={"Pinterest Clone"} />
                    </Link>
                </div>
                <div>
                    {identity ? (
                        <>
                            <Button
                                onClick={() => setVisible(true)}
                                type="primary"
                                size={"large"}
                                shape="circle"
                                icon={<PlusOutlined />}
                            />
                            <Dropdown
                                overlay={
                                    <Menu>
                                        <Menu.Item key={"signout"} danger onClick={signOut}>
                                            Sign Out
                                        </Menu.Item>
                                    </Menu>
                                }
                            >
                                <Avatar size={"large"} style={{ cursor: "pointer" }}>
                                    {identity.firstName.charAt(0)}
                                </Avatar>
                            </Dropdown>
                        </>
                    ) : (
                        <Button type="primary" onClick={signIn}>
                            Sign In
                        </Button>
                    )}
                </div>
            </nav>
            <Divider style={{ margin: 0 }} />

            {/* The pages are rendered within the `main` tag. */}
            <main className={props.className}>{props.children}</main>
            <NewPinModal visible={visible} onClose={() => setVisible(false)} />
        </div>
    );
};

export default Layout;
