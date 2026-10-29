export const site = {
  name: "Technology Dashboard",
  description:
    "Interaktive, quellenbasierte Erklärungen moderner Technologien – von Blockchain bis Quantencomputing.",
  // TODO: auf das echte Repository zeigen lassen
  repoUrl: "https://github.com/OWNER/technology-dashboard",
};

export const issueUrl = (slug: string, title: string) =>
  `${site.repoUrl}/issues/new?template=fact-error.yml&title=${encodeURIComponent(
    `[Fachlich] ${title}: `,
  )}&labels=${encodeURIComponent(`fact-check,topic:${slug}`)}`;
