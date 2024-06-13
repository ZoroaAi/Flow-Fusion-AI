import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);

export default async function handler(req, res) {
    const { page = 1 } = req.query;
    const recordsPerPage = 15;
    let allRecords = [];

    try {
        const records = await base('Resources').select({
            pageSize: recordsPerPage,
            sort: [
                { field: 'Complexity', direction: 'asc' },
                { field: 'Date', direction: 'desc' }
            ]
        }).eachPage((records, fetchNextPage) => {
            allRecords = allRecords.concat(records);
            fetchNextPage();
        });

        const totalRecords = allRecords.length;
        const totalPages = Math.ceil(totalRecords / recordsPerPage);

        // Calculate starting index for the current page
        const startIndex = (page - 1) * recordsPerPage;
        const paginatedRecords = allRecords.slice(startIndex, startIndex + recordsPerPage);

        const kb = paginatedRecords.map(record => ({
            id: record.id,
            title: record.fields.Title,
            description: record.fields.Description,
            img: record.fields['Image'] ? record.fields['Image'][0].url : null,
            link: record.fields.Link,
            level: record.fields.Complexity,
            access: record.fields['Access'] === 'FREE'
        }));

        res.status(200).json({
            kb,
            currentPage: parseInt(page, 10),
            totalPages
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
