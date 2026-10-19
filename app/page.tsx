'use client'

import { useEffect, useState } from 'react'

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
      'vturb-smartplayer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        id?: string
        style?: React.CSSProperties
      }
      }
    }
  }
}

import {
  Bell,
  ChevronDown,
  EllipsisVertical,
  Menu,
  Mic,
  MoreVertical,
  Search,
  Send,
  Share2,
  ThumbsDown,
  ThumbsUp,
  Video,
} from 'lucide-react'

const liveMessages = [
  ['@camille.roux', 'Siento que me está hablando a mí.'], ['@chloe_exp', 'ME TOCÓ EL ALMA'], ['@sarah.dubois77', 'Casi lloro…'], ['@thomas_croit', 'Yo estaba pidiendo una señal'], ['@manon_r', '✨✨'], ['@julien_b42', 'No sigas desplazándote'], ['@jules_m', 'AMEN 🙏🔥'], ['@raphael.m_foi', 'está pasando algo'], ['@camille.moreau', 'esperen… ¿el Papa Francisco?? 😳'], ['@karine_oviedo3', 'esto va en serio 🙏🙏'], ['@mathis.dumas', '¿por qué nadie habla de esto??'], ['@bruno.martin47', 'Parece algo enorme'], ['@christine_amour7', 'nunca había visto algo así 💫'], ['@amelie.blanc_', 'esto no es normal 🤲'], ['@karine_j', 'mi cuerpo está reaccionando…'], ['@laure.s_', 'Amén'], ['@pierre.henry9', 'se me puso la piel de gallina'], ['@etienne_croix', 'Dios nos trajo hasta aquí 🔥'], ['@sophie.lune_', 'Es muy poderoso, wow.'], ['@catherine.moreau', 'Estoy temblando…'], ['@charles_r', 'es real…'], ['@marie_p', 'amen amen 🙏'], ['@mathieu.v_', 'Amén 🙌'], ['@rebecca.lumiere', 'rezo por mi familia 🙏'], ['@mia.thomas88', 'Estoy endeudada…'], ['@louise.espoir', 'Necesito un milagro ahora mismo'], ['@pauline.f', 'Amén !!! 🙌✨'], ['@antoine.p_', 'rezo por la sanación'], ['@christine_amour7', 'mi matrimonio está destruido 💔'], ['@noemie.m', 'Siento mucha emoción'], ['@karine_j', '📖🧎‍♂️'], ['@nadia.b', '🙏🙏'], ['@marc_p.1', 'escribo mi intención aquí'], ['@charles_r', 'Dios, por favor, escúchame'], ['@emilie.bernard_', 'Ya siento la paz'], ['@nathalie.riviere', 'algo está cambiando en mí 🕊️'], ['@damien.t_82', 'Estoy llorando…'], ['@esther_j', 'amen 🙏❤️'], ['@tiphaine.croix_', 'no es una coincidencia'], ['@emilie.bernard_', 'Yo creo ✨'], ['@baptiste_k21', 'no abandonen esta transmisión'], ['@alexandra.riviere_', '🤲 ✝️'], ['@jerome.a_', 'AMEEEN 🙏✨'], ['@bastien_j', 'Comencé esta oración hace unos días… sentí la paz'], ['@lucie.robert_', 'mi ansiedad disminuyó mucho'], ['@rebecca.lumiere', '❤️❤️'], ['@emmanuel.dupont_', 'Ahora duermo mejor'], ['@samuel_l', 'amen amen amen 🙏🔥'], ['@kevin.roux21', 'realmente funciona..'], ['@ilan.al_', 'ESTO NO ES UNA COINCIDENCIA'], ['@etienne.croix99', 'Antes no lo creía…'], ['@fanny_n', 'Pero ahora me siento diferente'], ['@simon_o.foi', 'confíen en esto… de verdad'], ['@clemence.m99', 'mi casa está más tranquila ✨'], ['@gabrielle_v', 'Je retrouve l’espoir'], ['@roxane_m', 'Amén 🙌'], ['@emilie.bernard_', 'n’ignorez pas ça les amis'], ['@lucas.b_officiel', 'ça peut tout changer'], ['@hugo.officiel7', 'il se passe vraiment quelque chose'], ['@justine_cl', '💥💥'], ['@mathis.dumas', 'une antenne à miracles ??'], ['@paul.g_officiel', 'je n’avais jamais entendu ça'], ['@alexis.lumiere', 'Ça a du sens…'], ['@charles_b_', 'amen 🙏'], ['@oceane_k', 'pas étonnant que les prières ne marchent pas…'], ['@felix.arias', 'waouh…'], ['@delphine_d', 'plus profond que la religion'], ['@etienne.croix99', 'On dirait une vérité cachée'], ['@lucie.robert_', 'Maintenant je comprends 🙌'], ['@simon_o.foi', 'C’est très puissant...'], ['@deborah_o', 'amen 🙏✨ merci mon Dieu'], ['@elise.aurore_', 'quelque chose change'], ['@hugo.officiel7', 'c’est un vrai savoir'], ['@yann.f', 'Amén'], ['@oceane_k', 'c’est fou…'], ['@maxime.santi', 'seulement 300 exemplaires ?? 😳'], ['@adrien_j', '🙌✨'], ['@romane.silva', 'Je ne rate pas ça'], ['@rachel.grace', 'où est le bouton ??'], ['@fanny_n', 'J’ai besoin de ça MAINTENANT'], ['@marion.perez_', '🙌🙌🙌'], ['@rebecca.lumiere', 'n’attendez pas les amis'], ['@lea.alba_', 'c’est votre chance'], ['@mia.thomas88', 'Je ressens l’urgence…'], ['@elodie.petit', 'quelque chose me dit d’agir'], ['@angele.petit', 'faites-le, tout simplement'], ['@william.t', 'allez-y maintenant'], ['@sarah.dubois77', 'Je viens de cliquer'], ['@dorian.vega88', 'j’ai déjà mon accès'], ['@marine.f11', 'j’ai déjà réservé le mien 🙌'], ['@kevin.roux21', 'j’ai déjà reçu l’e-mail'], ['@clemence.m99', 'c’était rapide…'], ['@maelys.b_', 'Ya siento la paz'], ['@manon_r', 'je commence aujourd’hui'], ['@margaux.av', 'la meilleure décision du jour'], ['@catherine.moreau', 'merci 🙏'], ['@ilan.al_', 'Que Dieu bénisse tout le monde ici'], ['@simon_o.foi', 'AMEN 🔥'], ['@lucie.robert_', 'amen 🙌']
].map(([name, text], index) => ({ name, text, color: ['bg-fuchsia-700', 'bg-purple-700', 'bg-blue-600', 'bg-emerald-600', 'bg-indigo-600'][index % 5] }))

