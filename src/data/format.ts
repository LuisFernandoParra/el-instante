const dateFormatter = new Intl.DateTimeFormat('es-CO', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(`${isoDate}T00:00:00Z`));
}
