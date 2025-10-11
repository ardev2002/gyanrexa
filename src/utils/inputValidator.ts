export const textareaValidator = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const cursorPos = textarea.selectionStart;
    const value = textarea.value;

    // Find start and end of current line
    const lastNewlineIndex = value.lastIndexOf("\n", cursorPos - 1);
    const nextNewlineIndex = value.indexOf("\n", cursorPos);
    const lineStart = lastNewlineIndex + 1;
    const lineEnd = nextNewlineIndex === -1 ? value.length : nextNewlineIndex;

    const currentLine = value.substring(lineStart, lineEnd);

    // Allow navigation keys
    if (
        ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab"].includes(
            e.key
        )
    ) return;

    const isAtLineStart = cursorPos === lineStart;

    if (isAtLineStart) {
        // At start of line, only '#' allowed
        if (e.key !== "#") {
            e.preventDefault();
        }
    }

    if (e.key === "#") {
        if (!isAtLineStart) {
            // Only allow '#' at start of line
            e.preventDefault();
            return;
        }

        // If a tag already exists in the line, block another '#'
        if (currentLine.includes("#para") || currentLine.includes("#lh") || currentLine.includes("#li")) {
            e.preventDefault();
            return;
        }
    }

    // Other keys are allowed normally
};

export const inputValidator = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type?: "title" | "url"
) => {
    const titleRegex = /^[a-zA-Z0-9\- ]$/;
    const urlRegex = /^[a-zA-Z0-9\-]$/;

    const allowedKeys = [
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Backspace",
        "Delete",
        "Tab",
        "Enter",
        "Home",
        "End",
        "Escape",
    ];

    if (allowedKeys.includes(e.key)) return;

    if (e.currentTarget.selectionStart === 0 && e.key === " ") {
        e.preventDefault();
        return;
    }

    if (type === "title" && !titleRegex.test(e.key)) {
        e.preventDefault();
    } else if (type === "url" && !urlRegex.test(e.key)) {
        e.preventDefault();
    }
};