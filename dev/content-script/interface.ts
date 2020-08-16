/** 所有站点的DOM样式设置 */
interface StyleStore {
  host: string;
  settings: SingleDOMSetting[];
}

/** 单个DOM的设置信息 */
interface SingleDOMSetting {
  /** DOM的父结点路径, 不包含body */
  path: Path[];
  /** CSS的键值对 */
  css: CssSetting[];
}
/** key: 样式名, value: 样式值 */
interface CssSetting {
  key: string;
  value: string;
}

/** DOM的id、class、序号(从1开始) */
interface Path {
  id: string;
  cls: string;
  index: number;
}
