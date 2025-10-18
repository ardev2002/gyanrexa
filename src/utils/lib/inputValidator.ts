export const textareaValidator = (e: React.InputEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const value = textarea.value;
    const lines = value.split("\n");

    // Process each line individually
    const sanitizedLines = lines.map((line) => {
        // Trim spaces at line start
        const trimmed = line.trimStart();

        // If line starts with '#', allow only known tags
        if (trimmed.startsWith("#")) {
            // Allow only these tags
            const validTags = ["#para", "#lh", "#li"];
            const matchedTag = validTags.find(tag => trimmed.startsWith(tag));

            if (!matchedTag) {
                // If invalid tag — remove the #
                return trimmed.replace(/^#/, "");
            }

            // Keep tag as-is, but remove invalid extra #
            return trimmed.replace(/(#[a-zA-Z]+)#*/g, "$1");
        }

        // Otherwise, no restriction for normal text lines
        return trimmed;
    });

    // Join lines back
    textarea.value = sanitizedLines.join("\n");
};

export const inputValidator = (
    e: React.InputEvent<HTMLInputElement>,
    type?: "title" | "url"
) => {
    console.log(e.currentTarget.selectionStart, e.currentTarget.selectionEnd)
    const typedValue = e.data!;
    const titleRegex = /^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]$/;
    const urlRegex = /^[a-zA-Z0-9\-]$/;
    if (e.currentTarget.selectionStart == 0 && e.data == ' ') {
        e.preventDefault();
        return;
    }

    if (type === 'title' && e.data === ' ') {
        const value = e.currentTarget.value;
        const cursorPos = e.currentTarget.selectionStart ?? value.length;
        const prevChar = value[cursorPos - 1];

        if (prevChar === ' ') {
            e.preventDefault();
            return;
        }
    }

    const regexForCheck = type === 'title' ? titleRegex : urlRegex;
    if (!regexForCheck.test(typedValue)) e.preventDefault();
};