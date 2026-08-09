import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

import { saveContact } from "@/lib/contact.functions";
import heroBar from "@/assets/hero-bar.jpg";
import barPeanut from "@/assets/bar-peanut.jpg";
import barBrownie from "@/assets/bar-brownie.jpg";
import barCaramel from "@/assets/bar-caramel.jpg";
import ingredients from "@/assets/ingredients.jpg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Good Bar. — Protein Bars That Don't Taste Like Protein Bars" },
      {
        name: "description",
        content:
          "20g+ protein, real ingredients, no weird stuff. Three bars: Chocolate Peanut Crunch, Double Chocolate Brownie, Salted Caramel Almond.",
      },
      { property: "og:title", content: "Good Bar. — Protein, Actually Good" },
      {
        property: "og:description",
        content: "20g+ protein. Real ingredients. Zero sad desk snacks.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const ANNOUNCEMENTS = [
  "⚡ 25G PROTEIN. ACTUALLY GOOD.",
  "FREE SHIPPING ON ORDERS ABOVE ₹999",
  "NEW: CHOCOLATE PEANUT CRUNCH",
  "JOIN THE CLUB → GET 10% OFF",
];

const PRODUCTS = [
  {
    name: "Chocolate Peanut Crunch",
    protein: "20G PROTEIN",
    copy: "Chocolate + roasted peanuts + crunchy goodness.",
    image: barPeanut,
    tone: "bg-mango",
  },
  {
    name: "Double Chocolate Brownie",
    protein: "20G PROTEIN",
    copy: "Basically a brownie that decided to get its protein intake together.",
    image: barBrownie,
    tone: "bg-pink",
  },
  {
    name: "Salted Caramel Almond",
    protein: "18G PROTEIN",
    copy: "Sweet. Salty. Crunchy. Gone suspiciously quickly.",
    image: barCaramel,
    tone: "bg-purple",
  },
];

const MOMENTS = [
  { time: "9:47 AM", line: "You haven't had breakfast." },
  { time: "4:18 PM", line: "Your meeting could have been an email." },
  { time: "8:32 PM", line: "Gym done. Protein pending." },
];

const REVIEWS = [
  {
    quote: "Finally a protein bar I don't have to force myself to finish.",
    name: "Aarav",
    tone: "bg-lime",
  },
  { quote: "The chocolate one is dangerously good.", name: "Riya", tone: "bg-sky" },
  {
    quote: "20g protein and it actually tastes like dessert.",
    name: "Karan",
    tone: "bg-mango",
  },
];

const EDU = [
  {
    n: "01",
    title: "Protein Sources",
    body: "Whey and plant protein blended so the texture stays chewy, not chalky.",
  },
  {
    n: "02",
    title: "Real Ingredients",
    body: "Nuts, cocoa, dates, sea salt. Things that grow, not things invented in 1974.",
  },
  {
    n: "03",
    title: "No Shortcuts",
    body: "No sugar alcohols, no palm oil, no mystery powder doing the heavy lifting.",
  },
];

