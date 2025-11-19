import { redirect } from "next/navigation";
import getCollection, { ALIAS_COLLECTION } from "@/db";

export default async function AliasPage(props : {params: {alias: string}}){
    const {alias} = await props.params;

    const collection = await getCollection(ALIAS_COLLECTION);
    const entry = await collection.findOne({alias});

        if (!entry) {
        return (
            <div className="p-6 text-red-500 text-lg">
                Alias not found.
            </div>
        );
    }

    redirect(entry.url);
}