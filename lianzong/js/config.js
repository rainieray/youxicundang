const CONFIG = {

  // 可攻略角色
  characters: [
    { id: "lin", name: "林晚", init: 12 },
    { id: "su",  name: "苏念", init: 15 }
  ],

  // 心情（三种状态）
  moods: [
    { id: "numbness", name: "麻木", cls: "mood-numbness", init: 40 },
    { id: "pain",     name: "痛苦", cls: "mood-pain",     init: 20 },
    { id: "joy",      name: "快乐", cls: "mood-joy",      init: 60 }
  ],

  // 好感度 → 描述
  affectionTiers: [
    { min: 0,   max: 9,   label: "陌生" },
    { min: 10,  max: 29,  label: "认识" },
    { min: 30,  max: 49,  label: "熟悉" },
    { min: 50,  max: 69,  label: "暧昧" },
    { min: 70,  max: 89,  label: "心动" },
    { min: 90,  max: 100, label: "深爱" }
  ],

  // 时间系统
  firstWeekday: 1,   // 第1天是星期几：1=周一 … 7=周日
  weekdays: ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"],
  weatherPool: ["晴", "多云", "阴", "小雨", "晴转多云"]

};
