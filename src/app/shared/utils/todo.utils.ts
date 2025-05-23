const timeSettings = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
};

export function getFormattedValue(date: string) {
  return new Date(date).toLocaleString('en-US', timeSettings as any);
}
