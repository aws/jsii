import { verifyGeneratedCodeFor } from './harness';
import { TargetName } from '../../lib/targets';

verifyGeneratedCodeFor(TargetName.PYTHON, 120_000);
