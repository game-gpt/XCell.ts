/**
 * Test fixture data
 */

import { XCellPrimitiveType } from "@game-gpt/xcell-core";
import type { TypeTestFixture, ValueTestFixture } from "./types";

/**
 * Primitive type test fixtures
 */
export const primitiveTypeFixtures: TypeTestFixture[] = [
    {
        name: "int-type",
        description: "Integer type fixture",
        tags: ["primitive", "numeric"],
        type: { kind: "primitive", primitive: XCellPrimitiveType.I32 },
        expectedString: "int"
    },
    {
        name: "float-type",
        description: "Float type fixture",
        tags: ["primitive", "numeric"],
        type: { kind: "primitive", primitive: XCellPrimitiveType.F32 },
        expectedString: "float"
    },
    {
        name: "string-type",
        description: "String type fixture",
        tags: ["primitive", "text"],
        type: { kind: "primitive", primitive: XCellPrimitiveType.String },
        expectedString: "string"
    },
    {
        name: "bool-type",
        description: "Boolean type fixture",
        tags: ["primitive", "logic"],
        type: { kind: "primitive", primitive: XCellPrimitiveType.Bool },
        expectedString: "bool"
    }
];

/**
 * Value validation test fixtures
 */
export const valueValidationFixtures: ValueTestFixture[] = [
    {
        name: "valid-int",
        description: "Valid integer value",
        tags: ["primitive", "numeric", "valid"],
        value: 42,
        isValid: true
    },
    {
        name: "valid-string",
        description: "Valid string value",
        tags: ["primitive", "text", "valid"],
        value: "hello world",
        isValid: true
    },
    {
        name: "valid-bool",
        description: "Valid boolean value",
        tags: ["primitive", "logic", "valid"],
        value: true,
        isValid: true
    }
];
