export default async function handler(req, res) {
    const { q: query } = req.query;

    console.log("AT THE API", query);

    res.status(200).json({ message: "I want a fucking cock dripping semen inside me" });
}
