import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('dendron-handler.copy-link-to-current-file', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const filePath = editor.document.fileName;
			const workspaceFolder = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
			if (workspaceFolder) {
				let relativePath = filePath.replace(workspaceFolder, '').replace(/\\/g, '/');
				if (relativePath.startsWith('/')) {
					relativePath = relativePath.substring(1);
				}
				const link = `dendron:///${relativePath}`;
				vscode.env.clipboard.writeText(link).then(() => {
					vscode.window.showInformationMessage('Link copied to clipboard!');
				});
			}
		}

	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
