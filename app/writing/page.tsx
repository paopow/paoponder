import { promises as fs} from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import WritingList, { WritingPost } from './WritingList';

interface Frontmatter {
    path: string;
    type: string;
    languages?: string[];
    date: string;
    updated: string;
    title: string;
    description: string;
    status: string;
    excerpt: string;
  }

export default async function Writing(){
    const writingDirectory = path.join(process.cwd(), 'writing');
    const postFiles = await fs.readdir(writingDirectory);
    const posts = await Promise.all(postFiles.map(async (postFile): Promise<WritingPost> => {
        const _content = await fs.readFile(path.join(writingDirectory, postFile), 'utf-8');
        const { frontmatter } = await compileMDX<Frontmatter>({
            source: _content,
            options: {
                parseFrontmatter: true
            }
        });
        return {
            slug: postFile.replace(/\.mdx$/, ''),
            title: frontmatter.title,
            date: frontmatter.date,
            type: frontmatter.type === 'note' ? 'note' : 'article',
            languages: frontmatter.languages?.length ? frontmatter.languages : ['en']
        };
    }));

    posts.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return (
        <div className="container section">
            <WritingList posts={posts} />
        </div>
    )
}
