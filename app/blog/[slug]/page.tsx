import { MDXRemote, compileMDX } from 'next-mdx-remote/rsc'
import { promises as fs } from 'fs';
import path from 'path';
import style from "./blogPost.module.scss";


export async function generateStaticParams() {
  const posts = await fs.readdir(path.join(process.cwd(), 'blog'));
  return posts.map((post) => ({
    slug: post.replace(/\.mdx$/, ''),
  }));
}

export default async function BlogPost({ params }: {params: {slug: string}}) {
  interface Frontmatter {
    path: string;
    date: string;
    updated: string;
    title: string;
    description: string;
    status: string;
    excerpt: string;
  }

  const _content = await fs.readFile(path.join(process.cwd(), 'blog', `${params.slug}.mdx`), 'utf-8');
  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source: _content,
    options: {
      parseFrontmatter: true
    }
  });
  const date = new Date(frontmatter.date);
  const dateStr = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return (
    // <div style={{backgroundColor:  "#F2CB05"}}>
    <div className="container section">
      <div className="is-size-2">{frontmatter.title}</div>
      <div className="is-size-7">By Pao Siangliulue • {dateStr}</div>
      <div className={style.blogContent}>
        {content}
      </div>
    </div>
    // </div>
  )
}