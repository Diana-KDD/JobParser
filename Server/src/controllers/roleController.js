import { getRowsRole } from "../repositories/rolesRepository.js";

const roleController = {
  getRoles: async function (req, res) {
    try {
      const rows = await getRowsRole();
      res.json(rows);
    } catch (error) {
      console.error("Error retrieving roles:", error.message);
      res
        .status(500)
        .json({ error: `Error retrieving roles: ${error.message}` });
    }
  },
};

export default roleController;
