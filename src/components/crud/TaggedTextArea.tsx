"use client";
import { textareaValidator } from "@/utils/inputValidator";
import React, { useState, useRef } from "react";

const TAGS = ["#para", "#lh", "#li"];

export default function TaggedTextarea({ value, onChange }: any) {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [cursorPosition, setCursorPosition] = useState(0);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const textarea = e.currentTarget;
        const pos = textarea.selectionStart;
        setCursorPosition(pos);

        const textBeforeCursor = textarea.value.substring(0, pos);
        if (textBeforeCursor.endsWith("#")) {
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const insertTag = (tag: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newText = value.substring(0, start - 1) + tag + value.substring(end);
        onChange(newText);
        setShowSuggestions(false);
        setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start - 1 + tag.length;
            textarea.focus();
        }, 0);
    };

    return (
        <div className="relative w-full mb-4">
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => textareaValidator(e)}
                onKeyUp={handleKeyUp}
                className="textarea textarea-bordered w-full min-h-[200px]"
                placeholder="Type here... use # to insert tags"
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
                            onMouseDown={() => insertTag(tag + ":")}
                        >
                            {tag}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}