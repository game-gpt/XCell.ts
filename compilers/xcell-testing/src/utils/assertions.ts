/**
 * Custom assertion utilities for testing
 */

import { expect } from "vitest";
import type { UnifiedType } from "@game-gpt/xcell-core";

/**
 * Assert that a type matches expected structure
 * 
 * @param actual - The actual type
 * @param expected - The expected type kind
 */
export function assertTypeKind(actual: UnifiedType, expected: string): void {
    expect(actual.kind).toBe(expected);
}

/**
 * Assert that a type is a primitive type
 * 
 * @param type - The type to check
 * @param name - Expected primitive type name
 */
export function assertPrimitiveType(type: UnifiedType, name: string): void {
    expect(type.kind).toBe("primitive");
    if (type.kind === "primitive") {
        expect(type.name).toBe(name);
    }
}

/**
 * Assert that a type is a list type
 * 
 * @param type - The type to check
 */
export function assertListType(type: UnifiedType): void {
    expect(type.kind).toBe("list");
}

/**
 * Assert that a type is a dict type
 * 
 * @param type - The type to check
 */
export function assertDictType(type: UnifiedType): void {
    expect(type.kind).toBe("dict");
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
