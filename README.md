# obsidian-zola

![](https://img.shields.io/github/v/release/ppeetteerrs/obsidian-zola)
![](https://img.shields.io/github/issues-closed-raw/ppeetteerrs/obsidian-zola)
![](https://img.shields.io/badge/dynamic/json?color=blueviolet&label=today%27s%20views&query=%24.datasets%5B1%5D.values%5B%28%40.length-1%29%5D&url=https%3A%2F%2Fyhype.me%2Fapi%2Fchart%2Frepository_views_count_chart_controller%3FrepositoryNodeId%3DR_kgDOGpHp4A)

A free (but better?) alternative to Obsidian Publish.

> This repo contains an easy-to-use (read: simplistic) solution for converting an Obsidian Personal Knowledge Management System (read: bunch of random Markdowns) into a Zola site.

Credits: This repo was forked from [Adidoks](https://github.com/aaranxu/adidoks).
Special Thanks: Wikilink parsing is powered by [obsidian-export](https://github.com/zoni/obsidian-export).

# Announcements
**v1.2.0 More Features! 🥳**

Bug Fixes:

- Added the ability to deal with empty links (re-directed to 404 page)
- Added the ability to deal with special characters in filenames
- Added the ability to cope with overlapping name between sections and pages (so now u can have both `repeated/` and `repeated.md` in the same directory)

Improvements:

- Ability to configure tab-opening behaviour when clicking on graph node (same / new tab)
- Ability to configure line break parsing (strict vs Obsidian-style)
- Ability to configure graph display preference, you can now choose to display only directly connected nodes!


**v1.1.0 Thanks for the support and Feedback 💓**

I never expected to receive such attention from my Reddit post. Thank you for supporting this project! I have heard your feedback and made some minor but urgent improvements. I will continue to implement the rest of the crucial requests over the next few days!
- Subsections / subfolders are now supported up to 3 levels! And you can choose a cute symbol / emoji / HTML code to represent a subsection on your sidebar!
- All page and section titles (i.e. file / folder names) can now contain HTML code. Not sure what's the use case but why not :)


**v1.0.0 Big Release**
- Graph view is now supported! I assume this is a highly sought-after feature, hence it would be turned on by default 🙂.
- URLs are now slugified by deafult (to adhere to best practices)! This will change the links to some pages. For those who wish to keep your shared links valid, please disable slugify in `netlify.toml`. Sorry for the inconvenience 🙇.
- Shameless promotion 😳. Sorry for adding a `Powered by obsidian-zola` line on your home page. But I believe most people who use this repo think that it should be made known to those who need it. I don't make any 💰 from this anyways.
- Markdown link parsing bug fixes.
- Major refactoring. Everything is typed and commented and properly wrapped in classes. It should be much more maintainable and forkable now 🍴.
- Local development setup (on WSL) is provided. Just provide a `.data_path` that points to your Obsidian folder, install the dependencies and run `./local-run.sh`.


# Setup

**Step 1: Setup Netlify**
- Turn your Obsidian vault folder into a Git repository
- Create a Netlify site pointing to that Git repository

**Step 2: Edit `netlify.toml`**
- Create `netlify.toml` in your Obsidian vault folder
- Copy the content from `netlify.example.toml` in this repo and replace the appropriate settings (`SITE_URL`, `REPO_URL` and `LANDING_PAGE` cannot be left empty). 

**Step 3: You're Done 🎉!**
- Push your changes and get ready to become famous!
- Be Fancy: All text field settings in `netlify.toml` (e.g. `LANDING_TITLE`) supports HTML syntax. And I added `Animate.css` + `Hover.css` + `CSShake` for those of you who want to add a personal touch~ 

**Step 4: Issues & Feature Requests**
- If you encounter any issues, first refer to [Config+FAQ](https://github.com/ppeetteerrs/obsidian-zola/blob/main/CONFIG.md). If still unsolved, just post in the `Issues` tab. It would be good to include a copy of the error log found in the Netlify panel if the issue is related to deployment.
- If you have any feature request, do post an issue also. However, please this repo is intended as a one-file setup. Advanced features / detailed configurability will not be supported unless it is wanted by most users. However, I can provide help for you to implement a fork that suits your needs 🥂.

# Example Site

> Do not copy `netlify.toml` from example site, it is unstable. Please reference from `netlify.example.toml`.

The [example site](https://peteryuen.netlify.app/) shows the capabilities of `obsidian-zola`. Note that the example site uses the `dev` branch of `obsidian-zola`. If you see features that are available in the example site but are not available in the main branch yet, consider trying out the `dev` (unstable) branch. Exact method can be referenced from the [example repo's](https://github.com/ppeetteerrs/obsidian-pkm) `netlify.toml`.

# Features 

**Disclaimer**

> This tool is made for people who use Obsidian as a simple and efficient note-taking app (or PKM). If you configured your Obsidian with plenty of fancy shortcodes, plugins and Obsidian-specific syntax, this tool would not (and does not intend) to support those features.

**Supported**
- Knowledge graph (you can also treat it as backlinks)
- LaTEX (powered by `KaTEX`, bye MathJAX fans 👋)
- Partial string search (powered by `elasticlunr`)
- Syntax highlighting + Fira Code!
- Customizable animations
- Navigation
- Table of content
- Typical Markdown syntax
- Strikethroughs
- Tables
- Single-line footnotes (i.e. `[^1]` in the paragraph and `[^1]: xxx` later)
- Checkboxes
- Link escaping pattern: `[Slides Demo](<Slides Demo>)`

**Unsupported**

- Non-image / note embeds (e.g. videos, audio, PDF). They will be turned into links.
- Image resizing
- Highlighting text
- Comments
- Inline / Multi-line footnotes
- Mermaid Diagrams

# Gotchas
1. Do not have files with name `index.md` or `_index.md`
2. ~~Do not have files that have the same name as its subfolder (e.g. having both `.../category1.md` and `.../category1/xxx.md` is not allowed)~~ (Fixed)
3. `LANDING_PAGE` needs to be set to the slugified file name if `SLUGIFY` is turned on (e.g. to use `I am Home.md`, `LANDING_PAGE` needs to be `i-am-home`)

# WIPs / Ideas
- (Probably will do) Backlinks / Mentioned in
- (Maybe) Lottie animations?
