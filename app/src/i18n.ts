export type SupportedLanguage = 'en' | 'es' | 'zh' | 'hi'

export interface LanguageOption {
  code: SupportedLanguage
  label: string
  nativeName: string
  flag: string
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'zh', label: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
]

export interface Translations {
  // Brand & Header
  appName: string
  appTagline: string
  navigation: string
  menu: string
  closeMenu: string
  backToTask: string
  studentAccount: string
  activeStatus: string
  signOut: string
  welcomeTour: string

  // Navigation Links
  navNowFocus: string
  navCalendar: string
  navAllSteps: string
  navEdStem: string
  navCanvas: string
  navSource: string
  navRejoin: string

  // Sensory & Audio Controls
  calmMode: string
  calmModeTitle: string
  calmOn: string
  calmOff: string
  calmDescription: string
  teacherAudio: string
  micLive: string
  micPaused: string
  pauseStream: string
  resumeStream: string
  audioDetails: string
  audioSyncInfo: string
  fontSize: string
  decreaseFont: string
  increaseFont: string
  language: string

  // Landing & Calendar Hub
  calendarTitle: string
  calendarSubtitle: string
  liveHeroBadge: string
  liveHeroTitle: string
  liveHeroTopic: string
  liveHeroLocation: string
  enterLiveClassCTA: string
  roomCodeLabel: string
  joinLiveBtn: string
  weekRange: string
  canvasConnected: string
  classesForDate: string
  liveNowBadge: string
  upcomingBadge: string
  topicLabel: string
  previewOutlineBtn: string
  classesCount: string
  liveClassCount: string

  // Triadic Working Memory Horizon
  workingMemoryHorizon: string
  checkpointLabel: string
  ofLabel: string
  completePct: string
  canvasWorksheetSync: string

  // Triadic Cards
  contextAnchorTitle: string
  contextAnchorSub: string
  activeDirectiveTitle: string
  activeDirectiveSub: string
  invariantConstraintsTitle: string
  invariantConstraintsSub: string

  // Checkpoint Action Buttons
  completeCheckpoint: string
  undoCheckpoint: string
  resynchronize: string
  verifyCheckpoint: string

  // Card Content & Hints
  canvasDueToday: string
  ambiguityWarning: string
  askInstructor: string
  questionCopiedAlert: string
  viewTAAnswer: string
  threadTitle: string
  technicalDetails: string
  onTheBoard: string

  // Current Lecture Copy (Synthetic Math 2B)
  lectureCourse: string
  lectureWhere: string
  lectureNext: string
  lectureNextCompleted: string
  lectureKeep: string

  // Rejoin Safe Catch-Up
  rejoinTitle: string
  rejoinSubtitle: string
  rejoinPrompt: string
  rejoinPlaceholder: string
  catchMeUpBtn: string
  recapHeading: string
  recapAudioSync: string
  recapText: string
  recapActionCue: string

  // EdStem Live Q&A
  edstemTitle: string
  edstemSubtitle: string
  askEdstemBtn: string
  taEndorsedTag: string
  modalTitle: string
  modalTagNotice: string
  modalPlaceholder: string
  cancelBtn: string
  postBtn: string

  // Overview Steps
  overviewTitle: string
  overviewSubtitle: string
  overviewProgress: string
  focusOnStep: string
  step1Title: string
  step1Desc: string
  step2Title: string
  step2Desc: string
  step3Title: string
  step3Desc: string
  step4Title: string
  step4Desc: string
  stepCompletedBadge: string
  stepCurrentBadge: string
  stepUpcomingBadge: string
  stepFinalBadge: string

  // Footer
  footerStandard: string
  footerCanvasApi: string
  footerEdstemSync: string
  footerContrast: string
  footerKeys: string
  footerDignity: string
}

