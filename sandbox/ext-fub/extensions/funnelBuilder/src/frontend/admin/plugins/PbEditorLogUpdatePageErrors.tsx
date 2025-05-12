import React, { useMemo } from "react";
import { ApolloLink } from "apollo-link";
import { ApolloLinkPlugin } from "@webiny/app/plugins/ApolloLinkPlugin";
import { useRegisterLegacyPlugin } from "@webiny/app/hooks/useRegisterLegacyPlugin";
import { Snackbar } from "@webiny/ui/Snackbar";
import { useDisclosure } from "../useDisclosure";
import { PageDataIntegrityValidator } from "../../../shared/PageDataIntegrityValidator";

export const PbEditorLogUpdatePageErrorsPlugin = () => {
    const {
        open: showSnackbar,
        close: hideSnackbar,
        isOpen: snackbarShown,
        data: snackbarMessage
    } = useDisclosure<string>();

    const LogUpdatePageErrorsPlugin = useMemo(() => {
        return class LogUpdatePageErrorsPlugin extends ApolloLinkPlugin {
            public override createLink(): ApolloLink {
                return new ApolloLink((operation, forward) => {
                    return forward(operation).map(response => {
                        const error = response?.data?.pageBuilder?.updatePage?.error;
                        if (!error) {
                            return response;
                        }

                        switch (error.code) {
                            case PageDataIntegrityValidator.PAGE_DATA_INTEGRITY_VALIDATION_ERROR:
                                showSnackbar(
                                    "Page data integrity validation failed. Please refresh your browser and try again."
                                );
                                break;

                            default:
                                showSnackbar(error.message);
                        }

                        return response;
                    });
                });
            }
        };
    }, [showSnackbar]);

    useRegisterLegacyPlugin(new LogUpdatePageErrorsPlugin());

    return (
        <Snackbar
            message={snackbarMessage}
            open={snackbarShown}
            onClose={hideSnackbar}
            timeout={5000}
        />
    );
};
