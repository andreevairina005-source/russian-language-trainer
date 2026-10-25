import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Flame,
  GraduationCap,
  Headphones,
  Keyboard,
  LockKeyhole,
  Menu,
  PanelLeft,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  Target,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const topics = [
  { id: "phonetics", number: "01", title: "Фонетика и графика", status: "current", progress: 72, icon: "◌" },
  { id: "vocabulary", number: "02", title: "Лексика и фразеология", status: "open", progress: 0, icon: "✦" },
  { id: "word", number: "03", title: "Состав слова и словообразование", status: "open", progress: 0, icon: "⌁" },
  { id: "morphology", number: "04", title: "Морфология", status: "locked", progress: 0, icon: "◇" },
  { id: "syntax", number: "05", title: "Синтаксис и пунктуация", status: "locked", progress: 0, icon: "§" },
];

const quiz = [
  {
    question: "В какой паре слова различаются только одним звуком?",
    answers: ["жар — шар", "ток — токовый", "свет — светлый", "мир — мирный"],
    correct: 0,
    hint: "Сравни первые два слова: в одном из них меняется только последний согласный звук.",
  },
  {
    question: "В каком слове букв больше, чем звуков?",
    answers: ["юла", "рысь", "вьюнок", "маяк"],
    correct: 2,
    hint: "Вспомни, что мягкий знак звука не обозначает.",
  },
  {
    question: "Как называется наука, которая изучает звуки речи?",
    answers: ["Лексикология", "Фонетика", "Фразеология", "Графика"],
    correct: 1,
    hint: "Название начинается так же, как слово «фонема».",
  },
];

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#3158d8] text-white shadow-[0_10px_24px_rgba(49,88,216,0.25)]">
        <span className="text-xl font-black tracking-tight">А</span>
      </div>
      <div>
        <div className="text-[15px] font-extrabold tracking-[-0.02em] text-[#17213b]">Слово</div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7c86a3]">тренажёр</div>
      </div>
    </div>
  );
}

