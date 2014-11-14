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

## GridHub File Format (`.grid`)

Each `.shync` file is essentially a zipped folder with the following contents and structure (the below assumed a file called `workbook.grid` which has been renamed `workbook.zip` and unzipped and then held temporary as a hidden folder in the file system called `.workbook`):

```
├── .workbook/
│   ├── csv/
|   │   ├── sheet1/
|   │   │   ├── formulas.csv # stores all formulas
│   |   │   ├── values.csv   # stores all values (but not calculated values of formulas)
│   |   │   ├── styles.json  # stores the styling of each cell as an object in an array
|   │   ├── sheet2/
|   |   |   ├── ...
│   │   ├── config.json      # holds the name of sheets, i.e. maps "Income Statement" to "sheet1"
│   ├── .git/                # git version control history
```

In this case `.git` would just be the normal git directory structure as you would see in the repository for a code base using git for version control.

## Programmatic Git Workflow

GridHub uses a single-branch git versioning strategy applied to the `csv` folder. TODO: breakdown of user buttons as they relate to specific git commands.

## Workbook Class API
`new Workbook(<dataObj>,<options>);`

```
workbook API, takes two or no inputs. If passing inputs adhere to:
  if csv: 
    options = {csv: true}
    dataObj = [array of arrays of simple values]
    
  if xlsx:
    options = {xslx: true}
    dataObj = {  1: {
                     sheetName: "<sheetName>",
                     data: [array of arrays of objects]
                    },
                 2: {
                      sheetName: "<sheetName",
                      data: [array of arrays of objects]
                     }
                }
  if .grid:
    options = {grid:true}
    dataObj = {  1: {
                      values: [array of arrays of simple values],
                      formulas: [array of arrays of formula strings],
                      styles: [array of arrays of objects]
                    },
                 2: {
                      values: [array of arrays of simple values],
                      formulas: [array of arrays of formula strings],
                      styles: [array of arrays of objects]
                    },
                 meta: {
                         1: <sheetName>,
                         2: <sheetName>
                        }
               }
```
