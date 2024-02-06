/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_WEB_URL || "https://aafiyah.vercel.app",
  generateRobotsTxt: true, // (optional)
  // ...other options
};
