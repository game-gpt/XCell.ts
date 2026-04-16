/**
 * Mock type definitions for testing
 */

/**
 * Mock field definition
 */
export interface MockField {
    /**
     * Field name
     */
    name: string;
    
    /**
     * Field type name
     */
    type: string;
    
    /**
     * Whether the field is optional
     */
    optional?: boolean;
    
    /**
     * Default value for the field
     */
    defaultValue?: unknown;
}

/**
 * Mock class definition
 */
export interface MockClass {
    /**
     * Class name
     */
    name: string;
    
    /**
     * Class fields
     */
    fields: MockField[];
    
    /**
     * Parent class name (if any)
     */
    parent?: string;
}

/**
 * Mock enum variant
 */
export interface MockEnumVariant {
    /**
     * Variant name
     */
    name: string;
    
    /**
     * Variant value
     */
    value?: number | string;
}

/**
 * Mock enum definition
 */
export interface MockEnum {
    /**
     * Enum name
     */
    name: string;
    
    /**
     * Enum variants
     */
    variants: MockEnumVariant[];
}
