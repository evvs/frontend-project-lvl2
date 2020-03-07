install: 
	npm install

testpublish: 
	npm publish --dry-run
lint:
	npx eslint .
test: 
	npx jest --watch
testStart:
	npx babel src --out-dir dist
	npm publish --dry-run
	npm unlink
	npm link