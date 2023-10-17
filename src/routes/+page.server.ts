import type { Actions, RequestEvent } from "./$types";
import { AppDatabase, type MessageModel } from "$lib/db";
import { POCKETBASE_EMAIL, POCKETBASE_PWD } from "$env/static/private";
import { fail } from "@sveltejs/kit";

// TODO: MOVE TO CONFIG BASED ON PROD/DEV/ETC.
const MESSAGE_TABLE_NAME = "messages";

export const actions: Actions = {
    getMessages: async ({ request }: RequestEvent) => {
		try {
            const appDatabase = new AppDatabase({ email: POCKETBASE_EMAIL, pwd: POCKETBASE_PWD});
            const result = await appDatabase.getAll<MessageModel>("messages");
            
            return { isSuccess: result.isSuccess, data: result.successResult!! as MessageModel[] };
        } catch (error) {
            return fail(400, { isSuccess: false })
        }
	},

    createMessage: async ({ request }: RequestEvent) => {
        const formData = await request.formData();
        const data = {
            name: formData.get("name"),
            country: formData.get("country"),
            message: formData.get("message")
        }
        try {
            const appDatabase = new AppDatabase({ email: POCKETBASE_EMAIL, pwd: POCKETBASE_PWD});
            const result = await appDatabase.insert<MessageModel>(MESSAGE_TABLE_NAME, data);
            
            return { isSuccess: result.isSuccess };
        } catch (error) {
            return fail(400, { isSuccess: false })
        }
    }
} satisfies Actions