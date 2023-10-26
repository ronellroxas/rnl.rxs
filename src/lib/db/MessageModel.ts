import type { BaseModel } from "pocketbase";

export interface MessageModel extends BaseModel {
    name: string,
    country: string,
    message?: string,
    isRead: boolean
}