import { getRowsCountry } from "../repositories/countriesRepository.js";

const countryController = {
  getCountries: async function (req, res) {
    try {
      const rows = await getRowsCountry();
      res.json(rows);
    } catch (error) {
      console.error("Error retrieving countries:", error.message);
      res
        .status(500)
        .json({ error: `Error retrieving countries: ${error.message}` });
    }
  },
};

export default countryController;
