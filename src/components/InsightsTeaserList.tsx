import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Article } from '../lib/supabaseArticles';

interface InsightsTeaserListProps {
  title?: string;
  posts: Article[];
  maxItems?: number;
  showViewAllLink?: boolean;
  /** Background variant: 'white' or 'gray' */
  bg?: 'white' | 'gray';
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getExcerpt(description: string, maxLength: number = 120): string {
  if (description.length <= maxLength) return description;
  return description.slice(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

/**
 * Reusable insights/blog teaser list.
 * Used on the homepage ("Latest Thinking") and industry pages ("Related Insights").
 */
export default function InsightsTeaserList({
  title = 'Latest Thinking',
  posts,
  maxItems = 3,
  showViewAllLink = true,
  bg = 'white',
}: InsightsTeaserListProps) {
  const displayed = posts.slice(0, maxItems);

  if (displayed.length === 0) return null;

  const bgClass = bg === 'gray' ? 'bg-rs-light-gray' : 'bg-white';

  return (
    <section className={`${bgClass} py-16`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-8"
        >
          <h2 className="text-2xl font-bold text-rs-dark">{title}</h2>
          {showViewAllLink && (
            <Link
              to="/blog/"
              className="hidden sm:inline-flex items-center space-x-1 text-rs-cyan hover:text-blue-700 font-medium text-sm transition-colors"
            >
              <span>View all insights</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </motion.div>

        <div className="divide-y divide-gray-200">
          {displayed.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="py-5 first:pt-0 last:pb-0"
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group block"
              >
                <h3 className="text-lg font-semibold text-rs-dark group-hover:text-rs-cyan transition-colors leading-snug">
                  {post.title}
                </h3>
                <div className="mt-1.5 flex items-center space-x-3">
                  <time className="text-xs text-rs-dark opacity-40 font-medium uppercase tracking-wide">
                    {formatDate(post.publishedDate)}
                  </time>
                  {post.category && post.category !== 'Help' && (
                    <>
                      <span className="text-rs-dark opacity-20">|</span>
                      <span className="text-xs text-rs-cyan opacity-70 font-medium">{post.category}</span>
                    </>
                  )}
                </div>
                <p className="mt-2 text-sm text-rs-dark opacity-60 leading-relaxed">
                  {getExcerpt(post.description)}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {showViewAllLink && (
          <div className="mt-6 sm:hidden">
            <Link
              to="/blog/"
              className="inline-flex items-center space-x-1 text-rs-cyan hover:text-blue-700 font-medium text-sm transition-colors"
            >
              <span>View all insights</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
