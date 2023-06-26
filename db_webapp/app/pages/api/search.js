//import Molecule from '../../models/Molecule';
import connectDB from '@/db';

export default async function handler(req, res) {
  connectDB();

  const { term } = req.query;

  try {
    const results = await Molecule.find({ name: { $regex: term, $options: 'i' } });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}
