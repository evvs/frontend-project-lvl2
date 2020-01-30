install: 
	npm install

testpublish: 
	npx babel src --out-dir dist
	npm publish --dry-run
	npm unlink
	npm link
lint:
	npx eslint .