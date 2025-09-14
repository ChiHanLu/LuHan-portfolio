// Minimal type override for react-markdown to avoid compiling package TS sources
// This keeps usage typed as a React component while preventing Next/tsc from
// failing on the package's internal TypeScript files.

declare module 'react-markdown' {
  import * as React from 'react';
  import { PluggableList } from 'unified';

  export interface ReactMarkdownProps {
    children?: React.ReactNode;
    remarkPlugins?: PluggableList;
    rehypePlugins?: PluggableList;
    // allow other props
    [key: string]: any;
  }

  const ReactMarkdown: React.ComponentType<ReactMarkdownProps>;
  export default ReactMarkdown;
}
