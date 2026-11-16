/* 随机事件池
   字段说明：
   - weekday: 星期几触发（1=周一 … 7=周日），周二/四/六才有意义
   - period:  哪个时段触发（"早" / "中" / "晚"）
   - minDay:  至少第几天才会出现（避免第一周）
   - condition: 额外条件（函数，返回 true 才触发），可省略
*/

const RANDOM_EVENTS = [

  // 第 2 周周二晚上，雨夜事件
  {
    id: "evt_rain",
    weekday: 2,
    period: "晚",
    minDay: 8,
    text:
      "夜里忽然下起了雨。\n" +
      "你站在屋檐下，看见林晚小跑过来，头发被淋湿了一半。\n" +
      "她看见你，愣了一下，然后笑着靠过来避雨。",
    choices: [
      {
        text: "把外套递给她",
        affection: { lin: 5 },
        mood:      { joy: 8 }
      },
      {
        text: "假装没看见",
        mood:      { numbness: 5 }
      }
    ]
  },

  // 也是第 2 周周二晚上，条件一样 → 和上面随机二选一
  {
    id: "evt_kitchen",
    weekday: 2,
    period: "晚",
    minDay: 8,
    text:
      "深夜，你饿得睡不着，摸黑去了厨房。\n" +
      "冰箱前已经站着一个人——苏念。\n" +
      "她手里拿着一盒牛奶，看见你，挑了挑眉。",
    choices: [
      {
        text: "走过去开冰箱",
        affection: { su: 3 },
        mood:      { joy: 5 }
      },
      {
        text: "默默退回房间",
        mood:      { numbness: 3 }
      }
    ]
  },

  // 第 2 周周四中午，需要林晚好感度 ≥ 20
  {
    id: "evt_lin_gift",
    weekday: 4,
    period: "中",
    minDay: 8,
    condition: (s) => (s.affection.lin || 0) >= 20,
    text:
      "林晚趁没人注意，塞给你一个小盒子。\n" +
      "「昨天逛街看到的，觉得适合你。」\n" +
      "她说完就转身走了，耳尖有点红。",
    choices: [
      {
        text: "当场打开",
        affection: { lin: 4 },
        mood:      { joy: 10 }
      },
      {
        text: "先收起来",
        mood:      { numbness: 2 }
      }
    ]
  }

];
