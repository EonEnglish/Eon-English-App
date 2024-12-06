# Eon-English-App

[![App-Store][appStore-shield]][appStore-url]
[![Play-Store][playStore-shield]][playStore-url]
[![Contributors][contributors-shield]][contributors-url]
[![Discord-Server][discord-shield]][discord-url]

<div style="display: flex;">
  <img src="https://github.com/user-attachments/assets/b91e63a7-fd5c-4f80-aa98-4e39f3b23a4c">
</div>

<br />
<br />

<!-- shortcuts -->

## Table of Contents

- [ About The Project](#about-the-project)
  - [ Built with](#built-with)
  - [ Resources](#resources)
- [ How to Run the App](#how-to-run-the-app)
  - [ Accessing .env keys](#env-keys)
- [ How to Contribute](#how-to-contribute)

<br>

## About The Project

This app will help Eon students find their homework and apply what they have learned during tutor sessions. It is filled with many short questions and quizzes to help them retain information.

<br>

### Built With

- ![Static Badge](https://img.shields.io/badge/JavaScript-%23212329?style=for-the-badge&logo=JavaScript)
- ![Static Badge](https://img.shields.io/badge/HTML-%23212329?style=for-the-badge&logo=HTML5)
- ![Static Badge](https://img.shields.io/badge/CSS-%23212329?style=for-the-badge&logo=CSS3)
- ![Static Badge](https://img.shields.io/badge/React_Native-%23212329?style=for-the-badge&logo=React)

<br>

### Resources

The project uses React Native. Therefore, we recommend building foundational knowledge. The materials we provide are optional, and you may learn with whatever strategy you prefer. Otherwise, we suggest taking this course _(complete at least 25%)_

- [Codeacademy's React Native](https://www.codecademy.com/learn/learn-react-native)

In addition, we recommend using Microsoft's Visual Studio Code editor with some handy plug-ins

- [Visual Studio Code](https://code.visualstudio.com)
  - [Emulator Plug-in](https://marketplace.visualstudio.com/items?itemName=DiemasMichiels.emulate)
  - [Prettier Plug-in](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

<br>

## How to Run the App

[<img src="https://github.com/STEM-E-Youth-Career-Development-Program/app-7/assets/154091778/590c3ffd-efed-49af-a959-78042868db41">](https://youtu.be/nBq75f8JVZg)
[Not working? Use this link](https://youtu.be/nBq75f8JVZg)

How to init secrets:
For first time run this command to init sub-repository

```bash
git submodule update --init --recursive
```

For every time to pull new secrets to update sub-repository

```bash
git submodule update --remote --recursive
```

<br>

### ENV Keys

Run submodule command to retrieve the .env keys (requires repository access)

```
git submodule update --remote --recursive
```

[Not working? Find the secret keys here...](https://github.com/EonEnglish/Eon-English-App-Secrets)

<br>

## How to Contribute

Contributions are what make this community such an amazing place to learn, inspire, and create! There are a many ways you can help

- [Did you spot any errors?](https://github.com/EonEnglish/Eon-English-App/issues/new)
- [What features could we add?](https://github.com/EonEnglish/Eon-English-App/issues/new)
- [What would improve the app?](https://github.com/EonEnglish/Eon-English-App/issues/new)
- [How can we work better as a team?](https://github.com/EonEnglish/Eon-English-App/issues/new)

Any contributions you make are **greatly appreciated**!

<!-- Links -->

[contributors-shield]: https://img.shields.io/github/contributors/EonEnglish/Eon-English-App?style=for-the-badge&logo=github&logoColor=white&labelColor=black&color=6e5494&label=contributors
[contributors-url]: https://github.com/EonEnglish/Eon-English-App/graphs/contributors
[discord-shield]: https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fdiscord.com%2Fapi%2Finvites%2FgwV356qNSj%3Fwith_counts%3Dtrue&query=%24.approximate_member_count&style=for-the-badge&logo=Discord&logoColor=white&labelColor=black&label=Discord%20Members&color=%235864f4
[discord-url]: https://discord.gg/gwV356qNSj
[appStore-shield]: https://img.shields.io/badge/download-app%20store-%23007AFF?style=for-the-badge&logo=apple&logoColor=white&labelColor=black
[appStore-url]: https://apps.apple.com/us/app/eon-english-learning/id6535652983
[playStore-shield]: https://img.shields.io/badge/download-play%20store-%2334A853?style=for-the-badge&logo=android&logoColor=white&labelColor=black
[playStore-url]: https://play.google.com/store/apps/details?id=com.eonenglish.eonEnglishLearning&pli=1
