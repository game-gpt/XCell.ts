/// XCell Runtime
/// TypeScript runtime utilities for XCell

import { instantiate, type Root } from "../lib/xcell_wasi.js";
import * as preview2Shim from "@bytecodealliance/preview2-shim";

/**
 * XCell WASM 模块加载状态
 */
export enum XCellLoadStatus {
  /** 空闲，尚未开始加载 */
  idle = "idle",
  /** 正在加载中 */
  loading = "loading",
  /** 加载完成，已就绪 */
  ready = "ready",
  /** 加载失败 */
  error = "error",
}

/**
 * XCell 初始化选项
 */
export interface XCellInitOptions {
  /** 自定义 WASM 模块路径 */
  wasmPath?: string;
  /** 加载进度回调 */
  onProgress?: (status: XCellLoadStatus) => void;
  /** 错误回调 */
  onError?: (error: Error) => void;
}

/**
 * XCell 运行时，提供 WASM 模块加载与表格数据处理能力
 */
export class XCell {
  private static _root: Root | null = null;
  private static _initPromise: Promise<void> | null = null;
  private static _vmId: number | null = null;
  private static _status: XCellLoadStatus = XCellLoadStatus.idle;

  /**
   * 当前 WASM 模块加载状态
   */
  static get status(): XCellLoadStatus {
    return this._status;
  }

  /**
   * 初始化 XCell 运行时，加载并实例化 WASM 模块。
   * 支持传入字符串作为 WASM 路径（向后兼容），或传入完整的初始化选项对象。
   * 加载失败时自动重试，最多 3 次，重试间隔依次为 1s、2s、4s。
   * @param options 初始化选项或 WASM 模块路径字符串
   */
  static async init(options?: XCellInitOptions | string): Promise<void> {
    if (this._root) return;
    if (this._initPromise) return this._initPromise;

    const opts: XCellInitOptions =
      typeof options === "string" ? { wasmPath: options } : options ?? {};

    this._initPromise = this._initWithRetry(opts);
    await this._initPromise;
  }

  /**
   * 带自动重试的初始化实现
   */
  private static async _initWithRetry(opts: XCellInitOptions): Promise<void> {
    const maxRetries = 3;
    const delays = [1000, 2000, 4000];
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          console.log(`Retrying WASM load (attempt ${attempt}/${maxRetries})...`);
          await this._sleep(delays[attempt - 1]);
        }

        this._setStatus(XCellLoadStatus.loading, opts);
        await this._loadWasm(opts);
        this._setStatus(XCellLoadStatus.ready, opts);
        return;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        console.error(`WASM load attempt ${attempt + 1} failed:`, lastError.message);
        opts.onError?.(lastError);
      }
    }

    this._setStatus(XCellLoadStatus.error, opts);
    throw lastError;
  }

  /**
   * 执行 WASM 模块的加载与实例化
   */
  private static async _loadWasm(opts: XCellInitOptions): Promise<void> {
    const modules = new Map<string, WebAssembly.Module>();

    const wasmUrl = opts.wasmPath ?? "../lib/xcell_wasi.wasm";
    const res = await fetch(wasmUrl);
    const buf = await res.arrayBuffer();
    const mod = await WebAssembly.compile(buf);
    modules.set("xcell_wasi.wasm", mod);

    console.log("WASM module loaded successfully");

    this._root = await instantiate(
      (path: string) => modules.get(path)!,
      preview2Shim as any,
    );

    console.log("WASI module instantiated successfully");

    this._vmId = await this._wasi.createVm();
    console.log("VM instance created successfully");
  }

  /**
   * 更新加载状态并触发回调
   */
  private static _setStatus(status: XCellLoadStatus, opts: XCellInitOptions): void {
    this._status = status;
    opts.onProgress?.(status);
  }

  /**
   * 延时辅助方法
   */
  private static _sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * 获取 XCell WASI 接口
   */
  private static get _wasi() {
    if (!this._root) {
      throw new Error("XCell not initialized.");
    }
    return this._root.xcellWasi;
  }

  /**
   * 处理表格数据
   * @param data 表格数据
   * @returns 处理后的结果
   */
  static async processTable(data: any): Promise<any> {
    await this.init();
    const dataStr = JSON.stringify(data);
    const result = await this._wasi.processData(this._vmId, dataStr);
    return JSON.parse(result);
  }

  /**
   * 验证表格数据
   * @param data 表格数据
   * @returns 验证结果
   */
  static async validateTable(data: any): Promise<boolean> {
    await this.init();
    const dataStr = JSON.stringify(data);
    await this._wasi.validateTable(dataStr);
    return true;
  }

  /**
   * 测试 WASI 模块
   * @returns 测试结果
   */
  static async testWasi(): Promise<string> {
    await this.init();
    return this._wasi.hello();
  }

  /**
   * 处理表格文件
   * @param source 源文件路径
   * @param output 输出文件路径
   */
  static async processTableFile(source?: string, output?: string): Promise<void> {
    await this.init();
    await this._wasi.processTable(source, output);
  }

  /**
   * 验证表格文件
   * @param source 源文件路径
   */
  static async validateTableFile(source?: string): Promise<void> {
    await this.init();
    await this._wasi.validateTable(source);
  }
}

export default XCell;