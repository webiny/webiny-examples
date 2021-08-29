import React, { useState, useCallback } from "react";
import { Menu, Avatar, Button, Divider, Dropdown } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Auth from "@aws-amplify/auth";
import { useSecurity } from "@webiny/app-security";
import { Link } from "@webiny/react-router";
import NewPinModal from "./NewPinModal";
import logo from "./../images/logo.png";

/**
 * The default layout component which you can use on any page.
 * Feel free to customize it or create additional layout components.
 */
const Layout: React.FC<{ className: string }> = props => {
    const [visible, setVisible] = useState(false);
    const login = useCallback(() => Auth.federatedSignIn(), []);
    const { identity } = useSecurity();

    return (
        <div className="layout">
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
                                        <Menu.Item key={"signout"} danger onClick={identity.logout}>
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
                        <Button type="primary" onClick={login}>
                            Login
                        </Button>
                    )}
                </div>
            </nav>
            <Divider style={{ margin: 0 }} />
            <main className={props.className}>{props.children}</main>
            <NewPinModal visible={visible} onClose={() => setVisible(false)} />
        </div>
    );
};

export default Layout;
