// ARRANGE: Set up the test environment
// ACT: Perform the test
// ASSERT: Verify the results

// ARRANGE
import { sum2numbers } from '../api/app';

describe('sum2numbers', () => {

    const result = sum2numbers(2, 3); // ACT

    it('should return the sum of 2 numbers', () => {
        expect(result).toBe(5); // ASSERT
    });

});