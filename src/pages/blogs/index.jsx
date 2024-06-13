import Link from 'next/link';

import Airtable from "airtable";

import '@/app/styles/blogs.scss'
import { useState } from 'react';

export async function getServerSideProps(context){
  const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);
  
  const { page = 1, search = ''} = context.query;
  const recordsPerPage = 10;
  let allRecords = []

  const records = await base('Blogs').select({
    filterByFormula: `AND({Status} = "Approved", FIND(LOWER("${search}"), LOWER({Title})))`,
    pageSize: recordsPerPage,
    sort: [
      { field: 'Date', direction: 'desc' },
    ]
  }).eachPage((records, fetchNextPage) => {
    allRecords = allRecords.concat(records);
    fetchNextPage();
  });
  
  const totalRecords = allRecords.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  //Calculate starting index for the current page
  const startIndex = (page - 1) * recordsPerPage;
  const paginatedRecords = allRecords.slice(startIndex, startIndex + recordsPerPage);

  const blogs = paginatedRecords.map(record => ({
    id: record.id,
    ...record.fields,
    slug: record.fields.Slug.replace(/ /g, '-'),
    image: record.fields.Image ? record.fields.Image[0].url : null,
  }));
  
  return { 
    props: { 
      blogs, 
      currentPage: parseInt(page, 10),
      totalPages,
      search
    }
  };
}

const Blogs = ({ blogs, currentPage, totalPages, search: initialSearch }) => {
  const [search, setSearch] = useState(initialSearch);
  const nextPage = parseInt(currentPage) + 1;
  const prevPage = parseInt(currentPage) - 1;
  const recordsPerPage = 10;

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = search.trim();
    window.location.href = `?page=1&search=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div className='blogs-route-wrapper'>
      <form onSubmit={handleSearch} className='search-bar-container'>
        <input
          type="text"
          placeholder="Search Blogs..."
          onChange={(e) => setSearch(e.target.value)}
          className='search-input'
        />
        <button type='submit' className='search-button' >Search</button>
      </form>
      <div className='blog-list-container'>
        <h1>All Blogs</h1>
        <ul className='blog-list'>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <li key={blog.id} className='blog-item'>
                <Link href={`/blogs/${blog.Slug.replace(/ /g, '-')}`}>
                  {blog.Image && <img src={blog.Image} alt={blog.Title} className='blog-image' />}
                  <h2>{blog.Title}</h2>
                  <p>{blog.Description}</p>
                </Link>
              </li>
            ))
          ) : (
            <li>No blog posts found</li>
          )}
          </ul>
          <div className="pagination">
            {prevPage > 0 && <Link href={`?page=${prevPage}&search=${search}`}><button className='pagination-button'>Previous</button></Link>}
            <p>Page: {currentPage} of {totalPages}</p>
            {nextPage <= totalPages && <Link href={`?page=${nextPage}&search=${search}`}><button className='pagination-button'>Next</button></Link>}
          </div>
      </div>
    </div>
    
  );
}

export default Blogs;


