import React from "react";
import { useSecurity } from "@webiny/app-serverless-cms";
import { ListItem, ListItemGraphic } from "@webiny/ui/List";
import { Typography } from "@webiny/ui/Typography";
import { Avatar } from "@webiny/ui/Avatar";
import styled from "@emotion/styled";

const StyledListItemGraphic = styled(ListItemGraphic)({
    height: "40px !important",
    width: "40px !important",
    borderRadius: "50%",
    display: "inline-block",
    ">div": {
        backgroundColor: "var(--mdc-theme-surface)"
    }
});

const StyledListItem = styled("div")({
    backgroundColor: "var(--mdc-theme-background)",
    marginTop: -25,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
    textDecoration: "none",
    display: "block",
    ">.mdc-deprecated-list-item": {
        display: "flex",
        height: "65px !important",
        marginTop: 15,
        ".avatar": {
            marginTop: 10
        }
    },
    "h3, h3>.mdc-typography--headline6": {
        lineHeight: "1em !important"
    },
    ".mdc-menu &.mdc-deprecated-list-item": {
        ">.mdc-deprecated-list-item__text": {
            fontWeight: "bold"
        }
    },
    ".mdc-deprecated-list-item": {
        height: "auto",
        ".mdc-typography--headline6": {
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: 180,
            display: "block"
        },
        ".mdc-typography--subtitle2": {
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: 180
        }
    }
});

export const UserInfo = () => {
    const { identity } = useSecurity();
    if (!identity) {
        return null;
    }

    const { id, displayName } = identity;

    return (
        <StyledListItem>
            <ListItem ripple={false}>
                <StyledListItemGraphic>
                    <Avatar
                        className={"avatar"}
                        src={null}
                        alt={displayName}
                        fallbackText={displayName}
                    />
                </StyledListItemGraphic>
                <div>
                    <Typography use={"headline6"}>{displayName}</Typography>
                    <Typography use={"subtitle2"}>{id}</Typography>
                </div>
            </ListItem>
        </StyledListItem>
    );
};
