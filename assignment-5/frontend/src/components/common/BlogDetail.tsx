import { useParams } from 'react-router-dom';
import { useBlogBySlug } from '@/hooks/useApi';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: blog } = useBlogBySlug(slug || '');
  const [readingTime, setReadingTime] = useState(0);
  const [activeId, setActiveId] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);


  // Scroll + Intersection Observer for active heading
  useEffect(() => {
    if (!blog?.tableOfContents || !contentRef.current) return;
    // Calculate reading time
    if (blog?.description) {
      const text = blog.description.replace(/<[^>]*>/g, '');
      const words = text.split(/\s+/).filter(Boolean).length;
      setReadingTime(Math.ceil(words / 200));
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -80% 0%' } 
    );

    blog.tableOfContents.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => {
      blog.tableOfContents?.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [blog]);


  // Inject IDs from tableOfContents into HTML headings
  function injectHeadingIdsDebug(html: string, toc: { id: string; text: string }[] = []) {
    if (!html) return html;

    const normalize = (s: string) => s.trim().replace(/\s+/g, ' ');

    const tocMap = new Map<string, string>();
    toc.forEach(item => {
      tocMap.set(normalize(item.text), item.id);
    });

    return html.replace(/<h([1-6])([^>]*)>(.*?)<\/h\1>/gi, (match, level, attrs, content) => {
      const normalizedContent = normalize(content);
      const id = tocMap.get(normalizedContent) ||
                normalizedContent.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

      // Preserve existing attributes, inject or replace id
      const idAttr = ` id="${id}"`;
      if (/<\s*\/?h[1-6]/i.test(attrs)) {
        // Safeguard: unlikely, but avoid double <h>
      }
      const newAttrs = attrs.includes(' id=') 
        ? attrs.replace(/(id\s*=\s*["']?)[^"'>\s]*/i, `$1${id}`)
        : `${attrs}${idAttr}`;

      const result = `<h${level}${newAttrs}>${content}</h${level}>`;
      return result;
    });
  }
  
  const processedContent = blog?.tableOfContents ? injectHeadingIdsDebug(blog.description , blog.tableOfContents): '';

  // Handle Scroll to Table of Content
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading Blog...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <article className="space-y-8">
        {/* Header */}
        <header className="space-y-4">

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {blog.title}
          </h1>
          
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
          <div className="flex flex-wrap gap-2">
            {blog.category?.name && (
              <Badge variant="default" className="text-xs">
                {blog.category.name}
              </Badge>
            )}
          </div>

            <div className="flex items-center gap-1 text-sm">
              <Calendar className="h-4 w-4" />
              <time dateTime={blog.publishDate}>
                {new Date(blog.publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>

            <div className="flex items-center gap-1 text-sm">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>

            <span className="text-sm">By {blog.author}</span>
            
          </div>
        </header>

        <Separator />

        {/* Main Content + ToC */}
        <div className="flex gap-8">
          {/* Table of Contents (Desktop only) */}
          {blog.tableOfContents && blog.tableOfContents.length > 0 && (
            <aside className="hidden lg:block w-56 shrink-0 ">
              <Card className="top-24">
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Table of Contents</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-auto pr-2 -mt-5">
                    <nav className="space-y-2 ">
                      {blog.tableOfContents.map((item) => (
                          <div className={`cursor-pointer text-ellipsis w-full text-left ml-[' + (item.level - 2) * 16 + 'px] hover:dark:bg-slate-600/90 hover:bg-slate-200/90 rounded p-1  text-sm/4`} onClick={() => handleScrollTo(item.id)} key={item.id}
                          >{item.text}</div>
                      ))}
                    </nav>
                  </ScrollArea>
                </CardContent>
              </Card>
            </aside>
          )}

          {/* Blog Content */}
          <div className="flex-1 min-w-0 -mt-5" ref={contentRef}>
            <span>{blog.excerpt}</span>
            <div
              className="prose-headings:my-5 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:my-2 prose-p:font-extralight prose-p:text-justify prose-pre:my-2 prose-img:mt-5 max-w-none "
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />
          </div>
        </div>
      </article>
    </div>
  );
}