#!/bin/bash
cd test
NODE_ENV=test ../node_modules/mocha/bin/mocha ./*.test.js
