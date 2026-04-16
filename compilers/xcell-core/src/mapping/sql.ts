import { XCellPrimitiveType } from "../types/primitive";
import type { XCellTyped } from "../types/unified";

/**
 * 将 XCellPrimitiveType 映射为 SQL 类型字符串
 * @param primitive - XCell 原始类型
 * @returns 对应的 SQL 类型字符串
 */
export function mapPrimitiveToSql(primitive: XCellPrimitiveType): string {
    switch (primitive) {
        case XCellPrimitiveType.Bool:
            return "BOOLEAN";
        case XCellPrimitiveType.I8:
            return "TINYINT";
        case XCellPrimitiveType.U8:
            return "TINYINT UNSIGNED";
        case XCellPrimitiveType.I16:
            return "SMALLINT";
        case XCellPrimitiveType.U16:
            return "SMALLINT UNSIGNED";
        case XCellPrimitiveType.I32:
            return "INT";
        case XCellPrimitiveType.U32:
            return "INT UNSIGNED";
        case XCellPrimitiveType.I64:
            return "BIGINT";
        case XCellPrimitiveType.U64:
            return "BIGINT UNSIGNED";
        case XCellPrimitiveType.F32:
            return "FLOAT";
        case XCellPrimitiveType.F64:
            return "DOUBLE";
        case XCellPrimitiveType.String:
        case XCellPrimitiveType.Utf8:
        case XCellPrimitiveType.Utf16:
            return "VARCHAR(255)";
    }
}

/**
 * 将 XCellTyped 映射为 SQL 类型字符串
 * @param typed - XCell 统一类型描述
 * @returns 对应的 SQL 类型字符串
 */
export function mapXCellTypedToSql(typed: XCellTyped): string {
    switch (typed.kind) {
        case "primitive":
            return mapPrimitiveToSql(typed.primitive);
        case "array":
            return "JSON";
        case "staticArray":
            return "JSON";
        case "vec":
            return "JSON";
        case "vec2":
        case "vec3":
        case "vec4":
            return "JSON";
        case "hashMap":
            return "JSON";
        case "tuple":
            return "JSON";
        case "color":
            return "JSON";
        case "datetime":
            return "DATETIME";
        case "time":
            return "TIME";
        case "date":
            return "DATE";
        case "reference":
            return "VARCHAR(255)";
        case "unique":
            return mapXCellTypedToSql(typed.innerType);
        case "primary":
            return mapXCellTypedToSql(typed.innerType);
        case "enum":
            return "VARCHAR(255)";
        case "class":
            return "JSON";
    }
}
