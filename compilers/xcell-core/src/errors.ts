/**
 * XCell 错误基类
 */
export class XCellError extends Error {
    /** 错误码 */
    code: string;

    constructor(message: string, code: string) {
        super(message);
        this.name = "XCellError";
        this.code = code;
    }
}

/**
 * XCell 类型错误，用于类型相关的错误
 */
export class XCellTypeError extends XCellError {
    constructor(message: string) {
        super(message, "TYPE_ERROR");
        this.name = "XCellTypeError";
    }
}

/**
 * XCell 值错误，用于值相关的错误
 */
export class XCellValueError extends XCellError {
    constructor(message: string) {
        super(message, "VALUE_ERROR");
        this.name = "XCellValueError";
    }
}

/**
 * XCell 验证错误，用于校验相关的错误
 */
export class XCellValidationError extends XCellError {
    constructor(message: string) {
        super(message, "VALIDATION_ERROR");
        this.name = "XCellValidationError";
    }
}
