/**
 * Helper utilities for testing
 */

import type { TestFixtureConfig } from "../fixtures/types";

/**
 * Create a test fixture configuration
 * 
 * @param name - Fixture name
 * @param description - Fixture description
 * @param tags - Fixture tags
 * @returns A test fixture configuration
 */
export function createFixtureConfig(
    name: string,
    description: string,
    tags: string[] = []
): TestFixtureConfig {
    return {
        name,
        description,
        tags
    };
}

/**
 * Filter fixtures by tags
 * 
 * @param fixtures - Array of fixtures
 * @param tags - Tags to filter by
 * @returns Filtered fixtures
 */
export function filterByTags<T extends TestFixtureConfig>(
    fixtures: T[],
    tags: string[]
): T[] {
    return fixtures.filter(fixture =>
        tags.some(tag => fixture.tags.includes(tag))
    );
}

/**
 * Get fixtures by name
 * 
 * @param fixtures - Array of fixtures
 * @param name - Fixture name to find
 * @returns The found fixture or undefined
 */
export function getFixtureByName<T extends TestFixtureConfig>(
    fixtures: T[],
    name: string
): T | undefined {
    return fixtures.find(fixture => fixture.name === name);
}

/**
 * Run a test for each fixture
 * 
 * @param fixtures - Array of fixtures
 * @param testFn - Test function to run
 */
export function forEachFixture<T extends TestFixtureConfig>(
    fixtures: T[],
    testFn: (fixture: T) => void
): void {
    fixtures.forEach(fixture => {
        testFn(fixture);
    });
}
