import { fail, json } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";
import { appDatabase } from "$lib/server/appDatabase";
import { ProjectModel } from "$lib/db/ProjectModel";

export async function GET( ev : RequestEvent) {
    try {
        const result = await appDatabase
        .getAll<ProjectModel>("projects")

        return json({
            isSuccess: result.isSuccess,
            data: result.successResult!! as ProjectModel[]
        })
    } catch (error) {
        return fail(400, { isSuccess: false})
    }

}