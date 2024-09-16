import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Language } from "./Language";

const QUERY = gql`
    query ListLanguages @ps(cache: true) {
        translations {
            listLanguages {
                data {
                    code
                    direction
                    isBaseLanguage
                    name
                }
                error {
                    code
                    message
                }
            }
        }
    }
`;

export const useListLanguages = () => {
    const { data, loading } = useQuery(QUERY);

    const languages = loading ? [] : (data.translations?.listLanguages?.data as Language[]);

    return { loading, languages };
};
