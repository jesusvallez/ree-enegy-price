<div id="top"></div>

<!-- https://github.com/othneildrew/Best-README-Template >
<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

# Ree Astro

Check the electricity price in Spain and its evolution over the last 24 hours. Updated and detailed information for consumers and businesses.

![ree-astro-screenshot](https://raw.githubusercontent.com/jesusvallez/ree-enegy-price/refs/heads/master/assets/screenshot.jpg)

## 🚀 Project Structure

Inside this Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── @types/
│   │   └── index.d.ts
│   ├── components/
│   │   ├── Footer.astro
│   │   ├── LightSchedule.astro
│   │   ├── SocialMedia.astro
│   │   └── icons/
│   │       ├── Github.astro
│   │       └── Linkedin.astro
│   ├── helpers/
│   │   ├── chart-generator.ts
│   │   ├── index.ts
│   │   └── table-generator.ts
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── .gitignore
├── astro.config.mjs
├── commitlint.config.mjs
├── eslint.config.mjs
├── prettier.config.mjs
├── tsconfig.json
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command        | Action                                       |
| :------------- | :------------------------------------------- |
| `pnpm install` | Installs dependencies                        |
| `pnpm dev`     | Starts local dev server at `localhost:4321`  |
| `pnpm build`   | Build your production site to `./dist/`      |
| `pnpm preview` | Preview your build locally, before deploying |

[contributors-shield]: https://img.shields.io/github/contributors/jesusvallez/ree-enegy-price.svg?style=for-the-badge
[contributors-url]: https://github.com/jesusvallez/ree-enegy-price/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/jesusvallez/ree-enegy-price.svg?style=for-the-badge
[forks-url]: https://github.com/jesusvallez/ree-enegy-price/network/members
[stars-shield]: https://img.shields.io/github/stars/jesusvallez/ree-enegy-price.svg?style=for-the-badge
[stars-url]: https://github.com/jesusvallez/ree-enegy-price/stargazers
[issues-shield]: https://img.shields.io/github/issues/jesusvallez/ree-enegy-price.svg?style=for-the-badge
[issues-url]: https://github.com/jesusvallez/ree-enegy-price/issues
[license-shield]: https://img.shields.io/github/license/jesusvallez/ree-enegy-price.svg?style=for-the-badge
[license-url]: https://github.com/jesusvallez/ree-enegy-price/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/jesusvallez
[product-screenshot]: images/screenshot.png