const shell = "mx-auto w-full max-w-[1280px] px-5 md:px-8";

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [openEdu, setOpenEdu] = useState<string | null>("01");

  return (
    <div className="min-h-screen bg-cream text-ink">
      {/* 01 — Announcement */}
      <div className="overflow-hidden bg-ink py-2 text-cream">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {ANNOUNCEMENTS.map((a) => (
                <span
                  key={a + dup}
                  className="px-6 text-[12px] font-semibold tracking-[0.18em] whitespace-nowrap"
                >
                  {a}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 02 — Navigation */}
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/95 backdrop-blur">
        <nav className={`${shell} flex h-16 items-center justify-between gap-8`}>
          <a href="#top" className="display text-2xl">
            Good Bar.
          </a>
          <ul className="hidden items-center gap-8 text-sm font-medium md:flex">
            {[
              ["Shop", "#shop"],
              ["Why Good?", "#why"],
              ["Ingredients", "#ingredients"],
              ["Reviews", "#reviews"],
            ].map(([label, href]) => (
              <li key={label}>
                <a href={href} className="transition-colors hover:text-green">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden items-center gap-6 text-sm font-medium md:flex">
            <span className="cursor-pointer hover:text-green">Search</span>
            <span className="cursor-pointer hover:text-green">Account</span>
            <span className="rounded-full bg-ink px-4 py-1.5 text-cream">Cart (0)</span>
          </div>
          <button
            aria-label="Open menu"
            className="text-2xl md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
          >
            ☰
          </button>
        </nav>
        {menuOpen && (
          <div className="border-t border-ink/10 bg-cream px-5 py-4 md:hidden">
            {["Shop", "Why Good?", "Ingredients", "Reviews", "Cart"].map((l) => (
              <a
                key={l}
                href="#shop"
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-lg font-medium"
              >
                {l}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* 03 — Hero */}
      <section id="top" className="bg-lime">
        <div
          className={`${shell} grid items-center gap-10 py-16 md:grid-cols-2 md:py-24`}
        >
          <div>
            <h1 className="display text-green-deep text-[clamp(3rem,9vw,7rem)]">
              Protein
              <br />
              that doesn&apos;t
              <br />
              taste like protein.
            </h1>
            <p className="mt-6 max-w-md text-lg font-medium text-green-deep md:text-xl">
              20G+ protein. Real ingredients. Zero sad desk snacks.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#shop"
                className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold tracking-widest text-cream transition-transform hover:-translate-y-0.5"
              >
                SHOP THE BARS →
              </a>
              <a
                href="#why"
                className="rounded-full border-2 border-green-deep px-7 py-3 text-sm font-semibold tracking-widest text-green-deep transition-colors hover:bg-green-deep hover:text-cream"
              >
                WHY THEY&apos;RE GOOD ↓
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroBar}
              alt="Good Bar chocolate peanut protein bar with floating peanuts and chocolate chunks"
              width={1200}
              height={1200}
              className="w-full -rotate-6 rounded-[2rem] shadow-[0_30px_60px_-20px_rgba(17,17,17,0.45)]"
            />
            <span className="hand absolute -bottom-2 left-2 -rotate-6 rounded-full bg-cream px-4 py-1 text-xl text-ink md:text-2xl">
              yes, that&apos;s real chocolate
            </span>
          </div>
        </div>
      </section>

      {/* 04 — Value props */}
      <section className={`${shell} py-16 md:py-24`}>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            ["20G+", "Protein"],
            ["Real", "Ingredients"],
            ["No", "Weird Stuff"],
          ].map(([a, b]) => (
            <div key={b} className="border-t-4 border-ink pt-5">
              <p className="display text-[clamp(2.5rem,6vw,4.5rem)]">{a}</p>
              <p className="display text-[clamp(1.5rem,3vw,2.25rem)] text-green">{b}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-xl text-muted-foreground">
          Built for people who want more protein without turning every snack into a
          science experiment.
        </p>
      </section>

      {/* 05 — Products */}
      <section id="shop" className="bg-white py-16 md:py-24">
        <div className={shell}>
          <h2 className="display text-[clamp(2.5rem,7vw,5rem)]">Meet your new snack</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => (
              <article
                key={p.name}
                className="group flex flex-col overflow-hidden rounded-3xl border-2 border-ink bg-cream transition-transform hover:-translate-y-1.5"
              >
                <div className={`${p.tone} p-6`}>
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={900}
                    height={900}
                    className="w-full rounded-2xl"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 border-t-2 border-ink p-6">
                  <span className="w-fit rounded-full bg-ink px-3 py-1 text-[11px] font-semibold tracking-[0.15em] text-cream">
                    {p.protein}
                  </span>
                  <h3 className="text-2xl font-bold leading-tight">{p.name}</h3>
                  <p className="text-muted-foreground">{p.copy}</p>
                  <button className="mt-auto w-full rounded-full bg-green px-6 py-3 text-sm font-semibold tracking-widest text-cream transition-colors hover:bg-green-deep">
                    ADD TO BAG →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — Why Good */}
      <section id="why" className="bg-green py-20 text-cream md:py-28">
        <div className={shell}>
          <h2 className="display text-[clamp(2.5rem,7vw,5.5rem)]">
            A protein bar
            <br />
            without the
            <br />
            protein bar energy.
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              ["Real Food", "Ingredients you can actually recognize."],
              ["Serious Protein", "18–20G+ protein per bar."],
              ["Actually Delicious", "Because \u201chealthy\u201d isn't a flavour."],
            ].map(([t, b]) => (
              <div
                key={t}
                className="rounded-3xl border border-cream/25 bg-cream/5 p-8 backdrop-blur"
              >
                <h3 className="display text-3xl text-lime">{t}</h3>
                <p className="mt-3 text-lg text-cream/85">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — Ingredient story */}
      <section id="ingredients" className={`${shell} py-20 md:py-28`}>
        <div className="grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <img
              src={ingredients}
              alt="Peanuts, almonds, cocoa nibs, dates and sea salt on a cream surface"
              loading="lazy"
              width={1200}
              height={1000}
              className="w-full rounded-3xl border-2 border-ink object-cover"
            />
          </div>
          <div className="md:col-span-7">
            <h2 className="display text-[clamp(2.5rem,6.5vw,4.5rem)]">
              Read the
              <br />
              ingredients.
              <br />
              We dare you.
            </h2>
            <ul className="mt-8 max-w-md divide-y divide-ink/15 border-y border-ink/15 text-lg font-medium">
              {[
                ["Peanuts", true],
                ["Cocoa", true],
                ["Almonds", true],
                ["Protein", true],
                ["Mystery powder", false],
              ].map(([label, ok]) => (
                <li
                  key={label as string}
                  className="flex items-center justify-between py-3"
                >
                  <span className={ok ? "" : "text-muted-foreground line-through"}>
                    {label as string}
                  </span>
                  <span className={ok ? "text-green" : "text-pink"}>{ok ? "✓" : "✕"}</span>
                </li>
              ))}
            </ul>
            <p className="hand mt-4 text-2xl text-green">that&apos;s literally it.</p>
            <a
              href="#shop"
              className="mt-8 inline-block rounded-full border-2 border-ink px-7 py-3 text-sm font-semibold tracking-widest transition-colors hover:bg-ink hover:text-cream"
            >
              SEE ALL INGREDIENTS →
            </a>
          </div>
        </div>
      </section>

      {/* 08 — Moments */}
      <section className="bg-white py-20 md:py-28">
        <div className={shell}>
          <h2 className="display text-[clamp(2rem,5vw,3.5rem)]">
            For the moments when...
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {MOMENTS.map((m) => (
              <div key={m.time} className="rounded-3xl bg-cream p-8">
                <p className="display text-5xl text-purple">{m.time}</p>
                <p className="mt-4 text-lg text-muted-foreground">{m.line}</p>
                <p className="display mt-8 text-2xl">Good Bar.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 09 — Reviews */}
      <section id="reviews" className={`${shell} py-20 md:py-28`}>
        <h2 className="display text-[clamp(2.5rem,8vw,6rem)]">
          People
          <br />
          seem to
          <br />
          really
          <br />
          like these.
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className={`${r.tone} flex flex-col justify-between rounded-3xl border-2 border-ink p-8 text-ink`}
            >
              <blockquote className="text-2xl font-bold leading-snug">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8">
                <div className="text-lg">★★★★★</div>
                <div className="mt-1 text-sm font-semibold tracking-widest">
                  — {r.name.toUpperCase()}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 10 — Education */}
      <section className="bg-ink py-20 text-cream md:py-28">
        <div className={shell}>
          <h2 className="display text-[clamp(2.5rem,7vw,5rem)]">
            Wait.
            <br />
            How do you
            <br />
            get 20g in here?
          </h2>
          <div className="mt-12 divide-y divide-cream/20 border-y border-cream/20">
            {EDU.map((e) => (
              <button
                key={e.n}
                onClick={() => setOpenEdu(openEdu === e.n ? null : e.n)}
                className="flex w-full flex-col items-start gap-2 py-6 text-left"
              >
                <div className="flex w-full items-center gap-6">
                  <span className="display text-2xl text-lime">{e.n}</span>
                  <span className="display flex-1 text-2xl md:text-3xl">{e.title}</span>
                  <span className="text-2xl">{openEdu === e.n ? "−" : "+"}</span>
                </div>
                {openEdu === e.n && (
                  <p className="max-w-2xl pl-12 text-lg text-cream/80">{e.body}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 11 — Email capture */}
      <section className="bg-lime py-20 text-green-deep md:py-28">
        <div className={`${shell} grid gap-12 md:grid-cols-2`}>
          <div>
            <h2 className="display text-[clamp(2.5rem,7vw,5rem)]">
              Want the
              <br />
              good stuff
              <br />
              first?
            </h2>
            <p className="mt-6 max-w-md text-xl font-medium">
              Get first dibs on new flavours, secret drops and occasional discounts.
            </p>
          </div>
          <div className="self-center">
            {signedUp ? (
              <div className="rounded-3xl border-2 border-green-deep bg-cream p-10 text-center">
                <p className="display text-4xl">You&apos;re in. ✦</p>
                <p className="mt-3 text-lg">
                  We&apos;ll let you know when the good stuff drops.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSignedUp(true);
                }}
                className="space-y-4"
              >
                <input
                  required
                  placeholder="Your name"
                  className="w-full rounded-full border-2 border-green-deep bg-cream px-6 py-4 text-base outline-none placeholder:text-muted-foreground"
                />
                <input
                  required
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-full border-2 border-green-deep bg-cream px-6 py-4 text-base outline-none placeholder:text-muted-foreground"
                />
                <button className="w-full rounded-full bg-ink px-8 py-4 text-sm font-semibold tracking-widest text-cream transition-transform hover:-translate-y-0.5">
                  GET THE GOOD STUFF →
                </button>
                <p className="text-sm">
                  By signing up, you agree to receive offers and product updates. No spam.
                  Promise-ish.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 12 — Final CTA */}
      <section className="relative overflow-hidden bg-green-deep py-24 text-center text-cream md:py-32">
        <img
          src={barPeanut}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute -left-10 top-10 hidden w-48 -rotate-12 rounded-2xl opacity-90 md:block"
        />
        <img
          src={barCaramel}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute -right-8 top-24 hidden w-48 rotate-12 rounded-2xl opacity-90 md:block"
        />
        <img
          src={barBrownie}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute bottom-0 left-1/2 hidden w-40 -translate-x-1/2 translate-y-1/3 rotate-6 rounded-2xl opacity-90 md:block"
        />
        <div className={`${shell} relative`}>
          <h2 className="display text-[clamp(3rem,10vw,7.5rem)]">
            Your snack
            <br />
            called.
          </h2>
          <p className="mt-6 text-xl text-cream/85">It wants 20g of protein.</p>
          <a
            href="#shop"
            className="mt-10 inline-block rounded-full bg-lime px-9 py-4 text-sm font-semibold tracking-widest text-green-deep transition-transform hover:-translate-y-0.5"
          >
            SHOP ALL BARS →
          </a>
        </div>
      </section>

      {/* 13 — Footer */}
      <footer className="bg-cream py-16">
        <div className={`${shell} grid gap-10 md:grid-cols-4`}>
          <div>
            <p className="display text-3xl">Good Bar.</p>
            <p className="mt-3 max-w-[16rem] text-muted-foreground">
              Protein bars for people who actually like food.
            </p>
          </div>
          {[
            ["Shop", ["All Bars", "Chocolate Peanut", "Double Chocolate", "Salted Caramel"]],
            ["Learn", ["Our Ingredients", "Our Story", "FAQ"]],
            ["Follow", ["Instagram", "YouTube"]],
          ].map(([title, items]) => (
            <div key={title as string}>
              <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground">
                {(title as string).toUpperCase()}
              </p>
              <ul className="mt-4 space-y-2">
                {(items as string[]).map((i) => (
                  <li key={i}>
                    <a href="#shop" className="font-medium hover:text-green">
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={`${shell} mt-12 border-t border-ink/10 pt-6 text-sm text-muted-foreground`}>
          © 2026 Good Bar.
        </div>
      </footer>
    </div>
  );
}
