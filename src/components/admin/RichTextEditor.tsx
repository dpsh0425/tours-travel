"use client";

import { useRef, useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Start typing...",
  className = "",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      // Only update if the value actually changed to avoid cursor position issues
      const currentContent = editorRef.current.innerHTML;
      if (currentContent !== value) {
        // Save cursor position
        const selection = window.getSelection();
        const range = selection?.rangeCount ? selection.getRangeAt(0) : null;
        const savedRange = range
          ? {
              startContainer: range.startContainer,
              startOffset: range.startOffset,
              endContainer: range.endContainer,
              endOffset: range.endOffset,
            }
          : null;

        // Update content
        editorRef.current.innerHTML = value || "";

        // Restore cursor position if possible
        if (savedRange && selection) {
          try {
            const newRange = document.createRange();
            newRange.setStart(savedRange.startContainer, savedRange.startOffset);
            newRange.setEnd(savedRange.endContainer, savedRange.endOffset);
            selection.removeAllRanges();
            selection.addRange(newRange);
          } catch (e) {
            // Ignore errors if cursor restoration fails
          }
        }
      }
      // Set placeholder attribute
      editorRef.current.setAttribute("data-placeholder", placeholder || "Start typing...");
    }
  }, [value, placeholder]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const ToolbarButton = ({
    onClick,
    children,
    title,
  }: {
    onClick: () => void;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="px-3 py-1.5 text-sm hover:bg-gray-200 rounded transition-colors border border-transparent hover:border-gray-300"
      onMouseDown={(e) => e.preventDefault()}
    >
      {children}
    </button>
  );

  return (
    <div className={`border border-gray-300 rounded-lg ${className}`}>
      <div className="border-b border-gray-300 bg-gray-50 p-2 flex flex-wrap gap-1 rounded-t-lg">
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <ToolbarButton
            onClick={() => execCommand("bold")}
            title="Bold (Ctrl+B)"
          >
            <strong>B</strong>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("italic")}
            title="Italic (Ctrl+I)"
          >
            <em>I</em>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("underline")}
            title="Underline (Ctrl+U)"
          >
            <u>U</u>
          </ToolbarButton>
        </div>
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <ToolbarButton
            onClick={() => execCommand("formatBlock", "h2")}
            title="Heading 2"
          >
            <span className="font-bold">H2</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("formatBlock", "h3")}
            title="Heading 3"
          >
            <span className="font-bold text-xs">H3</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("formatBlock", "p")}
            title="Paragraph"
          >
            <span>P</span>
          </ToolbarButton>
        </div>
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <ToolbarButton
            onClick={() => execCommand("insertUnorderedList")}
            title="Bullet List"
          >
            • List
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("insertOrderedList")}
            title="Numbered List"
          >
            1. List
          </ToolbarButton>
        </div>
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <ToolbarButton
            onClick={() => execCommand("justifyLeft")}
            title="Align Left"
          >
            ⬅
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("justifyCenter")}
            title="Align Center"
          >
            ↔
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("justifyRight")}
            title="Align Right"
          >
            ➡
          </ToolbarButton>
        </div>
        <div className="flex gap-1">
          <ToolbarButton
            onClick={() => {
              const url = prompt("Enter URL:");
              if (url) execCommand("createLink", url);
            }}
            title="Insert Link"
          >
            🔗 Link
          </ToolbarButton>
          <ToolbarButton
            onClick={() => {
              const url = prompt("Enter image URL:");
              if (url) execCommand("insertImage", url);
            }}
            title="Insert Image"
          >
            🖼️ Image
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("removeFormat")}
            title="Remove Formatting"
          >
            ❌ Clear
          </ToolbarButton>
        </div>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[300px] p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-b-lg prose max-w-none"
        style={{ whiteSpace: "pre-wrap" }}
        suppressContentEditableWarning
      />
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          cursor: text;
        }
      `}</style>
    </div>
  );
}
