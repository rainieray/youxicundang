/* 分线剧情：第15天起，根据好感度自动进入对应角色的线 */

const ROUTES = {

  lin: {
    name: "林晚线",
    story: {

      "15-早": {
        text: "第15天，节目组重新分组。\n你和林晚被分到了同一组，任务是去超市采购晚餐食材。",
        choices: [
          { text: "主动推购物车",       affection: { lin: 3 }, mood: { joy: 5 } },
          { text: "让她决定买什么",     affection: { lin: 1 } }
        ]
      },

      "15-中": {
        text: "超市生鲜区，林晚蹲在货架前挑番茄。\n她回头问你：「你喜欢吃酸的还是甜的？」",
        choices: [
          { text: "「你挑的都喜欢」",   affection: { lin: 5 }, mood: { joy: 8 } },
          { text: "「随便」",           mood: { numbness: 3 } }
        ]
      },

      "15-晚": {
        text: "晚饭后，林晚在阳台吹风。\n她看见你，拍了拍身边的位置。",
        choices: [
          { text: "坐过去",             affection: { lin: 4 }, mood: { joy: 6 } },
          { text: "假装没看见",         mood: { numbness: 4 } }
        ]
      },

      "28-早": {
        text: "第28天，最后一天。\n林晚在客厅等你，手里拿着两张节目组发的纪念票根。",
        choices: [
          { text: "接过票根",           affection: { lin: 5 }, mood: { joy: 10 } },
          { text: "摇摇头",             mood: { pain: 8 } }
        ]
      },

      "28-中": {
        text: "午饭时，林晚一直没说话。\n快吃完时，她忽然开口：「最后一天了，你……有没有什么想说的？」",
        choices: [
          { text: "「有，很多。」",     affection: { lin: 6 }, mood: { joy: 10 } },
          { text: "「没有。」",         mood: { pain: 10 } }
        ]
      },

      "28-晚": {
        text: "最后一晚，所有人围坐在客厅。\n林晚坐在你旁边，手指悄悄碰了碰你的手背。",
        choices: [
          { text: "握住她的手",         affection: { lin: 8 }, mood: { joy: 12 } },
          { text: "收回手",             mood: { pain: 12 } }
        ]
      }

    }
  },

  su: {
    name: "苏念线",
    story: {

      "15-早": {
        text: "第15天，节目组重新分组。\n你和苏念被分到了同一组，任务是布置晚上的露天电影。",
        choices: [
          { text: "主动搬椅子",         affection: { su: 3 }, mood: { joy: 5 } },
          { text: "站在旁边看",         mood: { numbness: 3 } }
        ]
      },

      "15-中": {
        text: "苏念调试投影仪时卡住了。\n她皱着眉回头：「你懂这个吗？」",
        choices: [
          { text: "走过去帮忙",         affection: { su: 4 }, mood: { joy: 6 } },
          { text: "「我也不懂」",       mood: { numbness: 2 } }
        ]
      },

      "15-晚": {
        text: "电影放到一半，苏念悄悄往你这边靠了靠。\n夜风有点凉。",
        choices: [
          { text: "把外套给她",         affection: { su: 5 }, mood: { joy: 8 } },
          { text: "假装专注看电影",     mood: { numbness: 4 } }
        ]
      },

      "28-早": {
        text: "第28天，最后一天。\n苏念在厨房做早餐，看见你进来，把最后一杯咖啡推到你面前。",
        choices: [
          { text: "接过咖啡",           affection: { su: 5 }, mood: { joy: 10 } },
          { text: "「我不喝咖啡」",     mood: { pain: 6 } }
        ]
      },

      "28-中": {
        text: "午饭时，苏念坐在你对面，一直低头搅着碗里的汤。\n「最后一天了。」她轻声说。",
        choices: [
          { text: "「我知道。」",       affection: { su: 5 }, mood: { joy: 8 } },
          { text: "沉默",               mood: { pain: 8 } }
        ]
      },

      "28-晚": {
        text: "最后一晚，苏念站在门口，手里拎着行李箱。\n她回头看你：「你会记得我吗？」",
        choices: [
          { text: "「会，一直会。」",   affection: { su: 8 }, mood: { joy: 12 } },
          { text: "「……再见。」",     mood: { pain: 12 } }
        ]
      }

    }
  }

};
