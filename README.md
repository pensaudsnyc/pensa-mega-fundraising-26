# PENSA UDS-NYC — Mega Fundraising ’26 (GitHub Pages)

A static, responsive campaign website built with HTML, CSS and JavaScript. It includes the campaign theme, scripture references, five-day schedule, countdown, GH₵50,000 target, official MTN MoMo instructions, click-to-copy number, and share button.

## Publish with GitHub Pages
1. Sign in at https://github.com and create a **public** repository named `pensa-mega-fundraising-26` (or another name you prefer).
2. Upload `index.html` and the `assets` folder. Keep the folder structure unchanged.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/(root)`, then click **Save**.
6. Wait for the Pages deployment to finish. Your site URL will resemble `https://YOUR-USERNAME.github.io/pensa-mega-fundraising-26/`.

Official GitHub guide: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## Before sharing publicly
- The logo in `assets/pensa-logo.png` was cropped from the official flyer; replace it with the original logo file if you have one.
- Confirm that the MoMo recipient name and number are correct and authorised for public display.
- Add official social links when available.
- The progress section intentionally does **not** show an invented amount raised. A static site cannot securely maintain a live total or an organiser-only dashboard.

## Static-site limitations
This version does not process online payments, securely store contribution records, or include an admin dashboard. Do not add private credentials, MoMo PINs, payment secrets, or contributor lists to this repository. A later secure dashboard requires a backend/database. GitHub Pages publishes the site's files publicly, even when certain repository privacy configurations are available.

## Updating the progress bar and pledge link
Edit only `assets/campaign.json`:
- `raised`: confirmed amount in GH₵ (numbers only, e.g. `12500`)
- `goal`: target in GH₵ (currently `50000`)
- `updated`: text shown as "Last updated", e.g. `"13 Oct 2026, 6:00 PM"`
- `pledgeForm`: the Google Form link. While empty, the pledge button and pledge FAQ stay hidden.

On GitHub: open the file, click the pencil icon, edit, then **Commit changes**. The site refreshes within a few minutes.

## Instrument images
The four images in `assets/instruments/` are illustrations. To use real photos, upload them to the same folder and change the file names in the `sound-section` of `index.html`.
