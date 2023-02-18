import { query } from './_generated/server';
import { Id } from './_generated/dataModel';

export default query(async ({ db }, id: Id<string>) => {
    return await db.get(id);
});
