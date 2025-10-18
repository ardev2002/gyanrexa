export const inputValidator = (
    e: React.InputEvent<HTMLInputElement>,
    type?: "title" | "url"
) => {
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