import { MongoClient, Db, Collection } from "mongodb";

const MONGO_URI = process.env.MONGO_URI as string;
if (!MONGO_URI){
    throw new Error("MONGO_URI environment variable is undefined");
}

const DB_NAME = "CS391-MP-5";
export const ALIAS_COLLECTION = "alias-collection";

let client: MongoClient | null = null;
let db: Db | null = null;

async function connect(): Promise<Db>{
    if (!client){
        client = new MongoClient(MONGO_URI);
        await client.connect();
        db = client.db(DB_NAME);
    }
    return db!;
}

export default async function getCollection(collectionName: string): Promise <Collection> {
    if (!db){
        db = await connect();
    }
    return db.collection(collectionName);
}

