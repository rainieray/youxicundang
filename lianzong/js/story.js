/* 前情提要 */
const PROLOGUE = {
  text:
    "你被临时拉来救场，成为这档恋爱综艺的替补嘉宾。\n" +
    "镜头前，六位同居者笑得温柔体贴；\n" +
    "镜头后，剧本、剪辑、热搜，一切都有人在暗中操控。\n\n" +
    "接下来的三十天，你的每一个选择，都会改写结局。",
  startLabel: "开始"
};

/* 剧情数据：键名 = "第几天-早/中/晚" */
const STORY = {

  "1-早": {
    text: "早上七点，别墅客厅。你是最后一个到的嘉宾。\n沙发上几个人同时抬起头看向你。",
    choices: [
      {
        text: "主动向大家问好",
        affection: { lin: 2, su: 1 },
        mood:      { joy: 10, numbness: -5 }
      },
      {
        text: "安静地坐到角落",
        mood:      { numbness: 8, joy: -5 }
      }
    ]
  },

  "1-中": {
    text: "午饭时间，厨房里只剩你和林晚。\n她端着一摞盘子，回头看了你一眼。",
    choices: [
      {
        text: "上前帮她递盘子",
        affection: { lin: 3 },
        mood:      { joy: 8 }
      },
      {
        text: "假装没看见",
        mood:      { numbness: 5, pain: 3 }
      }
    ]
  },

  "1-晚": {
    text: "晚上，节目组宣布：今晚要匿名投票，选出「最心动对象」。\n你握着那张小卡片，笔尖悬在半空。",
    choices: [
      {
        text: "投给林晚",
        affection: { lin: 2 },
        mood:      { joy: 6 }
      },
      {
        text: "投给苏念",
        affection: { su: 2 },
        mood:      { joy: 6 }
      },
      {
        text: "弃权",
        mood:      { pain: 10, numbness: 5 }
      }
    ]
  }

};
