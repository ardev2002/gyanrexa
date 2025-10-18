"use client";
import React, { useState, useRef } from "react";

const TAGS = ["#para", "#lh", "#li"];

export default function TaggedTextarea({ value, onChange }: any) {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [lastSuggestionLine, setLastSuggestionLine] = useState<number | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    /** Handles typing events */
    const handleBeforeInput = (e: React.FormEvent<HTMLTextAreaElement> & { data: string }) => {
        const textarea = e.currentTarget;
        const inputValue = textarea.value;
        const cursorPos = textarea.selectionStart ?? 0;
        const data = e.data ?? "";

        // Rule 1: Beginning must start with '#'
        if (cursorPos === 0 && data !== "#") {
            e.preventDefault();
            return;
        }

        // Rule 2: Prevent typing right after '#'
        const textBeforeCursor = inputValue.substring(0, cursorPos);
        if (/#$/.test(textBeforeCursor) && data !== "") {
            e.preventDefault();
            return;
        }

        // 🚫 Prevent multiple tags in the same line
        const currentLineStart = inputValue.lastIndexOf("\n", cursorPos - 1) + 1;
        const currentLine = inputValue.substring(currentLineStart, cursorPos);
        const tagPattern = new RegExp(`(${TAGS.join("|")})[:]`, "g");
        const matches = currentLine.match(tagPattern);
        if (matches && matches.length > 0 && data === "#") {
            e.preventDefault();
            return;
        }
    };

    /** Handles key releases */
    const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const textarea = e.currentTarget;
        const pos = textarea.selectionStart;

        const textBeforeCursor = textarea.value.substring(0, pos);

        // Show dropdown only if last char is '#' and not already active
        if (textBeforeCursor.endsWith("#")) {
            setShowSuggestions(true);
            setLastSuggestionLine(getCurrentLineIndex(textarea.value, pos));
        } else {
            setShowSuggestions(false);
        }

        // Handle Enter key — only trigger once per new line
        if (e.key === "Enter") {
            const currentLine = getCurrentLineIndex(textarea.value, pos);
            if (currentLine !== lastSuggestionLine) {
                setShowSuggestions(true);
                setLastSuggestionLine(currentLine);
            }
        }
    };

    /** Get current line number from cursor position */
    const getCurrentLineIndex = (text: string, pos: number): number => {
        return text.substring(0, pos).split("\n").length - 1;
    };

    /** Insert selected tag */
    const insertTag = (tag: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart ?? 0;
        const end = textarea.selectionEnd ?? start;

        // Find start of current line
        const lineStart = value.lastIndexOf("\n", start - 1) + 1;

        const charBeforeCursor = start > 0 ? value[start - 1] : "";
        let before: string;
        if (charBeforeCursor === "#") {
            before = value.substring(0, start - 1);
        } else {
            before = value.substring(0, lineStart);
        }

        const after = value.substring(end);
        const newValue = before + tag + ": " + after;

        onChange(newValue);
        setShowSuggestions(false);

        setTimeout(() => {
            const pos = before.length + tag.length + 2;
            if (textarea) {
                textarea.selectionStart = textarea.selectionEnd = pos;
                textarea.focus();
            }
            const insertedLineIndex = before.split("\n").length - 1;
            setLastSuggestionLine(insertedLineIndex);
        }, 0);
    };

    /** ✨ Improved Paste Handler */
    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        let pasted = e.clipboardData.getData("text");

        // Split into lines and handle empty lines properly
        const formatted = pasted
            .split(/\r?\n/)
            .map((line) => {
                const trimmed = line.trim();

                // Preserve blank lines without adding a tag
                if (trimmed === "") return "";

                // If already has a tag, keep it clean
                const hasTag = TAGS.some((tag) => trimmed.startsWith(tag + ":"));
                if (hasTag) {
                    const clean = trimmed.replace(
                        new RegExp(`(?!^)(${TAGS.join("|")})[:]`, "g"),
                        ""
                    );
                    return clean;
                }

                // Otherwise, add a default tag
                return `${TAGS[0]}: ${trimmed}`;
            })
            // Join with \n but also remove consecutive blank lines at end
            .join("\n")
            .replace(/\n{3,}/g, "\n"); // collapse 3+ newlines into just 2

        onChange(formatted);
    };

    return (
        <div className="relative w-full mb-4">
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBeforeInput={handleBeforeInput}
                onKeyUp={handleKeyUp}
                onPaste={handlePaste}
                className="textarea textarea-bordered border-gray-400 dark:border-gray-600 w-full min-h-[200px]"
                placeholder="Start typing with # to insert a tag"
                rows={6}
            />

            {showSuggestions && (
                <ul
                    className="absolute left-2 top-14 w-48 z-50 rounded-lg shadow-lg overflow-hidden
               bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                >
                    {TAGS.map((tag) => (
                        <li
                            key={tag}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 
                 text-gray-900 dark:text-gray-100 font-medium transition-colors"
                            onMouseDown={() => insertTag(tag)}
                        >
                            {tag}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}