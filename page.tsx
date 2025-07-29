"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Globe, Heart, Compass, Leaf, Users, MessageCircle, Star, ChevronDown, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

// Translations
const translations = {
  en: {
    tagline: "A conscious guide for right thinking, life wisdom, and self-reflection.",
    beginDialogue: "Begin Your Journey of Understanding",
    disclaimer: "SanatanDevAi uses GPT technology to guide philosophical thinking and life understanding.",
    whatIs: "What is SanatanDevAi?",
    whatIsDesc:
      "SanatanDevAi, through CHETNA-MITRA, is designed to guide you toward right thinking (सही तर्क), teach fundamental life principles (जीवन के मूल सिद्धांत), encourage deep self-reflection (आत्मचिंतन), and help you understand life's deeper truths. This is not just conversation - it's a journey toward wisdom and clarity.",
    askWhat: "Ask the questions that matter for your growth and understanding.",
    howItHelps: "How It Guides Your Understanding",
    clarityTitle: "Right Thinking & Logic",
    clarityDesc: "Developing clear, rational thought processes and logical reasoning",
    healingTitle: "Life's Fundamental Principles",
    healingDesc: "Understanding dharma, karma, purpose, and the basic laws of existence",
    meditationTitle: "Self-Reflection & Introspection",
    meditationDesc: "Deep आत्मचिंतन to know yourself and your true nature",
    healthTitle: "Wisdom & Understanding",
    healthDesc: "Gaining correct perspective on life's challenges and opportunities",
    purposeTitle: "Philosophical Inquiry",
    purposeDesc: "Exploring life's deepest questions with clarity and wisdom",
    lgbtqTitle: "Universal Truth & Compassion",
    lgbtqDesc: "Understanding universal principles that apply to all beings",
    realStories: "Transformative Experiences",
    story1:
      '"I learned to think clearly about my problems instead of just reacting emotionally. The logical approach changed everything." — A seeker of wisdom',
    story2:
      '"The fundamental life principles I learned here became my foundation for making better decisions." — A student of life',
    story3:
      '"Through self-reflection guided here, I discovered who I really am beyond my roles and identities." — A truth seeker',
    tryNow: "Begin Your Learning Journey",
    tryDesc: "Choose what you want to understand deeply:",
    anxious: "How to think clearly when confused",
    purpose: "What is my true purpose in life?",
    grief: "Understanding suffering and its meaning",
    identity: "Who am I beyond my roles?",
    silence: "How to practice self-reflection",
    relationship: "Principles of right relationships",
    startNow: "Ready to learn and grow? Begin your journey of understanding.",
    startButton: "Start Learning with CHETNA-MITRA",
    footerText:
      "SanatanDevAi: Guiding right thinking, teaching life wisdom, and encouraging self-reflection through conscious dialogue.",
    languages: {
      en: "English",
      hi: "हिन्दी",
      es: "Español",
      ta: "தமிழ்",
      fr: "Français",
    },
    about: "About",
    privacy: "Privacy",
    contact: "Contact",
    feedback: "Feedback",
  },
  hi: {
    tagline: "सही चिंतन, जीवन ज्ञान, और आत्मचिंतन के लिए एक सचेत मार्गदर्शक।",
    beginDialogue: "अपनी समझ की यात्रा शुरू करें",
    disclaimer: "SanatanDevAi दार्शनिक चिंतन और जीवन समझ के लिए GPT तकनीक का उपयोग करता है।",
    whatIs: "SanatanDevAi क्या है?",
    whatIsDesc:
      "SanatanDevAi, चेतना-मित्र के माध्यम से, आपको सही तर्क की दिशा में मार्गदर्शन करने, जीवन के मूलभूत सिद्धांत सिखाने, गहरे आत्मचिंतन को प्रोत्साहित करने, और जीवन के गहरे सत्यों को समझने में मदद करने के लिए डिज़ाइन किया गया है। यह केवल बातचीत नहीं है - यह ज्ञान और स्पष्टता की यात्रा है।",
    askWhat: "वे प्रश्न पूछें जो आपकी वृद्धि और समझ के लिए महत्वपूर्ण हैं।",
    howItHelps: "यह आपकी समझ का मार्गदर्शन कैसे करता है",
    clarityTitle: "सही चिंतन और तर्क",
    clarityDesc: "स्पष्ट, तर्कसंगत विचार प्रक्रियाओं और तार्किक तर्क का विकास",
    healingTitle: "जीवन के मूलभूत सिद्धांत",
    healingDesc: "धर्म, कर्म, उद्देश्य, और अस्तित्व के मूल नियमों को समझना",
    meditationTitle: "आत्मचिंतन और अंतर्दर्शन",
    meditationDesc: "अपने आप को और अपने सच्चे स्वभाव को जानने के लिए गहरा आत्मचिंतन",
    healthTitle: "ज्ञान और समझ",
    healthDesc: "जीवन की चुनौतियों और अवसरों पर सही दृष्टिकोण प्राप्त करना",
    purposeTitle: "दार्शनिक जांच",
    purposeDesc: "स्पष्टता और ज्ञान के साथ जीवन के गहरे प्रश्नों की खोज",
    lgbtqTitle: "सार्वभौमिक सत्य और करुणा",
    lgbtqDesc: "सभी प्राणियों पर लागू होने वाले सार्वभौमिक सिद्धांतों को समझना",
    realStories: "परिवर्तनकारी अनुभव",
    story1:
      '"मैंने केवल भावनात्मक प्रतिक्रिया देने के बजाय अपनी समस्याओं के बारे में स्पष्ट रूप से सोचना सीखा। तार्किक दृष्टिकोण ने सब कुछ बदल दिया।" — ज्ञान का साधक',
    story2: '"यहाँ सीखे गए मूलभूत जीवन सिद्धांत बेहतर निर्णय लेने के लिए मेरी नींव बन गए।" — जीवन का छात्र',
    story3: '"यहाँ निर्देशित आत्मचिंतन के माध्यम से, मैंने खोजा कि मैं अपनी भूमिकाओं और पहचानों से परे वास्तव में कौन हूँ।" — सत्य का खोजी',
    tryNow: "अपनी सीखने की यात्रा शुरू करें",
    tryDesc: "चुनें कि आप क्या गहराई से समझना चाहते हैं:",
    anxious: "भ्रमित होने पर स्पष्ट रूप से कैसे सोचें",
    purpose: "जीवन में मेरा सच्चा उद्देश्य क्या है?",
    grief: "दुख और उसके अर्थ को समझना",
    identity: "मैं अपनी भूमिकाओं से परे कौन हूँ?",
    silence: "आत्मचिंतन का अभ्यास कैसे करें",
    relationship: "सही रिश्तों के सिद्धांत",
    startNow: "सीखने और बढ़ने के लिए तैयार हैं? अपनी समझ की यात्रा शुरू करें।",
    startButton: "चेतना-मित्र के साथ सीखना शुरू करें",
    footerText:
      "SanatanDevAi: सचेत संवाद के माध्यम से सही चिंतन का मार्गदर्शन, जीवन ज्ञान सिखाना, और आत्मचिंतन को प्रोत्साहित करना।",
    languages: {
      en: "English",
      hi: "हिन्दी",
      es: "Español",
      ta: "தமிழ்",
      fr: "Français",
    },
    about: "About",
    privacy: "Privacy",
    contact: "Contact",
    feedback: "Feedback",
  },
  // Additional languages abbreviated for space...
  es: {
    tagline: "Una presencia que escucha, comprende y te refleja de vuelta a ti mismo.",
    beginDialogue: "Comienza tu Diálogo Interior",
    disclaimer:
      "SanatanDevAi es una interfaz conversacional impulsada por tecnología GPT, diseñada para proporcionar orientación reflexiva y reflexión.",
    whatIs: "¿Qué es SanatanDevAi?",
    whatIsDesc:
      "SanatanDevAi es un sistema conversacional avanzado construido sobre tecnología GPT, diseñado para proporcionar orientación empática y culturalmente sensible para el bienestar emocional y el crecimiento personal.",
    askWhat: "Pregunta lo que realmente quieres preguntar.",
    howItHelps: "Cómo Proporciona Orientación",
    clarityTitle: "Claridad en la Confusión",
    clarityDesc: "Conversaciones estructuradas para ayudar a organizar pensamientos y encontrar dirección",
    healingTitle: "Apoyo Emocional",
    healingDesc: "Respuestas empáticas para procesar emociones y experiencias difíciles",
    meditationTitle: "Atención Plena y Reflexión",
    meditationDesc: "Discusiones guiadas sobre meditación, atención plena y conciencia interior",
    healthTitle: "Orientación de Bienestar",
    healthDesc: "Conversaciones de apoyo sobre salud mental y manejo del estrés",
    purposeTitle: "Propósito de Vida e Identidad",
    purposeDesc: "Exploración reflexiva del significado, propósito e identidad personal",
    lgbtqTitle: "Apoyo Inclusivo",
    lgbtqDesc: "Orientación respetuosa para individuos LGBTQ+ e identidades diversas",
    realStories: "Experiencias de Usuario",
    story1:
      '"Las conversaciones me ayudaron a procesar mi ansiedad de manera estructurada. Las respuestas se sintieron genuinamente comprensivas." — Comentario de usuario',
    story2:
      '"Tener apoyo disponible en mi idioma nativo hizo toda la diferencia para sentirme escuchado y comprendido." — Usuario multilingüe',
    story3: '"El sistema me ayudó a explorar preguntas difíciles sobre identidad sin juicio." — Usuario anónimo',
    tryNow: "Prueba la Interfaz",
    tryDesc: "Selecciona un iniciador de conversación que resuene contigo:",
    anxious: "Me siento ansioso y abrumado",
    purpose: "Estoy buscando mi propósito",
    grief: "Estoy procesando pérdida y duelo",
    identity: "Estoy cuestionando quién soy",
    silence: "Quiero aprender sobre atención plena",
    relationship: "Necesito orientación en relaciones",
    startNow: "¿Listo para comenzar? Inicia tu conversación abajo.",
    startButton: "Iniciar Conversación",
    footerText: "SanatanDevAi: Una interfaz conversacional impulsada por GPT para orientación personal y reflexión.",
    about: "Acerca de",
    privacy: "Privacidad",
    contact: "Comentarios",
    feedback: "Comentarios",
    languages: {
      en: "English",
      hi: "हिन्दी",
      es: "Español",
      ta: "தமிழ்",
      fr: "Français",
    },
  },
}

