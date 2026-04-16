import type { XCellPrimitiveType } from "./primitive";
import type { ArrayType, StaticArrayType, VecType, Vec2Type, Vec3Type, Vec4Type, HashMapType, TupleType } from "./compound";
import type { ColorType, DateTimeType, TimeType, DateType, ReferenceType, UniqueType, PrimaryType } from "./special";
import type { EnumType, ClassType } from "./custom";

/**
 * XCell 统一类型描述，使用可辨识联合类型表示所有可能的类型
 */
export type XCellTyped =
    | { kind: "primitive"; primitive: XCellPrimitiveType }
    | { kind: "array" } & ArrayType
    | { kind: "staticArray" } & StaticArrayType
    | { kind: "vec" } & VecType
    | { kind: "vec2" } & Vec2Type
    | { kind: "vec3" } & Vec3Type
    | { kind: "vec4" } & Vec4Type
    | { kind: "hashMap" } & HashMapType
    | { kind: "tuple" } & TupleType
    | { kind: "color" } & ColorType
    | { kind: "datetime" } & DateTimeType
    | { kind: "time" } & TimeType
    | { kind: "date" } & DateType
    | { kind: "reference" } & ReferenceType
    | { kind: "unique" } & UniqueType
    | { kind: "primary" } & PrimaryType
    | { kind: "enum" } & EnumType
    | { kind: "class" } & ClassType;

/**
 * 类型元信息，携带额外的元属性
 */
export interface TypeMetaInfo {
    /** 是否为主键 */
    primary?: boolean;
    /** 是否唯一 */
    unique?: boolean;
    /** 默认值的字符串表示 */
    defaultValue?: string | undefined;
    /** 数值最小值 */
    min?: number | undefined;
    /** 数值最大值 */
    max?: number | undefined;
    /** 是否为虚拟字段 */
    virtual?: boolean;
    /** 是否为计算字段 */
    computed?: boolean;
    /** 计算表达式 */
    computedExpression?: string | undefined;
}
