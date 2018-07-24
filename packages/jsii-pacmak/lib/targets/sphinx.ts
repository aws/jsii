import SphinxDocsGenerator from '../generators/sphinx';
import { Target, TargetOptions } from '../target';

export default class Sphinx extends Target {
    protected readonly generator = new SphinxDocsGenerator();

    constructor(options: TargetOptions) {
        super(options);
    }
}
