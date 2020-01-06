/// XCell Cocos Plugin
/// XCell integration for Cocos Creator

import XCell from '@game-gpt/xcell';

/**
 * XCell Cocos Plugin
 * 为 Cocos Creator 提供 XCell 集成功能
 */
export class XCellCocos {
  private static _instance: XCellCocos | null = null;
  private _initialized: boolean = false;

  /**
   * 获取 XCellCocos 单例实例
   * @returns XCellCocos 实例
   */
  static getInstance(): XCellCocos {
    if (!this._instance) {
      this._instance = new XCellCocos();
    }
    return this._instance;
  }

  /**
   * 初始化 XCell Cocos 插件
   * @param wasmPath WASM 模块路径
   * @returns 初始化是否成功
   */
  async init(wasmPath?: string): Promise<boolean> {
    try {
      await XCell.init(wasmPath);
      this._initialized = true;
      console.log('XCell Cocos Plugin initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize XCell Cocos Plugin:', error);
      this._initialized = false;
      return false;
    }
  }

  /**
   * 检查插件是否已初始化
   * @returns 是否已初始化
   */
  isInitialized(): boolean {
    return this._initialized;
  }

  /**
   * 处理表格数据
   * @param data 表格数据
   * @returns 处理后的结果
   */
  async processTable(data: any): Promise<any> {
    if (!this._initialized) {
      await this.init();
    }
    return XCell.processTable(data);
  }

  /**
   * 验证表格数据
   * @param data 表格数据
   * @returns 验证结果
   */
  async validateTable(data: any): Promise<boolean> {
    if (!this._initialized) {
      await this.init();
    }
    return XCell.validateTable(data);
  }

  /**
   * 测试 WASI 模块
   * @returns 测试结果
   */
  async testWasi(): Promise<string> {
    if (!this._initialized) {
      await this.init();
    }
    return XCell.testWasi();
  }

  /**
   * 处理表格文件
   * @param source 源文件路径
   * @param output 输出文件路径
   */
  async processTableFile(source?: string, output?: string): Promise<void> {
    if (!this._initialized) {
      await this.init();
    }
    return XCell.processTableFile(source, output);
  }

  /**
   * 验证表格文件
   * @param source 源文件路径
   */
  async validateTableFile(source?: string): Promise<void> {
    if (!this._initialized) {
      await this.init();
    }
    return XCell.validateTableFile(source);
  }

  /**
   * 加载表格数据到 Cocos 场景
   * @param data 表格数据
   * @param scene 场景节点
   */
  async loadTableToScene(data: any, scene: any): Promise<void> {
    if (!this._initialized) {
      await this.init();
    }
    
    // 这里可以添加将表格数据加载到 Cocos 场景的逻辑
    console.log('Loading table data to Cocos scene:', data);
    // 示例：遍历数据并创建对应的游戏对象
  }

  /**
   * 从 Cocos 场景导出表格数据
   * @param scene 场景节点
   * @returns 导出的表格数据
   */
  async exportTableFromScene(scene: any): Promise<any> {
    if (!this._initialized) {
      await this.init();
    }
    
    // 这里可以添加从 Cocos 场景导出表格数据的逻辑
    console.log('Exporting table data from Cocos scene');
    // 示例：遍历场景节点并生成表格数据
    return {};
  }
}
