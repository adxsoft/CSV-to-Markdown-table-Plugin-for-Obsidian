# CSV-to-Markdown-table-Plugin-for-Obsidian V0.2

This is my first attempt at a CSV to Markdown table plugin for Obsidian. 


<i>Header 1,Header 2,Header 3

data1,data2,data3
</i>

converts to 

|Header 1|Header 2|Header 3|
|---|---|---|
|data1|data2|data3|

## Installation

- download the zip of this repository
- in .obsidian/plugins folder of your vault create a folder called csvtotable
- unzip the contents of this repository into the csvtotable folder
- - restart obsidian
- go to settings, Community plugins and enable 'CSV to Markdown Table' plugin

## How to use
- select a block of csv code
- cmd/control P and choose 'CSV to Markdown Table' command

Original CSV followed by the markdown table are pasted into the current note replacing the originl selection

## Limitations
- first line is assumed to be the header line
- no of csv fields in the first line deermines the number of columns
- csv fields in double quotes are not yet supported

## TODO
- add support for double quoted CSV fields

Feel free to re-use/enhance this plugin
