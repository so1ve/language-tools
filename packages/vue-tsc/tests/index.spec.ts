import * as path from 'path';
import * as fs from 'fs';
import { describe, it } from 'vitest';
import { fork } from 'child_process';

const binPath = require.resolve('../bin/vue-tsc.js');
const workspace = path.resolve(__dirname, '../../vue-test-workspace/vue-tsc');
const workspace2 = path.resolve(__dirname, '../../vue-test-workspace-vue-2/vue-tsc');

function prettyPath(path: string, isRoot: boolean) {
	const segments = path.split('/');
	const slicePath = (seg: number) => segments
		.slice(segments.length - seg, segments.length)
		.join('/')
		.replace('/vue-tsc', '');
	return !isRoot ? slicePath(4) : slicePath(3);
}

function collectTests(dirs: string[], depth = 2, isRoot: boolean = true): [string, boolean][] {
	const tests: [string, boolean][] = [];

	if (depth <= 0) {
		return tests;
	}

	for (const dir of dirs) {
		const files = fs.readdirSync(dir);
		for (const file of files) {
			const filePath = path.join(dir, file);
			const stat = fs.statSync(filePath);
			if (stat.isDirectory()) {
				const tsconfigPath = path.join(filePath, 'tsconfig.json');
				if (fs.existsSync(tsconfigPath)) {
					tests.push([
						filePath.replace(/\\/g, '/'),
						isRoot,
					]);
				}
				tests.push(...collectTests([filePath], depth - 1, false));
			}
		}
	}

	return tests;
}

const tests = collectTests([workspace, workspace2]);

function runVueTsc(cwd: string) {
	return new Promise((resolve, reject) => {
		const cp = fork(
			binPath,
			['--noEmit'],
			{
				silent: true,
				cwd
			},
		);

		cp.stdout?.setEncoding('utf8');
		cp.stdout?.on('data', (data) => {
			console.log(data);
		});
		cp.stderr?.setEncoding('utf8');
		cp.stderr?.on('data', (data) => {
			console.error(data);
		});

		cp.on('exit', (code) => {
			if (code === 0) {
				resolve(undefined);
			} else {
				reject(new Error(`Exited with code ${code}`));
			}
		});
	});
}

describe(`vue-tsc`, () => {
	for (const [path, isRoot] of tests) {
		it(`vue-tsc no errors (${prettyPath(path, isRoot)})`, () => runVueTsc(path), 40_000);
	}
});
