export function secondsToFormattedTime(seconds: number) {
  const minutes = String(Math.floor(seconds / 60) % 60);
  const hour = Math.floor(seconds / 3600);
  const formattedHours = hour > 0 ? `${hour}:` : ''; 
  const formattedMinutes = minutes.length < 2?  minutes.padStart(2, '0') : minutes;
  const formattedSeconds = String(seconds % 60).padStart(2, '0');

  return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
}