import React, { useMemo, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { LeftPanel, RightPanel, SplitView } from "@webiny/app-admin/components/SplitView";
import type { Page } from "@webiny/app-page-builder/admin";
import {
    TranslatedCollection,
    useSaveTranslatedCollection,
    useTranslatedCollection
} from "@webiny/app-page-builder/translations";
import { CircularProgress } from "@webiny/ui/Progress";
import { ButtonPrimary } from "@webiny/ui/Button";
import { LanguageSelector } from "./LanguageSelector";
import { TranslationTable } from "./TranslationTable";
import { TranslatableItemContext } from "./TranslatableItemContext";
import { ElementTranslationsProvider } from "./ElementTranslationsProvider";
import { InjectTranslatedValues } from "../InjectTranslatedValues";
import { Table, Heading, HeadingCell } from "./Table";
import { Language } from "../../../features";
import { PagePreview } from "./PagePreview";

interface PageTranslationEditorProps {
    page: Page;
    languages: Language[];
}

const FillSpace = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-content: space-between;
    gap: 10px;
    button {
        width: auto;
    }
`;

export const PageTranslationEditor = ({ page, languages }: PageTranslationEditorProps) => {
    const baseLanguage = useMemo(() => {
        return languages.find(lang => lang.isBaseLanguage)!;
    }, []);

    const [language, setLanguage] = useState<Language>(baseLanguage);
    const [newTranslations, setNewTranslations] = useState<
        TranslatedCollection<TranslatableItemContext> | undefined
    >(undefined);

    const { loading: savingCollection, saveTranslatedCollection } = useSaveTranslatedCollection();

    const saveTranslations = async () => {
        if (newTranslations) {
            await saveTranslatedCollection(newTranslations);
        }
    };

    const collectionId = `page:${page.id}`;

    const dummyCollection: TranslatedCollection<TranslatableItemContext> = {
        collectionId,
        languageCode: language.code,
        items: []
    };

    // Load translated collection for the given page and language.
    const { loading: loadingTranslations, translatedCollection } =
        useTranslatedCollection<TranslatableItemContext>(`page:${page.id}`, language.code);

    useEffect(() => {
        setNewTranslations(translatedCollection);
    }, [translatedCollection]);

    useEffect(() => {
        // If the language changes, we want to unset all translation values.
        if (!newTranslations || newTranslations.languageCode !== language.code) {
            setNewTranslations(undefined);
        }
    }, [language.code]);

    return (
        <>
            <InjectTranslatedValues />
            <SplitView>
                <LeftPanel style={{ position: "relative" }}>
                    {loadingTranslations ? (
                        <CircularProgress label={"Loading translations..."} />
                    ) : null}
                    <Table>
                        <Heading>
                            <HeadingCell>Base Text ({baseLanguage.name})</HeadingCell>
                            <HeadingCell>
                                <FillSpace>
                                    <LanguageSelector
                                        value={language}
                                        onChange={language => setLanguage(language)}
                                        languages={languages}
                                    />
                                    <ButtonPrimary
                                        disabled={savingCollection}
                                        onClick={saveTranslations}
                                    >
                                        {savingCollection ? "Saving..." : "Save"}
                                    </ButtonPrimary>
                                </FillSpace>
                            </HeadingCell>
                        </Heading>
                    </Table>

                    {translatedCollection ? (
                        <TranslationTable
                            key={`${translatedCollection.collectionId}-${translatedCollection.languageCode}`}
                            sourceCollection={newTranslations ?? translatedCollection}
                            onChange={setNewTranslations}
                        />
                    ) : null}
                </LeftPanel>
                <RightPanel>
                    <ElementTranslationsProvider
                        translatedCollection={
                            newTranslations ?? translatedCollection ?? dummyCollection
                        }
                    >
                        <PagePreview page={page} />
                    </ElementTranslationsProvider>
                </RightPanel>
            </SplitView>
        </>
    );
};
