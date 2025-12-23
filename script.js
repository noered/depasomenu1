// DEPASO餐厅智能助手
class RestaurantChatbot {
    constructor() {
        this.currentLanguage = 'zh';
        this.welcomePage = document.getElementById('welcomePage');
        this.welcomeVideo = document.getElementById('welcomeVideo');
        this.chatInterface = document.getElementById('chatInterface');
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.statusText = document.getElementById('statusText');
        this.quickActions = document.getElementById('quickActions');
        
        // 对话状态
        this.conversationState = {
            intent: null,
            slots: {},
            step: 'greeting'
        };
        
        // 多语言文本
        this.texts = {
            zh: {
                welcome: "欢迎光临！我是您的专属餐厅助手，可以帮您：",
                services: ["📅 预订座位", "🍽️ 推荐菜品", "🥡 自取/外卖", "⏰ 加入候位", "⚠️ 处理过敏信息", "🏷️ 介绍品牌特色"],
                askHelp: "请告诉我您需要什么帮助？",
                status: "在线服务",
                placeholder: "请输入您的问题...",
                hint: "支持中文/English/Español",
                welcomeTitle: "欢迎您的到来!",
                languageTitle: "请选择您的语言",
                chatTitle: "🐷 强尼小猪，你的depaso小助手",
                chatSubtitle: "为您提供订位、点单、咨询等服务"
            },
            en: {
                welcome: "Welcome! I'm your dedicated restaurant assistant, I can help you with:",
                services: ["📅 Table Reservations", "🍽️ Menu Recommendations", "🥡 Takeout/Delivery", "⏰ Join Waitlist", "⚠️ Allergy Information", "🏷️ Brand Information"],
                askHelp: "What can I help you with today?",
                status: "Online Service",
                placeholder: "Type your question...",
                hint: "Supports 中文/English/Español",
                welcomeTitle: "Welcome to DEPASO!",
                languageTitle: "Please select your language",
                chatTitle: "🐷 Johnny Pig, your depaso little assistant",
                chatSubtitle: "Providing reservations, orders, consultations and more"
            },
            es: {
                welcome: "¡Bienvenido! Soy su asistente de restaurante dedicado, puedo ayudarle con:",
                services: ["📅 Reservas de Mesa", "🍽️ Recomendaciones del Menú", "🥡 Para Llevar/Entrega", "⏰ Lista de Espera", "⚠️ Información de Alergias", "🏷️ Información de Marca"],
                askHelp: "¿En qué puedo ayudarle hoy?",
                status: "Servicio en Línea",
                placeholder: "Escriba su pregunta...",
                hint: "Soporta 中文/English/Español",
                welcomeTitle: "¡Bienvenido a DEPASO!",
                languageTitle: "Por favor seleccione su idioma",
                chatTitle: "🐷 Johnny Pig, tu pequeño asistente de depaso",
                chatSubtitle: "Proporcionando reservas, pedidos, consultas y más"
            }
        };
        
        // 意图识别关键词 - 简化版本，提高识别准确性
        this.intentKeywords = {
            zh: {
                reservation: ['订位', '预订', '预约', '座位', '桌子'],
                menu: ['菜单', '推荐', '菜品', '食物', '有什么'],
                order: ['点餐', '下单', '点菜', '要', '来一份'],
                takeout: ['自取', '外卖', '打包', '带走'],
                waitlist: ['候位', '排队', '等待'],
                allergy: ['过敏', '忌口', '不能吃'],
                brand: ['品牌', '介绍', '特色', '关于', '火腿', 'jamón', '伊比利亚', 'bellota', 'cebo', '分级', '切片', '搭配', '保存', '历史', '产区'],
                complaint: ['投诉', '问题', '不满', '意见'],
                greeting: ['你好', 'hi', 'hello', 'hola'],
                general: ['天气', '今天', '心情', '生活', '工作', '学习', '电影', '音乐', '旅行', '运动', '健康', '家庭', '朋友', '爱情', '梦想', '未来', '过去', '回忆', '故事', '笑话', '趣事', '新闻', '科技', '艺术', '文化', '历史', '地理', '科学', '哲学', '教育', '娱乐', '游戏', '体育', '时尚', '美容', '购物', '投资', '理财', '创业', '职业', '技能', '语言', '阅读', '写作', '摄影', '绘画', '舞蹈', '唱歌', '乐器', '烹饪', '园艺', '宠物', '植物', '动物', '自然', '宇宙', '时间', '空间', '人生', '意义', '价值', '幸福', '快乐', '悲伤', '愤怒', '恐惧', '希望', '失望', '成功', '失败', '挑战', '机遇', '选择', '决定', '责任', '自由', '平等', '正义', '道德', '伦理', '宗教', '信仰', '科学', '理性', '感性', '直觉', '灵感', '创意', '创新', '传统', '现代', '未来', '过去', '现在', '永恒', '瞬间', '变化', '稳定', '平衡', '和谐', '冲突', '合作', '竞争', '友谊', '爱情', '亲情', '孤独', '陪伴', '理解', '误解', '沟通', '沉默', '表达', '倾听', '分享', '保密', '信任', '怀疑', '诚实', '谎言', '真实', '虚假', '美丽', '丑陋', '善良', '邪恶', '光明', '黑暗', '温暖', '寒冷', '柔软', '坚硬', '简单', '复杂', '清晰', '模糊', '确定', '不确定', '可能', '不可能', '必然', '偶然', '因果', '巧合', '命运', '选择', '努力', '天赋', '运气', '机会', '准备', '行动', '思考', '感受', '体验', '学习', '成长', '改变', '坚持', '放弃', '开始', '结束', '出生', '死亡', '存在', '消失', '记忆', '遗忘', '梦想', '现实', '理想', '实际', '理论', '实践', '知识', '智慧', '愚蠢', '聪明', '天才', '平凡', '特殊', '普通', '独特', '相似', '不同', '相同', '一致', '矛盾', '统一', '分裂', '完整', '破碎', '修复', '破坏', '创造', '毁灭', '建设', '拆除', '增加', '减少', '上升', '下降', '前进', '后退', '左转', '右转', '直行', '停止', '继续', '暂停', '恢复', '重复', '变化', '保持', '改变', '维持', '发展', '进步', '退步', '提高', '降低', '改善', '恶化', '好转', '变坏', '成功', '失败', '胜利', '失败', '赢', '输', '获得', '失去', '得到', '失去', '拥有', '没有', '存在', '不存在', '是', '不是', '对', '错', '正确', '错误', '好', '坏', '善', '恶', '美', '丑', '丑', '美', '高', '低', '大', '小', '长', '短', '宽', '窄', '厚', '薄', '深', '浅', '远', '近', '快', '慢', '早', '晚', '新', '旧', '年轻', '年老', '新鲜', '陈旧', '干净', '脏', '整洁', '混乱', '有序', '无序', '规律', '随机', '必然', '偶然', '确定', '不确定', '清楚', '模糊', '明确', '模糊', '具体', '抽象', '实际', '理论', '现实', '理想', '真实', '虚假', '诚实', '欺骗', '信任', '怀疑', '相信', '不信', '知道', '不知道', '理解', '不理解', '明白', '不明白', '清楚', '不清楚', '确定', '不确定', '肯定', '否定', '是', '不是', '对', '错', '正确', '错误', '好', '坏', '善', '恶', '美', '丑', '高', '低', '大', '小', '长', '短', '宽', '窄', '厚', '薄', '深', '浅', '远', '近', '快', '慢', '早', '晚', '新', '旧', '年轻', '年老', '新鲜', '陈旧', '干净', '脏', '整洁', '混乱', '有序', '无序', '规律', '随机', '必然', '偶然', '确定', '不确定', '清楚', '模糊', '明确', '模糊', '具体', '抽象', '实际', '理论', '现实', '理想', '真实', '虚假', '诚实', '欺骗', '信任', '怀疑', '相信', '不信', '知道', '不知道', '理解', '不理解', '明白', '不明白', '清楚', '不清楚', '确定', '不确定', '肯定', '否定']
            },
            en: {
                reservation: ['reservation', 'book', 'table', 'seat'],
                menu: ['menu', 'recommend', 'food', 'dish', 'what'],
                order: ['order', 'want', 'need', 'get', 'have'],
                takeout: ['takeout', 'delivery', 'pickup', 'to go'],
                waitlist: ['waitlist', 'queue', 'wait', 'line'],
                allergy: ['allergy', 'diet', 'intolerance', 'can\'t eat'],
                brand: ['brand', 'story', 'about', 'tell me', 'ham', 'jamón', 'iberico', 'bellota', 'cebo', 'grades', 'slicing', 'pairing', 'storage', 'history', 'regions'],
                complaint: ['complaint', 'problem', 'issue', 'wrong'],
                greeting: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
                general: ['weather', 'today', 'mood', 'life', 'work', 'study', 'movie', 'music', 'travel', 'sport', 'health', 'family', 'friend', 'love', 'dream', 'future', 'past', 'memory', 'story', 'joke', 'fun', 'news', 'technology', 'art', 'culture', 'history', 'geography', 'science', 'philosophy', 'education', 'entertainment', 'game', 'sports', 'fashion', 'beauty', 'shopping', 'investment', 'finance', 'career', 'skill', 'language', 'reading', 'writing', 'photography', 'painting', 'dance', 'singing', 'instrument', 'cooking', 'gardening', 'pet', 'plant', 'animal', 'nature', 'universe', 'time', 'space', 'life', 'meaning', 'value', 'happiness', 'joy', 'sadness', 'anger', 'fear', 'hope', 'disappointment', 'success', 'failure', 'challenge', 'opportunity', 'choice', 'decision', 'responsibility', 'freedom', 'equality', 'justice', 'morality', 'ethics', 'religion', 'faith', 'science', 'rational', 'emotional', 'intuition', 'inspiration', 'creativity', 'innovation', 'tradition', 'modern', 'future', 'past', 'present', 'eternity', 'moment', 'change', 'stability', 'balance', 'harmony', 'conflict', 'cooperation', 'competition', 'friendship', 'love', 'family', 'loneliness', 'companionship', 'understanding', 'misunderstanding', 'communication', 'silence', 'expression', 'listening', 'sharing', 'privacy', 'trust', 'doubt', 'honesty', 'lie', 'truth', 'false', 'beauty', 'ugliness', 'kindness', 'evil', 'light', 'darkness', 'warmth', 'cold', 'soft', 'hard', 'simple', 'complex', 'clear', 'vague', 'certain', 'uncertain', 'possible', 'impossible', 'inevitable', 'accidental', 'cause', 'coincidence', 'destiny', 'choice', 'effort', 'talent', 'luck', 'opportunity', 'preparation', 'action', 'thinking', 'feeling', 'experience', 'learning', 'growth', 'change', 'persistence', 'giving up', 'beginning', 'ending', 'birth', 'death', 'existence', 'disappearance', 'memory', 'forgetting', 'dream', 'reality', 'ideal', 'actual', 'theory', 'practice', 'knowledge', 'wisdom', 'stupidity', 'intelligence', 'genius', 'ordinary', 'special', 'unique', 'similar', 'different', 'same', 'consistent', 'contradictory', 'unity', 'division', 'complete', 'broken', 'repair', 'destroy', 'create', 'destroy', 'build', 'demolish', 'increase', 'decrease', 'rise', 'fall', 'forward', 'backward', 'left', 'right', 'straight', 'stop', 'continue', 'pause', 'resume', 'repeat', 'change', 'maintain', 'change', 'maintain', 'develop', 'progress', 'regress', 'improve', 'decline', 'improve', 'worsen', 'improve', 'worsen', 'success', 'failure', 'victory', 'defeat', 'win', 'lose', 'gain', 'lose', 'get', 'lose', 'have', 'not have', 'exist', 'not exist', 'is', 'is not', 'right', 'wrong', 'correct', 'incorrect', 'good', 'bad', 'good', 'evil', 'beautiful', 'ugly', 'ugly', 'beautiful', 'high', 'low', 'big', 'small', 'long', 'short', 'wide', 'narrow', 'thick', 'thin', 'deep', 'shallow', 'far', 'near', 'fast', 'slow', 'early', 'late', 'new', 'old', 'young', 'old', 'fresh', 'stale', 'clean', 'dirty', 'tidy', 'messy', 'orderly', 'disorderly', 'regular', 'random', 'inevitable', 'accidental', 'certain', 'uncertain', 'clear', 'vague', 'clear', 'vague', 'specific', 'abstract', 'actual', 'theoretical', 'reality', 'ideal', 'true', 'false', 'honest', 'deceitful', 'trust', 'doubt', 'believe', 'disbelieve', 'know', 'not know', 'understand', 'not understand', 'clear', 'not clear', 'certain', 'uncertain', 'affirmative', 'negative', 'is', 'is not', 'right', 'wrong', 'correct', 'incorrect', 'good', 'bad', 'good', 'evil', 'beautiful', 'ugly', 'high', 'low', 'big', 'small', 'long', 'short', 'wide', 'narrow', 'thick', 'thin', 'deep', 'shallow', 'far', 'near', 'fast', 'slow', 'early', 'late', 'new', 'old', 'young', 'old', 'fresh', 'stale', 'clean', 'dirty', 'tidy', 'messy', 'orderly', 'disorderly', 'regular', 'random', 'inevitable', 'accidental', 'certain', 'uncertain', 'clear', 'vague', 'clear', 'vague', 'specific', 'abstract', 'actual', 'theoretical', 'reality', 'ideal', 'true', 'false', 'honest', 'deceitful', 'trust', 'doubt', 'believe', 'disbelieve', 'know', 'not know', 'understand', 'not understand', 'clear', 'not clear', 'certain', 'uncertain', 'affirmative', 'negative']
            },
            es: {
                reservation: ['reserva', 'mesa', 'asiento', 'reservar'],
                menu: ['menú', 'recomendar', 'comida', 'plato', 'qué'],
                order: ['pedir', 'quiero', 'necesito', 'dame', 'tengo'],
                takeout: ['para llevar', 'entrega', 'recoger'],
                waitlist: ['lista de espera', 'cola', 'esperar'],
                allergy: ['alergia', 'dieta', 'intolerancia', 'no puedo comer'],
                brand: ['marca', 'historia', 'sobre', 'cuéntame', 'jamón', 'ibérico', 'bellota', 'cebo', 'grados', 'corte', 'maridaje', 'conservación', 'historia', 'regiones'],
                complaint: ['queja', 'problema', 'mal', 'incorrecto'],
                greeting: ['hola', 'buenas', 'buenos días', 'buenas tardes'],
                general: ['tiempo', 'hoy', 'estado de ánimo', 'vida', 'trabajo', 'estudio', 'película', 'música', 'viaje', 'deporte', 'salud', 'familia', 'amigo', 'amor', 'sueño', 'futuro', 'pasado', 'memoria', 'historia', 'chiste', 'diversión', 'noticias', 'tecnología', 'arte', 'cultura', 'historia', 'geografía', 'ciencia', 'filosofía', 'educación', 'entretenimiento', 'juego', 'deportes', 'moda', 'belleza', 'compras', 'inversión', 'finanzas', 'carrera', 'habilidad', 'idioma', 'lectura', 'escritura', 'fotografía', 'pintura', 'baile', 'canto', 'instrumento', 'cocina', 'jardinería', 'mascota', 'planta', 'animal', 'naturaleza', 'universo', 'tiempo', 'espacio', 'vida', 'significado', 'valor', 'felicidad', 'alegría', 'tristeza', 'ira', 'miedo', 'esperanza', 'decepción', 'éxito', 'fracaso', 'desafío', 'oportunidad', 'elección', 'decisión', 'responsabilidad', 'libertad', 'igualdad', 'justicia', 'moralidad', 'ética', 'religión', 'fe', 'ciencia', 'racional', 'emocional', 'intuición', 'inspiración', 'creatividad', 'innovación', 'tradición', 'moderno', 'futuro', 'pasado', 'presente', 'eternidad', 'momento', 'cambio', 'estabilidad', 'equilibrio', 'armonía', 'conflicto', 'cooperación', 'competencia', 'amistad', 'amor', 'familia', 'soledad', 'compañía', 'comprensión', 'malentendido', 'comunicación', 'silencio', 'expresión', 'escucha', 'compartir', 'privacidad', 'confianza', 'duda', 'honestidad', 'mentira', 'verdad', 'falso', 'belleza', 'fealdad', 'bondad', 'mal', 'luz', 'oscuridad', 'calor', 'frío', 'suave', 'duro', 'simple', 'complejo', 'claro', 'vago', 'cierto', 'incierto', 'posible', 'imposible', 'inevitable', 'accidental', 'causa', 'coincidencia', 'destino', 'elección', 'esfuerzo', 'talento', 'suerte', 'oportunidad', 'preparación', 'acción', 'pensamiento', 'sentimiento', 'experiencia', 'aprendizaje', 'crecimiento', 'cambio', 'persistencia', 'rendirse', 'comienzo', 'final', 'nacimiento', 'muerte', 'existencia', 'desaparición', 'memoria', 'olvido', 'sueño', 'realidad', 'ideal', 'actual', 'teoría', 'práctica', 'conocimiento', 'sabiduría', 'estupidez', 'inteligencia', 'genio', 'ordinario', 'especial', 'único', 'similar', 'diferente', 'mismo', 'consistente', 'contradictorio', 'unidad', 'división', 'completo', 'roto', 'reparar', 'destruir', 'crear', 'destruir', 'construir', 'demoler', 'aumentar', 'disminuir', 'subir', 'bajar', 'adelante', 'atrás', 'izquierda', 'derecha', 'recto', 'parar', 'continuar', 'pausa', 'reanudar', 'repetir', 'cambio', 'mantener', 'cambio', 'mantener', 'desarrollar', 'progreso', 'regresión', 'mejorar', 'declinar', 'mejorar', 'empeorar', 'mejorar', 'empeorar', 'éxito', 'fracaso', 'victoria', 'derrota', 'ganar', 'perder', 'ganar', 'perder', 'obtener', 'perder', 'tener', 'no tener', 'existir', 'no existir', 'es', 'no es', 'correcto', 'incorrecto', 'correcto', 'incorrecto', 'bueno', 'malo', 'bueno', 'malo', 'hermoso', 'feo', 'feo', 'hermoso', 'alto', 'bajo', 'grande', 'pequeño', 'largo', 'corto', 'ancho', 'estrecho', 'grueso', 'delgado', 'profundo', 'superficial', 'lejos', 'cerca', 'rápido', 'lento', 'temprano', 'tarde', 'nuevo', 'viejo', 'joven', 'viejo', 'fresco', 'rancio', 'limpio', 'sucio', 'ordenado', 'desordenado', 'ordenado', 'desordenado', 'regular', 'aleatorio', 'inevitable', 'accidental', 'cierto', 'incierto', 'claro', 'vago', 'claro', 'vago', 'específico', 'abstracto', 'actual', 'teórico', 'realidad', 'ideal', 'verdadero', 'falso', 'honesto', 'engañoso', 'confianza', 'duda', 'creer', 'no creer', 'saber', 'no saber', 'entender', 'no entender', 'claro', 'no claro', 'cierto', 'incierto', 'afirmativo', 'negativo', 'es', 'no es', 'correcto', 'incorrecto', 'correcto', 'incorrecto', 'bueno', 'malo', 'bueno', 'malo', 'hermoso', 'feo', 'alto', 'bajo', 'grande', 'pequeño', 'largo', 'corto', 'ancho', 'estrecho', 'grueso', 'delgado', 'profundo', 'superficial', 'lejos', 'cerca', 'rápido', 'lento', 'temprano', 'tarde', 'nuevo', 'viejo', 'joven', 'viejo', 'fresco', 'rancio', 'limpio', 'sucio', 'ordenado', 'desordenado', 'ordenado', 'desordenado', 'regular', 'aleatorio', 'inevitable', 'accidental', 'cierto', 'incierto', 'claro', 'vago', 'claro', 'vago', 'específico', 'abstracto', 'actual', 'teórico', 'realidad', 'ideal', 'verdadero', 'falso', 'honesto', 'engañoso', 'confianza', 'duda', 'creer', 'no creer', 'saber', 'no saber', 'entender', 'no entender', 'claro', 'no claro', 'cierto', 'incierto', 'afirmativo', 'negativo']
            }
        };
        
        // 品牌知识库
        this.brandKnowledge = {
            jamon_iberico: {
                zh: "伊比利亚火腿为西班牙风干火腿，分级包括Bellota/Cebo de Campo/Cebo。常温薄切，坚果与乳香风味明显，适合搭配番茄面包与干型红酒。哼哼，这可是我的最爱呢！",
                en: "Jamón Ibérico is Spanish cured ham, graded as Bellota/Cebo de Campo/Cebo. Served at room temperature in thin slices, with distinct nutty and creamy flavors, perfect with tomato bread and dry red wine. Oink oink, this is my absolute favorite!",
                es: "El Jamón Ibérico es jamón curado español, clasificado como Bellota/Cebo de Campo/Cebo. Se sirve a temperatura ambiente en lonchas finas, con sabores distintivos a nuez y cremoso, perfecto con pan con tomate y vino tinto seco. ¡Oink oink, este es mi favorito absoluto!"
            },
            jamon_grades: {
                zh: "伊比利亚火腿分级详解：🐷 Bellota（橡果级）- 最高等级，橡果喂养，48个月熟成，坚果香浓郁，价格¥280；Cebo de Campo（混合级）- 橡果+谷物混合喂养，24个月熟成，平衡口感，价格¥180；Cebo（谷物级）- 谷物喂养，18个月熟成，性价比高，价格¥150。哼哼，每一级都有独特魅力！",
                en: "Jamón Ibérico grades explained: 🐷 Bellota (Acorn grade) - Highest quality, acorn-fed, 48-month aged, rich nutty flavor, ¥280; Cebo de Campo (Mixed grade) - Acorn + grain fed, 24-month aged, balanced taste, ¥180; Cebo (Grain grade) - Grain-fed, 18-month aged, great value, ¥150. Oink oink, each grade has its unique charm!",
                es: "Grados del Jamón Ibérico explicados: 🐷 Bellota (Grado bellota) - Máxima calidad, alimentado con bellotas, 48 meses de curación, sabor a nuez rico, ¥280; Cebo de Campo (Grado mixto) - Alimentado con bellotas + grano, 24 meses de curación, sabor equilibrado, ¥180; Cebo (Grado grano) - Alimentado con grano, 18 meses de curación, gran valor, ¥150. ¡Oink oink, cada grado tiene su encanto único!"
            },
            jamon_cutting: {
                zh: "火腿切片艺术：🔪 专业切片师用长刀手工切片，每片厚度0.5-1毫米，薄如蝉翼。切片顺序：先切后腿，再切前腿，从肥肉到瘦肉。室温18-20°C最佳，配专用火腿架。哼哼，好的切片能让火腿风味完全释放！",
                en: "The art of ham slicing: 🔪 Professional cortadores use long knives for hand-slicing, each slice 0.5-1mm thick, paper-thin. Slicing order: hind leg first, then front leg, from fat to lean. Best at room temperature 18-20°C, served on special ham stands. Oink oink, perfect slicing releases the full flavor!",
                es: "El arte del corte de jamón: 🔪 Los cortadores profesionales usan cuchillos largos para cortar a mano, cada loncha de 0.5-1mm de grosor, fina como papel. Orden de corte: pierna trasera primero, luego delantera, de grasa a magro. Mejor a temperatura ambiente 18-20°C, servido en jamoneros especiales. ¡Oink oink, el corte perfecto libera todo el sabor!"
            },
            jamon_pairing: {
                zh: "火腿搭配指南：🍷 酒类搭配：Bellota配Rioja红酒，Cebo配Cava起泡酒，雪利酒Fino配任何等级；🍞 面包搭配：番茄面包、法棍、全麦面包；🧀 奶酪搭配：Manchego羊奶酪、Idiazábal烟熏奶酪；🍯 其他搭配：蜂蜜、无花果、橄榄。哼哼，这些搭配能让火腿风味更上一层楼！",
                en: "Ham pairing guide: 🍷 Wine pairings: Bellota with Rioja red wine, Cebo with Cava sparkling, Sherry Fino with any grade; 🍞 Bread pairings: Tomato bread, baguette, whole wheat; 🧀 Cheese pairings: Manchego sheep cheese, Idiazábal smoked cheese; 🍯 Other pairings: Honey, figs, olives. Oink oink, these pairings elevate the ham flavor to new heights!",
                es: "Guía de maridaje de jamón: 🍷 Maridajes de vino: Bellota con vino tinto Rioja, Cebo con Cava espumoso, Fino con cualquier grado; 🍞 Maridajes de pan: Pan con tomate, baguette, pan integral; 🧀 Maridajes de queso: Queso de oveja Manchego, queso ahumado Idiazábal; 🍯 Otros maridajes: Miel, higos, aceitunas. ¡Oink oink, estos maridajes elevan el sabor del jamón a nuevas alturas!"
            },
            jamon_storage: {
                zh: "火腿保存方法：❄️ 整腿保存：悬挂在阴凉干燥处，温度15-18°C，湿度60-70%，可保存2-3年；🍖 切片保存：冷藏2-4°C，用保鲜膜包裹，可保存3-5天；🔄 解冻方法：室温解冻30分钟，不要加热。哼哼，正确的保存能让火腿保持最佳风味！",
                en: "Ham storage methods: ❄️ Whole leg storage: Hang in cool, dry place, temperature 15-18°C, humidity 60-70%, can keep 2-3 years; 🍖 Sliced storage: Refrigerate at 2-4°C, wrap in cling film, can keep 3-5 days; 🔄 Thawing method: Room temperature for 30 minutes, never heat. Oink oink, proper storage keeps the ham at its best flavor!",
                es: "Métodos de conservación del jamón: ❄️ Conservación de jamón entero: Colgar en lugar fresco y seco, temperatura 15-18°C, humedad 60-70%, puede conservarse 2-3 años; 🍖 Conservación en lonchas: Refrigerar a 2-4°C, envolver en film transparente, puede conservarse 3-5 días; 🔄 Método de descongelación: Temperatura ambiente 30 minutos, nunca calentar. ¡Oink oink, la conservación correcta mantiene el jamón en su mejor sabor!"
            },
            jamon_history: {
                zh: "火腿历史故事：📜 伊比利亚火腿起源于古罗马时期，西班牙人继承了这一传统。橡果喂养的猪只在德埃萨草原自由放养，形成了独特的生态系统。制作工艺传承千年，从腌制到风干，每一步都体现着西班牙人的智慧。哼哼，每一片火腿都承载着历史！",
                en: "Ham history story: 📜 Jamón Ibérico originated in ancient Roman times, with Spaniards inheriting this tradition. Acorn-fed pigs roam freely in dehesa grasslands, creating a unique ecosystem. The craft has been passed down for millennia, from curing to aging, every step reflects Spanish wisdom. Oink oink, every slice carries history!",
                es: "Historia del jamón: 📜 El Jamón Ibérico se originó en la época romana antigua, con los españoles heredando esta tradición. Los cerdos alimentados con bellotas pastan libremente en las dehesas, creando un ecosistema único. La artesanía se ha transmitido durante milenios, desde el curado hasta el envejecimiento, cada paso refleja la sabiduría española. ¡Oink oink, cada loncha lleva historia!"
            },
            jamon_regions: {
                zh: "火腿产区介绍：🗺️ 主要产区：哈恩省（Jaén）- 最大产区，品质稳定；萨拉曼卡省（Salamanca）- 传统产区，风味浓郁；韦尔瓦省（Huelva）- 沿海产区，咸香突出；托莱多省（Toledo）- 内陆产区，口感细腻。每个产区都有独特的风土特色！哼哼，这就是西班牙的魅力！",
                en: "Ham regions introduction: 🗺️ Main regions: Jaén Province - Largest production area, stable quality; Salamanca Province - Traditional region, rich flavor; Huelva Province - Coastal region, prominent saltiness; Toledo Province - Inland region, delicate taste. Each region has unique terroir characteristics! Oink oink, this is the charm of Spain!",
                es: "Introducción a las regiones del jamón: 🗺️ Principales regiones: Provincia de Jaén - Mayor área de producción, calidad estable; Provincia de Salamanca - Región tradicional, sabor rico; Provincia de Huelva - Región costera, salinidad prominente; Provincia de Toledo - Región interior, sabor delicado. ¡Cada región tiene características únicas de terruño! ¡Oink oink, este es el encanto de España!"
            },
            pan_de_coca: {
                zh: "Pan de Coca 为加泰罗尼亚高含水量脆皮面包，横切后200°C快烤，上擦番茄并淋特级初榨橄榄油即为经典番茄面包；常与火腿、tapas同食。哇，这个面包的工艺可是很讲究的呢！",
                en: "Pan de Coca is a Catalan high-hydration crispy bread, sliced and quickly baked at 200°C, topped with tomato and drizzled with extra virgin olive oil to make classic tomato bread; often served with ham and tapas. Wow, the craftsmanship of this bread is quite exquisite!",
                es: "Pan de Coca es un pan crujiente catalán de alta hidratación, cortado y horneado rápidamente a 200°C, cubierto con tomate y rociado con aceite de oliva virgen extra para hacer pan con tomate clásico; a menudo servido con jamón y tapas. ¡Wow, la artesanía de este pan es bastante exquisita!"
            },
            olive_oil: {
                zh: "我们选用西班牙托莱多的 Casas de Hualdo 特级初榨橄榄油，冷榨、果香清新，适合蘸面包与冷拌。哼哼，这可是地中海的味道呢！",
                en: "We use Casas de Hualdo extra virgin olive oil from Toledo, Spain - cold-pressed with fresh fruity aroma, perfect for dipping bread and cold dishes. Oink oink, this is the taste of the Mediterranean!",
                es: "Utilizamos aceite de oliva virgen extra Casas de Hualdo de Toledo, España - prensado en frío con aroma frutal fresco, perfecto para mojar pan y platos fríos. ¡Oink oink, este es el sabor del Mediterráneo!"
            },
            folgueroles: {
                zh: "La Coca de Folgueroles 为加泰罗尼亚手作品牌，无防腐剂/添加剂，2020 国际风味评鉴三星。哼哼，这可是获奖的精品呢！",
                en: "La Coca de Folgueroles is a Catalan artisanal brand, free of preservatives/additives, 2020 International Taste Institute three stars. Oink oink, this is award-winning quality!",
                es: "La Coca de Folgueroles es una marca artesanal catalana, sin conservantes/aditivos, tres estrellas del Instituto Internacional del Sabor 2020. ¡Oink oink, esta es calidad galardonada!"
            },
            spanish_cuisine: {
                zh: "西班牙美食文化丰富多彩！哼哼，你知道吗？西班牙有17个自治区，每个地方都有独特的美食传统。从北部的巴斯克地区到南部的安达卢西亚，从海鲜到火腿，每一道菜都承载着历史和文化。我最爱的是tapas文化，小份分享，大家一起品尝，这就是西班牙人的生活方式！",
                en: "Spanish cuisine culture is rich and colorful! Oink oink, did you know? Spain has 17 autonomous regions, each with unique culinary traditions. From the Basque Country in the north to Andalusia in the south, from seafood to ham, every dish carries history and culture. My favorite is the tapas culture - small portions to share, everyone tasting together, this is the Spanish way of life!",
                es: "¡La cultura culinaria española es rica y colorida! Oink oink, ¿sabías que España tiene 17 comunidades autónomas, cada una con tradiciones culinarias únicas? Desde el País Vasco en el norte hasta Andalucía en el sur, desde mariscos hasta jamón, cada plato lleva historia y cultura. ¡Mi favorito es la cultura de tapas - porciones pequeñas para compartir, todos probando juntos, esta es la forma de vida española!"
            },
            steak_knowledge: {
                zh: "牛排知识小课堂！哼哼，牛排的熟度很重要：一分熟(rare)内部鲜红，三分熟(medium-rare)中心粉红，五分熟(medium)中心微粉，七分熟(medium-well)几乎全熟，全熟(well-done)完全熟透。我们推荐三分到五分熟，这样肉质最嫩最香！",
                en: "Steak knowledge class! Oink oink, steak doneness is crucial: rare (red center), medium-rare (pink center), medium (slightly pink), medium-well (almost done), well-done (completely cooked). We recommend medium-rare to medium for the most tender and flavorful meat!",
                es: "¡Clase de conocimiento sobre carne! Oink oink, el punto de la carne es crucial: poco hecho (centro rojo), término medio (centro rosado), medio (ligeramente rosado), tres cuartos (casi hecho), bien hecho (completamente cocido). ¡Recomendamos término medio a medio para la carne más tierna y sabrosa!"
            },
            wine_pairing: {
                zh: "酒类搭配小贴士！哼哼，红酒配红肉，白酒配白肉和白鱼，这是基本原则。但西班牙的雪利酒很特别，可以配火腿，也可以配海鲜。我们的Rioja红酒配伊比利亚火腿简直是绝配！",
                en: "Wine pairing tips! Oink oink, red wine with red meat, white wine with white meat and fish, that's the basic rule. But Spanish sherry is special - it can pair with ham or seafood. Our Rioja red wine with Jamón Ibérico is a perfect match!",
                es: "¡Consejos de maridaje de vinos! Oink oink, vino tinto con carne roja, vino blanco con carne blanca y pescado, esa es la regla básica. Pero el jerez español es especial - puede maridar con jamón o mariscos. ¡Nuestro vino tinto Rioja con Jamón Ibérico es una combinación perfecta!"
            }
        };
        
        // 菜单数据
        this.menuData = {
            zh: {
                categories: {
                    jamon: {
                        name: "伊比利亚火腿",
                        items: [
                            {
                                name: "Bellota 48个月",
                                price: 280,
                                description: "最高等级，橡果喂养，48个月熟成",
                                allergens: ["猪肉"]
                            },
                            {
                                name: "Bellota 36个月",
                                price: 220,
                                description: "橡果喂养，36个月熟成，口感丰富",
                                allergens: ["猪肉"]
                            },
                            {
                                name: "Cebo de Campo 24个月",
                                price: 180,
                                description: "混合饲料喂养，24个月熟成",
                                allergens: ["猪肉"]
                            },
                            {
                                name: "Cebo 18个月",
                                price: 150,
                                description: "谷物喂养，18个月熟成，性价比高",
                                allergens: ["猪肉"]
                            }
                        ]
                    },
                    bread: {
                        name: "面包类",
                        items: [
                            {
                                name: "Pan de Coca",
                                price: 25,
                                description: "加泰罗尼亚传统脆皮面包",
                                allergens: ["小麦", "麸质"]
                            },
                            {
                                name: "番茄面包",
                                price: 35,
                                description: "Pan de Coca配新鲜番茄和橄榄油",
                                allergens: ["小麦", "麸质"]
                            },
                            {
                                name: "蒜香面包",
                                price: 30,
                                description: "蒜蓉黄油烤制，香气浓郁",
                                allergens: ["小麦", "麸质", "乳制品"]
                            }
                        ]
                    },
                    cheese: {
                        name: "奶酪类",
                        items: [
                            {
                                name: "Manchego 12个月",
                                price: 120,
                                description: "西班牙羊奶酪，12个月熟成",
                                allergens: ["乳制品"]
                            },
                            {
                                name: "Idiazábal",
                                price: 95,
                                description: "巴斯克地区烟熏羊奶酪",
                                allergens: ["乳制品"]
                            },
                            {
                                name: "Cabrales",
                                price: 85,
                                description: "阿斯图里亚斯蓝纹奶酪",
                                allergens: ["乳制品"]
                            }
                        ]
                    },
                    wine: {
                        name: "酒类",
                        items: [
                            {
                                name: "Rioja Reserva",
                                price: 180,
                                description: "里奥哈珍藏红酒，橡木桶陈年",
                                allergens: ["亚硫酸盐"]
                            },
                            {
                                name: "Cava Brut",
                                price: 120,
                                description: "西班牙起泡酒，干型",
                                allergens: ["亚硫酸盐"]
                            },
                            {
                                name: "Sherry Fino",
                                price: 95,
                                description: "雪利酒，干型，配火腿绝佳",
                                allergens: ["亚硫酸盐"]
                            }
                        ]
                    },
                    tapas: {
                        name: "小食",
                        items: [
                            {
                                name: "橄榄拼盘",
                                price: 45,
                                description: "三种西班牙橄榄，配面包",
                                allergens: []
                            },
                            {
                                name: "西班牙土豆饼",
                                price: 55,
                                description: "传统土豆蛋饼，配洋葱",
                                allergens: ["鸡蛋", "乳制品"]
                            },
                            {
                                name: "蒜蓉虾",
                                price: 65,
                                description: "橄榄油蒜蓉炒虾",
                                allergens: ["甲壳类"]
                            }
                        ]
                    },
                    steak: {
                        name: "牛排类",
                        items: [
                            {
                                name: "菲力牛排",
                                price: 180,
                                description: "最嫩部位，推荐三分熟，配黑胡椒汁",
                                allergens: ["牛肉"]
                            },
                            {
                                name: "西冷牛排",
                                price: 160,
                                description: "口感丰富，推荐五分熟，配红酒汁",
                                allergens: ["牛肉"]
                            },
                            {
                                name: "肋眼牛排",
                                price: 170,
                                description: "油脂丰富，推荐五分熟，配香草汁",
                                allergens: ["牛肉"]
                            },
                            {
                                name: "T骨牛排",
                                price: 190,
                                description: "一次享受两种口感，推荐七分熟",
                                allergens: ["牛肉"]
                            },
                            {
                                name: "黑胡椒牛排",
                                price: 175,
                                description: "经典黑胡椒调味，推荐五分熟",
                                allergens: ["牛肉"]
                            },
                            {
                                name: "蒜香牛排",
                                price: 165,
                                description: "蒜香浓郁，推荐五分熟",
                                allergens: ["牛肉"]
                            }
                        ]
                    }
                }
            },
            en: {
                categories: {
                    jamon: {
                        name: "Jamón Ibérico",
                        items: [
                            {
                                name: "Bellota 48 months",
                                price: 280,
                                description: "Highest grade, acorn-fed, 48-month aged",
                                allergens: ["pork"]
                            },
                            {
                                name: "Bellota 36 months",
                                price: 220,
                                description: "Acorn-fed, 36-month aged, rich flavor",
                                allergens: ["pork"]
                            },
                            {
                                name: "Cebo de Campo 24 months",
                                price: 180,
                                description: "Mixed feed, 24-month aged",
                                allergens: ["pork"]
                            },
                            {
                                name: "Cebo 18 months",
                                price: 150,
                                description: "Grain-fed, 18-month aged, great value",
                                allergens: ["pork"]
                            }
                        ]
                    },
                    bread: {
                        name: "Bread",
                        items: [
                            {
                                name: "Pan de Coca",
                                price: 25,
                                description: "Traditional Catalan crispy bread",
                                allergens: ["wheat", "gluten"]
                            },
                            {
                                name: "Tomato Bread",
                                price: 35,
                                description: "Pan de Coca with fresh tomato and olive oil",
                                allergens: ["wheat", "gluten"]
                            },
                            {
                                name: "Garlic Bread",
                                price: 30,
                                description: "Garlic butter roasted, aromatic",
                                allergens: ["wheat", "gluten", "dairy"]
                            }
                        ]
                    },
                    cheese: {
                        name: "Cheese",
                        items: [
                            {
                                name: "Manchego 12 months",
                                price: 120,
                                description: "Spanish sheep cheese, 12-month aged",
                                allergens: ["dairy"]
                            },
                            {
                                name: "Idiazábal",
                                price: 95,
                                description: "Basque smoked sheep cheese",
                                allergens: ["dairy"]
                            },
                            {
                                name: "Cabrales",
                                price: 85,
                                description: "Asturias blue cheese",
                                allergens: ["dairy"]
                            }
                        ]
                    },
                    wine: {
                        name: "Wine",
                        items: [
                            {
                                name: "Rioja Reserva",
                                price: 180,
                                description: "Rioja red wine, oak barrel aged",
                                allergens: ["sulfites"]
                            },
                            {
                                name: "Cava Brut",
                                price: 120,
                                description: "Spanish sparkling wine, dry",
                                allergens: ["sulfites"]
                            },
                            {
                                name: "Sherry Fino",
                                price: 95,
                                description: "Sherry wine, dry, perfect with ham",
                                allergens: ["sulfites"]
                            }
                        ]
                    },
                    tapas: {
                        name: "Tapas",
                        items: [
                            {
                                name: "Olive Platter",
                                price: 45,
                                description: "Three types of Spanish olives with bread",
                                allergens: []
                            },
                            {
                                name: "Spanish Tortilla",
                                price: 55,
                                description: "Traditional potato omelet with onion",
                                allergens: ["eggs", "dairy"]
                            },
                            {
                                name: "Garlic Shrimp",
                                price: 65,
                                description: "Shrimp sautéed with garlic and olive oil",
                                allergens: ["shellfish"]
                            }
                        ]
                    },
                    steak: {
                        name: "Steak",
                        items: [
                            {
                                name: "Filet Mignon",
                                price: 180,
                                description: "Tenderest cut, recommended medium-rare, with black pepper sauce",
                                allergens: ["beef"]
                            },
                            {
                                name: "Sirloin Steak",
                                price: 160,
                                description: "Rich flavor, recommended medium, with red wine sauce",
                                allergens: ["beef"]
                            },
                            {
                                name: "Ribeye Steak",
                                price: 170,
                                description: "Rich in fat, recommended medium, with herb sauce",
                                allergens: ["beef"]
                            },
                            {
                                name: "T-bone Steak",
                                price: 190,
                                description: "Enjoy two textures, recommended medium-well",
                                allergens: ["beef"]
                            },
                            {
                                name: "Black Pepper Steak",
                                price: 175,
                                description: "Classic black pepper seasoning, recommended medium",
                                allergens: ["beef"]
                            },
                            {
                                name: "Garlic Steak",
                                price: 165,
                                description: "Aromatic with garlic, recommended medium",
                                allergens: ["beef"]
                            }
                        ]
                    }
                }
            },
            es: {
                categories: {
                    jamon: {
                        name: "Jamón Ibérico",
                        items: [
                            {
                                name: "Bellota 48 meses",
                                price: 280,
                                description: "Máximo grado, alimentado con bellotas, 48 meses de curación",
                                allergens: ["cerdo"]
                            },
                            {
                                name: "Bellota 36 meses",
                                price: 220,
                                description: "Alimentado con bellotas, 36 meses de curación, sabor rico",
                                allergens: ["cerdo"]
                            },
                            {
                                name: "Cebo de Campo 24 meses",
                                price: 180,
                                description: "Alimentación mixta, 24 meses de curación",
                                allergens: ["cerdo"]
                            },
                            {
                                name: "Cebo 18 meses",
                                price: 150,
                                description: "Alimentado con grano, 18 meses de curación, excelente relación calidad-precio",
                                allergens: ["cerdo"]
                            }
                        ]
                    },
                    bread: {
                        name: "Pan",
                        items: [
                            {
                                name: "Pan de Coca",
                                price: 25,
                                description: "Pan crujiente tradicional catalán",
                                allergens: ["trigo", "gluten"]
                            },
                            {
                                name: "Pan con Tomate",
                                price: 35,
                                description: "Pan de Coca con tomate fresco y aceite de oliva",
                                allergens: ["trigo", "gluten"]
                            },
                            {
                                name: "Pan de Ajo",
                                price: 30,
                                description: "Tostado con mantequilla de ajo, aromático",
                                allergens: ["trigo", "gluten", "lácteos"]
                            }
                        ]
                    },
                    cheese: {
                        name: "Queso",
                        items: [
                            {
                                name: "Manchego 12 meses",
                                price: 120,
                                description: "Queso de oveja español, 12 meses de curación",
                                allergens: ["lácteos"]
                            },
                            {
                                name: "Idiazábal",
                                price: 95,
                                description: "Queso de oveja ahumado del País Vasco",
                                allergens: ["lácteos"]
                            },
                            {
                                name: "Cabrales",
                                price: 85,
                                description: "Queso azul de Asturias",
                                allergens: ["lácteos"]
                            }
                        ]
                    },
                    wine: {
                        name: "Vino",
                        items: [
                            {
                                name: "Rioja Reserva",
                                price: 180,
                                description: "Vino tinto de Rioja, envejecido en barrica de roble",
                                allergens: ["sulfitos"]
                            },
                            {
                                name: "Cava Brut",
                                price: 120,
                                description: "Vino espumoso español, seco",
                                allergens: ["sulfitos"]
                            },
                            {
                                name: "Sherry Fino",
                                price: 95,
                                description: "Vino de Jerez, seco, perfecto con jamón",
                                allergens: ["sulfitos"]
                            }
                        ]
                    },
                    tapas: {
                        name: "Tapas",
                        items: [
                            {
                                name: "Tabla de Aceitunas",
                                price: 45,
                                description: "Tres tipos de aceitunas españolas con pan",
                                allergens: []
                            },
                            {
                                name: "Tortilla Española",
                                price: 55,
                                description: "Tortilla tradicional de patata con cebolla",
                                allergens: ["huevos", "lácteos"]
                            },
                            {
                                name: "Gambas al Ajillo",
                                price: 65,
                                description: "Gambas salteadas con ajo y aceite de oliva",
                                allergens: ["mariscos"]
                            }
                        ]
                    },
                    steak: {
                        name: "Carne",
                        items: [
                            {
                                name: "Filete de Ternera",
                                price: 180,
                                description: "Corte más tierno, recomendado término medio, con salsa de pimienta negra",
                                allergens: ["ternera"]
                            },
                            {
                                name: "Solomillo",
                                price: 160,
                                description: "Sabor rico, recomendado término medio, con salsa de vino tinto",
                                allergens: ["ternera"]
                            },
                            {
                                name: "Chuleta de Ternera",
                                price: 170,
                                description: "Rica en grasa, recomendado término medio, con salsa de hierbas",
                                allergens: ["ternera"]
                            },
                            {
                                name: "T-bone",
                                price: 190,
                                description: "Disfruta dos texturas, recomendado tres cuartos",
                                allergens: ["ternera"]
                            },
                            {
                                name: "Carne con Pimienta Negra",
                                price: 175,
                                description: "Condimentado clásico con pimienta negra, recomendado término medio",
                                allergens: ["ternera"]
                            },
                            {
                                name: "Carne con Ajo",
                                price: 165,
                                description: "Aromático con ajo, recomendado término medio",
                                allergens: ["ternera"]
                            }
                        ]
                    }
                }
            }
        };
        
        this.init();
    }
    
