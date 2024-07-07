import { fail, json } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";
import { appDatabase } from "$lib/server/appDatabase";
import { MessageModel } from "$lib/db/MessageModel";

export async function GET({url}: RequestEvent) {
    const orderBy = url.searchParams.get("orderby") || undefined;
    try {
        const result = await appDatabase
        .getAll<MessageModel>("messages", undefined, undefined, { sort: orderBy });
        
        return json({ 
            isSuccess: result.isSuccess, 
            data: result.successResult!! as MessageModel[] 
        });
    } catch (error) {
        return fail(400, { isSuccess: false });
    }
}

export async function PATCH({ url, request }: RequestEvent) {
    const body = await request.json();
    const id = url.searchParams.get("id")!!;
    console.log(body)
    console.log(id);

    try {
        const result = await appDatabase.update<MessageModel>("messages", id, body);
        
        return json({
            isSuccess: result.isSuccess,
        });
    } catch (error) {
        return fail(400, { isSuccess: false });
    }
}