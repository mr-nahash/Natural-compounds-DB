import { connectToDatabase } from "@/db";

export default function Molecules({ molecules }) {
  return (
    <div>
      <h1>Molecule Table</h1>
      <table>
        <thead>
          <tr>
            <th>Molecule ID</th>
            <th>Name</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          {molecules.map((molecule) => (
            <tr key={molecule._id}>
              <td>{molecule.moleculeId}</td>
              <td>{molecule.name}</td>
              <td>{molecule.activity.activity_1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function getServerSideProps() {
  const db = await connectToDatabase();
  const collection = db.collection('molecules');
  const molecules = await collection.find().toArray();

  return {
    props: {
      molecules: JSON.parse(JSON.stringify(molecules)),
    },
  };
}
