import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      history: "HISTORY",
      editor: "EDITOR",
      preview: "PREVIEW",
      saveConfig: "SAVE CONFIG",
      export: "EXPORT",
      editConfig: "EDIT CONFIG",
      
      sessionHistory: "Session History",
      noSessions: "No timer sessions recorded yet.",
      completeTimer: "Complete a timer to see it here.",
      clearHistory: "Clear History",
      deleteEntry: "Delete Entry",
      
      studioTools: "Studio Tools",
      templates: "Templates",
      pomodoro: "Pomodoro",
      minimalist: "Minimalist",
      gamerNeon: "Gamer Neon",
      professional: "Professional",
      workout: "Workout",
      cooking: "Cooking",
      
      componentLibrary: "Component Library",
      numbersClock: "Numbers/Clock",
      playPauseBtn: "Play/Pause Button",
      resetBtn: "Reset Button",
      skipBtn: "Skip Button",
      labelText: "Label/Text",
      imageIcon: "Image/Icon",
      
      styleConfig: "Style Configuration",
      timerType: "Timer Type",
      countdown: "Countdown",
      countup: "Count-up",
      primaryFont: "Primary Font",
      displaySize: "Display Size",
      colorTheme: "Color Theme",
      cornerRadius: "Corner Radius",
      durationMin: "Countdown Duration (Min)",
      audioAlerts: "Audio & Alerts",
      start: "Start",
      finish: "Finish",
      custom: "Custom",
      none: "None",
      proTip: "Pro Tip",
      proTipDesc: "Drag components directly from the canvas to reposition them. Adjust visual elements above."
    }
  },
  pt: {
    translation: {
      history: "HISTÓRICO",
      editor: "EDITOR",
      preview: "PRÉVIA",
      saveConfig: "SALVAR CONFIG",
      export: "EXPORTAR",
      editConfig: "EDITAR CONFIG",
      
      sessionHistory: "Histórico de Sessões",
      noSessions: "Nenhuma sessão registrada ainda.",
      completeTimer: "Complete um cronômetro para ver aqui.",
      clearHistory: "Limpar Histórico",
      deleteEntry: "Excluir Entrada",
      
      studioTools: "Ferramentas do Estúdio",
      templates: "Modelos",
      pomodoro: "Pomodoro",
      minimalist: "Minimalista",
      gamerNeon: "Gamer Neon",
      professional: "Profissional",
      workout: "Treino",
      cooking: "Culinária",
      
      componentLibrary: "Biblioteca de Componentes",
      numbersClock: "Números/Relógio",
      playPauseBtn: "Botão Play/Pause",
      resetBtn: "Botão Resetar",
      skipBtn: "Botão Pular",
      labelText: "Rótulo/Texto",
      imageIcon: "Imagem/Ícone",
      
      styleConfig: "Configuração de Estilo",
      timerType: "Tipo de Cronômetro",
      countdown: "Contagem Regressiva",
      countup: "Contagem Progressiva",
      primaryFont: "Fonte Principal",
      displaySize: "Tamanho de Exibição",
      colorTheme: "Tema de Cores",
      cornerRadius: "Arredondamento",
      durationMin: "Duração (Min)",
      audioAlerts: "Áudio e Alertas",
      start: "Início",
      finish: "Fim",
      custom: "Personalizado",
      none: "Nenhum",
      proTip: "Dica Pro",
      proTipDesc: "Arraste os componentes diretamente da tela para reposicioná-los. Ajuste os elementos visuais acima."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
