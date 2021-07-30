// csvtotable plugin v0.2
// Convert the csv currently selected in the current note into a markdown table
// The original csv and the markdown table replace the selection in the current note
// Limitation - double quoted csv fields not yet supported
// 
// TODO
// csv-to-table Add ability to have strings which include commas ie. double quoted strings

import { App, Modal, Notice, Plugin, PluginSettingTab, Setting, MarkdownView, MarkdownPreviewView } from 'obsidian';
const { clipboard } = require('electron')
import fs = require('fs');

export default class adconverter extends Plugin {
	onload() {
		console.log('loading ad-converter plugin v0.2');

        this.addCommand({
			id: 'csv-to-table',
			name: 'csv to table',
			callback: () => {
				console.log('csvtotable called');
			},
			checkCallback: (checking: boolean) => {
				var leaf = this.app.workspace.activeLeaf;
				if (leaf) {
					if (!checking) {
						const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
    					if (!activeView) {
      						return;
    					}
    					const editor = activeView.sourceMode.cmEditor;
    					const cursor = editor.getCursor();
    					var selectedText = editor.getSelection();
    					
						const firstlinehasheading = true;
						var outputText = this.convertCSVtoTable(firstlinehasheading,selectedText);

						editor.replaceSelection("***\nOUTPUT TABLE\n\n"+outputText+"***\nOriginal CSV\n"+selectedText+"\n\n***");
					}
					return true;
				}
				return false;
			}
		});
	
    } // end onload

	onunload() {
		console.log('unloading plugin');
	} // end unload


	convertCSVtoTable(firstlineisheading: boolean,csvdata:string) {
        // converts lines of csv data into Markdown 
        // assumes first line always dictates the number of columns
        
        const theLines = csvdata.split("\n");
        var theCells = [];
        var result = "";
        console.log(theLines);
        
        // number of columns is set as the number of cells in the first row
        var numberColumns = 0;
        if (theLines.length>0) {
            theCells = theLines[0].split(",");
            numberColumns = theCells.length;
        } else {
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
            
            
            if (i==0 && firstlineisheading == true) {

                // insert heading row
                for (var c=0; c<numberColumns; c++) {
                    result += "|"+theCells[c];
                }
                result+="|\n";
                
                // insert table cell format line
                for (var c=0; c<numberColumns; c++) {
                    result += "|---";
                }
                result+="|\n";
            } else {
    
                // format csv line with data
                for (var c=0; c<numberColumns; c++) {

                    if (theCells[c] === undefined) {
                        result += "|"+"-";
                    } else {
                        if (theCells[c].length < 1) {
                        result += "|"+"-";
                        } else {
                            result += "|"+theCells[c];
                        }
                    }

                }
                result+="|\n";
            }
            
        }
        return result;
    } // end convertCSVtoTable
}

