export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return timestamp;
  }

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) {
    return `${diffSec} seconds ago`;
  }
  if (diffMin < 60) {
    return `${diffMin} minutes ago`;
  }
  if (diffHour < 24) {
    return `${diffHour} hours ago`;
  }
  if (diffDay < 7) {
    return `${diffDay} days ago`;
  }
  return date.toLocaleString();
};
