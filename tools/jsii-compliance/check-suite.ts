import { loadSuite } from './suite';

// Validates the test case definitions in suite/ without collecting any language reports
const suite = loadSuite();
for (const category of suite.categories) {
  console.log(`${category.id}: ${category.testCases.length} test cases`);
}
