export interface Company {
    id: string;
    name: string;
    description: string;
    theme: {
        primaryColor: string;
        secondaryColor: string;
        logo: string;
    };
    isInstalled: boolean;
}
