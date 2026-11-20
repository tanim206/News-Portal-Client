"use client";

import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link as LinkIcon,
  Unlink,
} from "lucide-react";

interface ArticleContentEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function ArticleContentEditor({
  value,
  onChange,
  error,
}: ArticleContentEditorProps) {
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit,
      Underline,

      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
          class: "article-content-link",
        },
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),

      Placeholder.configure({
        placeholder: "Write your full article content here...",
      }),
    ],

    content: value || "",

    editorProps: {
      attributes: {
        class:
          "article-editor-content min-h-[350px] px-5 py-4 text-[15px] leading-8 text-gray-800 focus:outline-none",
      },
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync external content when editing an existing article.
  useEffect(() => {
    if (!editor) return;

    const currentContent = editor.getHTML();

    if (value !== currentContent) {
      editor.commands.setContent(value || "", {
        emitUpdate: false,
      });
    }
  }, [editor, value]);

  if (!editor) {
    return (
      <div className="min-h-[400px] animate-pulse rounded-lg border bg-gray-50" />
    );
  }

  const toolbarButton = (active = false, disabled = false) =>
    `flex size-8 items-center justify-center rounded-md transition ${
      active
        ? "bg-[#176B45] text-white"
        : "text-gray-600 hover:bg-gray-100 hover:text-[#176B45]"
    } ${disabled ? "cursor-not-allowed opacity-30" : ""}`;

  const addLink = () => {
    const url = linkUrl.trim();

    if (!url) return;

    try {
      const parsedUrl = new URL(
        /^https?:\/\//i.test(url) ? url : `https://${url}`,
      );

      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        return;
      }

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: parsedUrl.href })
        .run();

      setLinkUrl("");
      setShowLinkInput(false);
    } catch {
      // Keep the link input open when the URL is invalid.
    }
  };

  const openLinkInput = () => {
    const existingLink = editor.getAttributes("link").href || "";

    setLinkUrl(existingLink);
    setShowLinkInput(true);
  };

  const buttons = [
    {
      label: "Undo",
      icon: Undo2,
      action: () => editor.chain().focus().undo().run(),
      disabled: !editor.can().undo(),
    },
    {
      label: "Redo",
      icon: Redo2,
      action: () => editor.chain().focus().redo().run(),
      disabled: !editor.can().redo(),
    },
  ];

  return (
    <div
      className={`overflow-hidden rounded-lg border bg-white transition ${
        error
          ? "border-red-400"
          : "border-gray-200 focus-within:border-[#176B45] focus-within:ring-2 focus-within:ring-[#176B45]/10"
      }`}
    >
      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center gap-1 border-b bg-gray-50 p-2">
        {buttons.map(({ label, icon: Icon, action, disabled }) => (
          <button
            key={label}
            type="button"
            title={label}
            aria-label={label}
            disabled={disabled}
            onClick={action}
            className={toolbarButton(false, disabled)}
          >
            <Icon size={16} />
          </button>
        ))}

        <span className="mx-1 h-6 w-px bg-gray-200" />

        <button
          type="button"
          title="Bold"
          aria-label="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={toolbarButton(editor.isActive("bold"))}
        >
          <Bold size={16} />
        </button>

        <button
          type="button"
          title="Italic"
          aria-label="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={toolbarButton(editor.isActive("italic"))}
        >
          <Italic size={16} />
        </button>

        <button
          type="button"
          title="Underline"
          aria-label="Underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={toolbarButton(editor.isActive("underline"))}
        >
          <UnderlineIcon size={16} />
        </button>

        <button
          type="button"
          title="Strikethrough"
          aria-label="Strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={toolbarButton(editor.isActive("strike"))}
        >
          <Strikethrough size={16} />
        </button>

        <span className="mx-1 h-6 w-px bg-gray-200" />

        <button
          type="button"
          title="Align Left"
          aria-label="Align Left"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={toolbarButton(editor.isActive({ textAlign: "left" }))}
        >
          <AlignLeft size={16} />
        </button>

        <button
          type="button"
          title="Align Center"
          aria-label="Align Center"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={toolbarButton(editor.isActive({ textAlign: "center" }))}
        >
          <AlignCenter size={16} />
        </button>

        <button
          type="button"
          title="Align Right"
          aria-label="Align Right"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={toolbarButton(editor.isActive({ textAlign: "right" }))}
        >
          <AlignRight size={16} />
        </button>

        <button
          type="button"
          title="Justify"
          aria-label="Justify"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={toolbarButton(editor.isActive({ textAlign: "justify" }))}
        >
          <AlignJustify size={16} />
        </button>

        <span className="mx-1 h-6 w-px bg-gray-200" />

        <button
          type="button"
          title="Bullet List"
          aria-label="Bullet List"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={toolbarButton(editor.isActive("bulletList"))}
        >
          <List size={17} />
        </button>

        <button
          type="button"
          title="Numbered List"
          aria-label="Numbered List"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={toolbarButton(editor.isActive("orderedList"))}
        >
          <ListOrdered size={17} />
        </button>

        <span className="mx-1 h-6 w-px bg-gray-200" />

        <button
          type="button"
          title="Insert Link"
          aria-label="Insert Link"
          onClick={openLinkInput}
          className={toolbarButton(editor.isActive("link"))}
        >
          <LinkIcon size={16} />
        </button>

        {editor.isActive("link") && (
          <button
            type="button"
            title="Remove Link"
            aria-label="Remove Link"
            onClick={() => editor.chain().focus().unsetLink().run()}
            className={toolbarButton()}
          >
            <Unlink size={16} />
          </button>
        )}
      </div>

      {/* LINK INPUT */}
      {showLinkInput && (
        <div className="flex flex-wrap items-center gap-2 border-b bg-[#F5F8F5] p-3">
          <input
            type="url"
            value={linkUrl}
            onChange={(event) => setLinkUrl(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addLink();
              }

              if (event.key === "Escape") {
                setShowLinkInput(false);
              }
            }}
            placeholder="https://example.com"
            autoFocus
            className="h-9 min-w-0 flex-1 rounded-md border border-gray-200 bg-white px-3 text-sm outline-none focus:border-[#176B45]"
          />

          <button
            type="button"
            onClick={addLink}
            className="h-9 rounded-md bg-[#176B45] px-4 text-xs font-semibold text-white hover:bg-[#104B34]"
          >
            Apply Link
          </button>

          <button
            type="button"
            onClick={() => setShowLinkInput(false)}
            className="h-9 rounded-md border px-3 text-xs text-gray-600 hover:bg-white"
          >
            Cancel
          </button>
        </div>
      )}

      {/* EDITOR */}
      <EditorContent editor={editor} />

      {/* FOOTER */}
      <div className="flex items-center justify-between border-t bg-gray-50 px-4 py-2">
        <p className="text-xs text-gray-400">Rich Text Editor</p>

        <p className="text-xs text-gray-400">
          {editor.getText().length} characters
        </p>
      </div>
    </div>
  );
}
