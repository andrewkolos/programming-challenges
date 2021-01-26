import chalk from 'chalk';
import _ from 'lodash';

export interface TestCase<F extends () => void> {
  input: Parameters<F>;
  output: ReturnType<F>;
}

export function test<F extends (...params: any[]) => any>(fn: F, testCase: TestCase<F>) {
    const { input, output } = testCase;
    const receivedOutput = fn(...input);

    console.log(`Test: `);
    console.log(`\tInput: `, input);
    console.log(`\tExpected result: `, output);
    console.log('\tReceived: ', receivedOutput);
    
    if (_.isEqual(receivedOutput, output)) {
      console.log(`\tResult: ${chalk.green('pass')}`);
    } else {
      console.log(`\tResult: ${chalk.red('fail')}`);
    }
}

export function makeTestFunc<F extends (...params: any[]) => any>(fn: F) {
  return (testCase: TestCase<F>) => { test(fn, testCase); }
}