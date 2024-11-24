import { Editor, Plugin } from 'obsidian';

export default class InsertNewLine extends Plugin {
	async onload() {
		this.addCommand({
			id: 'new-line-above',
			name: 'Above',
			icon: 'move-up-left',
			editorCallback: (editor: Editor) => {
				const cursor = editor.getCursor();
				const line = editor.getLine(cursor.line);
				const match = line.match(/^\s*([+*-]|[0-9]+\.)\s+/);
				const line_prefix = match ? match[0] : '';
				editor.replaceRange(`${line_prefix}\n`, { line: cursor.line, ch: 0 });
				editor.setCursor(cursor.line, line_prefix.length);
			}
		});
		
		this.addCommand({
			id: 'new-line-below',
			name: 'Below',
			icon: 'move-down-left',
			editorCallback: (editor: Editor) => {
				const cursor = editor.getCursor();
				const line = editor.getLine(cursor.line);
				const match = line.match(/^\s*([+*-]|[0-9]+\.)\s+/);
				const line_prefix = match ? match[0] : '';
				editor.replaceRange(`\n${line_prefix}`, { line: cursor.line, ch: line.length });
				editor.setCursor(cursor.line + 1, line_prefix.length);
			}
		});
	}

	onunload() {}
}