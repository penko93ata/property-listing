export function getErrorMessages() {
  return {
    required: "Field is required",
    min: (minLength: number) => `Field must be at least ${minLength} characters long`,
  };
}
