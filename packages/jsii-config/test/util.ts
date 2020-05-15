import { BasePackageJson } from '../lib/schema';

export const packageJsonObject: BasePackageJson = {
  name: 'jsii-config-test',
  version: '0.0.1',
  repository: {
    url: 'https://github.com/aws/jsii',
    type: 'git',
    directory: '/packages/jsii-config',
  },
  main: 'bin/jsii-config',
  author: {
    name: 'Amazon Web Services',
    url: 'https://aws.amazon.com',
    organization: true,
  },
};

export const findQuestion = (key: string, questions: any[]) =>
  questions.find((question: any) => question.name === key);

export const findQuestions = (keys: string[], question: any[]) =>
  keys.map((key) => findQuestion(key, question));
