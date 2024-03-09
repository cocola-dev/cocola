"use client";

import MarkdownReader from "@/components/mdx-components";
import { Write } from "@/components/ui/fancy-area/write";
import React, { useState } from "react";

const markdownContent = `# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

**Bold text**

*Italic text*

~~Strikethrough text~~

> Blockquote

- Unordered list item 1
- Unordered list item 2
- Unordered list item 3

1. Ordered list item 1
2. Ordered list item 2
3. Ordered list item 3


[Link text](https://www.example.com)

![Alt text for an image](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3oB2bMEw6O6RvYH6A7W0M-4l1NZaT_OnsFA&usqp=CAU)

| Table header 1 | Table header 2 |
| --- | --- |
| Table cell 1 | Table cell 2 |
| Table cell 3 | Table cell 4 |

- [ ] To-do item 1
- [x] To-do item 2
- [ ] To-do item 3

`;

const Page = () => {
  const [textValue, setTextValue] = useState(markdownContent);
  return (
    <div className="m-5">
      <Write {...{ textValue, setTextValue }} />
      <div className="mt-4">
        <MarkdownReader markdown={textValue} />
      </div>
    </div>
  );
};

export default Page;
