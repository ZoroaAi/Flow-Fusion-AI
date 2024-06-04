import Head from 'next/head';
import Airtable from "airtable";
import Link from 'next/link';

import '@/app/styles/blogs.scss'

export async function getStaticPaths(){
    const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);
    const records = await base('Blogs').select({
        filterByFormula: '{Status} = "Approved"',
    }).all();

    // console.log('Records from Airtable:', records);

    const blogs = records.map(record => ({
        id: record.id,
        slug: record.fields.Slug.replace(/ /g, '-')
    }));

    const paths = blogs.map(blog => ({
        params: { slug: blog.slug.replace(/ /g, '-') },
    }))
    // console.log('Mapped blogs:', blogs);
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    // Correct the slug by removing leading and trailing spaces and dots
    const sanitizedSlug = params.slug.replace(/^-+|-+$/g, '').trim();

    const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);
    const records = await base('Blogs').select({
        filterByFormula: `{Slug} = "${sanitizedSlug}"`,
    }).all();

    if (records.length === 0) {
        return { notFound: true };
    }

    const blog = records.map(record => ({
        id: record.id,
        title: record.fields.Title || '',
        description: record.fields.Description || '',
        cImage: record.fields['Content Image'] ? record.fields['Content Image'][0].url : null,
        hImage: record.fields['Header Image'] ? record.fields['Header Image'][0].url : null,
        content: record.fields.Content || '',
        metaDescription: record.fields['Meta Description'] || '',
        canonicalTag: record.fields['Canonical Tag'] || '',
        slug: record.fields.Slug || '',
        date: record.fields.Date || '',
        keywords: record.fields.Keywords || ''
    }))[0];

    return {
        props: {
            blog: blog || {}
        }
    };
}

const BlogPost = ({ blog }) => {
    if (!blog.title) {
        return <div>Blog post not found</div>;
    }

    return (
        <div className='blogs-route-wrapper'>
            <Head>
                <title>{blog.title}</title>
                <meta name='description' content={blog.metaDescription} />
                <meta name='author' content='Saurav KC' />
                <meta name='date' content={blog.date} scheme='DD-MM-YYYY' />
                <link rel='canonical' href={`https://flowfusionai.com/blogs/${blog.slug}`} />
            </Head>
            <div className='blog-post'>
                {blog.hImage && <img src={blog.hImage} alt={blog.title} className='header-image' />}
                <nav className='breadcrumb-container'>
                    <ol className='breadcrumb'>
                        <li className='breadcrumb-item'><Link href="/">Home/</Link></li>
                        <li className='breadcrumb-item'><Link href="/blogs">Blogs/</Link></li>
                        <li className='breadcrumb-item active' aria-current="page">{blog.title}</li>
                    </ol>
                    <p className='breadcrumb-date'>Published: {blog.date}</p>
                </nav>
                <h1>{blog.title}</h1>
                {blog.cImage && <img src={blog.cImage} alt={blog.title} className='content-image' />}
                <p className='blog-description'>{blog.description}</p>
                <div className='blog-content' dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
        </div>
    );
};

export default BlogPost;
