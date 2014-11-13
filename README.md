# GridHub [![Build Status](https://travis-ci.org/decisive-wizard/GridHub.svg?branch=master)](https://travis-ci.org/decisive-wizard/GridHub)

> Collaborative spreadsheet editing tool for the desktop.

## Team

  - __Product Owner__: [John Heroy](https://github.com/johnheroy)
  - __Scrum Master__: [Nick Stefan](https://github.com/nickstefan)
  - __Development Team Members__: [Felipe Batista](https://github.com/fsbatista), [Greg Fedirko](https://github.com/doublelift)

## Installation

```
git clone https://github.com/decisive-wizard/GridHub.git
cd GridHub
bower install
npm install
nw .
```

### Note on installing node-webkit

First try downloading the binary executable for your operating system [here](https://github.com/rogerwang/node-webkit). Then set up an alias `nw` like this for your `~/.bash_profile` or `~/.zshrc` so you can just run `nw` for local testing:

```
alias nw='/Applications/node-webkit.app/Contents/MacOS/node-webkit'
```

## GridHub File Format (`.shync`)

Each `.shync` file is essentially a zipped folder with the following contents and structure (the below assumed a file called `sheet.shync` which has been renamed `sheet.zip` and unzipped):

```
├── sheet/
│   ├── csv/
│   │   ├── values.csv
│   │   ├── formulas.csv
│   │   ├── styles.csv
│   ├── .git/
```

In this case `.git` would just be the normal git directory structure as you would see in the repository for a code base using git for version control.

## Programmatic Git Workflow

GridHub uses a single-branch git versioning strategy applied to the `csv` folder. TODO: breakdown of user buttons as they relate to specific git commands.
