# Yash Nirmal Portfolio

Static GitHub Pages portfolio based on the supplied Figma reference and populated with Yash Nirmal's cybersecurity, project, certification, experience, education, contact and blog content.

## Sections

- #home — hero, original ambition quote, selected projects and core toolkit
- #projects — complete project list; every project container links directly to GitHub
- #blog — engineering log for builds, failures, research, applications, participation and awards
- #about-me — profile, ambition, skills, experience and education
- #contacts — current public contact channels

## Blog model

Each entry contains:
1. Subject / title
2. Description
3. Attachments / resources (optional)

Entries are stored in data/portfolio-data.js.

## Frontend hardening

No private API keys, credentials or server-side secrets are shipped to the browser. Dynamic portfolio content is rendered through DOM APIs rather than unsanitized HTML templates.

Implemented controls include:
- strict Content Security Policy
- self-hosted JavaScript only
- restricted resource origins
- referrer policy
- safe external-link attributes
- URL protocol validation
- no client-side secrets
- reduced attack surface with no build runtime
- lightweight right-click / common-inspector shortcut deterrence

A static website cannot technically prevent a visitor from inspecting or retrieving assets that their browser must receive. The hardening therefore focuses on preventing accidental data exposure and reducing attack surface; it is not a substitute for server-side security.

## Deployment

Build-free GitHub Pages deployment. main and gh-pages are kept on the same publication commit.

## Profile image

The profile image is rendered from the supplied Google Drive file rather than stored as a repository image asset. No local portrait image is required in the public repository.

## CV

The previous repository CV has been removed from GitHub. The portfolio now points to the supplied Google Drive preview instead of hosting the PDF in the repository.

## Public links used in content
- Crest Data: https://www.crestdata.ai/
- RabbitCalls: https://www.rabbitcalls.com/
- StyleFusion: https://stylefusion.try-on.workers.dev/
- CCNA certificate: https://drive.google.com/file/d/1gCw9emIBOSXgJRGHXE68QbdsKtCvp5sZ/view?usp=sharing

The deployed portrait uses the supplied Google Drive image URL.