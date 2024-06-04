import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const records = await base('Resources').select({
      filterByFormula: `{Status} = "Approved"`
    }).all();

    const resources = records.map(record => ({
      id: record.id,
      title: record.fields.Title,
      description: record.fields.Description,
      url: record.fields.URL,
      isFree: record.fields.IsFree === "Yes",
      keywords: record.fields.Keywords,
    }));

    res.status(200).json({ resources });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
