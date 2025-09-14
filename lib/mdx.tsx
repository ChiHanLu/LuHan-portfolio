import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import type { Plugin } from "unified";

import { Callout } from "@/components/mdx/Callout";
import { Pre } from "@/components/mdx/Pre";

const prettyCode = rehypePrettyCode as unknown as Plugin;

export function MDXContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [
              prettyCode,
              {
                theme: "github-dark",
                keepBackground: false,
              },
            ],
          ],
        },
      }}
      components={{
        pre: (props: React.ComponentProps<"pre">) => <Pre {...props} />,
        code: (props: React.ComponentProps<"code">) => <code className="prose-code:font-mono" {...props} />,
        Callout,
        a: (props: React.ComponentProps<"a">) => (
          <a className="underline decoration-foreground/30 hover:decoration-foreground" {...props} />
        ),
      }}
    />
  );
}