export const translations: Record<SupportedLanguage, Translations> = {
  en: {
    appName: 'Bullseye',
    appTagline: 'Calmer, clearer classroom working-memory interface',
    navigation: 'Navigation',
    menu: 'Menu',
    closeMenu: 'Close navigation menu',
    backToTask: '← Back to Task Focus',
    studentAccount: 'Student Account',
    activeStatus: 'Active Session',
    signOut: 'Sign Out',
    welcomeTour: 'Welcome Tour',

    navNowFocus: 'Now Focus',
    navCalendar: 'Course Calendar & Live Class',
    navAllSteps: 'All Steps Overview (4)',
    navEdStem: 'EdStem Live Q&A',
    navCanvas: 'Canvas Assignment Hub',
    navSource: 'Original Teacher Source',
    navRejoin: 'Safe Rejoin Flow',

    calmMode: 'Sensory Calm',
    calmModeTitle: 'Calm Mode (key: c): freezes motion & background effects',
    calmOn: 'Calm: ON',
    calmOff: 'Calm: OFF',
    calmDescription: 'Zero-velocity freeze for neurodivergent focus',
    teacherAudio: 'Teacher Audio Stream',
    micLive: 'Prof. Chen · Live Sync',
    micPaused: 'Prof. Chen · Paused',
    pauseStream: 'Pause Audio Stream',
    resumeStream: 'Resume Audio Stream',
    audioDetails: '48kHz stereo · 42ms sync',
    audioSyncInfo: 'Real-time teacher speech extraction & checkpoint sync',
    fontSize: 'Text Size',
    decreaseFont: 'Decrease font size',
    increaseFont: 'Increase font size',
    language: 'Language',

    calendarTitle: 'Class Schedule & Live Class Hub',
    calendarSubtitle: 'Synced with Canvas LMS, Google Calendar & EdStem',
    liveHeroBadge: '● IN SESSION NOW',
    liveHeroTitle: 'Math 2B · Calculus II',
    liveHeroTopic: 'Definite Integrals via u-substitution',
    liveHeroLocation: 'Rowland Hall 101 · 10:00 AM – 10:50 AM',
    enterLiveClassCTA: 'Enter Live Class / Focus Horizon →',
    roomCodeLabel: 'Room Code:',
    joinLiveBtn: 'Join Live',
    weekRange: 'WEEK OF NOV 10 – NOV 16, 2026',
    canvasConnected: 'Canvas LMS Connected ✓',
    classesForDate: 'Classes Scheduled for',
    liveNowBadge: '● LIVE NOW',
    upcomingBadge: 'UPCOMING',
    topicLabel: 'Topic:',
    previewOutlineBtn: 'Preview Outline',
    classesCount: 'classes',
    liveClassCount: '● 1 Live',

    workingMemoryHorizon: 'Triadic Working-Memory Horizon',
    checkpointLabel: 'Checkpoint',
    ofLabel: 'of',
    completePct: 'Complete',
    canvasWorksheetSync: 'Canvas Worksheet Sync',

    contextAnchorTitle: 'Context Anchor',
    contextAnchorSub: 'Antecedent State',
    activeDirectiveTitle: 'Active Directive',
    activeDirectiveSub: 'Focal Target',
    invariantConstraintsTitle: 'Invariant Constraints',
    invariantConstraintsSub: 'Evaluation Parameters',

    completeCheckpoint: 'Complete Checkpoint 2',
    undoCheckpoint: 'Undo Checkpoint',
    resynchronize: 'Resynchronize / Catch Up',
    verifyCheckpoint: 'Verify Checkpoint',

    canvasDueToday: 'Canvas Due: 10:50 AM today',
    ambiguityWarning: "Upload location isn't specified in syllabus.",
    askInstructor: 'Ask Instructor',
    questionCopiedAlert: 'Question copied to clipboard: "Excuse me Professor, where should we submit the in-class assignment today?"',
    viewTAAnswer: 'View TA Answer (1)',
    threadTitle: 'EdStem Thread #412:',
    technicalDetails: 'Technical version',
    onTheBoard: 'On the board',

    lectureCourse: 'Math 2B · Lecture 14 · Integrals',
    lectureWhere: 'Definite integration via substitution. Preceding step established parameter u = 2x + 1.',
    lectureNext: 'Transform integration limits in terms of u.',
    lectureNextCompleted: 'Integrate with respect to u directly.',
    lectureKeep: 'Retain transformed limits throughout evaluation; do not back-substitute. Express solution as an exact fraction.',

    rejoinTitle: 'Help Me Rejoin: Safe Catch-Up',
    rejoinSubtitle: 'Zoned out or got stuck? Rejoin the class in 10 seconds without missing a constraint.',
    rejoinPrompt: 'Where did you leave off or what did you miss?',
    rejoinPlaceholder: 'e.g., I missed what u was, or where the professor is writing...',
    catchMeUpBtn: 'Catch Me Up',
    recapHeading: 'Current Checkpoint Recap',
    recapAudioSync: 'Teacher audio synced (00:32:45)',
    recapText: "Don't worry: Professor Chen just substituted u = 2x + 1. Instead of solving the whole integral and substituting back later, the class is changing the integration limits right now: when x = 0, u = 1; when x = 4, u = 9.",
    recapActionCue: 'Your immediate task: Write down the new limits [1, 9] on your worksheet.',

    edstemTitle: 'EdStem Live Discussion · Math 2B',
    edstemSubtitle: 'Live questions asked by classmates right now during Lecture 14',
    askEdstemBtn: '+ Ask Question (Auto-tagged to Step 2)',
    taEndorsedTag: '✓ TA Endorsed Answer',
    modalTitle: 'Ask Question on EdStem',
    modalTagNotice: 'Auto-tagging: [Math 2B · Lecture 14 · Step 2: Substitution Limits]',
    modalPlaceholder: 'Type your question anonymously here...',
    cancelBtn: 'Cancel',
    postBtn: 'Post to EdStem',

    overviewTitle: 'In-Class Activity: Definite Integral via Substitution',
    overviewSubtitle: '4 total steps · Synced with Canvas Assignment requirements',
    overviewProgress: '2 Completed · 1 In Progress',
    focusOnStep: 'Focus on this step',
    step1Title: 'Identify the inner function and assign u = g(x)',
    step1Desc: 'Found u = 2x + 1 and du = 2 dx',
    step2Title: 'Change the start and end values (Integration limits)',
    step2Desc: 'Convert x-bounds [0, 4] into u-bounds [1, 9]. Do not convert back to x at the end.',
    step3Title: 'Integrate with respect to u directly',
    step3Desc: 'Evaluate the simplified integral using standard power rule.',
    step4Title: 'Subtract upper bound from lower bound',
    step4Desc: 'Give the exact fraction answer; do not round to decimals. Submit to Canvas.',
    stepCompletedBadge: 'Completed',
    stepCurrentBadge: 'Current Focus',
    stepUpcomingBadge: 'Upcoming',
    stepFinalBadge: 'Final',

    footerStandard: 'Bullseye Accessible Classroom Standard',
    footerCanvasApi: 'Canvas LMS API Connected',
    footerEdstemSync: 'EdStem Q&A Live Sync',
    footerContrast: 'WCAG 2.2 AA Contrast Checked',
    footerKeys: 'Keyboard: Tab / Esc / [ ] / c',
    footerDignity: 'Zero clinical tracking · Dignity-first',
  },

  es: {
    appName: 'Bullseye',
    appTagline: 'Interfaz de memoria de trabajo más tranquila y clara para el aula',
    navigation: 'Navegación',
    menu: 'Menú',
    closeMenu: 'Cerrar menú de navegación',
    backToTask: '← Volver al Enfoque de Tarea',
    studentAccount: 'Cuenta de Estudiante',
    activeStatus: 'Sesión Activa',
    signOut: 'Cerrar Sesión',
    welcomeTour: 'Guía de Bienvenida',

    navNowFocus: 'Enfoque Actual (Now Focus)',
    navCalendar: 'Calendario del Curso y Clase en Vivo',
    navAllSteps: 'Resumen de Pasos (4)',
    navEdStem: 'Preguntas y Respuestas EdStem',
    navCanvas: 'Centro de Tareas Canvas',
    navSource: 'Instrucciones Originales del Profesor',
    navRejoin: 'Reincorporación Segura',

    calmMode: 'Calma Sensorial',
    calmModeTitle: 'Modo Calma (tecla c): congela movimiento y efectos de fondo',
    calmOn: 'Calma: ACTIVA',
    calmOff: 'Calma: DESACTIVADA',
    calmDescription: 'Congelación de velocidad cero para enfoque neurodivergente',
    teacherAudio: 'Transmisión de Audio del Profesor',
    micLive: 'Prof. Chen · Sincronización en Vivo',
    micPaused: 'Prof. Chen · En Pausa',
    pauseStream: 'Pausar Transmisión',
    resumeStream: 'Reanudar Transmisión',
    audioDetails: '48kHz estéreo · sincronización 42ms',
    audioSyncInfo: 'Extracción de voz del profesor en tiempo real y sincronización de puntos de control',
    fontSize: 'Tamaño del Texto',
    decreaseFont: 'Disminuir tamaño de fuente',
    increaseFont: 'Aumentar tamaño de fuente',
    language: 'Idioma',

    calendarTitle: 'Horario de Clases y Centro de Acceso',
    calendarSubtitle: 'Sincronizado con Canvas LMS, Google Calendar y EdStem',
    liveHeroBadge: '● EN SESIÓN AHORA',
    liveHeroTitle: 'Matemáticas 2B · Cálculo II',
    liveHeroTopic: 'Integrales definidas mediante sustitución u',
    liveHeroLocation: 'Rowland Hall 101 · 10:00 AM – 10:50 AM',
    enterLiveClassCTA: 'Entrar a Clase en Vivo / Horizonte de Enfoque →',
    roomCodeLabel: 'Código de Sala:',
    joinLiveBtn: 'Unirse en Vivo',
    weekRange: 'SEMANA DEL 10 AL 16 DE NOV, 2026',
    canvasConnected: 'Canvas LMS Conectado ✓',
    classesForDate: 'Clases programadas para',
    liveNowBadge: '● EN VIVO AHORA',
    upcomingBadge: 'PRÓXIMA',
    topicLabel: 'Tema:',
    previewOutlineBtn: 'Vista Previa del Esquema',
    classesCount: 'clases',
    liveClassCount: '● 1 en vivo',

    workingMemoryHorizon: 'Horizonte Triádico de Memoria de Trabajo',
    checkpointLabel: 'Punto de Control',
    ofLabel: 'de',
    completePct: 'Completado',
    canvasWorksheetSync: 'Sincronización con Hoja Canvas',

    contextAnchorTitle: 'Ancla de Contexto',
    contextAnchorSub: 'Estado Antecedente',
    activeDirectiveTitle: 'Directiva Activa',
    activeDirectiveSub: 'Objetivo Focal',
    invariantConstraintsTitle: 'Restricciones Invariables',
    invariantConstraintsSub: 'Parámetros de Evaluación',

    completeCheckpoint: 'Completar Punto de Control 2',
    undoCheckpoint: 'Deshacer Punto de Control',
    resynchronize: 'Resincronizar / Ponerse al Día',
    verifyCheckpoint: 'Verificar Punto de Control',

    canvasDueToday: 'Entrega Canvas: 10:50 AM hoy',
    ambiguityWarning: 'La ubicación de entrega no está especificada en el programa.',
    askInstructor: 'Preguntar al Profesor',
    questionCopiedAlert: 'Pregunta copiada al portapapeles: "¿Disculpe profesor, dónde debemos entregar la tarea en clase hoy?"',
    viewTAAnswer: 'Ver Respuesta del Asistente (1)',
    threadTitle: 'Hilo EdStem #412:',
    technicalDetails: 'Versión técnica',
    onTheBoard: 'En la pizarra',

    lectureCourse: 'Matemáticas 2B · Clase 14 · Integrales',
    lectureWhere: 'Integración definida por sustitución. El paso previo estableció el parámetro u = 2x + 1.',
    lectureNext: 'Transformar los límites de integración en términos de u.',
    lectureNextCompleted: 'Integrar directamente con respecto a u.',
    lectureKeep: 'Conservar los límites transformados durante toda la evaluación; no volver a sustituir. Expresar la solución como fracción exacta.',

    rejoinTitle: 'Ayúdame a Reincorporarme: Puesta al Día Segura',
    rejoinSubtitle: '¿Te distrajiste o te quedaste atrás? Reincorpórate a la clase en 10 segundos sin perder restricciones.',
    rejoinPrompt: '¿Dónde te quedaste o qué te perdiste?',
    rejoinPlaceholder: 'ej., me perdí de qué era u, o dónde está escribiendo el profesor...',
    catchMeUpBtn: 'Ponme al Día',
    recapHeading: 'Resumen del Punto de Control Actual',
    recapAudioSync: 'Audio del profesor sincronizado (00:32:45)',
    recapText: 'No te preocupes: El profesor Chen acaba de sustituir u = 2x + 1. En lugar de resolver toda la integral y volver a sustituir después, la clase está cambiando los límites de integración ahora mismo: cuando x = 0, u = 1; cuando x = 4, u = 9.',
    recapActionCue: 'Tu tarea inmediata: Anota los nuevos límites [1, 9] en tu hoja de trabajo.',

    edstemTitle: 'Discusión en Vivo EdStem · Matemáticas 2B',
    edstemSubtitle: 'Preguntas en vivo formuladas por compañeros ahora durante la Clase 14',
    askEdstemBtn: '+ Hacer Pregunta (Etiquetada automáticamente al Paso 2)',
    taEndorsedTag: '✓ Respuesta Avalada por el Asistente',
    modalTitle: 'Hacer Pregunta en EdStem',
    modalTagNotice: 'Etiquetado automático: [Matemáticas 2B · Clase 14 · Paso 2: Límites de Sustitución]',
    modalPlaceholder: 'Escribe tu pregunta de forma anónima aquí...',
    cancelBtn: 'Cancelar',
    postBtn: 'Publicar en EdStem',

    overviewTitle: 'Actividad en Clase: Integral Definida por Sustitución',
    overviewSubtitle: '4 pasos en total · Sincronizado con los requisitos de la tarea en Canvas',
    overviewProgress: '2 Completados · 1 En Progreso',
    focusOnStep: 'Enfocarse en este paso',
    step1Title: 'Identificar la función interna y asignar u = g(x)',
    step1Desc: 'Se determinó u = 2x + 1 y du = 2 dx',
    step2Title: 'Cambiar los valores iniciales y finales (Límites de integración)',
    step2Desc: 'Convertir límites de x [0, 4] a límites de u [1, 9]. No volver a x al final.',
    step3Title: 'Integrar con respecto a u directamente',
    step3Desc: 'Evaluar la integral simplificada usando la regla de potencia estándar.',
    step4Title: 'Restar el límite superior del límite inferior',
    step4Desc: 'Dar la respuesta como fracción exacta; no redondear a decimales. Entregar en Canvas.',
    stepCompletedBadge: 'Completado',
    stepCurrentBadge: 'Enfoque Actual',
    stepUpcomingBadge: 'Próximo',
    stepFinalBadge: 'Final',

    footerStandard: 'Estándar de Aula Accesible Bullseye',
    footerCanvasApi: 'API de Canvas LMS Conectada',
    footerEdstemSync: 'Sincronización en Vivo de EdStem',
    footerContrast: 'Contraste Verificado WCAG 2.2 AA',
    footerKeys: 'Teclado: Tab / Esc / [ ] / c',
    footerDignity: 'Cero seguimiento clínico · Dignidad ante todo',
  },

  zh: {
    appName: 'Bullseye',
    appTagline: '更沉静、更清晰的课堂工作记忆界面',
    navigation: '导航菜单',
    menu: '菜单',
    closeMenu: '关闭导航菜单',
    backToTask: '← 返回任务焦点',
    studentAccount: '学生账户',
    activeStatus: '进行中课堂',
    signOut: '退出登录',
    welcomeTour: '新手指引',

    navNowFocus: '当前聚焦 (Now Focus)',
    navCalendar: '课程日程与实时课堂',
    navAllSteps: '所有步骤总览 (4)',
    navEdStem: 'EdStem 实时问答',
    navCanvas: 'Canvas 作业中心',
    navSource: '教师原始指令',
    navRejoin: '安全重连跟进',

    calmMode: '感官平静',
    calmModeTitle: '平静模式 (按键: c): 冻结背景动态与视觉干扰',
    calmOn: '平静模式: 开',
    calmOff: '平静模式: 关',
    calmDescription: '零速度画面冻结，专为神经多样性注意力设计',
    teacherAudio: '教师实时音频流',
    micLive: '陈教授 · 实时同步',
    micPaused: '陈教授 · 已暂停',
    pauseStream: '暂停音频流',
    resumeStream: '恢复音频流',
    audioDetails: '48kHz 立体声 · 42ms 超低延迟同步',
    audioSyncInfo: '实时教师语音提取与检查点同步',
    fontSize: '字体大小',
    decreaseFont: '减小字号',
    increaseFont: '增大字号',
    language: '语言 (Language)',

    calendarTitle: '课程日程与课堂中心',
    calendarSubtitle: '已与 Canvas LMS、Google 日历及 EdStem 实时同步',
    liveHeroBadge: '● 正在进行中',
    liveHeroTitle: '数学 2B · 微积分 II',
    liveHeroTopic: '定积分换元法 (u-substitution)',
    liveHeroLocation: '罗兰大楼 101 · 上午 10:00 – 10:50',
    enterLiveClassCTA: '进入实时课堂 / 聚焦视野 →',
    roomCodeLabel: '教室代码:',
    joinLiveBtn: '实时加入',
    weekRange: '2026年11月10日 – 11月16日 当周',
    canvasConnected: 'Canvas LMS 已连接 ✓',
    classesForDate: '日程课程安排：',
    liveNowBadge: '● 正在直播',
    upcomingBadge: '即将开始',
    topicLabel: '主题:',
    previewOutlineBtn: '预览大纲',
    classesCount: '节课程',
    liveClassCount: '● 1 节直播中',

    workingMemoryHorizon: '三元工作记忆视野 (Triadic Horizon)',
    checkpointLabel: '检查点',
    ofLabel: '/',
    completePct: '完成度',
    canvasWorksheetSync: 'Canvas 课堂作业表同步',

    contextAnchorTitle: '上下文锚点 (Context Anchor)',
    contextAnchorSub: '前置状态 (Antecedent State)',
    activeDirectiveTitle: '当前指令 (Active Directive)',
    activeDirectiveSub: '焦点目标 (Focal Target)',
    invariantConstraintsTitle: '不变约束 (Invariant Constraints)',
    invariantConstraintsSub: '评估参数 (Evaluation Parameters)',

    completeCheckpoint: '完成检查点 2',
    undoCheckpoint: '撤销检查点',
    resynchronize: '重新同步 / 跟上进度',
    verifyCheckpoint: '验证检查点',

    canvasDueToday: 'Canvas 截止: 今天上午 10:50',
    ambiguityWarning: '课程大纲中未明确提交的具体模块位置。',
    askInstructor: '询问任课教师',
    questionCopiedAlert: '问题已复制到剪贴板："教授您好，请问今天的随堂练习应提交到哪个模块？"',
    viewTAAnswer: '查看助教解答 (1)',
    threadTitle: 'EdStem 讨论 #412:',
    technicalDetails: '技术数学版本',
    onTheBoard: '黑板板书',

    lectureCourse: '数学 2B · 第14讲 · 积分学',
    lectureWhere: '使用换元法计算定积分。前序步骤已确立参数 u = 2x + 1。',
    lectureNext: '将积分上下限转化为 u 的取值。',
    lectureNextCompleted: '直接对 u 进行定积分计算。',
    lectureKeep: '在整个求解过程中保留转换后的上下限；不要回代为 x。最终结果必须用精确分数表示。',

    rejoinTitle: '帮我重连：无压力快速跟进',
    rejoinSubtitle: '走神了或卡住了？10秒内重新跟上课堂节奏，不错过任何评分约束。',
    rejoinPrompt: '你在哪里脱节了，或者错过了什么？',
    rejoinPlaceholder: '例如：我没看清 u 是什么，或者老师现在写到哪了...',
    catchMeUpBtn: '帮我跟上',
    recapHeading: '当前检查点摘要',
    recapAudioSync: '教师音频已同步 (00:32:45)',
    recapText: '别担心：陈教授刚刚完成了换元代换 u = 2x + 1。大家并没有计算整个积分之后再回代，而是现在直接转换积分上下限：当 x = 0 时，u = 1；当 x = 4 时，u = 9。',
    recapActionCue: '你现在的核心任务：在作业纸上写下新的积分上下限 [1, 9]。',

    edstemTitle: 'EdStem 课堂实时讨论 · 数学 2B',
    edstemSubtitle: '第14讲课堂中同学们正在提出的实时问题',
    askEdstemBtn: '+ 提问 (已自动关联至步骤 2)',
    taEndorsedTag: '✓ 助教官方认证解答',
    modalTitle: '在 EdStem 上提问',
    modalTagNotice: '自动标签：[数学 2B · 第14讲 · 步骤 2: 换元上下限]',
    modalPlaceholder: '在此匿名输入你的问题...',
    cancelBtn: '取消',
    postBtn: '发布至 EdStem',

    overviewTitle: '课堂练习：定积分换元法',
    overviewSubtitle: '共 4 个步骤 · 与 Canvas 作业要求完全同步',
    overviewProgress: '2 个已完成 · 1 个进行中',
    focusOnStep: '聚焦此步骤',
    step1Title: '识别复合函数内层并令 u = g(x)',
    step1Desc: '确定 u = 2x + 1 且 du = 2 dx',
    step2Title: '转换积分起止值（积分上下限）',
    step2Desc: '将 x 的范围 [0, 4] 转化为 u 的范围 [1, 9]。最后无需代回 x。',
    step3Title: '直接对 u 进行积分计算',
    step3Desc: '使用标准幂法则计算简化后的定积分。',
    step4Title: '代入上下限相减计算结果',
    step4Desc: '给出精确分数形式答案；严禁四舍五入保留小数。提交至 Canvas。',
    stepCompletedBadge: '已完成',
    stepCurrentBadge: '当前聚焦',
    stepUpcomingBadge: '后续步骤',
    stepFinalBadge: '最终步骤',

    footerStandard: 'Bullseye 无障碍课堂标准',
    footerCanvasApi: 'Canvas LMS API 已连接',
    footerEdstemSync: 'EdStem 实时答疑同步',
    footerContrast: 'WCAG 2.2 AA 高对比度已通过',
    footerKeys: '快捷键: Tab / Esc / [ ] / c',
    footerDignity: '零临床监控标签 · 尊严为先',
  },

  hi: {
    appName: 'Bullseye',
    appTagline: 'कक्षा के लिए शांत, स्पष्ट कार्यशील-स्मृति इंटरफ़ेस',
    navigation: 'नेविगेशन मेनू',
    menu: 'मेनू',
    closeMenu: 'नेविगेशन मेनू बंद करें',
    backToTask: '← कार्य फोकस पर वापस जाएं',
    studentAccount: 'छात्र खाता',
    activeStatus: 'सक्रिय सत्र',
    signOut: 'लॉग आउट',
    welcomeTour: 'स्वागत टूर',

    navNowFocus: 'वर्तमान फोकस (Now Focus)',
    navCalendar: 'कोर्स कैलेंडर और लाइव कक्षा',
    navAllSteps: 'सभी चरण अवलोकन (4)',
    navEdStem: 'EdStem लाइव प्रश्नोत्तर',
    navCanvas: 'Canvas असाइनमेंट हब',
    navSource: 'शिक्षक के मूल निर्देश',
    navRejoin: 'सुरक्षित पुनर्मिलन प्रवाह',

    calmMode: 'संवेदी शांति',
    calmModeTitle: 'शांत मोड (कुंजी: c): गति और पृष्ठभूमि प्रभाव रोकता है',
    calmOn: 'शांति: चालू',
    calmOff: 'शांति: बंद',
    calmDescription: 'न्यूरोडाइवर्जेंट फोकस के लिए शून्य-वेग फ्रीज',
    teacherAudio: 'शिक्षक ऑडियो स्ट्रीम',
    micLive: 'प्रो. चेन · लाइव सिंक',
    micPaused: 'प्रो. चेन · रुका हुआ',
    pauseStream: 'ऑडियो रोकें',
    resumeStream: 'ऑडियो फिर से शुरू करें',
    audioDetails: '48kHz स्टीरियो · 42ms सिंक',
    audioSyncInfo: 'वास्तविक समय में शिक्षक आवाज़ निष्कर्षण और चेकपॉइंट सिंक',
    fontSize: 'टेक्स्ट आकार',
    decreaseFont: 'फ़ॉन्ट आकार घटाएं',
    increaseFont: 'फ़ॉन्ट आकार बढ़ाएं',
    language: 'भाषा (Language)',

    calendarTitle: 'कक्षा अनुसूची और लाइव क्लास हब',
    calendarSubtitle: 'Canvas LMS, Google Calendar और EdStem के साथ समन्वयित',
    liveHeroBadge: '● अभी सत्र में है',
    liveHeroTitle: 'गणित 2B · कैलकुलस II',
    liveHeroTopic: 'प्रतिस्थापन विधि द्वारा निश्चित समाकलन',
    liveHeroLocation: 'रोलैंड हॉल 101 · सुबह 10:00 – 10:50',
    enterLiveClassCTA: 'लाइव कक्षा में प्रवेश करें / फोकस क्षितिज →',
    roomCodeLabel: 'कक्ष कोड:',
    joinLiveBtn: 'लाइव जुड़ें',
    weekRange: '10 नव – 16 नव, 2026 का सप्ताह',
    canvasConnected: 'Canvas LMS कनेक्टेड ✓',
    classesForDate: 'इस तारीख की निर्धारित कक्षाएं:',
    liveNowBadge: '● अभी लाइव',
    upcomingBadge: 'आगामी',
    topicLabel: 'विषय:',
    previewOutlineBtn: 'रूपरेखा पूर्वावलोकन',
    classesCount: 'कक्षाएं',
    liveClassCount: '● 1 लाइव',

    workingMemoryHorizon: 'त्रिक कार्यशील-स्मृति क्षितिज (Triadic Horizon)',
    checkpointLabel: 'चेकपॉइंट',
    ofLabel: 'का',
    completePct: 'पूर्ण',
    canvasWorksheetSync: 'Canvas वर्कशीट सिंक',

    contextAnchorTitle: 'संदर्भ एंकर (Context Anchor)',
    contextAnchorSub: 'पूर्ववर्ती स्थिति (Antecedent State)',
    activeDirectiveTitle: 'सक्रिय निर्देश (Active Directive)',
    activeDirectiveSub: 'केंद्रित लक्ष्य (Focal Target)',
    invariantConstraintsTitle: 'अपरिवर्तनीय प्रतिबंध (Invariant Constraints)',
    invariantConstraintsSub: 'मूल्यांकन पैरामीटर (Evaluation Parameters)',

    completeCheckpoint: 'चेकपॉइंट 2 पूर्ण करें',
    undoCheckpoint: 'चेकपॉइंट पूर्ववत करें',
    resynchronize: 'पुनः सिंक्रनाइज़ करें / साथ चलें',
    verifyCheckpoint: 'चेकपॉइंट सत्यापित करें',

    canvasDueToday: 'Canvas देय: आज सुबह 10:50',
    ambiguityWarning: 'पाठ्यक्रम में अपलोड स्थान निर्दिष्ट नहीं है।',
    askInstructor: 'शिक्षक से पूछें',
    questionCopiedAlert: 'प्रश्न क्लिपबोर्ड पर कॉपी किया गया: "प्रोफेसर क्षमा करें, आज का असाइनमेंट कहाँ जमा करना है?"',
    viewTAAnswer: 'टीए उत्तर देखें (1)',
    threadTitle: 'EdStem थ्रेड #412:',
    technicalDetails: 'तकनीकी विवरण',
    onTheBoard: 'श्यामपट्ट (बोर्ड) पर',

    lectureCourse: 'गणित 2B · व्याख्यान 14 · समाकलन',
    lectureWhere: 'प्रतिस्थापन द्वारा निश्चित समाकलन। पूर्व चरण में u = 2x + 1 स्थापित किया गया।',
    lectureNext: 'समाकलन सीमाओं को u के पदों में परिवर्तित करें।',
    lectureNextCompleted: 'सीधे u के सापेक्ष समाकलन करें।',
    lectureKeep: 'मूल्यांकन के दौरान रूपांतरित सीमाओं को बनाए रखें; x में वापस न बदलें। सटीक भिन्न के रूप में उत्तर दें।',

    rejoinTitle: 'पुनः जुड़ने में सहायता: सुरक्षित कैच-अप',
    rejoinSubtitle: 'ध्यान भटक गया या अटक गए? किसी भी प्रतिबंध को गंवाए बिना 10 सेकंड में कक्षा में वापस जुड़ें।',
    rejoinPrompt: 'आपने कहाँ छोड़ा था या आपसे क्या छूट गया?',
    rejoinPlaceholder: 'उदा., मुझे समझ नहीं आया u क्या था, या प्रोफेसर कहाँ लिख रहे हैं...',
    catchMeUpBtn: 'मुझे अपडेट करें',
    recapHeading: 'वर्तमान चेकपॉइंट सारांश',
    recapAudioSync: 'शिक्षक ऑडियो सिंक (00:32:45)',
    recapText: 'चिंता न करें: प्रोफेसर चेन ने अभी u = 2x + 1 प्रतिस्थापित किया है। पूरे समाकलन को हल करके बाद में x में बदलने के बजाय, कक्षा अभी समाकलन सीमाएं बदल रही है: जब x = 0, u = 1; जब x = 4, u = 9।',
    recapActionCue: 'आपका तात्कालिक कार्य: अपनी वर्कशीट पर नई सीमाएं [1, 9] लिखें।',

    edstemTitle: 'EdStem लाइव चर्चा · गणित 2B',
    edstemSubtitle: 'व्याख्यान 14 के दौरान सहपाठियों द्वारा पूछे जा रहे वास्तविक समय के प्रश्न',
    askEdstemBtn: '+ प्रश्न पूछें (चरण 2 पर स्वतः टैग)',
    taEndorsedTag: '✓ टीए द्वारा प्रमाणित उत्तर',
    modalTitle: 'EdStem पर प्रश्न पूछें',
    modalTagNotice: 'स्वतः-टैगिंग: [गणित 2B · व्याख्यान 14 · चरण 2: प्रतिस्थापन सीमाएं]',
    modalPlaceholder: 'अपना प्रश्न यहाँ गुमनाम रूप से टाइप करें...',
    cancelBtn: 'रद्द करें',
    postBtn: 'EdStem पर पोस्ट करें',

    overviewTitle: 'कक्षा गतिविधि: प्रतिस्थापन द्वारा निश्चित समाकलन',
    overviewSubtitle: 'कुल 4 चरण · Canvas असाइनमेंट आवश्यकताओं के साथ समन्वयित',
    overviewProgress: '2 पूर्ण · 1 प्रगति पर',
    focusOnStep: 'इस चरण पर ध्यान दें',
    step1Title: 'आंतरिक फलन की पहचान करें और u = g(x) निर्धारित करें',
    step1Desc: 'u = 2x + 1 और du = 2 dx प्राप्त किया गया',
    step2Title: 'प्रारंभिक और अंतिम मान बदलें (समाकलन सीमाएं)',
    step2Desc: 'x-सीमा [0, 4] को u-सीमा [1, 9] में बदलें। अंत में वापस x में न बदलें।',
    step3Title: 'सीधे u के सापेक्ष समाकलन करें',
    step3Desc: 'मानक घात नियम का उपयोग करके सरलीकृत समाकलन का मूल्यांकन करें।',
    step4Title: 'ऊपरी सीमा से निचली सीमा को घटाएं',
    step4Desc: 'सटीक भिन्न उत्तर दें; दशमलव में न बदलें। Canvas पर जमा करें।',
    stepCompletedBadge: 'पूर्ण',
    stepCurrentBadge: 'वर्तमान फोकस',
    stepUpcomingBadge: 'आगामी',
    stepFinalBadge: 'अंतिम',

    footerStandard: 'Bullseye सुलभ कक्षा मानक',
    footerCanvasApi: 'Canvas LMS API कनेक्टेड',
    footerEdstemSync: 'EdStem Q&A लाइव सिंक',
    footerContrast: 'WCAG 2.2 AA कंट्रास्ट सत्यापित',
    footerKeys: 'कीबोर्ड: Tab / Esc / [ ] / c',
    footerDignity: 'शून्य नैदानिक ट्रैकिंग · गरिमा सर्वोपरि',
  },
}