    async init() {
        this.setupEventListeners();
        this.setupVideo();
        this.detectLanguage();
        this.updateUI();
        this.initAnimations();
        this.setupOptionButtons();
        
        // 测试API连接
        const apiConnected = await this.testAPIConnection();
        if (apiConnected) {
            console.log('✅ Together.ai API连接正常，聊天机器人已准备就绪');
        } else {
            console.log('⚠️ Together.ai API连接失败，将使用本地回复模式');
        }
    }
    
    setupVideo() {
        if (this.welcomeVideo) {
            // 视频加载事件
            this.welcomeVideo.addEventListener('loadeddata', () => {
                console.log('Welcome video loaded successfully');
            });
            
            // 视频错误处理
            this.welcomeVideo.addEventListener('error', (e) => {
                console.log('Video failed to load, using fallback background');
                // 如果视频加载失败，可以显示静态背景
                this.welcomePage.style.background = 'linear-gradient(135deg, #000000, #333333)';
            });
            
            // 视频播放事件
            this.welcomeVideo.addEventListener('play', () => {
                console.log('Welcome video started playing');
            });
        }
    }
    
    async testAPIConnection() {
        try {
            console.log('测试Together.ai API连接...');
            const testResponse = await this.getAIResponse('测试连接', 'greeting');
            console.log('Together.ai API连接成功:', testResponse);
            return true;
        } catch (error) {
            console.warn('Together.ai API连接失败，将使用本地回复:', error.message);
            return false;
        }
    }
    
