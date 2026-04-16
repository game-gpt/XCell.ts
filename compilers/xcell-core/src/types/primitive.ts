/**
 * XCell 原始类型枚举，定义所有基础数据类型
 */
export enum XCellPrimitiveType {
    /** 布尔类型 */
    Bool = "Bool",
    /** 有符号 8 位整数 */
    I8 = "I8",
    /** 有符号 16 位整数 */
    I16 = "I16",
    /** 有符号 32 位整数 */
    I32 = "I32",
    /** 有符号 64 位整数 */
    I64 = "I64",
    /** 无符号 8 位整数 */
    U8 = "U8",
    /** 无符号 16 位整数 */
    U16 = "U16",
    /** 无符号 32 位整数 */
    U32 = "U32",
    /** 无符号 64 位整数 */
    U64 = "U64",
    /** 32 位浮点数 */
    F32 = "F32",
    /** 64 位浮点数 */
    F64 = "F64",
    /** 字符串类型 */
    String = "String",
    /** UTF-8 编码字符串 */
    Utf8 = "Utf8",
    /** UTF-16 编码字符串 */
    Utf16 = "Utf16",
}

/**
 * 原始类型别名映射表，用于类型名称的规范化（不区分大小写）
 * 键为小写别名，值为对应的 XCellPrimitiveType
 */
export const PRIMITIVE_TYPE_ALIASES: ReadonlyMap<string, XCellPrimitiveType> = new Map([
    ["bool", XCellPrimitiveType.Bool],
    ["boolean", XCellPrimitiveType.Bool],
    ["char", XCellPrimitiveType.I8],
    ["unsigned char", XCellPrimitiveType.U8],
    ["byte", XCellPrimitiveType.U8],
    ["short", XCellPrimitiveType.I16],
    ["unsigned short", XCellPrimitiveType.U16],
    ["ushort", XCellPrimitiveType.U16],
    ["int", XCellPrimitiveType.I32],
    ["unsigned int", XCellPrimitiveType.U32],
    ["uint", XCellPrimitiveType.U32],
    ["long", XCellPrimitiveType.I64],
    ["long long", XCellPrimitiveType.I64],
    ["unsigned long long", XCellPrimitiveType.U64],
    ["ulong", XCellPrimitiveType.U64],
    ["float", XCellPrimitiveType.F32],
    ["double", XCellPrimitiveType.F64],
    ["string", XCellPrimitiveType.String],
    ["str", XCellPrimitiveType.String],
    ["utf8", XCellPrimitiveType.Utf8],
    ["utf16", XCellPrimitiveType.Utf16],
]);

/**
 * 根据类型名称解析原始类型，支持别名且不区分大小写
 * @param typeName - 类型名称或别名
 * @returns 对应的 XCellPrimitiveType，若无法识别则返回 undefined
 */
export function resolvePrimitiveType(typeName: string): XCellPrimitiveType | undefined {
    const normalized = typeName.toLowerCase();
    const aliasResult = PRIMITIVE_TYPE_ALIASES.get(normalized);
    if (aliasResult !== undefined) {
        return aliasResult;
    }
    const enumValues = Object.values(XCellPrimitiveType) as string[];
    if (enumValues.includes(normalized.charAt(0).toUpperCase() + normalized.slice(1))) {
        return normalized.charAt(0).toUpperCase() + normalized.slice(1) as XCellPrimitiveType;
    }
    return undefined;
}
