import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="pt-[200px] section-padding">
      <Container className="flex flex-col items-center gap-6 text-center">
        <p className="label-mono">404</p>
        <h1 className="text-h-1">Esse projeto não existe</h1>
        <p className="text-body max-w-prose">
          Pode ter saído do ar ou o link tá quebrado.
        </p>
        <Link href="/#projetos" className="font-semibold hover:text-fg-body">
          ← Voltar pra todos os projetos
        </Link>
      </Container>
    </section>
  );
}
