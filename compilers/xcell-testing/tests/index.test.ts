import { describe, it, expect } from "vitest";
import { XCellPrimitiveType } from "@game-gpt/xcell-core";
import {
    mockPrimitiveType,
    mockArrayType,
    mockVecType,
    mockVec2Type,
    mockVec3Type,
    mockVec4Type,
} from "../src/mocks/generators";
import {
    primitiveTypeFixtures,
    valueValidationFixtures,
} from "../src/fixtures/data";
import { assertTypeKind, assertPrimitiveType } from "../src/utils/assertions";
import { filterByTags, getFixtureByName } from "../src/utils/helpers";

describe("Mock Generators", () => {
    it("should generate primitive type", () => {
        const type = mockPrimitiveType(XCellPrimitiveType.I32);
        expect(type.kind).toBe("primitive");
        expect(type.primitive).toBe(XCellPrimitiveType.I32);
    });

    it("should generate array type", () => {
        const elementType = mockPrimitiveType(XCellPrimitiveType.String);
        const type = mockArrayType(elementType);
        expect(type.kind).toBe("array");
        if (type.kind === "array") {
            expect(type.elementType).toEqual(elementType);
        }
    });

    it("should generate vec type", () => {
        const elementType = mockPrimitiveType(XCellPrimitiveType.F32);
        const type = mockVecType(elementType);
        expect(type.kind).toBe("vec");
        if (type.kind === "vec") {
            expect(type.elementType).toEqual(elementType);
        }
    });

    it("should generate vec2 type", () => {
        const type = mockVec2Type(XCellPrimitiveType.F32);
        expect(type.kind).toBe("vec2");
        if (type.kind === "vec2") {
            expect(type.elementType).toBe(XCellPrimitiveType.F32);
        }
    });

    it("should generate vec3 type", () => {
        const type = mockVec3Type(XCellPrimitiveType.F32);
        expect(type.kind).toBe("vec3");
        if (type.kind === "vec3") {
            expect(type.elementType).toBe(XCellPrimitiveType.F32);
        }
    });

    it("should generate vec4 type", () => {
        const type = mockVec4Type(XCellPrimitiveType.F32);
        expect(type.kind).toBe("vec4");
        if (type.kind === "vec4") {
            expect(type.elementType).toBe(XCellPrimitiveType.F32);
        }
    });
});

describe("Test Fixtures", () => {
    it("should have primitive type fixtures", () => {
        expect(primitiveTypeFixtures.length).toBeGreaterThan(0);
        primitiveTypeFixtures.forEach((fixture) => {
            expect(fixture.name).toBeDefined();
            expect(fixture.type).toBeDefined();
            expect(fixture.expectedString).toBeDefined();
        });
    });

    it("should have value validation fixtures", () => {
        expect(valueValidationFixtures.length).toBeGreaterThan(0);
        valueValidationFixtures.forEach((fixture) => {
            expect(fixture.name).toBeDefined();
            expect(fixture.value).toBeDefined();
            expect(typeof fixture.isValid).toBe("boolean");
        });
    });
});

describe("Assertion Utilities", () => {
    it("should assert type kind", () => {
        const type = mockPrimitiveType("int");
        assertTypeKind(type, "primitive");
    });

    it("should assert primitive type", () => {
        const type = mockPrimitiveType("string");
        assertPrimitiveType(type, "string");
    });
});

describe("Helper Utilities", () => {
    it("should filter fixtures by tags", () => {
        const numericFixtures = filterByTags(primitiveTypeFixtures, [
            "numeric",
        ]);
        expect(numericFixtures.length).toBeGreaterThan(0);
        numericFixtures.forEach((fixture) => {
            expect(fixture.tags).toContain("numeric");
        });
    });

    it("should get fixture by name", () => {
        const fixture = getFixtureByName(primitiveTypeFixtures, "int-type");
        expect(fixture).toBeDefined();
        expect(fixture?.name).toBe("int-type");
    });
});
