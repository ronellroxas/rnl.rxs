import { POCKETBASE_EMAIL, POCKETBASE_PWD } from "$env/static/private";
import { AppDatabase } from "$lib/db";

export const appDatabase = new AppDatabase({ email: POCKETBASE_EMAIL, pwd: POCKETBASE_PWD});