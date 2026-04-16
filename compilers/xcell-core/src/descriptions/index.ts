import type { XCellTyped } from "../types/unified";
import type { XCellPrimitiveType } from "../types/primitive";
import type { XCellValue } from "../values/index";

/**
 * 整数类型种类
 */
export enum IntegerKind {
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
}

/**
 * 小数类型种类
 */
export enum DecimalKind {
    /** 32 位浮点数 */
    F32 = "F32",
    /** 64 位浮点数 */
    F64 = "F64",
    /** 高精度十进制数 */
    Decimal = "Decimal",
}

/**
 * 整数类型描述
 */
export interface IntegerDescription {
    /** 整数种类 */
    kind: IntegerKind;
    /** 默认值 */
    defaultValue?: number;
}

/**
 * 小数类型描述
 */
export interface DecimalDescription {
    /** 小数种类 */
    kind: DecimalKind;
    /** 默认值 */
    defaultValue?: number;
}

/**
 * 布尔类型描述
 */
export interface BooleanDescription {
    /** 接受的值列表 */
    acceptValues?: string[];
    /** 拒绝的值列表 */
    rejectValues?: string[];
}

/**
 * 字符串类型描述
 */
export interface StringDescription {
    /** 默认值 */
    defaultValue?: string;
}

/**
 * 数组类型描述
 */
export interface ArrayDescription {
    /** 数组元素类型 */
    elementType: XCellTyped;
}

/**
 * 向量类型描述
 */
export interface VectorDescription {
    /** 向量元素的基础类型 */
    elementType: XCellPrimitiveType;
    /** 向量维度 */
    dimension: 2 | 3 | 4;
}

/**
 * 颜色类型描述
 */
export interface ColorDescription {}

/**
 * 时间类型描述
 */
export interface TimeDescription {
    /** 时间变体 */
    variant: "datetime" | "time" | "date";
}

/**
 * 引用类型描述
 */
export interface ReferenceDescription {
    /** 引用目标表的名称 */
    targetTable: string;
}

/**
 * 枚举值
 */
export interface EnumerateValue {
    /** 枚举值 ID */
    id: number;
    /** 枚举值名称 */
    name: string;
    /** 枚举值附加数据 */
    data: Map<string, XCellValue>;
}

/**
 * 枚举类型描述
 */
export interface EnumerateDescription {
    /** 枚举名称 */
    name: string;
    /** 枚举值映射 */
    values: Map<string, EnumerateValue>;
}