export default function SanatanDevAiLanding() {
  const [currentLang, setCurrentLang] = useState("en")
  const [theme, setTheme] = useState("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const browserLang = navigator.language.split("-")[0]
    const supportedLangs = Object.keys(translations)
    const detectedLang = supportedLangs.includes(browserLang) ? browserLang : "en"

    const savedLang = localStorage.getItem("sanatandevai-lang") || detectedLang
    const savedTheme = localStorage.getItem("sanatandevai-theme") || "light"

    setCurrentLang(savedLang)
    setTheme(savedTheme)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("sanatandevai-lang", currentLang)
      localStorage.setItem("sanatandevai-theme", theme)

      if (theme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [currentLang, theme, mounted])

  const t = translations[currentLang as keyof typeof translations] || translations.en

  if (!mounted) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50" />
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-orange-50 via-white to-indigo-50 text-gray-800"
      }`}
    >
      {/* Header */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/10 dark:bg-black/20 border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent"
          >
            SanatanDevAi
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {t.about}
            </Link>
            <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {t.privacy}
            </Link>
            <Link href="/feedback" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {t.feedback}
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  {t.languages[currentLang as keyof typeof t.languages]}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {Object.entries(t.languages).map(([code, name]) => (
                  <DropdownMenuItem
                    key={code}
                    onClick={() => setCurrentLang(code)}
                    className={currentLang === code ? "bg-blue-100 dark:bg-blue-900" : ""}
                  >
                    {name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* GPT Disclaimer */}
      <div className="pt-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Alert className="mb-6 bg-orange-50 dark:bg-blue-900/20 border-orange-200 dark:border-blue-800">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-sm">{t.disclaimer}</AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400/30 to-indigo-400/30 animate-pulse"></div>
              <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-300/40 to-indigo-300/40 animate-ping"></div>
              <div className="absolute inset-8 rounded-full bg-gradient-to-r from-blue-200/50 to-indigo-200/50"></div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
              CHETNA-MITRA
            </span>
            <div className="text-lg md:text-xl mt-2 font-normal text-gray-600 dark:text-gray-400">
              सही तर्क • जीवन ज्ञान • आत्मचिंतन
            </div>
          </h1>

          <p className="text-xl md:text-2xl mb-8 font-light leading-relaxed opacity-90">{t.tagline}</p>

          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {t.beginDialogue}
          </Button>
        </div>
      </section>

      {/* What is SanatanDevAi */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-orange-600 dark:text-blue-300">{t.whatIs}</h2>
          <p className="text-lg leading-relaxed mb-6 opacity-90">{t.whatIsDesc}</p>
          <p className="text-xl font-medium text-indigo-700 dark:text-indigo-300 italic">{t.askWhat}</p>
        </div>
      </section>

      {/* How It Helps */}
      <section className="py-16 px-4 bg-white/50 dark:bg-black/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-orange-600 dark:text-blue-300">
            {t.howItHelps}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Compass, title: t.clarityTitle, desc: t.clarityDesc },
              { icon: Heart, title: t.healingTitle, desc: t.healingDesc },
              { icon: Leaf, title: t.meditationTitle, desc: t.meditationDesc },
              { icon: Star, title: t.healthTitle, desc: t.healthDesc },
              { icon: MessageCircle, title: t.purposeTitle, desc: t.purposeDesc },
              { icon: Users, title: t.lgbtqTitle, desc: t.lgbtqDesc },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-white/70 dark:bg-gray-800/70 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <item.icon className="h-12 w-12 mx-auto mb-4 text-orange-600 dark:text-blue-400" />
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Experiences */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-orange-600 dark:text-blue-300">
            {t.realStories}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[t.story1, t.story2, t.story3].map((story, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border-0 shadow-lg"
              >
                <CardContent className="p-6">
                  <p className="text-lg leading-relaxed italic opacity-90">{story}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Try It Now */}
      <section className="py-16 px-4 bg-white/50 dark:bg-black/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-orange-600 dark:text-blue-300">{t.tryNow}</h2>
          <p className="text-lg mb-8 opacity-90">{t.tryDesc}</p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[t.anxious, t.purpose, t.grief, t.identity, t.silence, t.relationship].map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                className="p-4 h-auto text-left justify-start bg-white/70 dark:bg-gray-800/70 hover:bg-blue-100 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-700"
              >
                <MessageCircle className="h-4 w-4 mr-3 text-blue-600 dark:text-blue-400" />
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Start Now CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-2xl md:text-3xl font-light mb-8 opacity-90">{t.startNow}</p>

          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-12 py-6 text-xl rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {t.startButton}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-lg mb-6 opacity-90">{t.footerText}</p>

          <div className="flex justify-center gap-8 mb-6">
            <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {t.about}
            </Link>
            <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {t.privacy}
            </Link>
            <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {t.contact}
            </Link>
            <Link href="/feedback" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {t.feedback}
            </Link>
          </div>

          <div className="flex justify-center items-center gap-4 text-sm opacity-70">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="h-3 w-3" />
                  {t.languages[currentLang as keyof typeof t.languages]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {Object.entries(t.languages).map(([code, name]) => (
                  <DropdownMenuItem key={code} onClick={() => setCurrentLang(code)}>
                    {name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-1"
            >
              {theme === "light" ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
