import { OneByOneBuilder, TargetBuilder } from '../builder';

import Dotnet from './dotnet';
import { JavaBuilder } from './java';
import JavaScript from './js';
import Python from './python';
import Ruby from './ruby';

export type TargetName = 'dotnet' | 'java' | 'js' | 'python' | 'ruby';

export const ALL_BUILDERS: {[key in TargetName]: TargetBuilder} = {
  dotnet: new OneByOneBuilder('dotnet', Dotnet),
  java: new JavaBuilder(),
  js: new OneByOneBuilder('js', JavaScript),
  python: new OneByOneBuilder('python', Python),
  ruby: new OneByOneBuilder('ruby', Ruby),
};


