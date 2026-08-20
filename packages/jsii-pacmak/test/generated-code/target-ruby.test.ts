import { verifyGeneratedCodeFor } from './harness';
import { TargetName } from '../../lib/targets';

verifyGeneratedCodeFor(TargetName.RUBY, 300_000);
