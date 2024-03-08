"use client";

import MarkdownReader from "@/components/mdx-components";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

const markdownContent = `
# Example Markdown Content

This is a paragraph.

## Subheading

Another paragraph.

- List item 1
- List item 2
- List item 3

`;

const App = () => {
  const [mdcontent, setMdcontent] = useState(markdownContent);
  return (
    <div className="m-5">
      <Textarea
        value={mdcontent}
        onChange={(e) => setMdcontent(e.target.value)}
      />
      <MarkdownReader markdown={mdcontent} />
    </div>
  );
};

export default App;
