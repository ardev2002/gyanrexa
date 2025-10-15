export default function extractDescription(text: string): string {
  // 1. Remove unwanted markers (#para:, #path:, etc.)
  const cleaned = text.replace(/#\w+:\s*/g, "").trim();

  // 2. Split into sentences by full stop OR newline
  //    - The regex looks for either ". " OR "\n"
  const sentences = cleaned
    .split(/\. |\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  // 3. Join the first two sentences (if available)
  const result = sentences.slice(0, 2).join(". ");

  // 4. Ensure it ends with a full stop
  return result.endsWith(".") ? result : result + ".";
}
