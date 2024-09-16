import { makeAutoObservable, toJS } from "mobx";
import { ListCache, IListCache } from "@webiny/app-page-builder/translations";
import { IListCacheItemUpdater, IListCachePredicate } from "@webiny/app-page-builder/translations";
import { Language } from "./Language";

class LanguageCache implements IListCache<Language> {
    private cache: IListCache<Language>;

    constructor(cache: IListCache<Language>) {
        this.cache = cache;
        makeAutoObservable(this);
    }

    addItems(items: Language[]): void {
        this.cache.addItems(items);

        // We want to find the last added item that has `isBaseLanguage=true`.
        const baseLanguage = items.reverse().find(item => item.isBaseLanguage);

        if (baseLanguage) {
            this.ensureSingleBaseLanguage(baseLanguage);
        }
    }

    updateItems(updater: IListCacheItemUpdater<Language>): void {
        // There can only be one base language.
        // On every update, we need to identify the last item that has `isBaseLanguage=true`,
        // and run a second update which ensures that only this last language is a base language.

        const newBaseLanguages: Language[] = [];
        const currentBaseLanguage = this.getItem(item => item.isBaseLanguage);

        // Run the base update on items, and keep track of all items that have `isBaseLanguage=true`.
        this.cache.updateItems(item => {
            const updated = updater(item);
            if (updated.isBaseLanguage) {
                newBaseLanguages.push(toJS(updated));
            }
            return updated;
        });

        if (currentBaseLanguage && newBaseLanguages.length > 0) {
            const lastBaseLanguage = newBaseLanguages
                .filter(item => item.code !== currentBaseLanguage.code)
                .pop() as Language;

            this.ensureSingleBaseLanguage(lastBaseLanguage);
        }
    }

    removeItems(predicate: IListCachePredicate<Language>): void {
        this.cache.removeItems(predicate);
    }

    clear(): void {
        this.cache.clear();
    }

    count(): number {
        return this.cache.count();
    }

    getItem(predicate: IListCachePredicate<Language>): Language | undefined {
        return this.cache.getItem(predicate);
    }

    getItems(): Language[] {
        return this.cache.getItems();
    }

    hasItems(): boolean {
        return this.cache.hasItems();
    }

    private ensureSingleBaseLanguage(language: Language) {
        this.cache.updateItems(item => {
            if (item.code !== language.code) {
                return { ...item, isBaseLanguage: false };
            }
            return item;
        });
    }
}

// Create a generic cache object.
const cache = new ListCache<Language>();

// Decorate with language specific logic.
export const languageCache = new LanguageCache(cache);