export default function Page() {
  const [chatMessage, setChatMessage] = useState('')
  const [chatMessages, setChatMessages] = useState<typeof liveMessages>(liveMessages.slice(0, 3))
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    const playerScriptId = 'vturb-player-6ad222713daf35d2eb3b2d43'
    if (!document.getElementById(playerScriptId)) {
      const script = document.createElement('script')
      script.id = playerScriptId
      script.src = 'https://scripts.converteai.net/e0b6b027-7861-4f15-8697-a6b42cfa2c3e/players/6ad222713daf35d2eb3b2d43/v4/player.js'
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

  useEffect(() => {
    let messageIndex = 3
    const timer = window.setInterval(() => {
      const nextMessage = liveMessages[messageIndex % liveMessages.length]
      setChatMessages((current) => [...current.slice(-5), nextMessage])
      messageIndex += 1
    }, 4200)
    return () => window.clearInterval(timer)
  }, [])

  function sendMessage() {
    const trimmed = chatMessage.trim()
    if (!trimmed) return
    setChatMessages((current) => [...current.slice(-5), { name: '@tú', text: trimmed, color: 'bg-orange-500' }])
    setChatMessage('')
  }

  return (
    <main className="min-h-screen bg-white text-[#0f0f0f]">
      <header className="mx-auto flex h-14 max-w-[900px] items-center gap-3 border-b border-[#e5e5e5] px-3 text-[12px]">
        <Menu className="size-4 text-[#333]" aria-label="Menu" />
        <div className="flex items-center gap-1 font-bold tracking-tight">
          <span className="flex size-4 items-center justify-center rounded-[4px] bg-[#ff0000] text-[9px] text-white">▶</span>
          <span>SanBenito</span>
        </div>
        <div className="ml-2 flex h-8 flex-1 max-w-[420px] overflow-hidden border border-[#bcbcbc] bg-white">
          <input aria-label="Buscar" className="min-w-0 flex-1 px-3 text-[11px] outline-none" placeholder="Buscar" />
          <button className="flex w-11 items-center justify-center border-l border-[#d4d4d4] bg-[#f8f8f8]" aria-label="Buscar">
            <Search className="size-4 text-[#555]" />
          </button>
        </div>
        <Mic className="ml-auto hidden size-4 text-[#222] sm:block" aria-label="Búsqueda por voz" />
        <Video className="size-4 text-[#222]" aria-label="Crear" />
        <Bell className="size-4 text-[#222]" aria-label="Notificaciones" />
        <button className="flex h-7 items-center gap-1 rounded-full border border-[#065fd4] px-3 text-[10px] font-medium text-[#065fd4]">
          <span className="flex size-4 items-center justify-center rounded-full border border-[#065fd4]">●</span>
          Iniciar sesión
        </button>
      </header>

      <div className="mx-auto w-full max-w-[570px] px-3 pb-4 pt-2 sm:px-0">
        <section aria-label="Vídeo principal" className="mx-auto w-full max-w-[400px] overflow-hidden bg-black">
          <vturb-smartplayer id="vid-6ad222713daf35d2eb3b2d43" style={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: '400px' }}>
            <div className="relative w-full bg-black" style={{ padding: '133.33333333333331% 0 0', zIndex: 0 }} />
          </vturb-smartplayer>
        </section>

        <section className="mt-4">
          <h1 className="text-[12px] font-semibold leading-5">ESTO TE LO HAN OCULTADO... PERO HOY SERÁ REVELADO EN DIRECTO A LAS</h1>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-full bg-[#855b3b] text-[10px] font-bold text-white">P</div>
            <div className="flex-1 leading-3">
              <p className="text-[11px] font-semibold">Père Juan Mendez <span className="text-[9px]">✓</span></p>
              <p className="text-[9px] text-[#606060]">93 mil suscriptores</p>
            </div>
            <button className="rounded-full bg-black px-3 py-1 text-[9px] font-semibold text-white">Suscribirse</button>
          </div>
          <div className="mt-2 flex items-center gap-2 border-y border-[#e5e5e5] py-2 text-[9px]">
            <button className="flex items-center gap-1 font-medium"><ThumbsUp className="size-3" />7 mil</button>
            <button aria-label="Não gostei"><ThumbsDown className="size-3" /></button>
            <button className="ml-1 flex items-center gap-1 rounded-full bg-[#f2f2f2] px-3 py-1"><Share2 className="size-3" />Compartir</button>
            <button className="rounded-full bg-[#f2f2f2] px-3 py-1">Guardar</button>
            <MoreVertical className="ml-auto size-4" />
          </div>
          <div className="mt-2 rounded-lg bg-[#f2f2f2] px-3 py-2 text-[9px] leading-4">
            <p>Este video se eliminará inmediatamente después de que termine la transmisión...</p>
            <p>(No actualices ni abandones esta página)</p>
            <button className="font-semibold">...más</button>
          </div>
        </section>

        <section className="mt-2 h-[172px] overflow-hidden rounded-lg border border-[#d1d1d1]" aria-label="Live chat">
          <div className="flex h-7 items-center gap-1 border-b border-[#dedede] px-2 text-[9px] font-semibold"><span className={`size-1.5 rounded-full ${isLive ? 'animate-pulse bg-red-600' : 'bg-gray-400'}`} /> {isLive ? 'LIVE CHAT' : 'CHAT FINALIZADO'}<span className="ml-auto font-normal text-[#666]">{isLive ? 'en vivo' : 'sin conexión'}</span></div>
          <div className="flex flex-col gap-2 px-2 py-2 text-[9px]">
            {chatMessages.map((message, index) => (
              <div key={`${message.name}-${index}`} className="flex items-center gap-2"><span className={`flex size-4 shrink-0 items-center justify-center rounded-full ${message.color} text-[8px] font-bold text-white`}>{message.name.slice(1, 2).toUpperCase()}</span><span><b>{message.name}</b> <span className="text-[#333]">{message.text}</span></span></div>
            ))}
          </div>
          <form onSubmit={(event) => { event.preventDefault(); sendMessage() }} className="mt-auto flex h-9 items-center gap-2 border-t border-[#dedede] px-2">
            <span className="flex size-4 items-center justify-center rounded-full bg-[#ff5a45] text-[8px] text-white">P</span>
            <input value={chatMessage} onChange={(event) => setChatMessage(event.target.value)} placeholder="Di algo..." aria-label="Mensaje del chat" className="min-w-0 flex-1 border-b border-[#c6c6c6] bg-transparent px-1 text-[9px] outline-none" />
            <button type="submit" aria-label="Enviar"><Send className="size-3 text-[#065fd4]" /></button>
          </form>
        </section>
      </div>
    </main>
  )
}
