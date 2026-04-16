import { XCellPrimitiveType } from "../types/primitive";
import type { XCellTyped } from "../types/unified";

/**
 * 将 XCellPrimitiveType 映射为 TypeScript 类型字符串
 * @param primitive - XCell 原始类型
 * @returns 对应的 TypeScript 类型字符串
 */
export function mapPrimitiveToTypeScript(primitive: XCellPrimitiveType): string {
    switch (primitive) {
        case XCellPrimitiveType.Bool:
            return "boolean";
        case XCellPrimitiveType.I8:
        case XCellPrimitiveType.I16:
        case XCellPrimitiveType.I32:
        case XCellPrimitiveType.I64:
        case XCellPrimitiveType.U8:
        case XCellPrimitiveType.U16:
        case XCellPrimitiveType.U32:
        case XCellPrimitiveType.U64:
        case XCellPrimitiveType.F32:
        case XCellPrimitiveType.F64:
            return "number";
        case XCellPrimitiveType.String:
        case XCellPrimitiveType.Utf8:
        case XCellPrimitiveType.Utf16:
            return "string";
    }
}

/**
 * 将 XCellTyped 映射为 TypeScript 类型字符串
 * @param typed - XCell 统一类型描述
 * @returns 对应的 TypeScript 类型字符串
 */
export function mapXCellTypedToTypeScript(typed: XCellTyped): string {
    switch (typed.kind) {
        case "primitive":
            return mapPrimitiveToTypeScript(typed.primitive);
        case "array":
            return `Array<${mapXCellTypedToTypeScript(typed.elementType)}>`;
        case "staticArray":
            return `[${mapXCellTypedToTypeScript(typed.elementType)}, ...${mapXCellTypedToTypeScript(typed.elementType)}[]]`;
        case "vec":
            return `Array<${mapXCellTypedToTypeScript(typed.elementType)}>`;
        case "vec2":
            return `{ x: ${mapPrimitiveToTypeScript(typed.elementType)}; y: ${mapPrimitiveToTypeScript(typed.elementType)} }`;
        case "vec3":
            return `{ x: ${mapPrimitiveToTypeScript(typed.elementType)}; y: ${mapPrimitiveToTypeScript(typed.elementType)}; z: ${mapPrimitiveToTypeScript(typed.elementType)} }`;
        case "vec4":
            return `{ x: ${mapPrimitiveToTypeScript(typed.elementType)}; y: ${mapPrimitiveToTypeScript(typed.elementType)}; z: ${mapPrimitiveToTypeScript(typed.elementType)}; w: ${mapPrimitiveToTypeScript(typed.elementType)} }`;
        case "hashMap":
            return `Map<${mapXCellTypedToTypeScript(typed.keyType)}, ${mapXCellTypedToTypeScript(typed.valueType)}>`;
        case "tuple":
            return `[${typed.elementTypes.map(mapXCellTypedToTypeScript).join(", ")}]`;
        case "color":
            return "{ r: number; g: number; b: number; a: number }";
        case "datetime":
            return "Date";
        case "time":
            return "{ hour: number; minute: number; second: number }";
        case "date":
            return "{ year: number; month: number; day: number }";
        case "reference":
            return "string";
        case "unique":
            return mapXCellTypedToTypeScript(typed.innerType);
        case "primary":
            return mapXCellTypedToTypeScript(typed.innerType);
        case "enum":
            return typed.name;
        case "class":
            return typed.name;
    }
}
