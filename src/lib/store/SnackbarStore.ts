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
    type: SnackbarTypeEnum
}

export interface ISnackbarStore {
    pending: SnackbarProps[]
}

const testItems: SnackbarProps[] = [
    {
        text: "Test primary",
        type: SnackbarTypeEnum.PRIMARY
    },
    {
        text: "Test success",
        type: SnackbarTypeEnum.SUCCESS
    },
    {
        text: "Test error",
        type: SnackbarTypeEnum.ERROR
    },
    {
        text: "Test neutral",
        type: SnackbarTypeEnum.NEUTRAL
    }
]
const snackbarStore: ISnackbarStore = {
    pending: []
}

export const snackbarStoreState = writable(snackbarStore); 