function SideNav({ activeTopic, onTopic }: { activeTopic: string; onTopic: (id: string) => void }) {
  return (
    <aside className="hidden w-[276px] shrink-0 border-r border-[#e8ebf3] bg-white px-5 py-7 lg:block">
      <Logo />
      <div className="mt-10 flex items-center gap-3 rounded-2xl bg-[#f3f6ff] p-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#dae4ff] text-[#3158d8]"><GraduationCap size={20} /></div>
        <div className="min-w-0"><p className="truncate text-sm font-bold text-[#17213b]">Русский язык</p><p className="text-xs text-[#7c86a3]">7–8 класс</p></div>
        <ChevronRight size={16} className="ml-auto text-[#8f9abd]" />
      </div>
      <div className="mt-9">
        <div className="mb-3 px-2 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#a1a9be]">Курс</div>
        <nav className="space-y-1.5">
          <button className="flex w-full items-center gap-3 rounded-xl bg-[#edf2ff] px-3 py-3 text-left text-sm font-bold text-[#3158d8]"><PanelLeft size={17} /> Мой маршрут</button>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-[#69738f] transition hover:bg-[#f7f8fc]"><Trophy size={17} /> Мои результаты</button>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-[#69738f] transition hover:bg-[#f7f8fc]"><BookOpen size={17} /> Справочник</button>
        </nav>
      </div>
      <div className="mt-9">
        <div className="mb-3 flex items-center justify-between px-2"><span className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#a1a9be]">Темы</span><span className="text-xs font-bold text-[#a1a9be]">{topics.length}</span></div>
        <div className="space-y-1">
          {topics.map((topic) => {
            const locked = topic.status === "locked";
            return <button key={topic.id} onClick={() => !locked && onTopic(topic.id)} className={cn("group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition", activeTopic === topic.id ? "bg-[#f7f8fc]" : "hover:bg-[#fafbfe]", locked && "cursor-not-allowed opacity-55")}>
              <div className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-black", activeTopic === topic.id ? "bg-[#3158d8] text-white" : "bg-[#f1f3f8] text-[#7c86a3]")}>{locked ? <LockKeyhole size={14} /> : topic.icon}</div>
              <div className="min-w-0 flex-1"><p className={cn("truncate text-[13px] font-bold", activeTopic === topic.id ? "text-[#17213b]" : "text-[#69738f]")}>{topic.title}</p>{topic.progress > 0 && <div className="mt-1.5 flex items-center gap-2"><div className="h-1 flex-1 overflow-hidden rounded-full bg-[#e6e9f2]"><div className="h-full rounded-full bg-[#54c49a]" style={{ width: `${topic.progress}%` }} /></div><span className="text-[10px] font-bold text-[#8d97b0]">{topic.progress}%</span></div>}</div>
              {!locked && activeTopic !== topic.id && <ChevronRight size={15} className="text-[#c1c7d7] opacity-0 transition group-hover:opacity-100" />}
            </button>;
          })}
        </div>
      </div>
      <div className="mt-10 rounded-2xl bg-[#fff8e8] p-4"><div className="flex items-center gap-2 text-[#b4781d]"><Flame size={17} fill="currentColor" /><span className="text-xs font-extrabold">Твоя серия: 3 дня</span></div><p className="mt-2 text-xs leading-5 text-[#977b4e]">Ещё один короткий урок сегодня — и серия продолжится.</p></div>
    </aside>
  );
}

function TopBar({ onMenu }: { onMenu: () => void }) {
  return <header className="flex items-center justify-between border-b border-[#e8ebf3] bg-white px-5 py-4 lg:px-10"><div className="flex items-center gap-4"><button onClick={onMenu} className="rounded-xl p-2 text-[#69738f] hover:bg-[#f4f6fb] lg:hidden"><Menu size={21} /></button><div className="lg:hidden"><Logo /></div><div className="hidden items-center gap-2 text-sm font-semibold text-[#8b94aa] lg:flex"><span>Мой маршрут</span><ChevronRight size={15} /><span className="text-[#17213b]">Фонетика и графика</span></div></div><div className="flex items-center gap-3"><button className="hidden rounded-xl p-2.5 text-[#7f89a3] hover:bg-[#f4f6fb] sm:block"><Search size={19} /></button><button className="relative rounded-xl p-2.5 text-[#7f89a3] hover:bg-[#f4f6fb]"><CircleHelp size={19} /></button><div className="grid h-9 w-9 place-items-center rounded-full bg-[#ffd9b8] text-sm font-black text-[#9b5d2c]">М</div></div></header>;
}

function HeroCard({ onStart }: { onStart: () => void }) {
  return <section className="relative overflow-hidden rounded-[26px] bg-[#17213b] px-6 py-7 text-white shadow-[0_20px_50px_rgba(23,33,59,0.16)] sm:px-8 sm:py-8"><div className="absolute -right-20 -top-28 h-72 w-72 rounded-full border-[35px] border-[#3158d8]/40" /><div className="absolute -bottom-28 right-20 h-48 w-48 rounded-full border-[24px] border-[#54c49a]/30" /><div className="relative max-w-2xl"><div className="mb-4 flex flex-wrap items-center gap-2"><Badge className="border-0 bg-[#3158d8] px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-white">Тема 01</Badge><span className="text-xs font-semibold text-[#aeb9dc]">• 15 минут</span></div><h1 className="max-w-xl text-[30px] font-black leading-[1.08] tracking-[-0.04em] sm:text-[42px]">Фонетика и графика</h1><p className="mt-4 max-w-lg text-[15px] leading-6 text-[#c1c9df]">Научимся слышать звуки речи, отличать их от букв и замечать случаи, когда написание не совпадает с произношением.</p><div className="mt-7 flex flex-wrap items-center gap-3"><Button onClick={onStart} className="h-11 rounded-xl bg-white px-5 font-extrabold text-[#17213b] hover:bg-[#edf2ff]"><Play size={16} fill="currentColor" className="mr-2" /> Продолжить урок</Button><span className="flex items-center gap-2 text-xs font-bold text-[#b7c1de]"><Zap size={15} className="text-[#ffd176]" /> Твой прогресс: 72%</span></div></div></section>;
}

function Lesson({ onQuiz }: { onQuiz: () => void }) {
  return <div id="lesson" className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_290px]"><div className="space-y-6"><Card className="rounded-[22px] border-[#e8ebf3] shadow-[0_8px_30px_rgba(38,52,96,0.04)]"><CardHeader className="border-b border-[#edf0f6] px-6 py-5 sm:px-8"><div className="flex items-start justify-between gap-4"><div><p className="mb-2 text-xs font-extrabold uppercase tracking-[0.13em] text-[#3158d8]">Шаг 1 · Разберёмся</p><CardTitle className="text-2xl font-black tracking-[-0.03em] text-[#17213b]">Что изучает фонетика?</CardTitle></div><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#edf2ff] text-[#3158d8]"><Headphones size={19} /></div></div></CardHeader><CardContent className="px-6 py-6 sm:px-8 sm:py-7"><div className="rounded-2xl border border-[#dfe6ff] bg-[#f5f7ff] p-5 sm:p-6"><div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[#3158d8]"><Sparkles size={14} /> Главное правило</div><p className="text-[18px] font-extrabold leading-8 tracking-[-0.01em] text-[#17213b]">Наука, которая изучает звуки речи, называется фонетикой.</p></div><p className="mt-6 text-[15px] leading-7 text-[#59647f]">Звук мы <b className="text-[#17213b]">слышим и произносим</b>, а букву <b className="text-[#17213b]">видим и пишем</b>. Иногда количество букв и звуков в слове совпадает, а иногда — нет.</p><div className="mt-6 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-[#e8ebf3] bg-white p-4"><div className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[#54a984]"><span className="grid h-6 w-6 place-items-center rounded-lg bg-[#e8faf1]">Б</span> Буква</div><p className="text-sm font-semibold leading-6 text-[#59647f]">Знак, который мы видим и записываем.</p></div><div className="rounded-2xl border border-[#e8ebf3] bg-white p-4"><div className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[#d38a36]"><span className="grid h-6 w-6 place-items-center rounded-lg bg-[#fff5e6]">З</span> Звук</div><p className="text-sm font-semibold leading-6 text-[#59647f]">То, что мы слышим и произносим.</p></div></div></CardContent></Card><Card className="rounded-[22px] border-[#e8ebf3] shadow-[0_8px_30px_rgba(38,52,96,0.04)]"><CardHeader className="px-6 pb-2 pt-6 sm:px-8"><p className="text-xs font-extrabold uppercase tracking-[0.13em] text-[#d38a36]">Шаг 2 · Посмотрим на примере</p><CardTitle className="mt-2 text-xl font-black text-[#17213b]">Слово «рысь»</CardTitle></CardHeader><CardContent className="px-6 pb-7 sm:px-8"><div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center"><div className="rounded-2xl bg-[#f7f8fc] p-4 text-center"><p className="text-xs font-bold text-[#8b94aa]">Буквы</p><p className="mt-1 text-2xl font-black tracking-[0.22em] text-[#17213b]">Р Ы С Ь</p><p className="mt-2 text-xs font-semibold text-[#8b94aa]">4 буквы</p></div><ArrowRight className="mx-auto hidden text-[#b1bad0] sm:block" /><div className="rounded-2xl bg-[#fff8e8] p-4 text-center"><p className="text-xs font-bold text-[#a57e43]">Звуки</p><p className="mt-1 text-2xl font-black tracking-[0.22em] text-[#17213b]">[Р Ы С’]</p><p className="mt-2 text-xs font-semibold text-[#a57e43]">3 звука</p></div></div><div className="mt-4 flex gap-3 rounded-2xl bg-[#f0fbf6] p-4 text-sm leading-6 text-[#477661]"><Check size={18} className="mt-0.5 shrink-0 text-[#54a984]" /><p><b>Почему так?</b> Мягкий знак обозначает мягкость согласного, но отдельного звука не имеет.</p></div></CardContent></Card><div className="flex flex-col items-center justify-between gap-4 rounded-[22px] border border-[#dfe6ff] bg-[#f5f7ff] p-5 sm:flex-row sm:p-6"><div><p className="font-black text-[#17213b]">Готов проверить себя?</p><p className="mt-1 text-sm text-[#69738f]">3 задания · результат появится сразу</p></div><Button onClick={onQuiz} className="h-11 w-full rounded-xl bg-[#3158d8] px-5 font-extrabold text-white hover:bg-[#284bc0] sm:w-auto">Перейти к проверке <ArrowRight size={16} className="ml-2" /></Button></div></div><aside className="space-y-4"><Card className="rounded-[22px] border-[#e8ebf3] shadow-[0_8px_30px_rgba(38,52,96,0.04)]"><CardContent className="p-5"><div className="flex items-center justify-between"><p className="text-sm font-black text-[#17213b]">Маршрут урока</p><span className="text-xs font-bold text-[#8b94aa]">1 из 3</span></div><div className="mt-4"><Progress value={33} className="h-2 bg-[#edf0f6]" /></div><div className="mt-5 space-y-4"><div className="flex items-start gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#3158d8] text-xs font-black text-white">1</span><div><p className="text-sm font-bold text-[#17213b]">Разберёмся</p><p className="mt-0.5 text-xs leading-5 text-[#8b94aa]">Правило и простое объяснение</p></div></div><div className="flex items-start gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#dce1ed] text-xs font-black text-[#8b94aa]">2</span><div><p className="text-sm font-bold text-[#69738f]">Потренируемся</p><p className="mt-0.5 text-xs leading-5 text-[#8b94aa]">Примеры с подсказками</p></div></div><div className="flex items-start gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#dce1ed] text-xs font-black text-[#8b94aa]">3</span><div><p className="text-sm font-bold text-[#69738f]">Проверим себя</p><p className="mt-0.5 text-xs leading-5 text-[#8b94aa]">Мини-тест и оценка</p></div></div></div></CardContent></Card><Card className="rounded-[22px] border-[#e8ebf3] bg-[#fffdf7] shadow-[0_8px_30px_rgba(38,52,96,0.04)]"><CardContent className="p-5"><div className="mb-3 flex items-center gap-2 text-[#b4781d]"><Target size={17} /><p className="text-sm font-black">Цель темы</p></div><p className="text-sm leading-6 text-[#766548]">Научиться различать звук и букву и объяснять, почему их количество может отличаться.</p></CardContent></Card></aside></div>;
}

function Quiz({ onBack }: { onBack: () => void }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const score = useMemo(() => answers.reduce((sum, answer, index) => sum + (answer === quiz[index].correct ? 1 : 0), 0), [answers]);
  const question = quiz[current];
  const choose = (index: number) => { if (selected !== null) return; setSelected(index); setAnswers((old) => [...old, index]); };
  const next = () => { if (selected === null) return; if (current === quiz.length - 1) setFinished(true); else { setCurrent((old) => old + 1); setSelected(null); setShowHint(false); } };
  if (finished) return <div className="mx-auto mt-10 max-w-2xl"><Card className="overflow-hidden rounded-[28px] border-[#e8ebf3] shadow-[0_16px_50px_rgba(38,52,96,0.08)]"><div className="bg-[#17213b] px-6 py-10 text-center text-white sm:px-10"><div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#ffd176] text-[#17213b]"><Trophy size={30} /></div><p className="mt-5 text-sm font-bold uppercase tracking-[0.15em] text-[#b7c1de]">Тема завершена</p><h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">Твой результат: {score} из {quiz.length}</h2></div><CardContent className="p-6 sm:p-8"><div className="grid gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-[#f0fbf6] p-4 text-center"><p className="text-2xl font-black text-[#54a984]">{Math.round((score / quiz.length) * 100)}%</p><p className="mt-1 text-xs font-bold text-[#6f9a86]">точность</p></div><div className="rounded-2xl bg-[#f5f7ff] p-4 text-center"><p className="text-2xl font-black text-[#3158d8]">{score >= 2 ? "4" : "3"}</p><p className="mt-1 text-xs font-bold text-[#7180af]">оценка</p></div><div className="rounded-2xl bg-[#fff8e8] p-4 text-center"><p className="text-2xl font-black text-[#c08632]">+{score * 10}</p><p className="mt-1 text-xs font-bold text-[#aa8a53]">баллов опыта</p></div></div><div className="mt-6 rounded-2xl border border-[#e8ebf3] p-4"><p className="font-black text-[#17213b]">Что дальше?</p><p className="mt-1 text-sm leading-6 text-[#69738f]">Повтори вопросы, в которых ошибся, а затем переходи к следующему блоку — лексике и фразеологии.</p></div><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button onClick={onBack} variant="outline" className="h-11 rounded-xl font-extrabold"><RotateCcw size={16} className="mr-2" /> Повторить тему</Button><Button className="h-11 rounded-xl bg-[#3158d8] font-extrabold hover:bg-[#284bc0]">Следующая тема <ArrowRight size={16} className="ml-2" /></Button></div></CardContent></Card></div>;
  return <div className="mx-auto mt-10 max-w-2xl"><button onClick={onBack} className="mb-5 flex items-center gap-2 text-sm font-bold text-[#69738f] hover:text-[#3158d8]"><ArrowRight size={16} className="rotate-180" /> Вернуться к уроку</button><div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#3158d8]">Проверим себя</p><h2 className="mt-1 text-2xl font-black tracking-[-0.03em] text-[#17213b]">Вопрос {current + 1} из {quiz.length}</h2></div><div className="flex items-center gap-2 text-xs font-bold text-[#8b94aa]"><Clock3 size={15} /> без таймера</div></div><Progress value={((current + 1) / quiz.length) * 100} className="h-2 bg-[#edf0f6]" /><Card className="mt-6 rounded-[24px] border-[#e8ebf3] shadow-[0_12px_40px_rgba(38,52,96,0.06)]"><CardContent className="p-6 sm:p-8"><h3 className="text-xl font-black leading-8 text-[#17213b]">{question.question}</h3><div className="mt-6 space-y-3">{question.answers.map((answer, index) => { const isSelected = selected === index; const isCorrect = index === question.correct; return <button key={answer} onClick={() => choose(index)} className={cn("flex w-full items-center gap-3 rounded-2xl border px-4 py-4 text-left text-sm font-bold transition", selected === null ? "border-[#e8ebf3] text-[#59647f] hover:border-[#b8c6f5] hover:bg-[#f7f8ff]" : isCorrect ? "border-[#8cdbbb] bg-[#f0fbf6] text-[#33785c]" : isSelected ? "border-[#f1a8a8] bg-[#fff4f4] text-[#a94e4e]" : "border-[#e8ebf3] text-[#a0a7b8]")}>{selected !== null && <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-full", isCorrect ? "bg-[#54c49a] text-white" : isSelected ? "bg-[#e77c7c] text-white" : "bg-[#f1f3f8] text-[#a0a7b8]")}>{isCorrect ? <Check size={14} /> : isSelected ? <X size={14} /> : String.fromCharCode(65 + index)}</span>}{selected === null && <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#f1f3f8] text-xs text-[#8b94aa]">{String.fromCharCode(65 + index)}</span>}<span>{answer}</span></button>; })}</div>{selected !== null && <div className={cn("mt-5 rounded-2xl p-4 text-sm leading-6", selected === question.correct ? "bg-[#f0fbf6] text-[#477661]" : "bg-[#fff8e8] text-[#876d40]")}><b>{selected === question.correct ? "Верно!" : "Почти."}</b> {selected === question.correct ? "Отлично замечено." : "Посмотри подсказку и попробуй объяснить себе правильный ход."}</div>}{selected === null && <button onClick={() => setShowHint(!showHint)} className="mt-5 flex items-center gap-2 text-sm font-bold text-[#7c86a3] hover:text-[#3158d8]"><CircleHelp size={16} /> {showHint ? "Скрыть подсказку" : "Нужна подсказка?"}</button>}{showHint && selected === null && <div className="mt-3 rounded-2xl bg-[#f7f8fc] p-4 text-sm leading-6 text-[#69738f]">{question.hint}</div>}<Button onClick={next} disabled={selected === null} className="mt-6 h-11 w-full rounded-xl bg-[#3158d8] font-extrabold hover:bg-[#284bc0]">{current === quiz.length - 1 ? "Завершить тест" : "Следующий вопрос"}<ArrowRight size={16} className="ml-2" /></Button></CardContent></Card></div>;
}

export default function Home() {
  const [activeTopic, setActiveTopic] = useState("phonetics");
  const [showQuiz, setShowQuiz] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const startLesson = () => document.getElementById("lesson")?.scrollIntoView({ behavior: "smooth" });
  return <div className="min-h-screen bg-[#f8f9fc] text-[#17213b]"><div className="flex min-h-screen"><SideNav activeTopic={activeTopic} onTopic={(id) => { setActiveTopic(id); setShowQuiz(false); }} /><div className="min-w-0 flex-1"><TopBar onMenu={() => setMenuOpen(!menuOpen)} />{menuOpen && <div className="border-b border-[#e8ebf3] bg-white px-5 py-4 lg:hidden"><div className="space-y-1">{topics.filter((topic) => topic.status !== "locked").map((topic) => <button key={topic.id} onClick={() => { setActiveTopic(topic.id); setMenuOpen(false); setShowQuiz(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold text-[#69738f] hover:bg-[#f7f8fc]"><span className="grid h-7 w-7 place-items-center rounded-lg bg-[#edf2ff] text-[#3158d8]">{topic.icon}</span>{topic.title}</button>)}</div></div>}<main className="mx-auto max-w-[1180px] px-5 py-8 lg:px-10 lg:py-10"><div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#7c86a3]"><span className="grid h-7 w-7 place-items-center rounded-lg bg-[#e8edff] text-[#3158d8]"><BookOpen size={15} /></span> Самостоятельное обучение</div><h1 className="text-3xl font-black tracking-[-0.04em] text-[#17213b] sm:text-[38px]">Привет,ученик</h1><p className="mt-2 text-sm leading-6 text-[#7c86a3]">Разберём одну тему сегодня? Маленькие шаги дают большой результат.</p></div><div className="flex items-center gap-3"><div className="rounded-2xl border border-[#e8ebf3] bg-white px-4 py-3"><div className="flex items-center gap-2 text-xs font-bold text-[#8b94aa]"><Flame size={15} className="text-[#e7a633]" fill="currentColor" /> Серия</div><p className="mt-1 text-lg font-black text-[#17213b]">3 дня</p></div><div className="rounded-2xl border border-[#e8ebf3] bg-white px-4 py-3"><div className="flex items-center gap-2 text-xs font-bold text-[#8b94aa]"><Zap size={15} className="text-[#3158d8]" /> Опыт</div><p className="mt-1 text-lg font-black text-[#17213b]">240 XP</p></div></div></div>{!showQuiz ? <><HeroCard onStart={startLesson} /><Lesson onQuiz={() => { setShowQuiz(true); window.scrollTo({ top: 0, behavior: "smooth" }); }} /></> : <Quiz onBack={() => setShowQuiz(false)} />}<footer className="mt-12 flex flex-col justify-between gap-3 border-t border-[#e8ebf3] py-6 text-xs font-semibold text-[#9aa2b6] sm:flex-row"><span>Слово · учебный тренажёр</span><span className="flex items-center gap-2"><Keyboard size={14} /> Можно учиться в своём темпе</span></footer></main></div></div></div>;
}
