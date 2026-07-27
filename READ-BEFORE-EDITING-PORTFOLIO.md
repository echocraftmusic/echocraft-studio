# READ THIS BEFORE EDITING THE PORTFOLIO

## Important: Do not break the live portfolio links

Echo Craft Studio uses a **dynamic portfolio showcase system**. The main portfolio content is loaded through:

```text
/portfolio/showcase.html?id=PROJECT-ID
```

Examples:

```text
/portfolio/showcase.html?id=pizzeria
/portfolio/showcase.html?id=barbershop
/portfolio/showcase.html?id=chiropractor
```

The files inside the `/portfolio/` folder—such as `pizzeria.html`, `barbershop.html`, and `chiropractor.html`—are **backward-compatible redirect pages**. They protect old bookmarks, shared links, search results, and existing buttons from returning a 404 error.

## Never do the following

1. **Do not delete the existing files inside `/portfolio/`.**
2. **Do not replace the entire `/portfolio/` folder with a partial folder.**
3. **Do not rename a portfolio file or project ID unless every matching link and data entry is updated at the same time.**
4. **Do not upload only the files you changed if the upload process will remove files that are not included.**
5. **Do not change portfolio links back to direct pages unless those pages actually exist.**

Deleting or omitting one of the redirect pages can cause links such as this to fail:

```text
https://echocraft.studio/portfolio/pizzeria.html
```

## Correct way to add or edit a portfolio project

### Editing an existing project

- Keep the existing project ID unchanged.
- Edit the project information in the portfolio data or showcase system.
- Confirm that the corresponding redirect file remains in `/portfolio/`.
- Test both URLs:

```text
/portfolio/showcase.html?id=PROJECT-ID
/portfolio/PROJECT-ID.html
```

Both should open the same project.

### Adding a new project

1. Add the new project data using a simple lowercase project ID with no spaces.
2. Link the project card to:

```text
portfolio/showcase.html?id=NEW-PROJECT-ID
```

3. Create a matching redirect page at:

```text
portfolio/NEW-PROJECT-ID.html
```

4. Copy the structure of one of the existing redirect files and change only the project ID.
5. Test the homepage card, the dynamic showcase URL, and the direct redirect URL before publishing.

## Safe publishing procedure

Before uploading an update:

1. Start with the **latest complete working copy** of the repository.
2. Make the requested changes inside that complete copy.
3. Do not remove unrelated pages, scripts, styles, images, or portfolio files.
4. Check every portfolio link on desktop and mobile.
5. Confirm that no project opens the custom 404 page.
6. Upload the complete verified site or merge only the intended files without deleting the others.

## Required portfolio link test

Check these direct URLs after every portfolio update:

```text
/portfolio/pizzeria.html
/portfolio/barbershop.html
/portfolio/chiropractor.html
/portfolio/insurance.html
/portfolio/mentalhealth.html
/portfolio/treeservice.html
/portfolio/bridge.html
/portfolio/cinematicconcept.html
/portfolio/podcast-intro.html
/portfolio/podcast-production.html
```

Also test the portfolio buttons on the homepage and portfolio pages.

## Rule to remember

> Never repair one section by replacing a folder with an incomplete version. Always preserve the full working site, its existing routes, and its redirect protection.

If a portfolio page appears missing, first check the project ID, the showcase link, and the matching redirect file before changing anything else.
