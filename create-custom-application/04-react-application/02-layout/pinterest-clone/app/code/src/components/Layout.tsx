import React from "react";
import { Divider } from "antd";
import { Link } from "@webiny/react-router";
import logo from "~/images/logo.png";

type Props = { className: string };

/**
 * The default layout component which you can use on any page.
 * Feel free to customize it or create additional layout components.
 */
const Layout: React.FC<Props> = props => {
    return (
        <div className="layout">
            {/* We're using the `nav` tag for rendering the header. */}
            <nav>
                <div>
                    <Link to={"/"}>
                        <img src={logo} className="logo" alt={"Pinterest Clone"} />
                    </Link>
                </div>
                <div>{/* This is where we'll add the New Pin and User Menu buttons. */}</div>
            </nav>
            <Divider style={{ margin: 0 }} />

            {/* The pages are rendered within the `main` tag. */}
            <main className={props.className}>{props.children}</main>
        </div>
    );
};

export default Layout;
