"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { FadeIn } from "@/components/FadeIn";
import { Counter } from "@/components/Counter";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Lightbox, type GalleryPhoto } from "@/components/Lightbox";

// ─── Gallery Data ─────────────────────────────────────────────────────────────
const GALLERY: GalleryPhoto[] = [
  { src: "/assets/gallery/photo1.jpg", label: "Командный дух", local: true },
  { src: "/assets/gallery/photo2.jpg", label: "Соревнования", local: true },
  { src: "/assets/gallery/photo3.jpg", label: "Наши победы", local: true },
  { src: "/assets/gallery/photo4.jpg", label: "Тренировки", local: true },
  { src: "/assets/gallery/photo5.jpg", label: "Дисциплина", local: true },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/CcDjOMWxptcpjknodyYhc.jpg",
    label: "Разминка",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/M9ixX-AcO5dYPEfMKMUmT.jpg",
    label: "Отработка ударов",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/XxGb9tP7A4BEy-9v7j8K8.jpg",
    label: "Техника",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/p9hfPQTZZXqLnv5Zf-IMT.jpg",
    label: "Концентрация",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/f9LmHFUG9DKkNREjlwXaa.jpg",
    label: "Групповое занятие",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/4atXBsPnhmTjjGBuoOEYd.jpg",
    label: "Мастерство",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/sr9S8swZLUqF4wwJpMT2o.jpg",
    label: "Экзамен",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/s2zIGNYxY-F8haDh0jY2i.jpg",
    label: "Юные спартанцы",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/lo9cLCly9zbAYExUpwalF.jpg",
    label: "Тренировочный процесс",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/j454oWQt4hjK8Dt_Gq-HY.jpg",
    label: "Сила воли",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/2sZ5_7fmNzaIueycMR5az.jpg",
    label: "Подготовка",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/pG4cTV4VooVVjjnC5XwTU.jpg",
    label: "Додзё",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/5avpn-s8Ck38oyvQlu_AH.jpg",
    label: "Растяжка",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/DrIl4a0txfsC4L4-qzsz5.jpg",
    label: "Спарринг",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/8NR1elPTfoz8mdYGP6CP0.jpg",
    label: "Наставник",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/t-0eryfWF_ZyZVCPNYzqE.jpg",
    label: "Выносливость",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/hin0MZJPhgwACH1I1n_Db.jpg",
    label: "Дыхание",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/30vThv-GSX8CV9AFBL3E_.jpg",
    label: "Точный удар",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/9SAy9WWsukrDat7lr-AFk.jpg",
    label: "Командная работа",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/eQozOt2KGAhGpJ3IeoAdZ.jpg",
    label: "Уверенность",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/Yp9cqO9Ua5SngSCDNg_h5.jpg",
    label: "Результат",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/T3aPeoLK1RczGh4fDvPni.jpg",
    label: "Энергия",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/3kg8s16Y2sTbBb6B6qxVr.jpg",
    label: "Развитие",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/yLRmjksmGkwrKrT1EzyKK.jpg",
    label: "Победа над собой",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/mIrmx3TBsCXoRNwzukFGO.jpg",
    label: "Стремление",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/gJSUY0VwmEowj4tp08Kgl.jpg",
    label: "Успех",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/JAFOzA5NqUPDZ_dtwF659.jpg",
    label: "Спортивный дух",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/gS1OYPJSpnpXWvEV0Atla.jpg",
    label: "Внимание",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/q4h7_OMsE22dHbWaK1ORd.jpg",
    label: "Равновесие",
    local: false,
  },
  {
    src: "https://storage.vigbo.tech/p/s768/gallery-photo/f11f9b1f-f669-4c80-9d23-ae89b296eacb/28e53a6d-65df-4b35-9a02-9f4c3e300ed1/original/b-x3dpZFfMewMCe9FKSdN.jpg",
    label: "Сила",
    local: false,
  },
];

