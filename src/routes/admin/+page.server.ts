import { ADMIN_PASSKEY } from "$env/static/private";
import { fail, type Actions, type RequestEvent } from "@sveltejs/kit";

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