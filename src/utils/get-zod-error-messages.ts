type FormattedErrorField = string[] | { _errors?: string[] } | undefined;

export function getZodErrorMessages(
  error: Record<string, FormattedErrorField>,
): string[] {
  return Object.values(error)
    .map(field => {
      if (Array.isArray(field)) return field;
      return field?._errors || [];
    })
    .flat()
    .filter(Boolean);
}
