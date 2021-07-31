# CSV-to-Markdown-table-Plugin-for-Obsidian V0.3

This is my first attempt at a CSV to Markdown table plugin for Obsidian. 

Its set to operate on Desktop only as I'm not sure yet about how the clipboard functions will work on mobile.
V0.3 has added the abillity to parsed quoted csv fields that may contain commas.
<i>Thanks to Peter Thoeny at https://github.com/peterthoeny/parse-csv-js</i>

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

Both the original CSV followed by the markdown table is pasted into the current note replacing the original selection

## Limitations
- first line is assumed to be the header line
- no of csv fields in the first line deermines the number of columns
- csv fields in double quotes are not yet supported

## TODO
- test on mobile
- DONE. add support for double quoted CSV fields

Feel free to re-use/enhance this plugin. The source code for the plugin is main.ts
