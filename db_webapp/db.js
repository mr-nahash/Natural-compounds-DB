import mongoose from 'mongoose';

let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    cachedDb = db;
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}


//definition of a new database schema 
const ActiveCompoundSchema = new mongoose.Schema({
    moleculeId: String,
    structure: {
      idCode: String,
    },
    name: String,
    origin: {
      kingdom: String,
      genus: String,
      species: String,
    },
    metadata: {
      doi: String,
      reference: String,
      year: String,
      journal: String,
    },
    location: {
      site: String,
      state: String,
    },
    activity: {
      ic50_1: String,
      activity_1: String,
      ic50_2: String,
      activity_2: String,
      ic50_3: String,
      activity_3: String,
      ic50_4: String,
      activity_4: String,
      ic50_5: String,
      activity_5: String,
      ic50_6: String,
      activity_6: String,
    },
    bioactivity: String,
    sameMolecule: String,
  });
  

  const getMoleculeName = (molecule) => {
    return molecule.name;
  };
  
  const getMoleculeOrigin = (molecule) => {
    return {
      kingdom: molecule.origin.kingdom,
      genus: molecule.origin.genus,
      species: molecule.origin.species,
    };
  };
  