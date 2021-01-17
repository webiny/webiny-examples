import {CmsEditorFieldRendererPlugin} from "@webiny/app-headless-cms/types";

const AddressSearch = () => (<input/>);

export default(): CmsEditorFieldRendererPlugin => ({
    type: "cms-editor-field-renderer",
    name: "cms-editor-field-renderer-address",
    renderer: {
        rendererName: "addressRenderer",
        name: `Address search`,
        description: `Search for the address.`,
        canUse({ field }) {
            return field.type === "address";
        },
        render({ field, getBind }) {
            const Bind = getBind();
            const onSelect = (bind, {coordinates, ...address}) => {
                console.log(coordinates);
                console.log(address);
                bind.onChange({
                    address,// an object containing country, city, zipCode, street and streetNumber
                    coordinates
                });
            };
            return (
                <Bind>
                    {bind => (
                        <AddressSearch
                            {...bind}
                            onSelect={(value) => onSelect(bind, value)}
                            label={field.label}
                            placeholder="Type to find the address."
                        />
                    )}
                </Bind>
            );
        }
    }
});