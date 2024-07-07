import type { BaseModel } from "pocketbase";

export enum ProjectLanguages {
    JS="JS/TS",
    PYTHON="PYTHON",
    REACT="REACT",
    MONGODB="MONGODB",
    SQL="SQL", 
    NODEJS="NODEJS", 
    FLASK="FLASK", 
    TENSORFLOW="TENSORFLOW", 
    DEVOPS="DEVOPS"
}

export enum ProjectType {
    WEB,
    AI,
    DATA
}

export enum ProjectPurpose {
    PERSONAL,
    ACADEMIC,
    INTERNSHIP
}

export interface ProjectModel extends BaseModel {
    title: string,
    type: string[],
    languages: string[],
    purpose: string,
    description: string
}

export const ProjectModelUtils = {
    getMappedLanguages: (langs: string[]) : ProjectLanguages[] => {
        return langs.map(lang => ProjectLanguages[lang.toUpperCase() as keyof typeof ProjectLanguages]);
    }
}

export type ProjectPayload = Omit<ProjectModel, "id" | "created" | "updated">;