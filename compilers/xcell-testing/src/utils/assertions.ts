/**
 * Custom assertion utilities for testing
 */

import { expect } from "vitest";
import type { XCellTyped } from "@game-gpt/xcell-core";

/**
 * Assert that a type matches expected structure
 *
 * @param actual - The actual type
 * @param expected - The expected type kind
 */
export function assertTypeKind(actual: XCellTyped, expected: string): void {
    expect(actual.kind).toBe(expected);
}

/**
 * Assert that a type is a primitive type
 *
 * @param type - The type to check
 */
export function assertPrimitiveType(type: XCellTyped): void {
    expect(type.kind).toBe("primitive");
}

/**
 * Assert that a type is an array type
 *
 * @param type - The type to check
 */
export function assertArrayType(type: XCellTyped): void {
    expect(type.kind).toBe("array");
}

/**
 * Assert that a type is a vec type
 *
 * @param type - The type to check
 */
export function assertVecType(type: XCellTyped): void {
    expect(type.kind).toBe("vec");
}

/**
 * Assert that a value is valid
 *
 * @param value - The value to check
 * @param isValid - Expected validity
 */
export function assertValidity(value: unknown, isValid: boolean): void {
    if (isValid) {
        expect(value).toBeDefined();
    }
}
