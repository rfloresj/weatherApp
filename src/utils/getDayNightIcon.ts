export function getDayNightIcon(
  iconName: string,
  dateTimeString: string
): string {
  const hours = new Date(dateTimeString).getHours(); // Get hours form the given date and time string

  const isDayTime = hours >= 6 && hours < 18; // Consider daytime from 6 am to 6 pm

  return isDayTime ? iconName.replace(/.$/, "d") : iconName.replace(/.$/, "n");
}
