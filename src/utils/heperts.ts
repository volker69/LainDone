
export const  getCurrentDateTime = (): string =>{
  const now = new Date();

  const pad = (n: number) => n.toString().padStart(2, '0');
  const padMs = (n: number) => n.toString().padStart(3, '0');

  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());
  const milliseconds = padMs(now.getMilliseconds());

  const timezoneOffset = -now.getTimezoneOffset(); // en minutos
  const sign = timezoneOffset >= 0 ? '+' : '-';
  const offsetHours = pad(Math.floor(Math.abs(timezoneOffset) / 60));
  const offsetMinutes = pad(Math.abs(timezoneOffset) % 60);

  const timezone = `${sign}${offsetHours}${offsetMinutes}`;

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds} ${timezone}`;
}
