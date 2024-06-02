import Airtable from "airtable";

// Initialize Airtable base
const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);

// Function to get all blog posts
const fetchBlogs = async (page, limit, search = '', filter = '') => {
  const offset = (page-1) * limit;
  const approvedRecords = await base('Blogs').select({
    filterByFormula: `AND({Status} = 'Approved', SEARCH('${search}', {Title}), SEARCH('${filter}', {Keywords}))`,
    pageSize: Number(limit),
    sort: [{ field: 'Date', direction: 'desc' }],
    offset: offset
  }).all();

  return approvedRecords.map(record => ({
    id: record.id,
    Title: record.fields.Title || '',
    Image: record.fields.Image || '',
    Description: record.fields.Description || '',
    Slug: record.fields.Slug || ''
  }));
};
  
export default async function handler(req, res){
  // const token = req.headers['X-secret-token'];
  const { page = 1, limit = 10, search = '', filter = '' } = req.query;
  try {
    const blogs = await fetchBlogs(page, limit, search, filter);
    res.status(200).json(blogs);
  } catch (error) {
      console.error(error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};