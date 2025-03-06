import { MDXRemote, compileMDX } from 'next-mdx-remote/rsc'
import { promises as fs } from 'fs';
import path from 'path';


export async function generateStaticParams() {
  // const posts = await fetch('https://.../posts').then((res) => res.json())
  // return posts.map((post) => ({
  //   slug: post.slug,
  // }))
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

  return (
    <div className="container">
      <div className="is-size-2">{frontmatter.title}</div>
      <div className="is-size-7">By Pao Siangliulue • {frontmatter.date}</div>
      <div style={{paddingTop: '1rem'}}>
        {content}
      </div>
    </div>
  )
}