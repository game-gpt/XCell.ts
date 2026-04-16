import { XCellPrimitiveType } from "../types/primitive";
import type { XCellTyped } from "../types/unified";

/**
 * 将 XCellPrimitiveType 映射为 JSON Schema 类型字符串
 * @param primitive - XCell 原始类型
 * @returns 对应的 JSON Schema 类型字符串
 */
export function mapPrimitiveToJson(primitive: XCellPrimitiveType): string {
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
 * 将 XCellTyped 映射为 JSON Schema 类型字符串
 * @param typed - XCell 统一类型描述
 * @returns 对应的 JSON Schema 类型字符串
 */
export function mapXCellTypedToJson(typed: XCellTyped): string {
    switch (typed.kind) {
        case "primitive":
            return mapPrimitiveToJson(typed.primitive);
        case "array":
            return "array";
        case "staticArray":
            return "array";
        case "vec":
            return "array";
        case "vec2":
        case "vec3":
        case "vec4":
            return "object";
        case "hashMap":
            return "object";
        case "tuple":
            return "array";
        case "color":
            return "object";
        case "datetime":
            return "string";
        case "time":
            return "object";
        case "date":
            return "object";
        case "reference":
            return "string";
        case "unique":
            return mapXCellTypedToJson(typed.innerType);
        case "primary":
            return mapXCellTypedToJson(typed.innerType);
        case "enum":
            return "string";
        case "class":
            return "object";
    }
}
