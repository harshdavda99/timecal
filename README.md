import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // Theme
// import 'prismjs/components/prism-javascript'; // Language

import React, { useEffect, useRef } from 'react';

const CodeBlock = ({ code }) => {
  const codeRef = useRef(null);

  useEffect(() => {
    Prism.highlightElement(codeRef.current);
  }, [code]);

  return (
    <pre>
      <code ref={codeRef} className="language-javascript">
        {code}
      </code>
    </pre>
  );
};

export default CodeBlock;
    <CodeBlock code={`const a = 5;\nconsole.log(a);`} />