    setupEventListeners() {
        // 语言选择按钮
        document.querySelectorAll('.lang-selection-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentLanguage = e.target.closest('.lang-selection-btn').dataset.lang;
                
                // 触发欢迎页面线条动画
                this.triggerLineAnimation('.decorative-lines .line');
                
                this.transitionToChat();
            });
        });
        
        // 发送消息
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // 语言切换
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentLanguage = e.target.dataset.lang;
                this.updateLanguageButtons();
                this.updateUI();
            });
        });
        
        // 快捷按钮
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleQuickAction(action);
                
                // 触发线条动画效果
                this.triggerLineAnimation('.chat-decorative-lines .line');
            });
        });
    }
    
    detectLanguage() {
        const userInput = this.messageInput.value.toLowerCase();
        const langPatterns = {
            zh: /[\u4e00-\u9fa5]/,
            es: /\b(hola|buenas|gracias|por favor|sí|no)\b/i,
            en: /\b(hello|hi|thanks|please|yes|no)\b/i
        };
        
        for (const [lang, pattern] of Object.entries(langPatterns)) {
            if (pattern.test(userInput)) {
                this.currentLanguage = lang;
                this.updateLanguageButtons();
                break;
            }
        }
    }
    
    updateLanguageButtons() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === this.currentLanguage) {
                btn.classList.add('active');
            }
        });
    }
    
    transitionToChat() {
        // 暂停视频
        if (this.welcomeVideo) {
            this.welcomeVideo.pause();
        }
        
        // 淡出欢迎页面
        this.welcomePage.classList.add('fade-out');
        
        // 延迟显示聊天界面
        setTimeout(() => {
            this.welcomePage.style.display = 'none';
            this.chatInterface.style.display = 'block';
            
            // 更新聊天界面文本
            this.updateChatInterface();
            
            // 启动聊天界面线条动画
            setTimeout(() => {
                this.animateChatLines();
            }, 300);
            
            // 显示欢迎消息（分段显示）
            setTimeout(() => {
                this.showWelcomeMessage();
            }, 500);
        }, 1000);
    }
    
    updateChatInterface() {
        const texts = this.texts[this.currentLanguage];
        
        // 不清空聊天消息，保持HTML中定义的开场白
        // this.chatMessages.innerHTML = '';
        
        // 更新聊天标题
        document.querySelector('.chat-title h2').textContent = texts.chatTitle;
        document.querySelector('.chat-subtitle').textContent = texts.chatSubtitle;
        
        // 更新状态文本
        this.statusText.textContent = texts.status;
        this.messageInput.placeholder = texts.placeholder;
        document.querySelector('.hint').textContent = texts.hint;
        
        // 更新语言按钮状态
        this.updateLanguageButtons();
    }
    
    showWelcomeMessage() {
        // 动态显示开场白，一段一段地出现
        this.showWelcomeMessageStepByStep();
    }
    
    showWelcomeMessageStepByStep() {
        // 清空聊天消息
        this.chatMessages.innerHTML = '';
        
        const welcomeSteps = {
            zh: [
                {
                    content: "🐷 你好呀，我是强尼小猪，欢迎来到Depaso餐厅！",
                    delay: 0
                },
                {
                    content: "这里是一家温馨的社区小馆。桌椅不多，却希望让你一进门就有\"到家\"的感觉。",
                    delay: 3000
                },
                {
                    content: "我们在装修、食材和每一道菜上，都坚持用对待家人的心意来对待客人。",
                    delay: 3000
                },
                {
                    content: "装修要环保，食材要安心健康、味道要纯粹美好——因为我希望你在这里吃得放心，也吃得开心哦！",
                    delay: 3000
                },
                {
                    content: "请告诉我您需要什么帮助？请问你是来吃Brunch，来吃肉肉或牛排，还是来喝喝咖啡发发呆呢？",
                    delay: 3000
                },
                {
                    content: "options", // 特殊标记，表示显示选项按钮
                    delay: 2000
                }
            ],
            en: [
                {
                    content: "🐷 Hello! I'm Johnny Pig, welcome to Depaso Restaurant!",
                    delay: 0
                },
                {
                    content: "This is a cozy community bistro. Though we don't have many tables, we hope you feel \"at home\" the moment you step in.",
                    delay: 3000
                },
                {
                    content: "We treat every guest with the same care we'd give to family - in our decor, ingredients, and every dish we serve.",
                    delay: 3000
                },
                {
                    content: "Our decor is eco-friendly, our ingredients are safe and healthy, our flavors are pure and wonderful - because we want you to eat with peace of mind and joy!",
                    delay: 3000
                },
                {
                    content: "What can I help you with today? Are you here for Brunch, meat/steak, or just want to drink coffee and relax?",
                    delay: 3000
                },
                {
                    content: "options",
                    delay: 2000
                }
            ],
            es: [
                {
                    content: "🐷 ¡Hola! Soy Johnny Pig, ¡bienvenido al Restaurante Depaso!",
                    delay: 0
                },
                {
                    content: "Este es un bistró comunitario acogedor. Aunque no tenemos muchas mesas, esperamos que te sientas \"en casa\" desde el momento en que entres.",
                    delay: 3000
                },
                {
                    content: "Tratamos a cada huésped con el mismo cuidado que daríamos a la familia - en nuestra decoración, ingredientes y cada plato que servimos.",
                    delay: 3000
                },
                {
                    content: "Nuestra decoración es ecológica, nuestros ingredientes son seguros y saludables, nuestros sabores son puros y maravillosos - ¡porque queremos que comas con tranquilidad y alegría!",
                    delay: 3000
                },
                {
                    content: "¿En qué puedo ayudarte hoy? ¿Estás aquí para Brunch, carne/bistec, o solo quieres beber café y relajarte?",
                    delay: 3000
                },
                {
                    content: "options",
                    delay: 2000
                }
            ]
        };
        
        const steps = welcomeSteps[this.currentLanguage];
        let currentStep = 0;
        
        const showNextStep = () => {
            if (currentStep >= steps.length) return;
            
            const step = steps[currentStep];
            
            if (step.content === "options") {
                // 显示选项按钮
                this.showOptionButtons();
            } else {
                // 显示文本消息
                this.addMessage('bot', step.content);
            }
            
            currentStep++;
            
            if (currentStep < steps.length) {
                setTimeout(showNextStep, step.delay);
            }
        };
        
        // 开始显示开场白
        showNextStep();
    }
    
    showOptionButtons() {
        const optionButtons = {
            zh: `
                <div class="message bot-message">
                    <div class="message-content">
                        <div class="message-bubble">
                            <div class="welcome-options">
                                <button class="option-btn" data-option="meat">🥩 吃肉肉</button>
                                <button class="option-btn" data-option="brunch">🍳 来顿Brunch</button>
                                <button class="option-btn" data-option="coffee">☕ 只想喝喝咖啡饮品</button>
                                <button class="option-btn" data-option="menu">📋 菜单都拿来看看！</button>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            en: `
                <div class="message bot-message">
                    <div class="message-content">
                        <div class="message-bubble">
                            <div class="welcome-options">
                                <button class="option-btn" data-option="meat">🥩 Eat Meat</button>
                                <button class="option-btn" data-option="brunch">🍳 Have Brunch</button>
                                <button class="option-btn" data-option="coffee">☕ Just Coffee & Drinks</button>
                                <button class="option-btn" data-option="menu">📋 Show Me the Menu!</button>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            es: `
                <div class="message bot-message">
                    <div class="message-content">
                        <div class="message-bubble">
                            <div class="welcome-options">
                                <button class="option-btn" data-option="meat">🥩 Comer Carne</button>
                                <button class="option-btn" data-option="brunch">🍳 Desayunar</button>
                                <button class="option-btn" data-option="coffee">☕ Solo Café y Bebidas</button>
                                <button class="option-btn" data-option="menu">📋 ¡Muéstrame el Menú!</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
        };
        
        this.chatMessages.insertAdjacentHTML('beforeend', optionButtons[this.currentLanguage]);
        this.scrollToBottom();
    }
    
    updateUI() {
        const texts = this.texts[this.currentLanguage];
        this.statusText.textContent = texts.status;
        this.messageInput.placeholder = texts.placeholder;
        document.querySelector('.hint').textContent = texts.hint;
    }
    
    handleQuickAction(action) {
        const actionMessages = {
            zh: {
                reservation: "我想预订座位",
                menu: "请推荐一些菜品",
                order: "我要点餐",
                takeout: "我想点外卖",
                waitlist: "我想加入候位",
                allergy: "我有食物过敏",
                brand: "请介绍一下品牌特色"
            },
            en: {
                reservation: "I'd like to make a reservation",
                menu: "Please recommend some dishes",
                order: "I'd like to order",
                takeout: "I'd like to order takeout",
                waitlist: "I'd like to join the waitlist",
                allergy: "I have food allergies",
                brand: "Please tell me about your brand"
            },
            es: {
                reservation: "Me gustaría hacer una reserva",
                menu: "Por favor recomiende algunos platos",
                order: "Me gustaría pedir",
                takeout: "Me gustaría pedir para llevar",
                waitlist: "Me gustaría unirme a la lista de espera",
                allergy: "Tengo alergias alimentarias",
                brand: "Por favor cuénteme sobre su marca"
            }
        };
        
        const message = actionMessages[this.currentLanguage][action];
        this.messageInput.value = message;
        this.sendMessage();
    }
    
    sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;
        
        // 添加用户消息
        this.addMessage('user', message);
        this.messageInput.value = '';
        
        // 触发线条动画效果
        this.triggerLineAnimation('.chat-decorative-lines .line');
        
        // 处理消息
        setTimeout(() => {
            this.processMessage(message);
        }, 500);
    }
    
    async processMessage(message) {
        try {
            // 显示输入指示器
            this.showTypingIndicator();
            
            // 识别意图
            const intent = this.recognizeIntent(message);
            
            // 生成回复
            const response = await this.generateResponse(message, intent);
            
            // 隐藏输入指示器
            this.hideTypingIndicator();
            
            // 添加机器人回复
            this.addMessage('bot', response);
            
        } catch (error) {
            console.error('处理消息时出错:', error);
            this.hideTypingIndicator();
            this.addMessage('bot', this.getFallbackResponse());
        }
    }
    
    recognizeIntent(message) {
        const lowerMessage = message.toLowerCase();
        
        for (const [intent, keywords] of Object.entries(this.intentKeywords[this.currentLanguage])) {
            for (const keyword of keywords) {
                if (lowerMessage.includes(keyword.toLowerCase())) {
                    return intent;
                }
            }
        }
        
        return 'fallback';
    }
    
    async generateResponse(message, intent) {
        // 优先使用本地响应，确保稳定性
        switch (intent) {
            case 'greeting':
                return this.getGreetingResponse();
            case 'reservation':
                return this.handleReservation(message);
            case 'menu':
                return this.handleMenuRecommendation(message);
            case 'order':
                return this.handleOrder(message);
            case 'takeout':
                return this.handleTakeout(message);
            case 'waitlist':
                return this.handleWaitlist(message);
            case 'allergy':
                return this.handleAllergy(message);
            case 'brand':
                return this.handleBrandInfo(message);
            case 'complaint':
                return this.handleComplaint(message);
            case 'general':
                return this.handleGeneralConversation(message);
            case 'fallback':
                // 对于fallback，尝试使用AI API
                try {
                    const aiResponse = await this.getAIResponse(message, intent);
                    if (aiResponse && aiResponse.trim()) {
                        return aiResponse;
                    }
                } catch (error) {
                    console.log('AI API调用失败，使用本地回复:', error);
                }
                return this.getFallbackResponse();
            default:
                return this.getFallbackResponse();
        }
    }
    
    async getAIResponse(message, intent) {
        try {
            const systemPrompt = RESTAURANT_CONFIG.SYSTEM_PROMPT[this.currentLanguage];
            
            console.log('发送API请求到Together.ai...');
            console.log('模型:', RESTAURANT_CONFIG.API.TOGETHER.MODEL);
            console.log('消息:', message);
            
            const requestBody = {
                model: RESTAURANT_CONFIG.API.TOGETHER.MODEL,
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ],
                max_tokens: 300,
                temperature: 0.7
            };
            
            console.log('请求体:', JSON.stringify(requestBody, null, 2));
            
            const response = await fetch(RESTAURANT_CONFIG.API.TOGETHER.BASE_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${RESTAURANT_CONFIG.API.TOGETHER.API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });
            
            console.log('响应状态:', response.status);
            console.log('响应头:', Object.fromEntries(response.headers.entries()));
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Together.ai API Error: ${response.status} - ${response.statusText}`);
                console.error('错误详情:', errorText);
                throw new Error(`Together.ai API Error: ${response.status} - ${errorText}`);
            }
            
            const data = await response.json();
            console.log('API响应数据:', data);
            
            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                console.error('Invalid Together.ai API response structure:', data);
                throw new Error('Invalid Together.ai API response structure');
            }
            
            const aiResponse = data.choices[0].message.content;
            console.log('AI回复:', aiResponse);
            return aiResponse;
        } catch (error) {
            console.error('Together.ai API调用失败:', error);
            console.error('错误堆栈:', error.stack);
            throw error;
        }
    }
    
    getGreetingResponse() {
        const responses = {
            zh: [
                "哼哼！你好呀！我是强尼小猪，很高兴见到你！有什么我可以帮你的吗？",
                "嗨！欢迎来到我的小天地！我是强尼小猪，很乐意为你服务！",
                "你好！我是强尼小猪，Depaso餐厅的小助手！有什么需要帮助的吗？"
            ],
            en: [
                "Oink oink! Hello there! I'm Johnny Pig, nice to meet you! What can I help you with?",
                "Hi! Welcome to my little world! I'm Johnny Pig, happy to serve you!",
                "Hello! I'm Johnny Pig, the little assistant of Depaso Restaurant! What do you need help with?"
            ],
            es: [
                "¡Oink oink! ¡Hola! Soy Johnny Pig, ¡encantado de conocerte! ¿En qué puedo ayudarte?",
                "¡Hola! ¡Bienvenido a mi pequeño mundo! Soy Johnny Pig, ¡feliz de servirte!",
                "¡Hola! Soy Johnny Pig, el pequeño asistente del Restaurante Depaso! ¿En qué necesitas ayuda?"
            ]
        };
        
        const responseList = responses[this.currentLanguage];
        return responseList[Math.floor(Math.random() * responseList.length)];
    }
    
    handleReservation(message) {
        const responses = {
            zh: [
                "哼哼！好的，我来为你安排座位！请告诉我：\n• 用餐日期和时间\n• 用餐人数\n• 你的姓名\n• 联系电话\n• 座位偏好（窗边/吧台/露台，可选）",
                "很高兴为你安排订位！请提供以下信息：\n1. 日期和时间\n2. 人数\n3. 姓名和电话\n4. 座位偏好（如有）",
                "我来帮你预订！请按顺序告诉我：日期时间、人数、姓名、电话，以及是否有座位偏好。"
            ],
            en: [
                "Oink oink! Sure, I can help you make a reservation! Please provide:\n• Date and time\n• Party size\n• Your name\n• Phone number\n• Table preference (window/bar/patio, optional)",
                "I'd be happy to arrange a reservation for you! Please provide:\n1. Date and time\n2. Party size\n3. Name and phone\n4. Table preference (if any)",
                "I'll help you make a reservation! Please tell me: date/time, party size, name, phone, and any table preferences."
            ],
            es: [
                "¡Oink oink! ¡Claro, puedo ayudarte a hacer una reserva! Por favor proporciona:\n• Fecha y hora\n• Número de personas\n• Tu nombre\n• Número de teléfono\n• Preferencia de mesa (ventana/barra/patio, opcional)",
                "¡Estaré encantado de organizar una reserva para ti! Por favor proporciona:\n1. Fecha y hora\n2. Número de personas\n3. Nombre y teléfono\n4. Preferencia de mesa (si la hay)",
                "¡Te ayudo a hacer una reserva! Por favor dime: fecha/hora, número de personas, nombre, teléfono, y cualquier preferencia de mesa."
            ]
        };
        
        const responseList = responses[this.currentLanguage];
        return responseList[Math.floor(Math.random() * responseList.length)];
    }
    
    handleMenuRecommendation(message) {
        // 检查是否询问特定菜品
        const lowerMessage = message.toLowerCase();
        const menuData = this.menuData[this.currentLanguage];
        
        // 检查是否是推荐菜请求
        if (lowerMessage.includes('推荐') || lowerMessage.includes('recommend') || lowerMessage.includes('recomendar') || 
            lowerMessage.includes('有什么') || lowerMessage.includes('what') || lowerMessage.includes('qué')) {
            return this.handleRecommendationRequest(message);
        }
        
        // 搜索特定菜品
        for (const [categoryKey, category] of Object.entries(menuData.categories)) {
            for (const item of category.items) {
                if (lowerMessage.includes(item.name.toLowerCase()) || 
                    lowerMessage.includes(item.name.split(' ')[0].toLowerCase())) {
                    return this.formatMenuItem(item, category.name);
                }
            }
        }
        
        // 检查是否询问特定类别
        const categoryKeywords = {
            zh: {
                jamon: ['火腿', 'jamón', 'iberico', '伊比利亚'],
                bread: ['面包', 'bread', 'pan', 'coca'],
                cheese: ['奶酪', 'cheese', 'queso'],
                wine: ['酒', 'wine', 'vino', '红酒', '白酒'],
                tapas: ['小食', 'tapas', '小菜']
            },
            en: {
                jamon: ['ham', 'jamón', 'iberico', '火腿'],
                bread: ['bread', 'pan', 'coca', '面包'],
                cheese: ['cheese', 'queso', '奶酪'],
                wine: ['wine', 'vino', '酒'],
                tapas: ['tapas', '小食', 'appetizer']
            },
            es: {
                jamon: ['jamón', 'iberico', '火腿', 'ham'],
                bread: ['pan', 'coca', '面包', 'bread'],
                cheese: ['queso', '奶酪', 'cheese'],
                wine: ['vino', '酒', 'wine'],
                tapas: ['tapas', '小食', 'entrada']
            }
        };
        
        for (const [categoryKey, keywords] of Object.entries(categoryKeywords[this.currentLanguage])) {
            for (const keyword of keywords) {
                if (lowerMessage.includes(keyword)) {
                    return this.formatCategoryMenu(menuData.categories[categoryKey]);
                }
            }
        }
        
        // 默认显示完整菜单
        return this.formatFullMenu(menuData);
    }
    
    handleRecommendationRequest(message) {
        const lowerMessage = message.toLowerCase();
        
        // 检查是否已经回答了牛排偏好问题
        if (lowerMessage.includes('牛排') || lowerMessage.includes('steak') || lowerMessage.includes('carne') || 
            lowerMessage.includes('牛肉') || lowerMessage.includes('beef')) {
            return this.handleSteakPreference(message);
        }
        
        // 检查是否已经回答了牛排偏好
        if (lowerMessage.includes('是') || lowerMessage.includes('yes') || lowerMessage.includes('sí') || 
            lowerMessage.includes('想吃') || lowerMessage.includes('want') || lowerMessage.includes('quiero')) {
            return this.askSteakPreference();
        }
        
        // 检查是否不想吃牛排
        if (lowerMessage.includes('不') || lowerMessage.includes('no') || lowerMessage.includes('不想') || 
            lowerMessage.includes('don\'t') || lowerMessage.includes('no quiero')) {
            return this.handleNonSteakRecommendation();
        }
        
        // 默认询问是否想吃牛排
        return this.askAboutSteak();
    }
    
    askAboutSteak() {
        const responses = {
            zh: "哼哼！很高兴为您推荐菜品！🍽️ 我想先问一下，您今天想吃牛排吗？我们的牛排可是很棒的哦！",
            en: "Oink oink! I'm happy to recommend dishes for you! 🍽️ I'd like to ask first, would you like to have steak today? Our steaks are excellent!",
            es: "¡Oink oink! ¡Me alegra recomendarle platos! 🍽️ Me gustaría preguntar primero, ¿le gustaría comer carne hoy? ¡Nuestras carnes son excelentes!"
        };
        return responses[this.currentLanguage];
    }
    
    askSteakPreference() {
        const responses = {
            zh: "太好了！🥩 请告诉我您喜欢什么样的牛排？\n\n• **熟度偏好**：一分熟、三分熟、五分熟、七分熟、全熟\n• **部位偏好**：菲力、西冷、肋眼、T骨\n• **口味偏好**：原味、黑胡椒、蒜香、香草\n\n您有什么特别偏好吗？",
            en: "Great! 🥩 Please tell me what kind of steak you prefer?\n\n• **Doneness**: Rare, Medium-rare, Medium, Medium-well, Well-done\n• **Cut preference**: Filet, Sirloin, Ribeye, T-bone\n• **Flavor preference**: Original, Black pepper, Garlic, Herbs\n\nDo you have any specific preferences?",
            es: "¡Excelente! 🥩 Por favor dígame qué tipo de carne prefiere?\n\n• **Punto de cocción**: Poco hecho, Término medio, Medio, Tres cuartos, Bien hecho\n• **Corte preferido**: Filete, Solomillo, Chuleta, T-bone\n• **Preferencia de sabor**: Original, Pimienta negra, Ajo, Hierbas\n\n¿Tiene alguna preferencia específica?"
        };
        return responses[this.currentLanguage];
    }
    
    handleSteakPreference(message) {
        const lowerMessage = message.toLowerCase();
        const menuData = this.menuData[this.currentLanguage];
        const steakItems = menuData.categories.steak.items;
        
        // 根据用户偏好推荐牛排
        let recommendations = [];
        let matchedItems = [];
        
        // 熟度推荐
        if (lowerMessage.includes('一分熟') || lowerMessage.includes('rare')) {
            matchedItems = steakItems.filter(item => 
                item.name.toLowerCase().includes('菲力') || 
                item.name.toLowerCase().includes('filet')
            );
        } else if (lowerMessage.includes('三分熟') || lowerMessage.includes('medium-rare')) {
            matchedItems = steakItems.filter(item => 
                item.name.toLowerCase().includes('菲力') || 
                item.name.toLowerCase().includes('filet') ||
                item.name.toLowerCase().includes('西冷') ||
                item.name.toLowerCase().includes('sirloin')
            );
        } else if (lowerMessage.includes('五分熟') || lowerMessage.includes('medium')) {
            matchedItems = steakItems.filter(item => 
                item.name.toLowerCase().includes('西冷') ||
                item.name.toLowerCase().includes('sirloin') ||
                item.name.toLowerCase().includes('肋眼') ||
                item.name.toLowerCase().includes('ribeye')
            );
        } else if (lowerMessage.includes('七分熟') || lowerMessage.includes('medium-well')) {
            matchedItems = steakItems.filter(item => 
                item.name.toLowerCase().includes('t骨') ||
                item.name.toLowerCase().includes('t-bone')
            );
        } else if (lowerMessage.includes('全熟') || lowerMessage.includes('well-done')) {
            matchedItems = steakItems.filter(item => 
                item.name.toLowerCase().includes('t骨') ||
                item.name.toLowerCase().includes('t-bone')
            );
        }
        
        // 部位推荐
        if (lowerMessage.includes('菲力') || lowerMessage.includes('filet')) {
            matchedItems = steakItems.filter(item => 
                item.name.toLowerCase().includes('菲力') || 
                item.name.toLowerCase().includes('filet')
            );
        } else if (lowerMessage.includes('西冷') || lowerMessage.includes('sirloin')) {
            matchedItems = steakItems.filter(item => 
                item.name.toLowerCase().includes('西冷') ||
                item.name.toLowerCase().includes('sirloin')
            );
        } else if (lowerMessage.includes('肋眼') || lowerMessage.includes('ribeye')) {
            matchedItems = steakItems.filter(item => 
                item.name.toLowerCase().includes('肋眼') ||
                item.name.toLowerCase().includes('ribeye')
            );
        } else if (lowerMessage.includes('t骨') || lowerMessage.includes('t-bone')) {
            matchedItems = steakItems.filter(item => 
                item.name.toLowerCase().includes('t骨') ||
                item.name.toLowerCase().includes('t-bone')
            );
        }
        
        // 口味推荐
        if (lowerMessage.includes('黑胡椒') || lowerMessage.includes('black pepper')) {
            matchedItems = steakItems.filter(item => 
                item.name.toLowerCase().includes('黑胡椒') ||
                item.name.toLowerCase().includes('black pepper')
            );
        } else if (lowerMessage.includes('蒜香') || lowerMessage.includes('garlic')) {
            matchedItems = steakItems.filter(item => 
                item.name.toLowerCase().includes('蒜香') ||
                item.name.toLowerCase().includes('garlic')
            );
        }
        
        // 如果没有匹配到具体菜品，提供综合推荐
        if (matchedItems.length === 0) {
            matchedItems = steakItems.slice(0, 3); // 取前3个作为默认推荐
        }
        
        // 格式化推荐
        for (const item of matchedItems) {
            const allergenText = item.allergens.length > 0 ? 
                `\n⚠️ 过敏原: ${item.allergens.join(', ')}` : '';
            
            recommendations.push(`🥩 **${item.name}** - ¥${item.price}\n${item.description}${allergenText}`);
        }
        
        const responses = {
            zh: `根据您的偏好，我为您推荐：\n\n${recommendations.join('\n\n')}\n\n🍷 **搭配建议**：\n• 红酒：Rioja Reserva (¥180)\n• 配菜：烤蔬菜、土豆泥\n• 前菜：伊比利亚火腿\n\n您想了解更多详情或直接点餐吗？`,
            en: `Based on your preferences, I recommend:\n\n${recommendations.join('\n\n')}\n\n🍷 **Pairing suggestions**:\n• Red wine: Rioja Reserva (¥180)\n• Sides: Roasted vegetables, mashed potatoes\n• Appetizer: Jamón Ibérico\n\nWould you like more details or to place an order?`,
            es: `Basándome en sus preferencias, le recomiendo:\n\n${recommendations.join('\n\n')}\n\n🍷 **Sugerencias de maridaje**:\n• Vino tinto: Rioja Reserva (¥180)\n• Acompañamientos: Verduras asadas, puré de patatas\n• Entrada: Jamón Ibérico\n\n¿Le gustaría más detalles o hacer un pedido?`
        };
        
        return responses[this.currentLanguage];
    }
    
    handleNonSteakRecommendation() {
        const responses = {
            zh: "没问题！我们还有很多其他美味选择：\n\n🍖 **伊比利亚火腿** - 我们的招牌特色\n🍞 **Pan de Coca** - 加泰罗尼亚传统面包\n🧀 **西班牙奶酪** - Manchego、Idiazábal等\n🍷 **精选酒类** - Rioja红酒、Cava起泡酒\n🥘 **Tapas小食** - 橄榄拼盘、土豆饼、蒜蓉虾\n\n您对哪个类别比较感兴趣？",
            en: "No problem! We have many other delicious options:\n\n🍖 **Jamón Ibérico** - Our signature specialty\n🍞 **Pan de Coca** - Traditional Catalan bread\n🧀 **Spanish cheeses** - Manchego, Idiazábal, etc.\n🍷 **Selected wines** - Rioja red wine, Cava sparkling\n🥘 **Tapas** - Olive platter, Spanish omelet, garlic shrimp\n\nWhich category interests you most?",
            es: "¡No hay problema! Tenemos muchas otras opciones deliciosas:\n\n🍖 **Jamón Ibérico** - Nuestra especialidad estrella\n🍞 **Pan de Coca** - Pan tradicional catalán\n🧀 **Quesos españoles** - Manchego, Idiazábal, etc.\n🍷 **Vinos seleccionados** - Vino tinto Rioja, Cava espumoso\n🥘 **Tapas** - Plato de aceitunas, tortilla española, gambas al ajillo\n\n¿Qué categoría le interesa más?"
        };
        
        return responses[this.currentLanguage];
    }
    
    formatMenuItem(item, categoryName) {
        const allergenText = item.allergens.length > 0 ? 
            `\n⚠️ 过敏原: ${item.allergens.join(', ')}` : '';
        
        const responses = {
            zh: `🍽️ **${item.name}** - ¥${item.price}\n\n📝 ${item.description}${allergenText}\n\n💡 这是${categoryName}类别的招牌菜品，您想了解更多信息或直接点餐吗？`,
            en: `🍽️ **${item.name}** - ¥${item.price}\n\n📝 ${item.description}${allergenText}\n\n💡 This is a signature dish from our ${categoryName} category. Would you like to know more or place an order?`,
            es: `🍽️ **${item.name}** - ¥${item.price}\n\n📝 ${item.description}${allergenText}\n\n💡 Este es un plato estrella de nuestra categoría ${categoryName}. ¿Le gustaría saber más o hacer un pedido?`
        };
        
        return responses[this.currentLanguage];
    }
    
    formatCategoryMenu(category) {
        let menuText = `🍽️ **${category.name}**\n\n`;
        
        for (const item of category.items) {
            const allergenText = item.allergens.length > 0 ? 
                ` (⚠️ ${item.allergens.join(', ')})` : '';
            menuText += `• **${item.name}** - ¥${item.price}\n  ${item.description}${allergenText}\n\n`;
        }
        
        const responses = {
            zh: menuText + "您对哪个菜品感兴趣？我可以为您详细介绍！",
            en: menuText + "Which dish interests you? I can provide more details!",
            es: menuText + "¿Qué plato le interesa? ¡Puedo darle más detalles!"
        };
        
        return responses[this.currentLanguage];
    }
    
    formatFullMenu(menuData) {
        let fullMenu = "🍽️ **DEPASO 完整菜单**\n\n";
        
        for (const [categoryKey, category] of Object.entries(menuData.categories)) {
            fullMenu += `## ${category.name}\n`;
            
            for (const item of category.items) {
                const allergenText = item.allergens.length > 0 ? 
                    ` (⚠️ ${item.allergens.join(', ')})` : '';
                fullMenu += `• **${item.name}** - ¥${item.price}\n  ${item.description}${allergenText}\n\n`;
            }
        }
        
        const responses = {
            zh: fullMenu + "您想了解哪个具体菜品，或者需要我为您推荐搭配吗？",
            en: fullMenu + "Would you like to know about any specific dish, or need recommendations for pairings?",
            es: fullMenu + "¿Le gustaría saber sobre algún plato específico, o necesita recomendaciones para maridajes?"
        };
        
        return responses[this.currentLanguage];
    }
    
    handleOrder(message) {
        // 解析用户点餐信息
        const lowerMessage = message.toLowerCase();
        const menuData = this.menuData[this.currentLanguage];
        const orderedItems = [];
        
        // 搜索用户提到的菜品
        for (const [categoryKey, category] of Object.entries(menuData.categories)) {
            for (const item of category.items) {
                const itemNameLower = item.name.toLowerCase();
                if (lowerMessage.includes(itemNameLower) || 
                    lowerMessage.includes(item.name.split(' ')[0].toLowerCase())) {
                    orderedItems.push({
                        name: item.name,
                        price: item.price,
                        category: category.name,
                        allergens: item.allergens
                    });
                }
            }
        }
        
        if (orderedItems.length === 0) {
            const responses = {
                zh: "我没有找到您提到的菜品。请告诉我您想要的具体菜品名称，或者查看我们的完整菜单。",
                en: "I couldn't find the dishes you mentioned. Please tell me the specific dish names you want, or check our full menu.",
                es: "No pude encontrar los platos que mencionó. Por favor dígame los nombres específicos de los platos que desea, o consulte nuestro menú completo."
            };
            return responses[this.currentLanguage];
        }
        
        // 计算总价
        const totalPrice = orderedItems.reduce((sum, item) => sum + item.price, 0);
        
        // 格式化订单信息
        let orderText = "🍽️ **您的订单**\n\n";
        for (const item of orderedItems) {
            const allergenText = item.allergens.length > 0 ? 
                ` (⚠️ ${item.allergens.join(', ')})` : '';
            orderText += `• **${item.name}** - ¥${item.price}${allergenText}\n`;
        }
        orderText += `\n💰 **总计: ¥${totalPrice}**\n\n`;
        
        const responses = {
            zh: orderText + "请确认您的订单信息：\n• 用餐人数\n• 用餐时间\n• 联系方式\n• 特殊要求（如有）\n\n确认无误后，我们将为您准备！",
            en: orderText + "Please confirm your order details:\n• Number of diners\n• Dining time\n• Contact information\n• Special requests (if any)\n\nOnce confirmed, we'll prepare it for you!",
            es: orderText + "Por favor confirme los detalles de su pedido:\n• Número de comensales\n• Hora de comida\n• Información de contacto\n• Solicitudes especiales (si las hay)\n\n¡Una vez confirmado, lo prepararemos para usted!"
        };
        
        return responses[this.currentLanguage];
    }
    
    handleTakeout(message) {
        const responses = {
            zh: [
                "好的，我来帮您处理自取/外卖订单。请告诉我：\n• 您想要的菜品和数量\n• 取餐方式（自取/外送）\n• 您的姓名和电话\n• 预计取餐时间\n• 如有过敏信息请告知",
                "很高兴为您安排外卖！请提供：\n1. 菜品和数量\n2. 自取还是外送\n3. 联系信息\n4. 取餐时间\n5. 过敏信息（如有）"
            ],
            en: [
                "Sure, I can help you with takeout/delivery. Please tell me:\n• Items and quantities you want\n• Pickup or delivery\n• Your name and phone\n• Preferred pickup time\n• Any allergy information",
                "I'd be happy to arrange takeout for you! Please provide:\n1. Items and quantities\n2. Pickup or delivery\n3. Contact information\n4. Pickup time\n5. Allergy information (if any)"
            ],
            es: [
                "Claro, puedo ayudarle con para llevar/entrega. Por favor dígame:\n• Platos y cantidades que desea\n• Para llevar o entrega\n• Su nombre y teléfono\n• Hora preferida de recogida\n• Cualquier información de alergias",
                "¡Estaré encantado de organizar para llevar! Por favor proporcione:\n1. Platos y cantidades\n2. Para llevar o entrega\n3. Información de contacto\n4. Hora de recogida\n5. Información de alergias (si la hay)"
            ]
        };
        
        const responseList = responses[this.currentLanguage];
        return responseList[Math.floor(Math.random() * responseList.length)];
    }
    
    handleWaitlist(message) {
        const responses = {
            zh: [
                "好的，我来帮您加入候位队列。请提供：\n• 您的姓名\n• 联系电话\n• 用餐人数\n• 预计到达时间\n\n我们会通过短信通知您座位情况。",
                "很高兴为您安排候位！请告诉我您的姓名、电话、人数和预计到达时间。我们会及时通知您座位情况。"
            ],
            en: [
                "Sure, I can add you to the waitlist. Please provide:\n• Your name\n• Phone number\n• Party size\n• Estimated arrival time\n\nWe'll notify you via SMS about table availability.",
                "I'd be happy to add you to the waitlist! Please tell me your name, phone, party size, and estimated arrival time. We'll notify you about table availability."
            ],
            es: [
                "Claro, puedo añadirle a la lista de espera. Por favor proporcione:\n• Su nombre\n• Número de teléfono\n• Número de personas\n• Hora estimada de llegada\n\nLe notificaremos por SMS sobre la disponibilidad de mesas.",
                "¡Estaré encantado de añadirle a la lista de espera! Por favor dígame su nombre, teléfono, número de personas y hora estimada de llegada. Le notificaremos sobre la disponibilidad de mesas."
            ]
        };
        
        const responseList = responses[this.currentLanguage];
        return responseList[Math.floor(Math.random() * responseList.length)];
    }
    
    handleAllergy(message) {
        const responses = {
            zh: [
                "谢谢您告知过敏信息！我们会认真记录并与后厨确认，为您提供安全的替代选项。请告诉我您的具体过敏原，我会为您推荐合适的菜品。",
                "感谢您提供过敏信息！这对我们很重要。请详细说明您的过敏情况，我会确保为您安排安全的用餐选择。"
            ],
            en: [
                "Thank you for sharing your allergy information! We'll carefully record this and confirm with our kitchen to provide you with safe alternatives. Please tell me your specific allergens, and I'll recommend suitable dishes.",
                "Thank you for providing allergy information! This is very important to us. Please tell me about your allergies in detail, and I'll ensure we arrange safe dining options for you."
            ],
            es: [
                "¡Gracias por compartir su información de alergias! Lo registraremos cuidadosamente y confirmaremos con nuestra cocina para proporcionarle alternativas seguras. Por favor dígame sus alérgenos específicos, y le recomendaré platos adecuados.",
                "¡Gracias por proporcionar información de alergias! Esto es muy importante para nosotros. Por favor cuénteme sobre sus alergias en detalle, y me aseguraré de organizar opciones de comida seguras para usted."
            ]
        };
        
        const responseList = responses[this.currentLanguage];
        return responseList[Math.floor(Math.random() * responseList.length)];
    }
    
    handleBrandInfo(message) {
        // 检查是否询问特定品牌信息
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('jamón') || lowerMessage.includes('火腿') || lowerMessage.includes('iberico') || lowerMessage.includes('伊比利亚')) {
            // 检查具体问题类型
            if (lowerMessage.includes('分级') || lowerMessage.includes('等级') || lowerMessage.includes('bellota') || lowerMessage.includes('cebo') || lowerMessage.includes('grades')) {
                return this.brandKnowledge.jamon_grades[this.currentLanguage];
            } else if (lowerMessage.includes('切片') || lowerMessage.includes('切') || lowerMessage.includes('corte') || lowerMessage.includes('slicing') || lowerMessage.includes('切法')) {
                return this.brandKnowledge.jamon_cutting[this.currentLanguage];
            } else if (lowerMessage.includes('搭配') || lowerMessage.includes('配') || lowerMessage.includes('maridaje') || lowerMessage.includes('pairing') || lowerMessage.includes('配酒')) {
                return this.brandKnowledge.jamon_pairing[this.currentLanguage];
            } else if (lowerMessage.includes('保存') || lowerMessage.includes('储存') || lowerMessage.includes('conservación') || lowerMessage.includes('storage') || lowerMessage.includes('存放')) {
                return this.brandKnowledge.jamon_storage[this.currentLanguage];
            } else if (lowerMessage.includes('历史') || lowerMessage.includes('起源') || lowerMessage.includes('historia') || lowerMessage.includes('history') || lowerMessage.includes('故事')) {
                return this.brandKnowledge.jamon_history[this.currentLanguage];
            } else if (lowerMessage.includes('产区') || lowerMessage.includes('产地') || lowerMessage.includes('regiones') || lowerMessage.includes('regions') || lowerMessage.includes('地区')) {
                return this.brandKnowledge.jamon_regions[this.currentLanguage];
            } else {
                return this.brandKnowledge.jamon_iberico[this.currentLanguage];
            }
        } else if (lowerMessage.includes('pan') || lowerMessage.includes('面包') || lowerMessage.includes('coca')) {
            return this.brandKnowledge.pan_de_coca[this.currentLanguage];
        } else if (lowerMessage.includes('olive') || lowerMessage.includes('橄榄油') || lowerMessage.includes('aceite')) {
            return this.brandKnowledge.olive_oil[this.currentLanguage];
        } else if (lowerMessage.includes('folgueroles') || lowerMessage.includes('品牌')) {
            return this.brandKnowledge.folgueroles[this.currentLanguage];
        } else if (lowerMessage.includes('西班牙') || lowerMessage.includes('spanish') || lowerMessage.includes('español') || lowerMessage.includes('美食') || lowerMessage.includes('cuisine')) {
            return this.brandKnowledge.spanish_cuisine[this.currentLanguage];
        } else if (lowerMessage.includes('牛排') || lowerMessage.includes('steak') || lowerMessage.includes('carne') || lowerMessage.includes('熟度')) {
            return this.brandKnowledge.steak_knowledge[this.currentLanguage];
        } else if (lowerMessage.includes('酒') || lowerMessage.includes('wine') || lowerMessage.includes('vino') || lowerMessage.includes('搭配') || lowerMessage.includes('pairing')) {
            return this.brandKnowledge.wine_pairing[this.currentLanguage];
        }
        
        // 默认品牌介绍
        const responses = {
            zh: "哼哼！我们是一家专注于西班牙传统美食的餐厅，主打伊比利亚火腿、加泰罗尼亚Pan de Coca面包，以及精选的西班牙橄榄油。所有食材都来自西班牙优质产区，确保正宗的地中海风味。您想了解哪个具体产品？或者想聊聊西班牙美食文化？",
            en: "Oink oink! We are a restaurant specializing in traditional Spanish cuisine, featuring Jamón Ibérico, Catalan Pan de Coca bread, and carefully selected Spanish olive oils. All ingredients come from premium Spanish regions, ensuring authentic Mediterranean flavors. Which specific product would you like to know about? Or would you like to chat about Spanish cuisine culture?",
            es: "¡Oink oink! Somos un restaurante especializado en cocina tradicional española, con Jamón Ibérico, pan Pan de Coca catalán, y aceites de oliva españoles cuidadosamente seleccionados. Todos los ingredientes provienen de regiones premium españolas, asegurando sabores mediterráneos auténticos. ¿Sobre qué producto específico le gustaría saber? ¿O le gustaría charlar sobre la cultura culinaria española?"
        };
        
        return responses[this.currentLanguage];
    }
    
    handleGeneralConversation(message) {
        // 通用对话处理 - 让强尼小猪能够进行幽默可爱的日常对话
        const responses = {
            zh: [
                "哼哼！很高兴和你聊天！你知道吗，我最喜欢和客人聊天了，就像现在这样！你有什么有趣的事情想分享吗？",
                "哇！这个话题真有趣！哼哼，你知道吗，虽然我是餐厅的小助手，但我对很多事情都很好奇呢！",
                "哼哼！你提到的这个让我想起了西班牙的美食文化，你知道吗，西班牙人最喜欢在餐桌上聊天了！",
                "哈哈，你真是个有趣的人！哼哼，我觉得聊天就像品尝美食一样，需要慢慢品味，才能感受到其中的乐趣！",
                "哼哼！你知道吗，虽然我是小猪，但我对生活也有很多感悟呢！比如，最好的美食往往需要时间慢慢制作，就像最好的友谊需要时间慢慢培养一样！",
                "哇！你的想法真棒！哼哼，你知道吗，在西班牙，人们常说'La vida es como un jamón'（生活就像火腿一样），需要时间慢慢品味！",
                "哼哼！和你聊天真开心！你知道吗，虽然我是餐厅助手，但我最喜欢的就是和客人分享快乐！",
                "哈哈，你让我想起了西班牙的tapas文化！哼哼，你知道吗，tapas的精髓就是分享，就像我们现在分享想法一样！",
                "哼哼！你真是个有深度的人！你知道吗，虽然我是小猪，但我相信每个人都有自己独特的故事，就像每道菜都有自己独特的味道！",
                "哇！这个话题让我想起了西班牙的午休文化！哼哼，你知道吗，西班牙人认为午休时间就是用来聊天和享受生活的！"
            ],
            en: [
                "Oink oink! I'm so happy to chat with you! You know what, I love talking with guests, just like now! Do you have anything interesting to share?",
                "Wow! That's such an interesting topic! Oink oink, you know what, even though I'm a restaurant assistant, I'm curious about many things!",
                "Oink oink! What you mentioned reminds me of Spanish food culture, you know what, Spanish people love chatting at the dining table!",
                "Haha, you're such an interesting person! Oink oink, I think chatting is like tasting food, you need to savor it slowly to feel the joy!",
                "Oink oink! You know what, even though I'm a pig, I have many insights about life! For example, the best food often needs time to make slowly, just like the best friendship needs time to develop!",
                "Wow! Your idea is great! Oink oink, you know what, in Spain, people say 'La vida es como un jamón' (life is like ham), it needs time to savor slowly!",
                "Oink oink! Chatting with you is so happy! You know what, even though I'm a restaurant assistant, my favorite thing is sharing joy with guests!",
                "Haha, you remind me of Spanish tapas culture! Oink oink, you know what, the essence of tapas is sharing, just like we're sharing ideas now!",
                "Oink oink! You're such a deep person! You know what, even though I'm a pig, I believe everyone has their own unique story, just like every dish has its own unique flavor!",
                "Wow! This topic reminds me of Spanish siesta culture! Oink oink, you know what, Spanish people think siesta time is for chatting and enjoying life!"
            ],
            es: [
                "¡Oink oink! ¡Estoy tan feliz de charlar contigo! ¿Sabes qué? Me encanta hablar con los huéspedes, ¡justo como ahora! ¿Tienes algo interesante que compartir?",
                "¡Wow! ¡Ese es un tema tan interesante! Oink oink, ¿sabes qué? Aunque soy asistente de restaurante, ¡tengo curiosidad por muchas cosas!",
                "¡Oink oink! Lo que mencionas me recuerda a la cultura culinaria española, ¿sabes qué? ¡A los españoles les encanta charlar en la mesa!",
                "¡Jaja, eres una persona tan interesante! Oink oink, ¡creo que charlar es como saborear comida, necesitas degustarlo lentamente para sentir la alegría!",
                "¡Oink oink! ¿Sabes qué? Aunque soy un cerdo, ¡tengo muchas reflexiones sobre la vida! Por ejemplo, la mejor comida a menudo necesita tiempo para hacerse lentamente, ¡como la mejor amistad necesita tiempo para desarrollarse!",
                "¡Wow! ¡Tu idea es genial! Oink oink, ¿sabes qué? En España, la gente dice 'La vida es como un jamón', ¡necesita tiempo para saborearlo lentamente!",
                "¡Oink oink! ¡Charlar contigo es tan feliz! ¿Sabes qué? Aunque soy asistente de restaurante, ¡mi cosa favorita es compartir alegría con los huéspedes!",
                "¡Jaja, me recuerdas a la cultura de tapas española! Oink oink, ¿sabes qué? La esencia de las tapas es compartir, ¡justo como estamos compartiendo ideas ahora!",
                "¡Oink oink! ¡Eres una persona tan profunda! ¿Sabes qué? Aunque soy un cerdo, ¡creo que todos tienen su propia historia única, como cada plato tiene su propio sabor único!",
                "¡Wow! ¡Este tema me recuerda a la cultura de siesta española! Oink oink, ¿sabes qué? ¡Los españoles piensan que el tiempo de siesta es para charlar y disfrutar la vida!"
            ]
        };
        
        const responseList = responses[this.currentLanguage];
        return responseList[Math.floor(Math.random() * responseList.length)];
    }
    
    handleComplaint(message) {
        const responses = {
            zh: [
                "非常抱歉给您带来不便！我们非常重视您的反馈。请告诉我：\n• 具体的问题描述\n• 用餐日期和时间\n• 您的联系方式\n\n我会立即为您登记并安排最快的解决方案（替换/退款/优惠券）。",
                "抱歉让您有不愉快的体验！请提供详细信息，我会立即处理您的投诉并给出合适的解决方案。"
            ],
            en: [
                "I sincerely apologize for the inconvenience! We take your feedback very seriously. Please tell me:\n• Specific problem description\n• Date and time of visit\n• Your contact information\n\nI'll immediately register this and arrange the fastest solution (replacement/refund/voucher).",
                "I'm sorry you had an unpleasant experience! Please provide detailed information, and I'll immediately handle your complaint and provide an appropriate solution."
            ],
            es: [
                "¡Me disculpo sinceramente por las molestias! Tomamos muy en serio sus comentarios. Por favor dígame:\n• Descripción específica del problema\n• Fecha y hora de la visita\n• Su información de contacto\n\nRegistraré esto inmediatamente y organizaré la solución más rápida (reemplazo/reembolso/vale).",
                "¡Lamento que haya tenido una experiencia desagradable! Por favor proporcione información detallada, y manejaré inmediatamente su queja y proporcionaré una solución apropiada."
            ]
        };
        
        const responseList = responses[this.currentLanguage];
        return responseList[Math.floor(Math.random() * responseList.length)];
    }
    
    getFallbackResponse() {
        const responses = {
            zh: [
                "我没有完全理解您的需求。您是想订位、点单，还是咨询菜单/品牌信息呢？",
                "为了更快帮您处理，我可以请值班同事联系您。请留下您的姓名与电话。",
                "抱歉，我需要更多信息来帮助您。请告诉我您具体需要什么服务？"
            ],
            en: [
                "I didn't fully understand your request. Are you looking to make a reservation, place an order, or inquire about our menu/brand information?",
                "To help you faster, I can have a colleague contact you. Please leave your name and phone number.",
                "I apologize, but I need more information to help you. Please tell me what specific service you need?"
            ],
            es: [
                "No entendí completamente su solicitud. ¿Está buscando hacer una reserva, hacer un pedido, o consultar información sobre nuestro menú/marca?",
                "Para ayudarle más rápido, puedo hacer que un colega le contacte. Por favor deje su nombre y número de teléfono.",
                "Me disculpo, pero necesito más información para ayudarle. Por favor dígame qué servicio específico necesita?"
            ]
        };
        
        const responseList = responses[this.currentLanguage];
        return responseList[Math.floor(Math.random() * responseList.length)];
    }
    
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typingIndicator';
        typingDiv.className = 'message bot-message';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="message-bubble typing-bubble">
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        `;
        this.chatMessages.appendChild(typingDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    addMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-bubble">${message}</div>
                <div class="message-time">${timeString}</div>
            </div>
        `;
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
        
        // 添加动画效果
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                messageDiv.style.transition = 'all 0.3s ease';
                messageDiv.style.opacity = '1';
                messageDiv.style.transform = 'translateY(0)';
            }, 100);
    }
    
    // 滚动到底部
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    // 检查是否是开场白消息
    isWelcomeMessage(message) {
        const welcomeKeywords = [
            '你好呀，我是强尼小猪',
            '欢迎来到Depaso餐厅',
            '温馨的社区小馆',
            '请告诉我您需要什么帮助',
            '请问你是来吃Brunch',
            '来吃肉肉或牛排',
            '来喝喝咖啡发发呆'
        ];
        
        return welcomeKeywords.some(keyword => message.includes(keyword));
    }
    
    // 初始化动画
    initAnimations() {
        // 等待Anime.js加载完成
        setTimeout(() => {
            this.animateWelcomeLines();
        }, 500);
    }
    
    // 欢迎页面线条动画
    animateWelcomeLines() {
        if (window.animeUtils) {
            const { animate, svg, stagger } = window.animeUtils;
            
            // 欢迎页面装饰线条动画
            animate(svg.createDrawable('.decorative-lines .line'), {
                draw: ['0 0', '0 1', '1 1'],
                ease: 'inOutQuad',
                duration: 2000,
                delay: stagger(200),
                loop: true
            });
        }
    }
    
    // 聊天界面线条动画
    animateChatLines() {
        if (window.animeUtils) {
            const { animate, svg, stagger } = window.animeUtils;
            
            // 聊天界面装饰线条动画
            animate(svg.createDrawable('.chat-decorative-lines .line'), {
                draw: ['0 0', '0 1', '1 1'],
                ease: 'inOutQuad',
                duration: 1500,
                delay: stagger(150),
                loop: true
            });
        }
    }
    
    // 触发线条动画（用于交互）
    triggerLineAnimation(selector) {
        if (window.animeUtils) {
            const { animate, svg } = window.animeUtils;
            
            animate(svg.createDrawable(selector), {
                draw: ['0 0', '1 1'],
                ease: 'easeOutQuad',
                duration: 800
            });
        }
    }
    
    // 设置选项按钮事件监听器
    setupOptionButtons() {
        // 使用事件委托来处理动态添加的按钮
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('option-btn')) {
                const option = event.target.getAttribute('data-option');
                this.handleOptionClick(option);
            } else if (event.target.classList.contains('action-btn')) {
                const action = event.target.getAttribute('data-action');
                this.handleQuickAction(action);
            }
        });
    }
    
    // 处理选项按钮点击
    handleOptionClick(option) {
        let response = '';
        
        switch(option) {
            case 'meat':
                response = this.getMeatResponse();
                break;
            case 'brunch':
                response = this.getBrunchResponse();
                break;
            case 'coffee':
                response = this.getCoffeeResponse();
                break;
            case 'menu':
                response = this.getMenuResponse();
                break;
            default:
                response = this.getFallbackResponse();
        }
        
        // 添加用户选择的选项到聊天记录
        this.addMessage('bot', response);
        
        // 滚动到底部
        this.scrollToBottom();
    }
    
    // 处理快速操作按钮点击
    handleQuickAction(action) {
        let response = '';
        
        switch(action) {
            case 'intro':
                response = this.getRestaurantIntro();
                break;
            case 'menu':
                response = this.getFullMenu();
                break;
            case 'recommend':
                response = this.getRecommendations();
                break;
            default:
                response = this.getFallbackResponse();
        }
        
        // 添加回复到聊天记录
        this.addMessage('bot', response);
        
        // 滚动到底部
        this.scrollToBottom();
    }
    
    // 吃肉肉选项的回复
    getMeatResponse() {
        const responses = {
            zh: [
                "🥩 太棒了！我们有很多美味的肉类选择！\n\n**伊比利亚火腿系列：**\n• Bellota 48个月 - ¥280（最高等级，橡果喂养）\n• Bellota 36个月 - ¥220（橡果喂养，口感丰富）\n• Cebo de Campo 24个月 - ¥180（混合饲料，性价比高）\n\n**牛排系列：**\n• 菲力牛排 - ¥180（最嫩部位，推荐三分熟）\n• 西冷牛排 - ¥160（口感丰富，推荐五分熟）\n• 肋眼牛排 - ¥170（油脂丰富，推荐五分熟）\n\n您想要哪种肉类呢？我可以为您详细介绍！",
                "哼哼！肉肉爱好者！我们最推荐伊比利亚火腿，这可是西班牙的国宝级美食！您想了解哪个等级的火腿，还是想试试我们的牛排？"
            ],
            en: [
                "🥩 Excellent! We have many delicious meat options!\n\n**Jamón Ibérico Series:**\n• Bellota 48 months - ¥280 (Highest grade, acorn-fed)\n• Bellota 36 months - ¥220 (Acorn-fed, rich flavor)\n• Cebo de Campo 24 months - ¥180 (Mixed feed, great value)\n\n**Steak Series:**\n• Filet Mignon - ¥180 (Tenderest cut, recommended medium-rare)\n• Sirloin - ¥160 (Rich flavor, recommended medium)\n• Ribeye - ¥170 (Rich marbling, recommended medium)\n\nWhich type of meat interests you? I can provide detailed information!",
                "Oink oink! Meat lover! We highly recommend Jamón Ibérico, Spain's national treasure! Would you like to know about different grades of ham, or try our steaks?"
            ],
            es: [
                "🥩 ¡Excelente! ¡Tenemos muchas opciones deliciosas de carne!\n\n**Serie Jamón Ibérico:**\n• Bellota 48 meses - ¥280 (Máximo grado, alimentado con bellotas)\n• Bellota 36 meses - ¥220 (Alimentado con bellotas, sabor rico)\n• Cebo de Campo 24 meses - ¥180 (Alimentación mixta, excelente valor)\n\n**Serie de Carne:**\n• Filete de Ternera - ¥180 (Corte más tierno, recomendado término medio)\n• Solomillo - ¥160 (Sabor rico, recomendado término medio)\n• Chuleta de Ternera - ¥170 (Rica en grasa, recomendado término medio)\n\n¿Qué tipo de carne le interesa? ¡Puedo proporcionar información detallada!",
                "¡Oink oink! ¡Amante de la carne! ¡Recomendamos altamente el Jamón Ibérico, el tesoro nacional de España! ¿Le gustaría conocer los diferentes grados de jamón, o probar nuestras carnes?"
            ]
        };
        
        const responseList = responses[this.currentLanguage];
        return responseList[Math.floor(Math.random() * responseList.length)];
    }
    
    // Brunch选项的回复
    getBrunchResponse() {
        const responses = {
            zh: [
                "🍳 来顿Brunch！我们为您准备了丰富的早午餐选择！\n\n**面包类：**\n• Pan de Coca - ¥25（加泰罗尼亚传统脆皮面包）\n• 番茄面包 - ¥35（配新鲜番茄和橄榄油）\n• 蒜香面包 - ¥30（蒜蓉黄油烤制）\n\n**小食类：**\n• 橄榄拼盘 - ¥45（三种西班牙橄榄）\n• 西班牙土豆饼 - ¥55（传统土豆蛋饼）\n• 蒜蓉虾 - ¥65（橄榄油蒜蓉炒虾）\n\n**奶酪类：**\n• Manchego 12个月 - ¥120（西班牙羊奶酪）\n• Idiazábal - ¥95（巴斯克烟熏羊奶酪）\n\n您想要哪种搭配呢？",
                "哼哼！Brunch时间！我们最推荐Pan de Coca配伊比利亚火腿，这可是经典的西班牙早餐组合！您想要面包、小食还是奶酪呢？"
            ],
            en: [
                "🍳 Let's have Brunch! We've prepared a rich selection of brunch options!\n\n**Bread:**\n• Pan de Coca - ¥25 (Traditional Catalan crispy bread)\n• Tomato Bread - ¥35 (With fresh tomato and olive oil)\n• Garlic Bread - ¥30 (Garlic butter roasted)\n\n**Tapas:**\n• Olive Platter - ¥45 (Three types of Spanish olives)\n• Spanish Potato Omelet - ¥55 (Traditional potato omelet)\n• Garlic Shrimp - ¥65 (Olive oil garlic shrimp)\n\n**Cheese:**\n• Manchego 12 months - ¥120 (Spanish sheep cheese)\n• Idiazábal - ¥95 (Basque smoked sheep cheese)\n\nWhat combination would you like?",
                "Oink oink! Brunch time! We highly recommend Pan de Coca with Jamón Ibérico, a classic Spanish breakfast combination! Would you like bread, tapas, or cheese?"
            ],
            es: [
                "🍳 ¡Vamos a desayunar! ¡Hemos preparado una rica selección de opciones de brunch!\n\n**Pan:**\n• Pan de Coca - ¥25 (Pan crujiente tradicional catalán)\n• Pan con Tomate - ¥35 (Con tomate fresco y aceite de oliva)\n• Pan de Ajo - ¥30 (Tostado con mantequilla de ajo)\n\n**Tapas:**\n• Tabla de Aceitunas - ¥45 (Tres tipos de aceitunas españolas)\n• Tortilla Española - ¥55 (Tortilla tradicional de patata)\n• Gambas al Ajillo - ¥65 (Gambas salteadas con ajo y aceite de oliva)\n\n**Queso:**\n• Manchego 12 meses - ¥120 (Queso de oveja español)\n• Idiazábal - ¥95 (Queso de oveja ahumado del País Vasco)\n\n¿Qué combinación le gustaría?",
                "¡Oink oink! ¡Hora del brunch! ¡Recomendamos altamente Pan de Coca con Jamón Ibérico, una combinación clásica de desayuno español! ¿Le gustaría pan, tapas o queso?"
            ]
        };
        
        const responseList = responses[this.currentLanguage];
        return responseList[Math.floor(Math.random() * responseList.length)];
    }
    
    // 咖啡饮品选项的回复
    getCoffeeResponse() {
        const responses = {
            zh: [
                "☕ 只想喝喝咖啡发发呆！我们为您准备了舒适的咖啡时光！\n\n**咖啡类：**\n• 意式浓缩 - ¥25（经典意式咖啡）\n• 美式咖啡 - ¥30（清淡顺滑）\n• 卡布奇诺 - ¥35（奶泡丰富）\n• 拿铁 - ¥40（奶香浓郁）\n• 摩卡 - ¥45（巧克力风味）\n\n**茶类：**\n• 伯爵茶 - ¥25（经典英式茶）\n• 薄荷茶 - ¥20（清新怡人）\n• 柠檬茶 - ¥22（酸甜可口）\n\n**酒类：**\n• Rioja Reserva - ¥180（里奥哈珍藏红酒）\n• Cava Brut - ¥120（西班牙起泡酒）\n• Sherry Fino - ¥95（雪利酒，配火腿绝佳）\n\n您想要咖啡、茶还是酒类呢？",
                "哼哼！咖啡时光！我们推荐您试试我们的意式咖啡配Pan de Coca，或者来一杯雪利酒配伊比利亚火腿，这可是西班牙的经典搭配！"
            ],
            en: [
                "☕ Just want to drink coffee and relax! We've prepared a comfortable coffee time for you!\n\n**Coffee:**\n• Espresso - ¥25 (Classic Italian coffee)\n• Americano - ¥30 (Light and smooth)\n• Cappuccino - ¥35 (Rich foam)\n• Latte - ¥40 (Creamy and rich)\n• Mocha - ¥45 (Chocolate flavor)\n\n**Tea:**\n• Earl Grey - ¥25 (Classic English tea)\n• Mint Tea - ¥20 (Fresh and pleasant)\n• Lemon Tea - ¥22 (Sweet and sour)\n\n**Wine:**\n• Rioja Reserva - ¥180 (Rioja reserve red wine)\n• Cava Brut - ¥120 (Spanish sparkling wine)\n• Sherry Fino - ¥95 (Sherry, perfect with ham)\n\nWould you like coffee, tea, or wine?",
                "Oink oink! Coffee time! We recommend trying our Italian coffee with Pan de Coca, or a glass of sherry with Jamón Ibérico - a classic Spanish combination!"
            ],
            es: [
                "☕ ¡Solo quiero beber café y relajarme! ¡Hemos preparado un tiempo de café cómodo para usted!\n\n**Café:**\n• Espresso - ¥25 (Café italiano clásico)\n• Americano - ¥30 (Ligero y suave)\n• Cappuccino - ¥35 (Espuma rica)\n• Latte - ¥40 (Cremoso y rico)\n• Mocha - ¥45 (Sabor a chocolate)\n\n**Té:**\n• Earl Grey - ¥25 (Té inglés clásico)\n• Té de Menta - ¥20 (Fresco y agradable)\n• Té de Limón - ¥22 (Dulce y ácido)\n\n**Vino:**\n• Rioja Reserva - ¥180 (Vino tinto reserva de Rioja)\n• Cava Brut - ¥120 (Vino espumoso español)\n• Sherry Fino - ¥95 (Jerez, perfecto con jamón)\n\n¿Le gustaría café, té o vino?",
                "¡Oink oink! ¡Hora del café! ¡Recomendamos probar nuestro café italiano con Pan de Coca, o un vaso de jerez con Jamón Ibérico - una combinación clásica española!"
            ]
        };
        
        const responseList = responses[this.currentLanguage];
        return responseList[Math.floor(Math.random() * responseList.length)];
    }
    
    // 菜单选项的回复
    getMenuResponse() {
        const responses = {
            zh: [
                "📋 菜单都拿来看看！我们为您准备了完整的菜单！\n\n**伊比利亚火腿系列：**\n• Bellota 48个月 - ¥280（最高等级，橡果喂养）\n• Bellota 36个月 - ¥220（橡果喂养，口感丰富）\n• Cebo de Campo 24个月 - ¥180（混合饲料，性价比高）\n• Cebo 18个月 - ¥150（谷物喂养，性价比高）\n\n**牛排类：**\n• 菲力牛排 - ¥180（最嫩部位，推荐三分熟）\n• 西冷牛排 - ¥160（口感丰富，推荐五分熟）\n• 肋眼牛排 - ¥170（油脂丰富，推荐五分熟）\n• T骨牛排 - ¥190（一次享受两种口感）\n\n**面包类：**\n• Pan de Coca - ¥25（加泰罗尼亚传统脆皮面包）\n• 番茄面包 - ¥35（配新鲜番茄和橄榄油）\n• 蒜香面包 - ¥30（蒜蓉黄油烤制）\n\n**奶酪类：**\n• Manchego 12个月 - ¥120（西班牙羊奶酪）\n• Idiazábal - ¥95（巴斯克烟熏羊奶酪）\n• Cabrales - ¥85（阿斯图里亚斯蓝纹奶酪）\n\n**酒类：**\n• Rioja Reserva - ¥180（里奥哈珍藏红酒）\n• Cava Brut - ¥120（西班牙起泡酒）\n• Sherry Fino - ¥95（雪利酒，配火腿绝佳）\n\n**小食：**\n• 橄榄拼盘 - ¥45（三种西班牙橄榄）\n• 西班牙土豆饼 - ¥55（传统土豆蛋饼）\n• 蒜蓉虾 - ¥65（橄榄油蒜蓉炒虾）\n\n您对哪个类别特别感兴趣呢？",
                "哼哼！完整菜单来了！我们最推荐的是伊比利亚火腿配Pan de Coca，这是我们的招牌组合！您想要了解哪个类别的详细信息呢？"
            ],
            en: [
                "📋 Let's see the full menu! We've prepared a complete menu for you!\n\n**Jamón Ibérico Series:**\n• Bellota 48 months - ¥280 (Highest grade, acorn-fed)\n• Bellota 36 months - ¥220 (Acorn-fed, rich flavor)\n• Cebo de Campo 24 months - ¥180 (Mixed feed, great value)\n• Cebo 18 months - ¥150 (Grain-fed, great value)\n\n**Steak Series:**\n• Filet Mignon - ¥180 (Tenderest cut, recommended medium-rare)\n• Sirloin - ¥160 (Rich flavor, recommended medium)\n• Ribeye - ¥170 (Rich marbling, recommended medium)\n• T-bone - ¥190 (Enjoy two textures at once)\n\n**Bread:**\n• Pan de Coca - ¥25 (Traditional Catalan crispy bread)\n• Tomato Bread - ¥35 (With fresh tomato and olive oil)\n• Garlic Bread - ¥30 (Garlic butter roasted)\n\n**Cheese:**\n• Manchego 12 months - ¥120 (Spanish sheep cheese)\n• Idiazábal - ¥95 (Basque smoked sheep cheese)\n• Cabrales - ¥85 (Asturias blue cheese)\n\n**Wine:**\n• Rioja Reserva - ¥180 (Rioja reserve red wine)\n• Cava Brut - ¥120 (Spanish sparkling wine)\n• Sherry Fino - ¥95 (Sherry, perfect with ham)\n\n**Tapas:**\n• Olive Platter - ¥45 (Three types of Spanish olives)\n• Spanish Potato Omelet - ¥55 (Traditional potato omelet)\n• Garlic Shrimp - ¥65 (Olive oil garlic shrimp)\n\nWhich category interests you most?",
                "Oink oink! Here's the full menu! We highly recommend Jamón Ibérico with Pan de Coca - our signature combination! Which category would you like to know more about?"
            ],
            es: [
                "📋 ¡Veamos el menú completo! ¡Hemos preparado un menú completo para usted!\n\n**Serie Jamón Ibérico:**\n• Bellota 48 meses - ¥280 (Máximo grado, alimentado con bellotas)\n• Bellota 36 meses - ¥220 (Alimentado con bellotas, sabor rico)\n• Cebo de Campo 24 meses - ¥180 (Alimentación mixta, excelente valor)\n• Cebo 18 meses - ¥150 (Alimentado con grano, excelente valor)\n\n**Serie de Carne:**\n• Filete de Ternera - ¥180 (Corte más tierno, recomendado término medio)\n• Solomillo - ¥160 (Sabor rico, recomendado término medio)\n• Chuleta de Ternera - ¥170 (Rica en grasa, recomendado término medio)\n• T-bone - ¥190 (Disfruta dos texturas a la vez)\n\n**Pan:**\n• Pan de Coca - ¥25 (Pan crujiente tradicional catalán)\n• Pan con Tomate - ¥35 (Con tomate fresco y aceite de oliva)\n• Pan de Ajo - ¥30 (Tostado con mantequilla de ajo)\n\n**Queso:**\n• Manchego 12 meses - ¥120 (Queso de oveja español)\n• Idiazábal - ¥95 (Queso de oveja ahumado del País Vasco)\n• Cabrales - ¥85 (Queso azul de Asturias)\n\n**Vino:**\n• Rioja Reserva - ¥180 (Vino tinto reserva de Rioja)\n• Cava Brut - ¥120 (Vino espumoso español)\n• Sherry Fino - ¥95 (Jerez, perfecto con jamón)\n\n**Tapas:**\n• Tabla de Aceitunas - ¥45 (Tres tipos de aceitunas españolas)\n• Tortilla Española - ¥55 (Tortilla tradicional de patata)\n• Gambas al Ajillo - ¥65 (Gambas salteadas con ajo y aceite de oliva)\n\n¿Qué categoría le interesa más?",
                "¡Oink oink! ¡Aquí está el menú completo! ¡Recomendamos altamente Jamón Ibérico con Pan de Coca - nuestra combinación insignia! ¿De qué categoría le gustaría saber más?"
            ]
        };
        
        const responseList = responses[this.currentLanguage];
        return responseList[Math.floor(Math.random() * responseList.length)];
    }
    
    // 餐厅简介回复
    getRestaurantIntro() {
        const responses = {
            zh: [
                "🏠 **Depaso餐厅简介**\n\n我们是一家温馨的社区小馆，专注于西班牙美食文化。\n\n**我们的特色：**\n• 🐷 伊比利亚火腿 - 西班牙国宝级美食\n• 🥩 精选牛排 - 优质牛肉，专业烹饪\n• 🍞 Pan de Coca - 加泰罗尼亚传统面包\n• 🧀 西班牙奶酪 - 多种精选奶酪\n• 🍷 西班牙酒类 - 红酒、起泡酒、雪利酒\n\n**我们的理念：**\n用对待家人的心意对待每一位客人，坚持环保装修、安心食材、纯粹味道。\n\n哼哼，欢迎来到我们的温馨小馆！",
                "哼哼！让我来介绍一下我们Depaso餐厅！\n\n我们是一家专注于西班牙美食的温馨小馆，虽然桌椅不多，但希望让每一位客人都能感受到家的温暖。\n\n我们最引以为豪的是我们的伊比利亚火腿，这可是西班牙的国宝级美食！还有我们的牛排，都是精选优质牛肉，专业烹饪。\n\n哼哼，我们坚持用对待家人的心意来对待每一位客人，希望您在这里吃得放心，也吃得开心！"
            ],
            en: [
                "🏠 **Depaso Restaurant Introduction**\n\nWe are a cozy community restaurant specializing in Spanish cuisine culture.\n\n**Our Features:**\n• 🐷 Jamón Ibérico - Spain's national treasure food\n• 🥩 Premium Steaks - Quality beef, professional cooking\n• 🍞 Pan de Coca - Traditional Catalan bread\n• 🧀 Spanish Cheeses - Various selected cheeses\n• 🍷 Spanish Wines - Red wine, sparkling wine, sherry\n\n**Our Philosophy:**\nTreat every guest with the heart of treating family, insisting on eco-friendly decoration, safe ingredients, and pure taste.\n\nOink oink, welcome to our cozy little restaurant!",
                "Oink oink! Let me introduce our Depaso Restaurant!\n\nWe are a cozy little restaurant specializing in Spanish cuisine. Although we don't have many tables and chairs, we hope every guest can feel the warmth of home.\n\nWe are most proud of our Jamón Ibérico, which is Spain's national treasure food! And our steaks are all selected quality beef, professionally cooked.\n\nOink oink, we insist on treating every guest with the heart of treating family, hoping you can eat with confidence and joy here!"
            ],
            es: [
                "🏠 **Introducción del Restaurante Depaso**\n\nSomos un restaurante comunitario acogedor especializado en la cultura culinaria española.\n\n**Nuestras Características:**\n• 🐷 Jamón Ibérico - Tesoro nacional de España\n• 🥩 Carnes Premium - Carne de calidad, cocina profesional\n• 🍞 Pan de Coca - Pan tradicional catalán\n• 🧀 Quesos Españoles - Varios quesos seleccionados\n• 🍷 Vinos Españoles - Vino tinto, espumoso, jerez\n\n**Nuestra Filosofía:**\nTratar a cada huésped con el corazón de tratar a la familia, insistiendo en decoración ecológica, ingredientes seguros y sabor puro.\n\n¡Oink oink, bienvenido a nuestro pequeño restaurante acogedor!",
                "¡Oink oink! ¡Déjame presentar nuestro Restaurante Depaso!\n\nSomos un pequeño restaurante acogedor especializado en cocina española. Aunque no tenemos muchas mesas y sillas, esperamos que cada huésped pueda sentir la calidez del hogar.\n\n¡Estamos más orgullosos de nuestro Jamón Ibérico, que es el tesoro nacional de España! Y nuestras carnes son todas de carne de calidad seleccionada, cocinadas profesionalmente.\n\n¡Oink oink, insistimos en tratar a cada huésped con el corazón de tratar a la familia, esperando que puedan comer con confianza y alegría aquí!"
            ]
        };
        
        const responseList = responses[this.currentLanguage];
        return responseList[Math.floor(Math.random() * responseList.length)];
    }
    
    // 完整菜单回复
    getFullMenu() {
        const responses = {
            zh: [
                "📋 **Depaso完整菜单**\n\n**🥩 伊比利亚火腿系列：**\n• Bellota 48个月 - ¥280（最高等级，橡果喂养）\n• Bellota 36个月 - ¥220（橡果喂养，口感丰富）\n• Cebo de Campo 24个月 - ¥180（混合饲料，性价比高）\n• Cebo 18个月 - ¥150（谷物喂养，性价比高）\n\n**🥩 牛排类：**\n• 菲力牛排 - ¥180（最嫩部位，推荐三分熟）\n• 西冷牛排 - ¥160（口感丰富，推荐五分熟）\n• 肋眼牛排 - ¥170（油脂丰富，推荐五分熟）\n• T骨牛排 - ¥190（一次享受两种口感）\n• 黑胡椒牛排 - ¥175（经典黑胡椒调味）\n• 蒜香牛排 - ¥165（蒜香浓郁）\n\n**🍞 面包类：**\n• Pan de Coca - ¥25（加泰罗尼亚传统脆皮面包）\n• 番茄面包 - ¥35（配新鲜番茄和橄榄油）\n• 蒜香面包 - ¥30（蒜蓉黄油烤制）\n\n**🧀 奶酪类：**\n• Manchego 12个月 - ¥120（西班牙羊奶酪）\n• Idiazábal - ¥95（巴斯克烟熏羊奶酪）\n• Cabrales - ¥85（阿斯图里亚斯蓝纹奶酪）\n\n**🍷 酒类：**\n• Rioja Reserva - ¥180（里奥哈珍藏红酒）\n• Cava Brut - ¥120（西班牙起泡酒）\n• Sherry Fino - ¥95（雪利酒，配火腿绝佳）\n\n**🍽️ 小食：**\n• 橄榄拼盘 - ¥45（三种西班牙橄榄）\n• 西班牙土豆饼 - ¥55（传统土豆蛋饼）\n• 蒜蓉虾 - ¥65（橄榄油蒜蓉炒虾）\n\n哼哼，这就是我们的完整菜单！您对哪个类别特别感兴趣呢？",
                "哼哼！完整菜单来了！我们最推荐的是伊比利亚火腿配Pan de Coca，这是我们的招牌组合！您想要了解哪个类别的详细信息呢？"
            ],
            en: [
                "📋 **Depaso Complete Menu**\n\n**🥩 Jamón Ibérico Series:**\n• Bellota 48 months - ¥280 (Highest grade, acorn-fed)\n• Bellota 36 months - ¥220 (Acorn-fed, rich flavor)\n• Cebo de Campo 24 months - ¥180 (Mixed feed, great value)\n• Cebo 18 months - ¥150 (Grain-fed, great value)\n\n**🥩 Steak Series:**\n• Filet Mignon - ¥180 (Tenderest cut, recommended medium-rare)\n• Sirloin - ¥160 (Rich flavor, recommended medium)\n• Ribeye - ¥170 (Rich marbling, recommended medium)\n• T-bone - ¥190 (Enjoy two textures at once)\n• Black Pepper Steak - ¥175 (Classic black pepper seasoning)\n• Garlic Steak - ¥165 (Rich garlic flavor)\n\n**🍞 Bread:**\n• Pan de Coca - ¥25 (Traditional Catalan crispy bread)\n• Tomato Bread - ¥35 (With fresh tomato and olive oil)\n• Garlic Bread - ¥30 (Garlic butter roasted)\n\n**🧀 Cheese:**\n• Manchego 12 months - ¥120 (Spanish sheep cheese)\n• Idiazábal - ¥95 (Basque smoked sheep cheese)\n• Cabrales - ¥85 (Asturias blue cheese)\n\n**🍷 Wine:**\n• Rioja Reserva - ¥180 (Rioja reserve red wine)\n• Cava Brut - ¥120 (Spanish sparkling wine)\n• Sherry Fino - ¥95 (Sherry, perfect with ham)\n\n**🍽️ Tapas:**\n• Olive Platter - ¥45 (Three types of Spanish olives)\n• Spanish Potato Omelet - ¥55 (Traditional potato omelet)\n• Garlic Shrimp - ¥65 (Olive oil garlic shrimp)\n\nOink oink, this is our complete menu! Which category interests you most?",
                "Oink oink! Here's the full menu! We highly recommend Jamón Ibérico with Pan de Coca - our signature combination! Which category would you like to know more about?"
            ],
            es: [
                "📋 **Menú Completo de Depaso**\n\n**🥩 Serie Jamón Ibérico:**\n• Bellota 48 meses - ¥280 (Máximo grado, alimentado con bellotas)\n• Bellota 36 meses - ¥220 (Alimentado con bellotas, sabor rico)\n• Cebo de Campo 24 meses - ¥180 (Alimentación mixta, excelente valor)\n• Cebo 18 meses - ¥150 (Alimentado con grano, excelente valor)\n\n**🥩 Serie de Carne:**\n• Filete de Ternera - ¥180 (Corte más tierno, recomendado término medio)\n• Solomillo - ¥160 (Sabor rico, recomendado término medio)\n• Chuleta de Ternera - ¥170 (Rica en grasa, recomendado término medio)\n• T-bone - ¥190 (Disfruta dos texturas a la vez)\n• Carne con Pimienta Negra - ¥175 (Condimentado clásico con pimienta negra)\n• Carne con Ajo - ¥165 (Aromático con ajo)\n\n**🍞 Pan:**\n• Pan de Coca - ¥25 (Pan crujiente tradicional catalán)\n• Pan con Tomate - ¥35 (Con tomate fresco y aceite de oliva)\n• Pan de Ajo - ¥30 (Tostado con mantequilla de ajo)\n\n**🧀 Queso:**\n• Manchego 12 meses - ¥120 (Queso de oveja español)\n• Idiazábal - ¥95 (Queso de oveja ahumado del País Vasco)\n• Cabrales - ¥85 (Queso azul de Asturias)\n\n**🍷 Vino:**\n• Rioja Reserva - ¥180 (Vino tinto reserva de Rioja)\n• Cava Brut - ¥120 (Vino espumoso español)\n• Sherry Fino - ¥95 (Jerez, perfecto con jamón)\n\n**🍽️ Tapas:**\n• Tabla de Aceitunas - ¥45 (Tres tipos de aceitunas españolas)\n• Tortilla Española - ¥55 (Tortilla tradicional de patata)\n• Gambas al Ajillo - ¥65 (Gambas salteadas con ajo y aceite de oliva)\n\n¡Oink oink, este es nuestro menú completo! ¿Qué categoría le interesa más?",
                "¡Oink oink! ¡Aquí está el menú completo! ¡Recomendamos altamente Jamón Ibérico con Pan de Coca - nuestra combinación insignia! ¿De qué categoría le gustaría saber más?"
            ]
        };
        
        const responseList = responses[this.currentLanguage];
        return responseList[Math.floor(Math.random() * responseList.length)];
    }
    
    // 推荐菜回复
    getRecommendations() {
        const responses = {
            zh: [
                "⭐ **Depaso推荐菜**\n\n**🥇 招牌推荐：**\n• **伊比利亚火腿配Pan de Coca** - 我们的经典组合！\n  Bellota 48个月火腿 + 番茄面包，配雪利酒\n  价格：¥280 + ¥35 + ¥95 = ¥410\n\n**🥈 人气推荐：**\n• **菲力牛排配红酒** - 最嫩部位，推荐三分熟\n  菲力牛排 + Rioja Reserva红酒\n  价格：¥180 + ¥180 = ¥360\n\n• **西班牙土豆饼配橄榄** - 传统小食组合\n  土豆饼 + 橄榄拼盘\n  价格：¥55 + ¥45 = ¥100\n\n**🥉 性价比推荐：**\n• **Cebo火腿配蒜香面包** - 经济实惠的选择\n  Cebo 18个月火腿 + 蒜香面包\n  价格：¥150 + ¥30 = ¥180\n\n**🍷 酒类推荐：**\n• 配火腿：Sherry Fino雪利酒\n• 配牛排：Rioja Reserva红酒\n• 配小食：Cava Brut起泡酒\n\n哼哼，这些都是我们最受欢迎的搭配！您想试试哪个呢？",
                "哼哼！让我为您推荐我们最受欢迎的菜品！\n\n我们最招牌的是伊比利亚火腿配Pan de Coca，这可是西班牙的经典搭配！还有我们的菲力牛排，肉质最嫩，推荐三分熟。\n\n如果您想要性价比高的选择，我推荐Cebo火腿配蒜香面包，经济实惠又美味！\n\n哼哼，这些都是我们客人的最爱！您想了解哪个的详细信息呢？"
            ],
            en: [
                "⭐ **Depaso Recommendations**\n\n**🥇 Signature Recommendations:**\n• **Jamón Ibérico with Pan de Coca** - Our classic combination!\n  Bellota 48 months ham + tomato bread, with sherry\n  Price: ¥280 + ¥35 + ¥95 = ¥410\n\n**🥈 Popular Recommendations:**\n• **Filet Mignon with Red Wine** - Tenderest cut, recommended medium-rare\n  Filet Mignon + Rioja Reserva red wine\n  Price: ¥180 + ¥180 = ¥360\n\n• **Spanish Potato Omelet with Olives** - Traditional tapas combination\n  Potato omelet + olive platter\n  Price: ¥55 + ¥45 = ¥100\n\n**🥉 Value Recommendations:**\n• **Cebo Ham with Garlic Bread** - Economical choice\n  Cebo 18 months ham + garlic bread\n  Price: ¥150 + ¥30 = ¥180\n\n**🍷 Wine Recommendations:**\n• With ham: Sherry Fino\n• With steak: Rioja Reserva red wine\n• With tapas: Cava Brut sparkling wine\n\nOink oink, these are our most popular combinations! Which one would you like to try?",
                "Oink oink! Let me recommend our most popular dishes!\n\nOur signature dish is Jamón Ibérico with Pan de Coca, a classic Spanish combination! And our Filet Mignon is the tenderest cut, recommended medium-rare.\n\nIf you want a value choice, I recommend Cebo ham with garlic bread, economical and delicious!\n\nOink oink, these are our customers' favorites! Which one would you like to know more about?"
            ],
            es: [
                "⭐ **Recomendaciones de Depaso**\n\n**🥇 Recomendaciones Insignia:**\n• **Jamón Ibérico con Pan de Coca** - ¡Nuestra combinación clásica!\n  Jamón Bellota 48 meses + pan con tomate, con jerez\n  Precio: ¥280 + ¥35 + ¥95 = ¥410\n\n**🥈 Recomendaciones Populares:**\n• **Filete de Ternera con Vino Tinto** - Corte más tierno, recomendado término medio\n  Filete de Ternera + vino tinto Rioja Reserva\n  Precio: ¥180 + ¥180 = ¥360\n\n• **Tortilla Española con Aceitunas** - Combinación tradicional de tapas\n  Tortilla de patata + tabla de aceitunas\n  Precio: ¥55 + ¥45 = ¥100\n\n**🥉 Recomendaciones de Valor:**\n• **Jamón Cebo con Pan de Ajo** - Opción económica\n  Jamón Cebo 18 meses + pan de ajo\n  Precio: ¥150 + ¥30 = ¥180\n\n**🍷 Recomendaciones de Vino:**\n• Con jamón: Jerez Fino\n• Con carne: Vino tinto Rioja Reserva\n• Con tapas: Cava Brut espumoso\n\n¡Oink oink, estas son nuestras combinaciones más populares! ¿Cuál le gustaría probar?",
                "¡Oink oink! ¡Déjame recomendar nuestros platos más populares!\n\nNuestro plato insignia es Jamón Ibérico con Pan de Coca, ¡una combinación clásica española! Y nuestro Filete de Ternera es el corte más tierno, recomendado término medio.\n\nSi quiere una opción de valor, recomiendo jamón Cebo con pan de ajo, ¡económico y delicioso!\n\n¡Oink oink, estos son los favoritos de nuestros clientes! ¿De cuál le gustaría saber más?"
            ]
        };
        
        const responseList = responses[this.currentLanguage];
        return responseList[Math.floor(Math.random() * responseList.length)];
    }
}

// 初始化聊天机器人
document.addEventListener('DOMContentLoaded', () => {
    new RestaurantChatbot();
});