# 📝 SynciNote – Local-First Markdown Editor

SynciNote is a blazing-fast, privacy-focused note-taking app built with [TanStack Start](https://tanstack.com/start), and React. It stores all your notes locally in markdown files and gives you full control over your data. Now with AI (Gemini)

## ⚡ Features

* Folder-based note organization

* Local-first: works completely offline

* Notes saved as `.md` files

* Markdown editor with live preview

* Optional sync (in-work) /export to local filesystem

* SQLite for data storage

* Use Ai to help you write

## 📁 Project Structure

<br />

*/src*

*/Components # UI components*

*/utils # Data fetching and file operations*

*/pages # App routes*

*/data # Directory where notes are stored. (Not readable, export to read)*

<br />

## 🚀 Getting Started

<br />

* Paste the following line by line in the terminal

<br />

```
git clone https://github.com/VOTMAN/Syncinote.git
cd Syncinote
npm install
npm run dev
```

### .env

In order to use the Ask Ai feature. You need to add your own gemini ai key

```
VITE_GEMINI_API_KEY="your_api_ley"
```

<br />

## 📦 Technologies Used


* [TanStack Start](https://tanstack.com/start)
* React
* Milkdown for rich Markdown editing
* TypeScript
* SQLite

## 🧠 Contributing


Feel free to open issues or submit pull requests to improve this app. Feedback is always welcome!

##

