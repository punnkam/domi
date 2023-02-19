import { action } from "../_generated/server";

// Post a GIF chat message corresponding to the query string.
export default action(async ({ runMutation }, queryString, author) => {
  console.log("queryString = ", queryString, ", author = ", author);
  // return { queryString, author };
  await runMutation("addProperty", "abc", "xyz", "123", "456", "7", "8", "9");
});
