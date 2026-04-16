/**
 * Mock data generators
 */

import type { UnifiedType } from "@game-gpt/xcell-core";

/**
 * Generate a mock primitive type
 * 
 * @param name - The primitive type name
 * @returns A mock primitive type
 */
export function mockPrimitiveType(name: string): UnifiedType {
    return {
        kind: "primitive",
        name
    };
}

/**
 * Generate a mock list type
 * 
 * @param elementType - The element type
 * @returns A mock list type
 */
export function mockListType(elementType: UnifiedType): UnifiedType {
    return {
        kind: "list",
        element: elementType
    };
}

/**
 * Generate a mock dict type
 * 
 * @param keyType - The key type
 * @param valueType - The value type
 * @returns A mock dict type
 */
export function mockDictType(keyType: UnifiedType, valueType: UnifiedType): UnifiedType {
    return {
        kind: "dict",
        key: keyType,
        value: valueType
    };
}

/**
 * Generate a mock optional type
 * 
 * @param innerType - The inner type
 * @returns A mock optional type
 */
export function mockOptionalType(innerType: UnifiedType): UnifiedType {
    return {
        kind: "optional",
        inner: innerType
    };
}
