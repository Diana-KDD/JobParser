import { addRole } from "../repositories/rolesRepository.js";
import { addDLU } from "../repositories/datesLatestUpdatesRepository.js";

export default async function syncRoles(roles) {
  let success = 0;
  let failed = 0;

  if (!Array.isArray(roles) || roles.length === 0)
    throw new Error("The array length is <= 0 or the array is not an array");

  try {
    for (const element of roles) {
      const res = await addRole(
        element.title,
        element.slug,
        element.parent_slug,
      );
      if (res) success += 1;
      else failed += 1;
    }

    if (success === roles.length) await addDLU("roles", new Date());
  } catch (err) {
    console.error("Error when adding the list of roles:", err.message);
    throw err;
  } finally {
    console.log(
      `${roles.length} processed, ${success} successful, ${failed} errors`,
    );
  }
}
