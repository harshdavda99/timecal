import React, { useRef, useState, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CustomVideo'; // Register custom video blot


const Editor = () => {
  const [value, setValue] = useState('');
  const quillRef = useRef(null);

  const insertIntoEditor = (type, src) => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    editor.focus();
    setTimeout(() => {
      const range = editor.getSelection() || { index: editor.getLength(), length: 0 };
      editor.insertEmbed(range.index, type, src);
      editor.setSelection(range.index + 1);
    }, 0);
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        insertIntoEditor('image', data.url);
      } catch (err) {
        console.error('Image upload failed:', err);
      }
    };
  };

  const handleVideoUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'video/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        insertIntoEditor('video', data.url);
      } catch (err) {
        console.error('Video upload failed:', err);
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'video'],
        ['clean'],
      ],
      handlers: {
        image: handleImageUpload,
        video: handleVideoUpload,
      },
    },
  }), []);

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
      />
    </div>
  );
};

export default Editor;

-------------------------------------------------------------------------------------------------------------------
import Quill from 'quill';

const BlockEmbed = Quill.import('blots/block/embed');

class CustomVideo extends BlockEmbed {
  static blotName = 'video';
  static tagName = 'video';
  static className = 'ql-custom-video';

  static create(value) {
    const node = super.create();
    node.setAttribute('src', value);
    node.setAttribute('controls', '');
    node.setAttribute('autoplay', '');
    node.setAttribute('muted', ''); // required for autoplay to work
    node.setAttribute('playsinline', ''); // iOS compatibility
    node.setAttribute('width', '100%');
    return node;
  }

  static value(node) {
    return node.getAttribute('src');
  }
}

Quill.register(CustomVideo);



// ---------------------------------------------------------------------------------server js 

const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// POST route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

