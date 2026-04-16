/**
 * Test fixture type definitions
 */

import type { XCellTyped } from "@game-gpt/xcell-core";

/**
 * Test fixture configuration
 */
export interface TestFixtureConfig {
    /**
     * Fixture name
     */
    name: string;

    /**
     * Fixture description
     */
    description: string;

    /**
     * Fixture tags for categorization
     */
    tags: string[];
}

/**
 * Test fixture with type information
 */
export interface TypeTestFixture extends TestFixtureConfig {
    /**
     * The unified type to test
     */
    type: XCellTyped;

    /**
     * Expected string representation
     */
    expectedString: string;
}

/**
 * Test fixture for value validation
 */
export interface ValueTestFixture extends TestFixtureConfig {
    /**
     * The value to test
     */
    value: unknown;

    /**
     * Expected validation result
     */
    isValid: boolean;
}
