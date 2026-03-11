
export interface LicenseConfig {
  /** 是否启用文章顶部许可证信息显示 */
  enable: boolean;
  /** 许可证名称 */
  name: string;
  /** 许可证链接 */
  url: string;
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: "CC BY-NC-SA 4.0",
  url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};
