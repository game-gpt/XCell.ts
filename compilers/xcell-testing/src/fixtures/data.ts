/**
 * Test fixture data
 */

import type { TypeTestFixture, ValueTestFixture } from "./types";

/**
 * Primitive type test fixtures
 */
export const primitiveTypeFixtures: TypeTestFixture[] = [
    {
        name: "int-type",
        description: "Integer type fixture",
        tags: ["primitive", "numeric"],
        type: { kind: "primitive", name: "int" },
        expectedString: "int"
    },
    {
        name: "float-type",
        description: "Float type fixture",
        tags: ["primitive", "numeric"],
        type: { kind: "primitive", name: "float" },
        expectedString: "float"
    },
    {
        name: "string-type",
        description: "String type fixture",
        tags: ["primitive", "text"],
        type: { kind: "primitive", name: "string" },
        expectedString: "string"
    },
    {
        name: "bool-type",
        description: "Boolean type fixture",
        tags: ["primitive", "logic"],
        type: { kind: "primitive", name: "bool" },
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
