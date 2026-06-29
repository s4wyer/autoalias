const getRootDomain = (hostname) => {
  const parts = hostname.split(".");
  if (parts.length <= 2) return hostname;

  const secondToLast = parts[parts.length - 2];
  const specialSLDs = ["co", "com", "org", "net", "edu", "gov", "ac", "mil"];

  if (specialSLDs.includes(secondToLast)) {
    return parts.slice(-3).join(".");
  }

  return parts.slice(-2).join(".");
};
