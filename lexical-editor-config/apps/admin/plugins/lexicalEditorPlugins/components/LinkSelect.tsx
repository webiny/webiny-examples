import React, {FC} from "react";


interface LinkSelectProps {
    url: string;
    disabled?: boolean;
    onChange?: (e:  React.ChangeEvent<HTMLSelectElement>) => void;
}

export const LinkSelect: FC<LinkSelectProps> = ({ url, onChange, disabled }) => {
    return (
        <select className={"internal-link-selection"} value={url} name="webiny-links"  onChange={(e) => { if(onChange) { onChange(e) } }}
            disabled={disabled}>
            <option value="" selected>Not selected</option>
            <option value="https://www.webiny.com">Webiny</option>
            <option value="https://www.webiny.com/docs/overview/introduction">Webiny Docs</option>
            <option value="https://github.com/webiny/webiny-js">Webiny on GitHub</option>
            <option value="https://www.youtube.com/@Webiny">Webiny on Youtube</option>

        </select>
    )
}
