import Airtable from "airtable";

const URL = "https://flowfusionai.com";

export default function SiteMap(){}

export async function getServerSideProps({res}){
    const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);
    const records = await base('Blogs').select({
        filterByFormula: '{Status} = "Approved"',
    }).all();

    const blogs = records.map(record => ({
        slug: record.fields.Slug.replace(/ /g, '-')
    }));

    const siteMap = generateSiteMap(blogs);

    res.setHeader("Content-Type", "text/xml");
    res.write(siteMap);
    res.end();

    return {
        props: {}
    }
}

function generateSiteMap(blogs){
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- Add the static URLs manually -->
      <url>
        <loc>${URL}</loc>
      </url>
      <url>
        <loc>${URL}/404</loc>
      </url>
       <url>
        <loc>${URL}/500</loc>
      </url>
      ${blogs
        .map(({ slug }) => {
          return `
            <url>
                <loc>${`${URL}/blog/${slug}`}</loc>
            </url>
          `;
        })
        .join("")}
    </urlset>
    `;
}