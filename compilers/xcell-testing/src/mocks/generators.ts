/**
 * Mock data generators
 */

import type { XCellTyped, XCellPrimitiveType } from "@game-gpt/xcell-core";

/**
 * Generate a mock primitive type
 *
 * @param primitive - The primitive type
 * @returns A mock primitive type
 */
export function mockPrimitiveType(primitive: XCellPrimitiveType): XCellTyped {
    return {
        kind: "primitive",
        primitive,
    };
}

/**
 * Generate a mock array type
 *
 * @param elementType - The element type
 * @returns A mock array type
 */
export function mockArrayType(elementType: XCellTyped): XCellTyped {
    return {
        kind: "array",
        elementType,
    };
}

/**
 * Generate a mock vec type
 *
 * @param elementType - The element type
 * @returns A mock vec type
 */
export function mockVecType(elementType: XCellTyped): XCellTyped {
    return {
        kind: "vec",
        elementType,
    };
}

/**
 * Generate a mock vec2 type
 *
 * @param elementType - The primitive element type
 * @returns A mock vec2 type
 */
export function mockVec2Type(elementType: XCellPrimitiveType): XCellTyped {
    return {
        kind: "vec2",
        elementType,
    };
}

/**
 * Generate a mock vec3 type
 *
 * @param elementType - The primitive element type
 * @returns A mock vec3 type
 */
export function mockVec3Type(elementType: XCellPrimitiveType): XCellTyped {
    return {
        kind: "vec3",
        elementType,
    };
}

/**
 * Generate a mock vec4 type
 *
 * @param elementType - The primitive element type
 * @returns A mock vec4 type
 */
export function mockVec4Type(elementType: XCellPrimitiveType): XCellTyped {
    return {
        kind: "vec4",
        elementType,
    };
}
