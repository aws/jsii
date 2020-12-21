/**
 * Ensure worker threads are available, or re-start if not...
 */
require('../lib/ensure-workers-usable');

/**
 * We could have done simpler, if it wasn't for Windows getting a different file
 * at node_modules/.bin/jest than other OSes, and that other file not being
 * a JavaScript module... 🙄
 */
require('jest-cli/bin/jest');
