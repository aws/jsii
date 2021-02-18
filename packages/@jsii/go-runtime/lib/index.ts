import * as path from 'path';

import { localRuntimeModules } from './local-runtime-modules';

/**
 * The root directory under which all go modules locally available from this
 * package are hosted.
 */
export const runtimePath = path.resolve(__dirname, '..', 'jsii-runtime-go');

/**
 * A map representing all go modules locally available from this package. This
 * includes one entry per submodule of the jsii runtime for go. Entries are
 * presented in no particular order.
 */
export const runtimeModules = localRuntimeModules(runtimePath);
