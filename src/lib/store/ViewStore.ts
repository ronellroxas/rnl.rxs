import { writable } from "svelte/store";

export interface IViewStore {
    showSideMenu: boolean,
    showWorldHi: boolean
}

const viewStore: IViewStore = {
    showSideMenu: false,
    showWorldHi: false
}

export const viewStoreState = writable(viewStore); 