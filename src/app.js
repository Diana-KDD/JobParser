import init from "./config/init.js";
import { parsing } from "./parsing.js";
import syncCountries from "./Services/countriesService.js";
import syncRoles from "./Services/rolesService.js";

init();

const apiKey = process.env.API_KEY;
const curlCountries = process.env.CURL_COUNTRIES;
const curlRole = process.env.CURL_ROLE;

try {
  const countries = await parsing(apiKey, curlCountries);
  console.log(`${countries.length} countries were received`);

  const roles = await parsing(apiKey, curlRole);
  console.log(`${roles.length} roles were received`);

  await syncCountries(countries);
  await syncRoles(roles);
  console.log("The data was successfully added to db");
} catch (err) {
  console.error(err.message);
}
