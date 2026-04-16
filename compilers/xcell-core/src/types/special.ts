import type { XCellTyped } from "./unified";

/**
 * 颜色类型
 */
export interface ColorType {}

/**
 * 日期时间类型
 */
export interface DateTimeType {}

/**
 * 时间类型
 */
export interface TimeType {}

/**
 * 日期类型
 */
export interface DateType {}

/**
 * 引用类型 `&T`，引用另一张配置表
 */
export interface ReferenceType {
    /** 引用目标表的名称 */
    targetTable: string;
}

/**
 * 唯一约束类型 `@T`，标记字段值必须唯一
 */
export interface UniqueType {
    /** 被约束的内部类型 */
    innerType: XCellTyped;
}

/**
 * 主键约束类型 `@@T`，标记字段为主键
 */
export interface PrimaryType {
    /** 被约束的内部类型 */
    innerType: XCellTyped;
}
