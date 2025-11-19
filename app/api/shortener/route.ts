import getCollection, { ALIAS_COLLECTION } from "@/db";

export async function POST(req: Request){
    try{
        // gets the url, alias from the front-end
        const { url, alias } = await req.json();

        // validates the URL, throws error if invalid
        try{
            new URL(url);
        } catch {
            return new Response(JSON.stringify({error: "Invalid URL: Could not verify URL. Please try again."}), {
                status: 400,
                headers: {"Content-Type": "application/json"}
            });
        }
        
        const collection = await getCollection(ALIAS_COLLECTION);

        // checks whether the alias is new, throws error if alias is already in the DB
        const existing = await collection.findOne({alias});
        if (existing){
            return new Response(JSON.stringify({ error: "Invalid alias: This alias already exists" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // if alias is new, insert the alias into the DB 
        await collection.insertOne({ alias, url });
        return new Response(JSON.stringify({success: true}), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } 
    // all other errors
    catch (err){
        console.error(err);
        return new Response(JSON.stringify({error: "Server Error"}), {
            status:500,
            headers: { "Content-Type": "application/json" }
        });
    }

}