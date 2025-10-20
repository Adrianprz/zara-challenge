export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) =>
  ((e.target as HTMLImageElement).src = "/error.svg");
