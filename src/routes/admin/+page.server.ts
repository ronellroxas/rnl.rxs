import { ADMIN_PASSKEY, POCKETBASE_EMAIL, POCKETBASE_PWD } from "$env/static/private";
import { AppDatabase, type MessageModel } from "$lib/db";
import { fail, type Actions, type RequestEvent } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const actions: Actions = {    
    login: async ({ request }: RequestEvent) => {
        const formData = await request.formData();
        const input = formData.get("pwd");
        const PWD = ADMIN_PASSKEY;
        
        if (input == null || input != PWD) {
            return fail(401, { isSuccess: false });
        } else {
            return { isSuccess: true };
        }
    }
} satisfies Actions;