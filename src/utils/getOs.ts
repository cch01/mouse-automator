export const getOs = () => {
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"];
  const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
  const iosPlatforms = ["iPhone", "iPad", "iPod"];
  let os: "MacOS" | "iOS" | "Windows" | "Android" | "Linux" | undefined;

  if (macosPlatforms.includes(platform)) {
    os = "MacOS";
  } else if (iosPlatforms.includes(platform)) {
    os = "iOS";
  } else if (windowsPlatforms.includes(platform)) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (/Linux/.test(platform)) {
    os = "Linux";
  }

  return os;
};