function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-10 animate-hero">
        <div className="text-6xl mb-6">✅</div>
        <h4 className="text-2xl font-black mb-4 uppercase">ЗАЯВКА ПРИНЯТА!</h4>
        <p className="text-foreground/70 mb-8">
          Спасибо! Мы свяжемся с вами в ближайшее время для уточнения деталей.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-accent font-bold uppercase tracking-widest text-sm hover:underline"
        >
          Отправить еще одну
        </button>
      </div>
    );
  }

  return (
    <>
      <h4 className="text-2xl font-black mb-8 uppercase tracking-tight">Запись на пробное занятие</h4>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Ваше имя</label>
            <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent/50 transition-colors" placeholder="Иван Иванов" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Ваш телефон</label>
            <input type="tel" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent/50 transition-colors" placeholder="+7 (___) ___-__-__" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Имя ребенка</label>
            <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent/50 transition-colors" placeholder="Александр" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Возраст ребенка</label>
            <input type="number" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent/50 transition-colors" placeholder="7" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Выберите филиал</label>
          <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent/50 transition-colors appearance-none">
            <option className="bg-zinc-900">ТЦ Азия Сити</option>
            <option className="bg-zinc-900">Байынкол переулок, 9</option>
            <option className="bg-zinc-900">Азильхан Нуршаихов, 10/1</option>
            <option className="bg-zinc-900">ЖК Хайвил Астана</option>
            <option className="bg-zinc-900">Space School (Туран)</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={isSending}
          className={`w-full py-5 bg-accent hover:bg-accent-muted text-white font-black rounded-2xl transition-all transform hover:scale-[1.02] shadow-[0_10px_30px_rgba(230,25,25,0.3)] uppercase tracking-widest mt-4 flex items-center justify-center gap-3 ${isSending ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isSending ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ОТПРАВЛЯЕМ...
            </>
          ) : (
            "ОТПРАВИТЬ ЗАЯВКУ"
          )}
        </button>
      </form>
    </>
  );
}

export default function Home() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => setLightboxIdx(i), []);
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prevPhoto = useCallback(() =>
    setLightboxIdx((i) => (i !== null ? (i - 1 + GALLERY.length) % GALLERY.length : null)),
    []
  );
  const nextPhoto = useCallback(() =>
    setLightboxIdx((i) => (i !== null ? (i + 1) % GALLERY.length : null)),
    []
  );

  return (
    <main className="min-h-screen font-sans">
      {lightboxIdx !== null && (
        <Lightbox
          photos={GALLERY}
          index={lightboxIdx}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
      <Header />
      <WhatsAppButton />


      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/sparta-group.jpg"
            alt="Sparta Taekwondo Team"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-hero">
          <div className="inline-block px-4 py-1 mb-6 border border-accent/30 rounded-full bg-accent/10 backdrop-blur-sm">
            <span className="text-accent text-sm font-bold tracking-widest uppercase">
              Астана • Таэквондо GTF
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight">
            СТАНЬ ЧАСТЬЮ <br />
            <span className="text-gradient">КОМАНДЫ SPARTA</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Sparta — это не просто команда, это стиль жизни. Мы воспитываем характер,
            силу воли и лидерские качества через искусство таэквондо.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#apply-form"
              className="px-8 py-4 bg-accent hover:bg-accent-muted text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(230,25,25,0.4)]"
            >
              ЗАПИСАТЬСЯ НА ПРОБНОЕ
            </a>
            <a
              href="#schedule"
              className="px-8 py-4 glass hover:bg-white/10 text-white rounded-full font-bold transition-all"
            >
              РАСПИСАНИЕ ЗАЛОВ
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-1 h-12 rounded-full bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 bg-background relative overflow-hidden text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeIn className="relative group">
            <div className="absolute -inset-4 bg-accent/20 rounded-2xl blur-2xl group-hover:bg-accent/30 transition-all duration-500" />
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/assets/trainer-ruslan.jpg"
                alt="Алмашев Руслан Мырзабаевич"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <h2 className="text-accent font-bold mb-4 tracking-widest underline decoration-2 underline-offset-8">
              ГЛАВНЫЙ ТРЕНЕР
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight uppercase tracking-tight">
              АЛМАШЕВ РУСЛАН МЫРЗАБАЕВИЧ
            </h3>
            <div className="space-y-6 text-foreground/80 text-lg leading-relaxed">
              <p>
                <span className="text-white font-bold">Черный пояс 4 Дан</span> – сертифицированный тренер по таэквондо GTF с более чем
                <span className="text-accent font-bold"> 15-летним стажем</span>.
              </p>
              <p>
                Вице-президент Федерации таэквондо GTF г. Астаны и главный судья крупных городских и республиканских турниров.
              </p>
              <p>
                За годы практики Руслан воспитал десятки спортсменов, среди которых Кандидаты в мастера спорта и Мастера спорта.
                Его ученики — победители и призёры международных соревнований.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-6">
                <Counter end={15} suffix="+" label="Лет стажа" />
                <Counter end={400} suffix="+" label="Учеников" />
                <Counter end={25} suffix="+" label="КМС и МС" />
                <Counter end={100} suffix="+" label="Медалей" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-24 px-4 bg-zinc-900/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-accent font-bold mb-4 tracking-widest text-sm uppercase">ДОСТИЖЕНИЯ</h2>
            <h3 className="text-3xl md:text-5xl font-black mb-6 uppercase">ПОЧЕМУ ВЫБИРАЮТ НАС</h3>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "ФЕДЕРАЛЬНЫЙ СТАТУС", desc: "Мы являемся официальным представителем Федерации таэквондо GTF г. Астаны.", icon: "🏛️" },
              { title: "ЧЕМПИОНСКИЙ СОСТАВ", desc: "Среди наших учеников — чемпионы страны и международных турниров.", icon: "🥇" },
              { title: "ПСИХОЛОГИЯ ПОБЕДЫ", desc: "Воспитываем не только тело, но и дух, уверенность и самодисциплину.", icon: "🧠" },
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 100} className="glass p-8 rounded-[32px] border border-white/5 hover:border-accent/40 transition-colors">
                <div className="text-4xl mb-6">{item.icon}</div>
                <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                <p className="text-foreground/60 text-sm leading-relaxed">{item.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-accent font-bold mb-4 tracking-widest">ПРОГРАММЫ</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-6">ДЛЯ ЛЮБОГО ВОЗРАСТА</h3>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Мы предлагаем специализированные методики обучения, адаптированные под уровень подготовки и возраст спортсмена.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "ДЕТСКАЯ ГРУППА", age: "4-7 лет", desc: "Развитие координации, гибкости и основ дисциплины в игровой форме.", icon: "🥋" },
              { title: "ПОДРОСТКОВАЯ ГРУППА", age: "8-16 лет", desc: "Углубленное изучение техники, подготовка к соревнованиям и аттестациям на пояса.", icon: "🔥" },
              { title: "ИНДИВИДУАЛЬНО", age: "Любой возраст", desc: "Персональный график и программа для максимально быстрого прогресса.", icon: "🏆" },
            ].map((program, idx) => (
              <FadeIn key={idx} delay={idx * 150}>
                <div className="glass p-10 rounded-3xl hover:border-accent/40 transition-all group h-full flex flex-col">
                  <div className="text-5xl mb-6">{program.icon}</div>
                  <h4 className="text-2xl font-black mb-2">{program.title}</h4>
                  <div className="text-accent text-sm font-bold mb-4 uppercase tracking-wider">{program.age}</div>
                  <p className="text-foreground/70 mb-8 flex-1">{program.desc}</p>
                  <a href="#apply-form" className="text-white font-bold inline-flex items-center gap-2 group-hover:text-accent transition-colors">
                    ПОДРОБНЕЕ <span>→</span>
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-24 px-4 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-accent font-bold mb-4 tracking-widest">ФИЛИАЛЫ</h2>
              <h3 className="text-4xl md:text-5xl font-black">РАСПИСАНИЕ В АСТАНЕ</h3>
            </div>
            <p className="text-foreground/50 max-w-sm">
              Выберите удобный для вас зал и время тренировок. Мы находимся в самых доступных точках города.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              {[
                { name: "ТЦ Азия Сити", addr: "г. Астана, ул. Абылай хана, 27/3", time: ["Вт, Чт: 19:30 - 21:00", "Сб: 10:00 - 11:30"] },
                { name: "Байынкол переулок, 9", addr: "г. Астана, пер. Байынкол, 9", time: ["Пн, Ср, Пт: 19:00 - 20:30"] },
              ].map((hall, idx) => (
                <FadeIn key={idx} delay={idx * 150}>
                  <div className="glass p-8 rounded-2xl border-l-4 border-l-accent">
                    <h4 className="text-xl font-black mb-2">{hall.name}</h4>
                    <p className="text-foreground/50 text-sm mb-4">{hall.addr}</p>
                    <ul className="space-y-1">
                      {hall.time.map((t, i) => <li key={i} className="text-foreground/80 font-medium">🕒 {t}</li>)}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="space-y-8">
              {[
                { name: "Ул. Азильхан Нуршаихов, 10/1", addr: "г. Астана, ул. Азильхан Нуршаихов, 10/1", time: ["Вт, Чт, Сб: 10:00 - 11:30", "Пн, Ср, Пт: 16:00 - 17:30"] },
                { name: "ЖК Хайвил Астана (Easy Study)", addr: "ул. Ахмет Байтурсынулы, 1, блок А", time: ["Вт, Чт: 18:00 - 19:00", "Сб: 12:45 - 13:45"] },
              ].map((hall, idx) => (
                <FadeIn key={idx} delay={idx * 150}>
                  <div className="glass p-8 rounded-2xl border-l-4 border-l-white/20">
                    <h4 className="text-xl font-black mb-2">{hall.name}</h4>
                    <p className="text-foreground/50 text-sm mb-4">{hall.addr}</p>
                    <ul className="space-y-1">
                      {hall.time.map((t, i) => <li key={i} className="text-foreground/80 font-medium">🕒 {t}</li>)}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-accent font-bold mb-4 tracking-widest">ГАЛЕРЕЯ</h2>
              <h3 className="text-4xl md:text-5xl font-black">ЖИЗНЬ В СПАРТЕ</h3>
            </div>
            <a
              href="https://6379c9c8481222-76340701.gallery.photo/gallery/sparta/"
              target="_blank"
              className="hidden md:block px-6 py-3 glass hover:bg-white/10 rounded-full text-sm font-bold transition-all"
            >
              СМОТРЕТЬ ВСЕ ФОТО
            </a>
          </FadeIn>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[220px] md:auto-rows-[260px]">
            {GALLERY.map((photo, idx) => (
              <FadeIn
                key={idx}
                delay={idx * 60}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group ${idx === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                onClick={() => openLightbox(idx)}
              >
                {photo.local ? (
                  <Image
                    src={photo.src}
                    alt={photo.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photo.src}
                    alt={photo.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-end p-5">
                  <p className="font-bold text-sm uppercase tracking-widest text-white translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    {photo.label}
                  </p>
                  <p className="text-white/50 text-xs mt-1 translate-y-3 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    Нажмите для просмотра
                  </p>
                </div>
                {/* Accent border on hover */}
                <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/40 rounded-2xl transition-all duration-300 pointer-events-none" />
              </FadeIn>
            ))}
          </div>

          <div className="mt-8 md:hidden text-center">
            <a
              href="https://6379c9c8481222-76340701.gallery.photo/gallery/sparta/"
              target="_blank"
              className="inline-block px-8 py-4 glass hover:bg-white/10 rounded-full text-sm font-bold transition-all"
            >
              СМОТРЕТЬ ВСЮ ГАЛЕРЕЮ
            </a>
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section className="py-24 px-4 bg-zinc-900/40 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="text-accent font-bold mb-4 tracking-widest text-sm uppercase">ОТЗЫВЫ</h2>
            <h3 className="text-3xl md:text-4xl font-black uppercase">МНЕНИЯ НАШИХ УЧЕНИКОВ</h3>
          </FadeIn>

          <div className="relative">
            <TestimonialsCarousel />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 blur-[150px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <FadeIn>
            <h2 className="text-accent font-bold mb-4 tracking-widest">КОНТАКТЫ</h2>
            <h3 className="text-5xl md:text-6xl font-black mb-8 leading-tight">НУЖНА КОНСУЛЬТАЦИЯ?</h3>
            <p className="text-foreground/70 text-lg mb-12">
              Оставьте свои данные, и мы свяжемся с вами, чтобы подобрать удобную группу и ответить на все вопросы о пробном занятии.
            </p>
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 glass flex items-center justify-center rounded-xl text-accent text-xl">📍</div>
                <div>
                  <h4 className="font-bold mb-1">АДРЕСА</h4>
                  <p className="text-foreground/60 text-sm">ТЦ Азия Сити, ЖК Хайвил, Байынкол 9 и др. (г. Астана)</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 glass flex items-center justify-center rounded-xl text-accent text-xl">📞</div>
                <div>
                  <h4 className="font-bold mb-1">ТЕЛЕФОН</h4>
                  <p className="text-foreground/60 text-sm">+7 (706) 656-29-88</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 glass flex items-center justify-center rounded-xl text-accent text-xl">📱</div>
                <div>
                  <h4 className="font-bold mb-1">СОЦСЕТИ</h4>
                  <div className="flex gap-4 mt-2">
                    <a href="https://www.instagram.com/taekwondo_gtf_sparta/" target="_blank" className="text-white hover:text-accent font-bold text-xs uppercase tracking-widest">Instagram</a>
                    <a href="https://wa.me/77066562988" target="_blank" className="text-white hover:text-accent font-bold text-xs uppercase tracking-widest">WhatsApp</a>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200} id="apply-form" className="glass p-10 md:p-12 rounded-[40px] border border-white/10 relative">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent rotate-12 flex items-center justify-center rounded-2xl shadow-xl">
              <span className="text-white font-black text-2xl">FREE</span>
            </div>
            <ContactForm />
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4 bg-background border-t border-white/5 overflow-hidden relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
            <div className="text-center md:text-left flex flex-col items-center md:items-start">
              <div className="relative w-24 h-24 mb-4">
                <Image src="/assets/logo.jpg" alt="Sparta Logo" fill className="object-contain opacity-80" />
              </div>
              <h4 className="text-3xl font-black tracking-tighter mb-4 italic">
                SPARTA <span className="text-accent underline decoration-white/20">TEAM</span>
              </h4>
              <p className="text-foreground/40 max-w-xs text-sm leading-relaxed">
                Школа таэквондо Руслана Алмашева в Астане. Мы воспитываем чемпионов с 2010 года.
              </p>
            </div>

            <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 font-bold text-xs uppercase tracking-[0.2em] text-foreground/60">
              <a href="#" className="hover:text-accent transition-colors">Главная</a>
              <a href="#about" className="hover:text-accent transition-colors">О тренере</a>
              <a href="#programs" className="hover:text-accent transition-colors">Программы</a>
              <a href="#schedule" className="hover:text-accent transition-colors">Расписание</a>
              <a href="#gallery" className="hover:text-accent transition-colors">Галерея</a>
            </nav>

            <div className="flex gap-6 items-center">
              <a href="https://www.instagram.com/taekwondo_gtf_sparta/" target="_blank" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all">
                <span className="text-xs">IG</span>
              </a>
              <a href="https://wa.me/77066562988" target="_blank" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all">
                <span className="text-xs">WA</span>
              </a>
              <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all">
                <span className="text-xs">TG</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-white/5 opacity-30 text-[10px] font-bold uppercase tracking-[0.3em]">
            <p>© 2026 SPARTA TAEKWONDO. ALL RIGHTS RESERVED.</p>
            <p>DESIGN &amp; DEV BY ANTIGRAVITY AI</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
