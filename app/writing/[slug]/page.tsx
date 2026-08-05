import { compileMDX } from 'next-mdx-remote/rsc'
import { promises as fs } from 'fs';
import path from 'path';
import style from "./blogPost.module.scss";
import { Lang, LanguageProvider, LanguageToggle, LocalizedTitle } from './language';


export async function generateStaticParams() {
  const posts = await fs.readdir(path.join(process.cwd(), 'writing'));
  return posts.map((post) => ({
    slug: post.replace(/\.mdx$/, ''),
  }));
}

export default async function WritingPost({ params }: {params: {slug: string}}) {
  interface Frontmatter {
    path: string;
    type: string;
    languages?: string[];
    date: string;
    updated: string;
    title: string;
    title_th?: string;
    description: string;
    status: string;
    excerpt: string;
  }

  const _content = await fs.readFile(path.join(process.cwd(), 'writing', `${params.slug}.mdx`), 'utf-8');
  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source: _content,
    options: {
      parseFrontmatter: true
    },
    components: { Lang },
  });

  const languages = frontmatter.languages?.length ? frontmatter.languages : ['en'];
  const titles: Record<string, string> = {};
  for (const code of languages) {
    const perLang = (frontmatter as unknown as Record<string, unknown>)[`title_${code}`];
    titles[code] = typeof perLang === 'string' ? perLang : frontmatter.title;
  }

  const date = new Date(frontmatter.date);
  const dateStr = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const typeLabel = frontmatter.type === 'note' ? 'Note' : 'Article';

  return (
    <div className="container section">
      <LanguageProvider available={languages}>
        <LocalizedTitle titles={titles} />
        <div className="is-size-7">{typeLabel} • By Pao Siangliulue • {dateStr}</div>
        <LanguageToggle />
        <div className={style.blogContent}>
          {content}
        </div>
      </LanguageProvider>
    </div>
  )
}
