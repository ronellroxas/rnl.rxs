import PocketBase, { type BaseModel, type RecordListOptions } from 'pocketbase';

class DatabaseResult {
    /**
     * To get successResult with correct type, 
     * wrap with: `typeof {@link this.successResultType}`.
     */
    successResult?: BaseModel[] | BaseModel;

    isSuccess: boolean;
    successResultType?: any;
    failResult?: string | undefined;

    private constructor(success?: BaseModel[] | BaseModel, fail?: string) {
        if (success != null && success != undefined) {
            this.successResult = success;
            this.successResultType = typeof success;
            this.isSuccess = true;
        } else if (fail != null && fail != undefined) {
            this.failResult = fail;
            this.isSuccess = false;
        } else {
            throw Error("Atleast one parameter should be defined or not null." +
                "Did you use the static success/fail methods?");
        }
    }

    static setSuccess(success: BaseModel[] | BaseModel): DatabaseResult {
        return new DatabaseResult(success);
    }

    static setFail(fail: string): DatabaseResult {
        return new DatabaseResult(undefined, fail);
    }
}

type AppDatabaseArguments = {
    url?: string | undefined,
    email: string,
    pwd: string
}

export class AppDatabase {
    db: PocketBase

    constructor({
        url = "http://127.0.0.1:8090",
        email,
        pwd }: AppDatabaseArguments) {
        this.db = new PocketBase(url);
        this.db.admins.authWithPassword(email, pwd);
    }

    async getAll<T extends BaseModel>(
        table: string,
        page?: number | undefined,
        perPage?: number | undefined,
        filter?: RecordListOptions | undefined): Promise<DatabaseResult> {
        try {
            const query = await this.db.collection(table).getList<T>(page, perPage, filter);
            return DatabaseResult.setSuccess(query.items);
        } catch (error) {
            if (typeof error == typeof Error) {
                return DatabaseResult.setFail((error as Error).message);
            }

            // TODO: check other error types
            return DatabaseResult.setFail("Unknown error occured while retrieving db list.");
        }
    }

    async insert<T extends BaseModel>(
        table: string,
        data: { [key: string]: any; }
    ) {
        try {
            const query = await this.db.collection(table).create<T>(data);

            return DatabaseResult.setSuccess(query);
        } catch (error) {
            console.log(error);
            if (typeof error == typeof Error) {
                return DatabaseResult.setFail((error as Error).message);
            }

            // TODO: check other error types
            return DatabaseResult.setFail("Unknown error occured while Inserting new message.");
        }
    }
}