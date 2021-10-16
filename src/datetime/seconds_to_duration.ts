const leftPad = (num: number) => (num < 10 ? `0${num}` : num);

export function secondsToDuration(duration: number) {
  if (duration < 1) return null;
  let adjDuration = duration;
  const d = Math.floor(adjDuration / 86400);
  adjDuration -= d*86400;
  const h = Math.floor(adjDuration / 3600);
  adjDuration -= h*3600;
  const m = Math.floor(adjDuration / 60);
  adjDuration -= m*60;
  const s = Math.floor(adjDuration);

  // Constructing string from seconds upwards
  let string = "" + leftPad(s);
  if (duration >= 60) {
    string = `${leftPad(m)}:` + string
    if (duration >= 3600) {
      string = `${leftPad(h)}:` + string
      if (duration >= 86400) {
        string = `${leftPad(d)}:` + string
      }
    }
  }
  return string;
}
