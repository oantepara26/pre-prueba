import fs from "fs";

// 1. Lees tus archivos gigantes separados
const personas = JSON.parse(fs.readFileSync("./mocks/personas.json", "utf-8"));
const usersError = JSON.parse(
	fs.readFileSync("./mocks/users-error.json", "utf-8")
);

// 2. Los agrupas en un solo objeto
const db = {
	personas: personas,
	users: usersError,
};

// 3. Creas el archivo que json-server exige
fs.writeFileSync("./db.json", JSON.stringify(db, null, 2));
console.log("✅ Archivos JSON combinados exitosamente.");
