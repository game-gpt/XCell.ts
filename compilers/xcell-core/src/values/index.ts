/**
 * XCell 颜色值
 */
export interface XCellColorValue {
    /** 红色通道 (0-255) */
    r: number;
    /** 绿色通道 (0-255) */
    g: number;
    /** 蓝色通道 (0-255) */
    b: number;
    /** 透明度通道 (0-255) */
    a: number;
}

/**
 * XCell 时间值
 */
export interface XCellTimeValue {
    /** 小时 (0-23) */
    hour: number;
    /** 分钟 (0-59) */
    minute: number;
    /** 秒 (0-59) */
    second: number;
}

/**
 * XCell 日期值
 */
export interface XCellDateValue {
    /** 年 */
    year: number;
    /** 月 (1-12) */
    month: number;
    /** 日 (1-31) */
    day: number;
}

/**
 * XCell 日期时间值
 */
export interface XCellDateTimeValue extends XCellDateValue, XCellTimeValue {}

/**
 * XCell 二维向量值
 */
export interface XCellVec2Value {
    /** X 分量 */
    x: number;
    /** Y 分量 */
    y: number;
}

/**
 * XCell 三维向量值
 */
export interface XCellVec3Value {
    /** X 分量 */
    x: number;
    /** Y 分量 */
    y: number;
    /** Z 分量 */
    z: number;
}

/**
 * XCell 四维向量值
 */
export interface XCellVec4Value {
    /** X 分量 */
    x: number;
    /** Y 分量 */
    y: number;
    /** Z 分量 */
    z: number;
    /** W 分量 */
    w: number;
}

/**
 * XCell 单元格值类型
 */
export type XCellValue =
    | boolean
    | number
    | string
    | XCellValue[]
    | Map<XCellValue, XCellValue>
    | XCellColorValue
    | XCellTimeValue
    | XCellVecValue
    | null;

/**
 * XCell 向量值联合类型
 */
export type XCellVecValue = XCellVec2Value | XCellVec3Value | XCellVec4Value;
