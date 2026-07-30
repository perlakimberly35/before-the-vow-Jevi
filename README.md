# Before the Vow, There Was You — Master Publishing Template v2.0

This is the production-ready source for the remaining bridesmaid keepsake volumes.

## What changed in v2.0

- The proven visual design and typography remain locked.
- The `assets` folder is already complete.
- The official seal and engagement photograph use fixed paths.
- `content.js` contains neutral placeholders rather than Chin or Yhan text.
- The publishing checklist now includes GitHub Desktop and GitHub Pages.
- Messenger's in-app browser may have a shorter display area. The keepsake is designed for a normal external browser; no typography reduction was applied.

## Edit only one file

Open **`content.js`** in VS Code.

Do not edit:

- `index.html`
- `styles.css`
- `script.js`
- filenames or paths inside `assets/`

## Required folder structure

```text
Before_the_Vow_Master_Publishing_Template_v2.0/
├── assets/
│   ├── engagement-final.jpg
│   └── final-wax-seal.png
├── content.js
├── index.html
├── script.js
├── styles.css
├── README.md
└── PUBLISHING-CHECKLIST.txt
```

## Standard publishing workflow

1. Keep this master folder untouched.
2. Duplicate the entire folder.
3. Rename the duplicate for the recipient.
4. Open the duplicate folder in VS Code.
5. Edit only `content.js`.
6. Open `index.html` locally and read every page.
7. Confirm the seal, engagement photo, acceptance button, names, page count, and colophon.
8. In GitHub Desktop, create a new repository using the recipient folder as the local path.
9. Do not initialize with a README.
10. Commit all files and publish the repository as public.
11. On GitHub: Settings → Pages → Deploy from a branch → `main` → `/(root)` → Save.
12. Open the GitHub Pages link in a normal external browser and perform the final check.

## Messenger note

Messenger's embedded browser can reduce the usable page height. When sharing the link, the recipient may open it in Chrome or Safari for the intended layout.
