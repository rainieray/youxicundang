(function () {

  const PERIODS = ["早", "中", "晚"];

  const state = {
    phase: "prologue",   // prologue | playing | ending | ending-result
    day: 1,
    period: 0,
    weather: "晴",
    route: null,         // null=共线；"lin"/"su"=分线
    currentEvent: null,
    currentEnding: null,
    affection: {},
    mood: {}
  };

  const elHudDay     = document.getElementById("hud-day");
  const elHudWeekday = document.getElementById("hud-weekday");
  const elHudWeather = document.getElementById("hud-weather");
  const elStoryText  = document.getElementById("story-text");
  const elChoices    = document.getElementById("choices");
  const elAffection  = document.getElementById("affection");
  const elMoodRows   = document.getElementById("mood-rows");

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  function randomWeather() {
    return CONFIG.weatherPool[Math.floor(Math.random() * CONFIG.weatherPool.length)];
  }

  function weekdayOf(day) {
    const idx = (day - 1 + CONFIG.firstWeekday - 1) % 7;
    return CONFIG.weekdays[idx];
  }

  function weekdayNumOf(day) {
    return (day - 1 + CONFIG.firstWeekday - 1) % 7 + 1;
  }

  function getAffDesc(value) {
    for (const t of CONFIG.affectionTiers) {
      if (value >= t.min && value <= t.max) return t.label;
    }
    return "";
  }

  function initState() {
    CONFIG.characters.forEach(c => { state.affection[c.id] = c.init || 0; });
    CONFIG.moods.forEach(m => { state.mood[m.id] = m.init || 0; });
  }

  /* ===== 分线判定：取好感度最高的角色 ===== */
  function decideRoute() {
    let best = null;
    let bestVal = -1;
    CONFIG.characters.forEach(c => {
      const v = state.affection[c.id] || 0;
      if (v > bestVal) { bestVal = v; best = c.id; }
    });
    return best;
  }

  function routeName() {
    if (!state.route) return "";
    const c = CONFIG.characters.find(x => x.id === state.route);
    return c ? c.name + "线" : "";
  }

  /* ===== 随机事件匹配 ===== */
  function pickRandomEvent() {
    if (state.phase !== "playing") return null;
    if (state.day <= 7) return null;

    const wd = weekdayNumOf(state.day);
    if (![2, 4, 6].includes(wd)) return null;

    const periodName = PERIODS[state.period];

    const matched = RANDOM_EVENTS.filter(e => {
      if (e.weekday !== undefined && e.weekday !== wd) return false;
      if (e.period  !== undefined && e.period !== periodName) return false;
      if (e.minDay  && state.day < e.minDay) return false;
      if (typeof e.condition === "function" && !e.condition(state)) return false;
      return true;
    });

    if (matched.length === 0) return null;
    return matched[Math.floor(Math.random() * matched.length)];
  }

  function getEventForCurrentSlot() {
    if (state.currentEvent &&
        state.currentEvent.day === state.day &&
        state.currentEvent.period === state.period) {
      return state.currentEvent.data;
    }
    const picked = pickRandomEvent();
    state.currentEvent = picked
      ? { day: state.day, period: state.period, data: picked }
      : null;
    return picked;
  }

  /* ===== 当前时段该读哪段剧情 ===== */
  function getScene() {
    const key = `${state.day}-${PERIODS[state.period]}`;

    // 分线阶段
    if (state.day >= 15 && state.route && ROUTES[state.route]) {
      return ROUTES[state.route].story[key];
    }
    // 共线阶段
    return STORY[key];
  }

  /* ===== 渲染 ===== */

  function renderHud() {
    if (state.phase === "prologue") {
      elHudDay.textContent = "前情提要";
      elHudWeekday.textContent = "";
      elHudWeather.textContent = "";
      return;
    }
    if (state.phase === "ending" || state.phase === "ending-result") {
      elHudDay.textContent = "结局";
      elHudWeekday.textContent = "";
      elHudWeather.textContent = "";
      return;
    }

    elHudDay.textContent = `第 ${state.day} 天`;
    elHudWeekday.textContent = weekdayOf(state.day);
    elHudWeather.textContent = state.weather;
  }

  function renderStory() {
    elChoices.innerHTML = "";

    /* 前情提要 */
    if (state.phase === "prologue") {
      elStoryText.textContent = PROLOGUE.text;
      const btn = document.createElement("button");
      btn.className = "choice-btn primary";
      btn.textContent = PROLOGUE.startLabel || "开始";
      btn.addEventListener("click", startGame);
      elChoices.appendChild(btn);
      return;
    }

    /* 结局选择 */
    if (state.phase === "ending") {
      renderEndingChoice();
      return;
    }

    /* 结局展示 */
    if (state.phase === "ending-result") {
      renderEndingResult();
      return;
    }

    /* 正常剧情：随机事件优先 */
    const randomEvent = getEventForCurrentSlot();
    let scene;
    let label = "";

    if (randomEvent) {
      scene = randomEvent;
      label = "【随机事件】";
    } else {
      scene = getScene();
      if (!scene) {
        const key = `${state.day}-${PERIODS[state.period]}`;
        elStoryText.textContent = `（${key} 的剧情还没写～）`;
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.textContent = "继续";
        btn.addEventListener("click", advance);
        elChoices.appendChild(btn);
        return;
      }
      if (state.day >= 15 && state.route) {
        label = `【${routeName()}】`;
      }
    }

    elStoryText.textContent = label + scene.text;

    const choices = (scene.choices && scene.choices.length)
      ? scene.choices
      : [{ text: "继续" }];

    choices.forEach((c, i) => {
      const btn = document.createElement("button");
      btn.className = "choice-btn" + (i === 0 ? " primary" : "");
      btn.textContent = c.text;
      btn.addEventListener("click", () => applyChoice(c));
      elChoices.appendChild(btn);
    });
  }

  /* ===== 结局选择：显示达标按钮 ===== */
  function renderEndingChoice() {
    elStoryText.textContent =
      "三十天的同居生活结束了。\n" +
      "你最终的心意，会走向谁？";

    const available = ENDINGS.filter(e => {
      const v = state.affection[e.character] || 0;
      return v >= e.require;
    });

    if (available.length === 0) {
      const tip = document.createElement("button");
      tip.className = "choice-btn";
      tip.textContent = "好感度不足，未能解锁任何结局";
      tip.disabled = true;
      elChoices.appendChild(tip);
      return;
    }

    available.forEach(e => {
      const btn = document.createElement("button");
      btn.className = "choice-btn primary";
      btn.textContent = `${e.label}（需要 ${e.require}）`;
      btn.addEventListener("click", () => {
        state.phase = "ending-result";
        state.currentEnding = e;
        render();
      });
      elChoices.appendChild(btn);
    });
  }

  /* ===== 结局展示 ===== */
  function renderEndingResult() {
    elStoryText.textContent = state.currentEnding.text;
    const btn = document.createElement("button");
    btn.className = "choice-btn primary";
    btn.textContent = "重新开始";
    btn.addEventListener("click", () => location.reload());
    elChoices.appendChild(btn);
  }

  function renderAffection() {
    elAffection.innerHTML = "";
    if (state.phase === "prologue") return;
    CONFIG.characters.forEach(c => {
      const v = state.affection[c.id];
      const line = document.createElement("div");
      line.className = "aff-line";
      line.innerHTML =
        `${c.name} 好感度：<b>${v}</b>/100 ` +
        `<span class="aff-desc">（${getAffDesc(v)}）</span>`;
      elAffection.appendChild(line);
    });
  }

  function renderMood() {
    elMoodRows.innerHTML = "";
    if (state.phase === "prologue") return;
    CONFIG.moods.forEach(m => {
      const v = state.mood[m.id];
      const row = document.createElement("div");
      row.className = "mood-row";
      row.innerHTML = `
        <span class="mood-name">${m.name}</span>
        <div class="mood-bar">
          <div class="mood-fill ${m.cls}" style="width:${v}%;"></div>
        </div>
        <span class="mood-num">${v}</span>
      `;
      elMoodRows.appendChild(row);
    });
  }

  function render() {
    renderHud();
    renderStory();
    renderAffection();
    renderMood();
  }

  /* ===== 逻辑 ===== */

  function applyChoice(choice) {
    if (choice.affection) {
      for (const k in choice.affection) {
        state.affection[k] = clamp((state.affection[k] || 0) + choice.affection[k], 0, 100);
      }
    }
    if (choice.mood) {
      for (const k in choice.mood) {
        state.mood[k] = clamp((state.mood[k] || 0) + choice.mood[k], 0, 100);
      }
    }
    advance();
  }

  function advance() {
    state.currentEvent = null;
    state.period += 1;

    if (state.period >= 3) {
      state.period = 0;
      state.day += 1;
      state.weather = randomWeather();

      // 第15天：自动分线
      if (state.day === 15 && !state.route) {
        state.route = decideRoute();
      }

      // 第29天（即第28天结束）：进入结局阶段
      if (state.day === 29) {
        state.phase = "ending";
        state.period = 0;
      }
    }
    render();
  }

  function startGame() {
    state.phase = "playing";
    state.day = 1;
    state.period = 0;
    state.weather = randomWeather();
    state.currentEvent = null;
    state.route = null;
    render();
  }

  initState();
  render();

  /* ===== 调试接口 ===== */
  window.__game = {
    state,
    advance,
    render,
    jump(day, period) {
      state.day = day;
      state.period = period;
      state.weather = randomWeather();
      state.currentEvent = null;

      // 跳到第15天以上时自动分线
      if (day >= 15 && !state.route) {
        state.route = decideRoute();
      }
      // 跳到第29天以上时进入结局
      if (day >= 29) {
        state.phase = "ending";
      } else if (state.phase !== "playing") {
        state.phase = "playing";
      }
      render();
    },
    setAff(id, value) {
      state.affection[id] = clamp(value, 0, 100);
      render();
    },
    setRoute(id) {
      state.route = id;
      render();
    }
  };

})();
