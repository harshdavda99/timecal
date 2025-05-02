<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Highlight @ and / Words</title>
  <style>
    body {
      background-color: #f9f9f9;
      font-family: sans-serif;
      padding: 2rem;
    }

    .highlight-wrapper {
      position: relative;
      max-width: 600px;
      margin: auto;
    }

    .highlighted-text,
    textarea {
      box-sizing: border-box;
      width: 100%;
      height: 200px;
      padding: 12px;
      font-family: 'Courier New', monospace;
      font-size: 16px;
      line-height: 1.5;
      border: 1px solid #000;
      border-radius: 6px;
      white-space: pre-wrap;
      word-break: break-word;
      overflow: auto;
    } 

    .highlighted-text {
      position: absolute;
      top: 0;
      left: 0;
      color: black;
      z-index: 1;
      pointer-events: none;
    }

    .highlighted-text span {
      color: #2563eb;
      font-weight: bold;
    }

    textarea {
      position: relative;
      z-index: 2;
      background: transparent;
      color: transparent;
      caret-color: black;
      resize: none;
    }
  </style>
</head>
<body>

  <div class="highlight-wrapper">
    <div class="highlighted-text" id="highlight"></div>
    <textarea id="textarea" spellcheck="false" placeholder="Type something... use @ or /"></textarea>
  </div>

  <script>
    const textarea = document.getElementById('textarea');
    const highlightDiv = document.getElementById('highlight');

    function highlightText(text) {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped.replace(/(@\w+|\/\w+)/g, (match) => {
    if (match.startsWith('@')) {
      return `<span style="color: #2563eb; font-weight: bold;">${match}</span>`;
    } else if (match.startsWith('/')) {
      return `<span style="color: red; font-weight: bold;">${match}</span>`;
    }
    return match;
  });
}

    textarea.addEventListener('input', () => {
      highlightDiv.innerHTML = highlightText(textarea.value);
    });

    textarea.addEventListener('scroll', () => {
      highlightDiv.scrollTop = textarea.scrollTop;
      highlightDiv.scrollLeft = textarea.scrollLeft;
    });
  </script>

</body>
</html>
 
