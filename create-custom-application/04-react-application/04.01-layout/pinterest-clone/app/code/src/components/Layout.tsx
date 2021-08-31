import React from "react";
import { Divider } from "antd";
import { Link } from "@webiny/react-router";
import logo from "~/images/logo.png";

/**
 * The default layout component which you can use on any page.
 * Feel free to customize it or create additional layout components.
 */
const Layout: React.FC<{ className: string }> = props => {
    return (
        <div className="layout">
            <nav>
                <div>
                    <Link to={"/"}>
                        <img src={logo} className="logo" alt={"Pinterest Clone"} />
                    </Link>
                </div>
                <div>{/* This is where we'll add the New Pin and User Menu buttons. */}</div>
            </nav>
            <Divider style={{ margin: 0 }} />
            <main className={props.className}>{props.children}</main>
        </div>
    );
};

export default Layout;
