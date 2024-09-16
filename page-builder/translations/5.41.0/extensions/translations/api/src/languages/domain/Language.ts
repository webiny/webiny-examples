export interface LanguageProps {
    name: string;
    code: string;
    direction: "ltr" | "rtl";
    isBaseLanguage: boolean;
}

export class Language {
    private readonly props: LanguageProps;

    private constructor(props: LanguageProps) {
        this.props = props;
    }

    static create(props: LanguageProps) {
        return new Language(props);
    }

    getName() {
        return this.props.name;
    }

    getCode() {
        return this.props.code;
    }

    getDirection() {
        return this.props.direction;
    }

    isBaseLanguage() {
        return this.props.isBaseLanguage;
    }

    update(data: Partial<Omit<LanguageProps, "code">>) {
        return new Language({ ...this.props, ...data });
    }
}
