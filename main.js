"use strict";
// csvtotable plugin v0.2
// Convert the csv currently selected in the current note into a markdown table
// The original csv and the markdown table replace the selection in the current note
// Limitation - double quoted csv fields not yet supported
// 
// TODO
// csv-to-table Add ability to have strings which include commas ie. double quoted strings
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var obsidian_1 = require("obsidian");
var clipboard = require('electron').clipboard;
var adconverter = /** @class */ (function (_super) {
    __extends(adconverter, _super);
    function adconverter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    adconverter.prototype.onload = function () {
        var _this = this;
        console.log('loading ad-converter plugin v0.2');
        this.addCommand({
            id: 'csv-to-table',
            name: 'csv to table',
            callback: function () {
                console.log('csvtotable called');
            },
            checkCallback: function (checking) {
                var leaf = _this.app.workspace.activeLeaf;
                if (leaf) {
                    if (!checking) {
                        var activeView = _this.app.workspace.getActiveViewOfType(obsidian_1.MarkdownView);
                        if (!activeView) {
                            return;
                        }
                        var editor = activeView.sourceMode.cmEditor;
                        var cursor = editor.getCursor();
                        var selectedText = editor.getSelection();
                        var firstlinehasheading = true;
                        var outputText = _this.convertCSVtoTable(firstlinehasheading, selectedText);
                        editor.replaceSelection("***\nOUTPUT TABLE\n\n" + outputText + "***\nOriginal CSV\n" + selectedText + "\n\n***");
                    }
                    return true;
                }
                return false;
            }
        });
    }; // end onload
    adconverter.prototype.onunload = function () {
        console.log('unloading plugin');
    }; // end unload
    adconverter.prototype.convertCSVtoTable = function (firstlineisheading, csvdata) {
        // converts lines of csv data into Markdown 
        // assumes first line always dictates the number of columns
        var theLines = csvdata.split("\n");
        var theCells = [];
        var result = "";
        console.log(theLines);
        // number of columns is set as the number of cells in the first row
        var numberColumns = 0;
        if (theLines.length > 0) {
            theCells = theLines[0].split(",");
            numberColumns = theCells.length;
        }
        else {
            return "";
        }
        // convert csv lines to markdown format table lines
        for (var i = 0; i < theLines.length; i++) {
            // ignore empty lines
            if (theLines[i] == '') {
                continue;
            }
            // split the csv data in the line into individual cells
            theCells = theLines[i].split(",");
            if (i == 0 && firstlineisheading == true) {
                // insert heading row
                for (var c = 0; c < numberColumns; c++) {
                    result += "|" + theCells[c];
                }
                result += "|\n";
                // insert table cell format line
                for (var c = 0; c < numberColumns; c++) {
                    result += "|---";
                }
                result += "|\n";
            }
            else {
                // format csv line with data
                for (var c = 0; c < numberColumns; c++) {
                    if (theCells[c] === undefined) {
                        result += "|" + "-";
                    }
                    else {
                        if (theCells[c].length < 1) {
                            result += "|" + "-";
                        }
                        else {
                            result += "|" + theCells[c];
                        }
                    }
                }
                result += "|\n";
            }
        }
        return result;
    }; // end convertCSVtoTable
    return adconverter;
}(obsidian_1.Plugin));
exports["default"] = adconverter;
