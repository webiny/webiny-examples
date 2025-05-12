export interface PbPageElement<TData extends Record<string, any> = Record<string, any>> {
    id: string;
    type: string;
    elements: PbPageElement[];
    data: TData;
}

export interface PbPage {
    id: string;
    content: PbPageElement;
}

export interface ThemeSettings {
    theme: {
        primaryColor: string;
        secondaryColor: string;
        logo: string;
    };
}
