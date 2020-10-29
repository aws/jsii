import { TargetName } from '../../lib/targets';
import { verifyGeneratedCodeFor } from './harness';

verifyGeneratedCodeFor(TargetName.PYTHON, 120_000);
