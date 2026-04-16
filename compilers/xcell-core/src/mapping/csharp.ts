import { XCellPrimitiveType } from "../types/primitive";
import type { XCellTyped } from "../types/unified";

/**
 * 将 XCellPrimitiveType 映射为 C# 类型字符串
 * @param primitive - XCell 原始类型
 * @returns 对应的 C# 类型字符串
 */
export function mapPrimitiveToCSharp(primitive: XCellPrimitiveType): string {
    switch (primitive) {
        case XCellPrimitiveType.Bool:
            return "bool";
        case XCellPrimitiveType.I8:
            return "sbyte";
        case XCellPrimitiveType.U8:
            return "byte";
        case XCellPrimitiveType.I16:
            return "short";
        case XCellPrimitiveType.U16:
            return "ushort";
        case XCellPrimitiveType.I32:
            return "int";
        case XCellPrimitiveType.U32:
            return "uint";
        case XCellPrimitiveType.I64:
            return "long";
        case XCellPrimitiveType.U64:
            return "ulong";
        case XCellPrimitiveType.F32:
            return "float";
        case XCellPrimitiveType.F64:
            return "double";
        case XCellPrimitiveType.String:
        case XCellPrimitiveType.Utf8:
        case XCellPrimitiveType.Utf16:
            return "string";
    }
}

/**
 * 将 XCellTyped 映射为 C# 类型字符串
 * @param typed - XCell 统一类型描述
 * @returns 对应的 C# 类型字符串
 */
export function mapXCellTypedToCSharp(typed: XCellTyped): string {
    switch (typed.kind) {
        case "primitive":
            return mapPrimitiveToCSharp(typed.primitive);
        case "array":
            return `List<${mapXCellTypedToCSharp(typed.elementType)}>`;
        case "staticArray":
            return `${mapXCellTypedToCSharp(typed.elementType)}[]`;
        case "vec":
            return `List<${mapXCellTypedToCSharp(typed.elementType)}>`;
        case "vec2":
            return `Vector2<${mapPrimitiveToCSharp(typed.elementType)}>`;
        case "vec3":
            return `Vector3<${mapPrimitiveToCSharp(typed.elementType)}>`;
        case "vec4":
            return `Vector4<${mapPrimitiveToCSharp(typed.elementType)}>`;
        case "hashMap":
            return `Dictionary<${mapXCellTypedToCSharp(typed.keyType)}, ${mapXCellTypedToCSharp(typed.valueType)}>`;
        case "tuple":
            return `(${typed.elementTypes.map(mapXCellTypedToCSharp).join(", ")})`;
        case "color":
            return "Color";
        case "datetime":
            return "DateTime";
        case "time":
            return "TimeSpan";
        case "date":
            return "DateOnly";
        case "reference":
            return "string";
        case "unique":
            return mapXCellTypedToCSharp(typed.innerType);
        case "primary":
            return mapXCellTypedToCSharp(typed.innerType);
        case "enum":
            return typed.name;
        case "class":
            return typed.name;
    }
}
