#!/usr/bin/env node
var reporter = require('nodeunit').reporters.default;
reporter.run([
    'tests/edit.js',
    'tests/list.js',
    'tests/movement.js',
    'tests/next.js',
    'tests/prev.js',
    'tests/treeMovement.js']);