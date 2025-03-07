// import fs from 'fs';
import { promises as fs} from 'fs';
import path from 'path';
import Link from 'next/link';
import { compileMDX } from 'next-mdx-remote/rsc';
import style from "./blog.module.scss";

interface Frontmatter {
    path: string;
    date: string;
    updated: string;
    title: string;
    description: string;
    status: string;
    excerpt: string;
  }

export default async function Blog(){
    const blogDirectory = path.join(process.cwd(), 'blog');
    const postFiles = await fs.readdir(blogDirectory);
    const posts = await Promise.all(postFiles.map(async (postFile): Promise<{slug: string, title: string, date: string}> => {
        const _content = await fs.readFile(path.join(process.cwd(), 'blog', postFile), 'utf-8');
        const { frontmatter } = await compileMDX<Frontmatter>({
            source: _content,
            options: {
                parseFrontmatter: true
            }
        });
        return {
            slug: postFile.replace(/\.mdx$/, ''),
            title: frontmatter.title,
            date: frontmatter.date
        };
    }));

    posts.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    // TODO: If I take out the date from the file name, how to sort them by date?
    return (
        // <div  style={{backgroundColor:  "#F2CB05"}}>
        <div className="container section">
        <div className={style.blogList}>
            <h1>Posts</h1>
            {
                posts.map((post) => {
                    const date = new Date(post.date);
                    const dateStr = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                    return (
                        <div className="columns post" key={post.slug}>
                            <div className="column is-one-fifth">
                                <div className="">
                                {dateStr}
                                </div>
                            </div>
                            <div className="column is-four-fifths">
                                <Link href={`/blog/${post.slug}`}>
                                {post.title}
                                </Link>
                            </div>

                        </div>
                    )
                })
            }
        </div>
        </div>
        // </div>
    )
}
