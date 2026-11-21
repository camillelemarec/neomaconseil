export function formatSignedAt(date: Date): string {
  const datePart = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Paris",
  }).format(date);
  const timePart = new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "Europe/Paris",
  }).format(date);
  const capitalized = datePart.charAt(0).toUpperCase() + datePart.slice(1);

  return `${capitalized} à ${timePart} (heure de Paris)`;
}
