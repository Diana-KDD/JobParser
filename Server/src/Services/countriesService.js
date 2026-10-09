import { addCountry } from "../repositories/countriesRepository.js";
import { addDLU } from "../repositories/datesLatestUpdatesRepository.js";

export default async function syncCountries(countries) {
  let success = 0;
  let failed = 0;

  if (!Array.isArray(countries) || countries.length === 0)
    throw new Error("The array length is <= 0 or the array is not an array");

  try {
    for (const element of countries) {
      const res = await addCountry(element.country_code, element.name);
      if (res) success += 1;
      else failed += 1;
    }

    if (success === countries.length) await addDLU("countries", new Date());
  } catch (err) {
    console.error("Error when adding the list of countries:", err.message);
    throw err;
  } finally {
    console.log(
      `${countries.length} processed, ${success} successful, ${failed} errors`,
    );
  }
}
