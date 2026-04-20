const SAVE_KEY = "otome_save_v1";

// sauvegarde par défaut
function getDefaultSave() {
  return {
    playerSeenIntro: false,
    unlockedChapters: [1],
    currentChapter: 1,
    currentScene: 0
  };
}

// charger save
function loadSave() {
  const data = localStorage.getItem(SAVE_KEY);

  if (!data) return getDefaultSave();

  try {
    return JSON.parse(data);
  } catch (e) {
    localStorage.removeItem(SAVE_KEY);
    return getDefaultSave();
  }
}

// sauvegarder
function saveGame(data) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

// progression
function updateProgress(chapter, scene) {
  let save = loadSave();

  save.currentChapter = chapter;
  save.currentScene = scene;

  if (!save.unlockedChapters.includes(chapter + 1)) {
    save.unlockedChapters.push(chapter + 1);
  }

  saveGame(save);
}