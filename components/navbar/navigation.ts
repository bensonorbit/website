const homeLink = { href: "/", label: "Home" };
const aboutLink = { href: "/about", label: "About" };
const archiveLink = { href: "/archive", label: "Archive" };

export const sectionLinks = [
  { href: "/news", label: "News" },
  { href: "/sports", label: "Sports" },
  { href: "/culture", label: "Culture" },
  { href: "/opinion", label: "Opinion" },
];

export const utilityLinks = [archiveLink, aboutLink];

export const mobileLinkGroups = [
  [homeLink, aboutLink, archiveLink],
  sectionLinks,
];
