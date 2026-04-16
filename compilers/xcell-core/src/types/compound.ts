import type { XCellPrimitiveType } from "./primitive";
import type { XCellTyped } from "./unified";

/**
 * 动态数组类型 `[T]`
 */
export interface ArrayType {
    /** 数组元素类型 */
    elementType: XCellTyped;
}

/**
 * 静态数组类型 `[T; N]`
 */
export interface StaticArrayType {
    /** 数组元素类型 */
    elementType: XCellTyped;
    /** 数组固定长度 */
    length: number;
}

/**
 * 向量类型 `Vec<T>`
 */
export interface VecType {
    /** 向量元素类型 */
    elementType: XCellTyped;
}

/**
 * 二维向量类型
 */
export interface Vec2Type {
    /** 向量元素的基础类型 */
    elementType: XCellPrimitiveType;
}

/**
 * 三维向量类型
 */
export interface Vec3Type {
    /** 向量元素的基础类型 */
    elementType: XCellPrimitiveType;
}

/**
 * 四维向量类型
 */
export interface Vec4Type {
    /** 向量元素的基础类型 */
    elementType: XCellPrimitiveType;
}

/**
 * 哈希映射类型 `HashMap<K, V>` 或 `dict<K, V>`
 */
export interface HashMapType {
    /** 键类型 */
    keyType: XCellTyped;
    /** 值类型 */
    valueType: XCellTyped;
}

/**
 * 元组类型 `(T1, T2, ...)`
 */
export interface TupleType {
    /** 元组各元素的类型列表 */
    elementTypes: XCellTyped[];
}
