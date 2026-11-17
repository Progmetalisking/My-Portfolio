# 🌟 Minimalist Developer Portfolio

A clean, modern, responsive developer portfolio with **zero extra installation required**.

---

## ⚡ How to Run It (2 Easy Ways)

### Method 1: Instant Preview (No Terminal Needed!)
1. Open your File Explorer.
2. Go to: `c:\Users\shank\OneDrive\Desktop\C stuff\portfolio`
3. **Double-click `index.html`** to open it immediately in Chrome or your default browser!

---

### Method 2: Run with Node.js in Git Bash
1. In VS Code, open the terminal (`Ctrl + \``) and select **Git Bash**.
2. Run:
```bash
cd portfolio
node server.js
```
3. Open your browser and go to: **http://localhost:3000**
*(To stop the server, press `Ctrl + C` in the terminal).*

---

## 🎨 How to Customize

All files contain clear `<!-- EDIT: ... -->` comments:
- **Texts, Projects, & Bio**: Open [index.html](file:///c:/Users/shank/OneDrive/Desktop/C%20stuff/portfolio/index.html) and search for `[Your Name]` or `EDIT:`.
- **Colors & Spacing**: Open [style.css](file:///c:/Users/shank/OneDrive/Desktop/C%20stuff/portfolio/public/css/style.css) and edit the `--bg-main` or `--accent` variables under `:root`.
- **Email Copy Button**: Search for `your.email@example.com` in [index.html](file:///c:/Users/shank/OneDrive/Desktop/C%20stuff/portfolio/index.html) and replace it with your real email.

---

## 📤 Push to GitHub

When you're ready to share your portfolio:
1. Go to [github.com/new](https://github.com/new) and create a repository named `portfolio`.
2. In Git Bash, run:
```bash
cd portfolio
git init
git add .
git commit -m "First commit: developer portfolio"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/portfolio.git
git push -u origin main
```
