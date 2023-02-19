import fetch from "node-fetch";
import { action } from "../_generated/server";

// Post a GIF chat message corresponding to the query string.
export default action(async ({ runMutation }, queryString, author) => {
  return { queryString, author };
});
