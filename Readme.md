This config loader allows multiple nested configs that
inherit from a parent. The root config, all.js, is loaded
first. Then, for each item in a hyphen-separated NODE_ENV,
an extra config is merged in.

E.g:

NODE_ENV = dev: all.js, dev.js
NODE_ENV = test-unit: all.js, test.js, test-unit.js
