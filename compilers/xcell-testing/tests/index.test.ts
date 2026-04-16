import { describe, it, expect } from "vitest";
import {
    mockPrimitiveType,
    mockListType,
    mockDictType,
    mockOptionalType
} from "../src/mocks/generators";
import {
    primitiveTypeFixtures,
    valueValidationFixtures
} from "../src/fixtures/data";
import {
    assertTypeKind,
    assertPrimitiveType
} from "../src/utils/assertions";
import {
    filterByTags,
    getFixtureByName
} from "../src/utils/helpers";

describe("Mock Generators", () => {
    it("should generate primitive type", () => {
        const type = mockPrimitiveType("int");
        expect(type.kind).toBe("primitive");
        expect(type.name).toBe("int");
    });

    it("should generate list type", () => {
        const elementType = mockPrimitiveType("string");
        const type = mockListType(elementType);
        expect(type.kind).toBe("list");
        expect(type.element).toEqual(elementType);
    });

    it("should generate dict type", () => {
        const keyType = mockPrimitiveType("string");
        const valueType = mockPrimitiveType("int");
        const type = mockDictType(keyType, valueType);
        expect(type.kind).toBe("dict");
        expect(type.key).toEqual(keyType);
        expect(type.value).toEqual(valueType);
    });

    it("should generate optional type", () => {
        const innerType = mockPrimitiveType("int");
        const type = mockOptionalType(innerType);
        expect(type.kind).toBe("optional");
        expect(type.inner).toEqual(innerType);
    });
});

describe("Test Fixtures", () => {
    it("should have primitive type fixtures", () => {
        expect(primitiveTypeFixtures.length).toBeGreaterThan(0);
        primitiveTypeFixtures.forEach(fixture => {
            expect(fixture.name).toBeDefined();
            expect(fixture.type).toBeDefined();
            expect(fixture.expectedString).toBeDefined();
        });
    });

    it("should have value validation fixtures", () => {
        expect(valueValidationFixtures.length).toBeGreaterThan(0);
        valueValidationFixtures.forEach(fixture => {
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
        const numericFixtures = filterByTags(primitiveTypeFixtures, ["numeric"]);
        expect(numericFixtures.length).toBeGreaterThan(0);
        numericFixtures.forEach(fixture => {
            expect(fixture.tags).toContain("numeric");
        });
    });

    it("should get fixture by name", () => {
        const fixture = getFixtureByName(primitiveTypeFixtures, "int-type");
        expect(fixture).toBeDefined();
        expect(fixture?.name).toBe("int-type");
    });
});
