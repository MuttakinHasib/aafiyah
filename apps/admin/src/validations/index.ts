export * from "./product";

export function preventNonNumeric(
  e: React.KeyboardEvent<HTMLTextAreaElement & HTMLInputElement>
) {
  const key = e.key;
  console.log("🚀 ~ key:", key);
  if (
    isNaN(parseInt(key, 10)) &&
    ![
      "Backspace",
      "Enter",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
    ].includes(key)
  ) {
    e.preventDefault();
  }
}
