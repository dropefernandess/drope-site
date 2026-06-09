import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

const meta = [
  { label: "O QUE SOU", value: "Diretor de Arte" },
  { label: "ONDE ESTOU", value: "MG, Brasil" },
  { label: "DESDE QUANDO", value: "2018" },
  { label: "POR QUE", value: "Paixão por design" },
];

const tracks = [
  { id: "74ZZCnIZETJKxU4poj7vtB", title: "Track 1" },
  { id: "0qsKefQyXCzaxjHbOcd8IU", title: "Track 2" },
  { id: "31X6ihiAWsNnKRky0R8532", title: "Track 3" },
];

const skills = [
  "Figma", "Adobe Suite", "Webflow", "Framer", "React", "Next.js",
  "After Effects", "Cinema 4D", "Lottie", "Spline", "Notion", "Tailwind",
];

export function Feed() {
  return (
    <section id="feed" className="bg-bg section-padding">
      <Container className="flex flex-col gap-10">
        {/* Header */}
        <header className="flex flex-col gap-3">
          <p className="label-mono">FEED</p>
          <h2 className="text-h-1">Um pouco de mim</h2>
          <p className="text-body max-w-prose">
            Bio, projetos recentes, o que estou ouvindo — e as ferramentas que
            uso todo dia.
          </p>
        </header>

        {/* Row 1 — 50/50 */}
        <div className="grid gap-3 lg:grid-cols-2">
          {/* Bio + meta */}
          <Card tone="subtle" className="gap-8">
            <div className="flex flex-col gap-3">
              <p className="label-mono">SOBRE</p>
              <p className="text-body">
                Designer multidisciplinar atuando entre identidade visual, UI,
                motion e código. Trabalho com startups, marcas pessoais e
                empresas que precisam tirar ideias do papel sem perder o que
                faz cada uma única.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6">
              {meta.map((m) => (
                <div key={m.label} className="flex flex-col gap-1.5">
                  <dt className="label-mono">{m.label}</dt>
                  <dd className="font-semibold">{m.value}</dd>
                </div>
              ))}
            </dl>
          </Card>

          {/* Spotify */}
          <Card tone="subtle" className="gap-5">
            <div className="flex flex-col gap-2">
              <p className="label-mono">OUVINDO</p>
              <h3 className="text-h-3">Favoritas do momento</h3>
            </div>
            <div className="flex flex-col gap-2.5">
              {tracks.map((t) => (
                <iframe
                  key={t.id}
                  title={t.title}
                  src={`https://open.spotify.com/embed/track/${t.id}?utm_source=generator&theme=0`}
                  width="100%"
                  height="80"
                  frameBorder={0}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-xl"
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Row 2 — Bada Bing destaque */}
        <Card tone="subtle" className="p-10 md:p-12">
          <p className="label-mono">
            PROJETO EM DESTAQUE · BRANDING · WEB · COPYWRITING
          </p>
          <h3 className="text-h-2 max-w-[800px]">
            Bada Bing — Bakehouse
          </h3>
          <p className="text-h-3 text-fg-body max-w-[800px]">
            Dubai Marina&apos;s Top Roman-Style Sourdough Pizzeria
          </p>
          <p className="text-body max-w-prose">
            Marketing digital, e-commerce e copywriting pra pizzaria romana
            fermentada por 72 horas em Dubai Marina. Premiada no Timeout Dubai
            entre as melhores da cidade.
          </p>
          <Link
            href="/projetos/bada-bing"
            className="font-semibold mt-2 inline-flex items-center gap-2 hover:gap-3 transition-all"
          >
            Ver case completo →
          </Link>
        </Card>

        {/* Row 3 — Habilidades */}
        <Card tone="panel" className="p-10 md:p-12 gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-h-2">Habilidades</h3>
            <p className="text-body">
              Ferramentas que tenho facilidade e domínio em utilizar.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className="rounded-pill bg-surface px-4 py-2 text-body-sm text-fg-strong"
              >
                {s}
              </span>
            ))}
          </div>
        </Card>
      </Container>
    </section>
  );
}
