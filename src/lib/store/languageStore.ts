import { ProjectLanguages } from "$lib/db/ProjectModel";
import { writable } from "svelte/store";

export interface ILangStore {
    languages: ProjectLanguages[]
}

const langStore: ILangStore = {
    languages: []
}

export const langStoreState = writable(langStore);

export const pushLangState = (languages: ProjectLanguages[]) => {
    langStoreState.update((store) => store = {
        ...store,
        languages: [...store.languages, ...languages]
    });
}