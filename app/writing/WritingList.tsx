'use client';

import { useState } from 'react';
import Link from 'next/link';
import style from "./blog.module.scss";

export interface WritingPost {
    slug: string;
    title: string;
    date: string;
    type: string;
    languages: string[];
}

function LanguageBadge({ languages }: { languages: string[] }) {
    // Only flag posts that offer Thai; English-only posts show nothing.
    if (!languages.includes('th')) return null;
    const label = languages.includes('en') ? 'EN·ไทย' : 'ไทย';
    return <span className="tag is-light ml-2 thai">{label}</span>;
}

type Filter = 'all' | 'note' | 'article';

const TABS: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'note', label: 'Notes' },
    { key: 'article', label: 'Articles' },
];

export default function WritingList({ posts }: { posts: WritingPost[] }) {
    const [filter, setFilter] = useState<Filter>('all');

    const visible = filter === 'all' ? posts : posts.filter((p) => p.type === filter);
    const emptyWord = filter === 'all' ? 'posts' : filter === 'note' ? 'notes' : 'articles';

    return (
        <div className={style.blogList}>
            <h1>Writing</h1>
            <div className="tabs" style={{ marginBottom: '2.5rem' }}>
                <ul>
                    {TABS.map((tab) => (
                        <li key={tab.key} className={filter === tab.key ? 'is-active' : ''}>
                            <a onClick={() => setFilter(tab.key)}>{tab.label}</a>
                        </li>
                    ))}
                </ul>
            </div>
            {visible.length === 0 && (
                <div className="has-text-grey">There are no {emptyWord} yet.</div>
            )}
            {visible.map((post) => {
                const date = new Date(post.date);
                const dateStr = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                return (
                    <div className="columns post" key={post.slug}>
                        <div className="column is-one-fifth">
                            <div className="">{dateStr}</div>
                        </div>
                        <div className="column is-four-fifths">
                            <Link href={`/writing/${post.slug}`}>{post.title}</Link>
                            <LanguageBadge languages={post.languages} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
