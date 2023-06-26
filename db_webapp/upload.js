import { sql } from "@vercel/postgres";
import fs from "fs";

const fileName = "my-file.txt";
const fileData = fs.readFileSync(fileName);

const sqlQuery = `
INSERT INTO files (name, data)
VALUES ($1, $2);
`;

const result = await sql(sqlQuery, [fileName, fileData]);

if (result.rowsAffected > 0) {
  console.log("File uploaded successfully");
} else {
  console.log("Error uploading file");
}
