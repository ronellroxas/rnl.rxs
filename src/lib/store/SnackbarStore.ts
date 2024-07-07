import { count } from "d3";
import { writable } from "svelte/store";

export enum SnackbarTypeEnum {
    PRIMARY,
    SUCCESS,
    ERROR,
    NEUTRAL
}

export type SnackbarProps = {
    text: string,
    type: SnackbarTypeEnum,
    isExpiring?: boolean
}

export interface ISnackbarStore {
    pending: SnackbarProps[]
}

const testItems: SnackbarProps[] = [
    {
        text: "Test primary",
        type: SnackbarTypeEnum.PRIMARY,
        isExpiring: false
    },
    {
        text: "Test success",
        type: SnackbarTypeEnum.SUCCESS,
        isExpiring: false
    },
    {
        text: "Test error",
        type: SnackbarTypeEnum.ERROR,
        isExpiring: false
    },
    {
        text: "Test neutral",
        type: SnackbarTypeEnum.NEUTRAL,
        isExpiring: false
    }
]
const snackbarStore: ISnackbarStore = {
    pending: []
}

export const snackbarStoreState = writable(snackbarStore);

// helper methods
export const pushSnackbarState = (snackbar: SnackbarProps) => {
    snackbarStoreState.update((store) => store = { 
        ...store,
        pending: [...store.pending, snackbar]
    });
}

export const removeSnackbarState = (snackbar: SnackbarProps) => {
    snackbarStoreState.update((store) => store = {
        ...store,
        pending: store.pending.filter(p => p != snackbar)
    });
}