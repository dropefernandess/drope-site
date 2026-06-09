// Mirror EN — re-exporta a página PT. O locale é derivado do pathname
// (/en/* → en) pelo LocaleProvider, então todo t() renderiza em inglês.
export { default, generateStaticParams, generateMetadata } from "../../../projetos/[slug]/page";
