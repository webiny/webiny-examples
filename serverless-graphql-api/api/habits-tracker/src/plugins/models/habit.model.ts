// @ts-ignore
import { withFields, withName, string, number, pipe, withProps, withHooks } from "@webiny/commodo";
import { validation } from "@webiny/validation";

/**
 * A simple "Habit" data model, that consists of a couple of simple fields.
 *
 * @see https://docs.webiny.com/docs/api-development/commodo/introduction
 * @see https://github.com/webiny/commodo/tree/master
 */
export default ({ createBase }) =>
    pipe(
        withName("Habit"),
        withFields(() => ({
            // A simple "string" field, with a couple of validators attached.
            title: string({ validation: validation.create("required,minLength:3,maxLength:100") }),


            // A simple "number" field, with the default value set to 1.
            habitScore: number(),

            // This field is not required.
            description: string({ validation: validation.create("maxLength:500") }),
        })),
        withHooks({
            // We might want to do something before saving the data to a database.
            beforeSave() {
                if (this.isNice) {
                    // Maybe we would want to do something if "isNice" is true?
                }
            }
        }),
        withProps({
            // "withProps" allows us to define additional static and dynamic properties. Note that these
            // properties won't end up in your database, only fields in the "withFields({ ... })" will.
            get shortDescription() {
                return this.description ? this.description.substring(0, 100) + "..." : "";
            }
        })
    )(createBase());
