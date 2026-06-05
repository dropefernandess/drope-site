# Lottie Animations

Pasta pra arquivos JSON de animações Lottie.

## Como baixar animações gratuitas

1. Vai em **[lottiefiles.com/free-animations](https://lottiefiles.com/free-animations)**
2. Filtra por "Free for personal and commercial use"
3. Escolhe a animação
4. Clica em "Lottie JSON" (não "dotLottie") e baixa
5. Salva o arquivo aqui em `/lottie/{nome}.json`

## Como usar no projeto

```tsx
import { LottieIcon } from "@/components/ui/LottieIcon";
import heartAnim from "@/lottie/heart.json";

// Loop infinito
<LottieIcon animationData={heartAnim} size={48} />

// Só anima no hover
<LottieIcon animationData={heartAnim} size={32} playOnHover />

// Anima 1× e para
<LottieIcon animationData={heartAnim} size={32} playOnce />
```

## Boas práticas

- **Tamanho**: 32-64px pra ícones decorativos, 128px+ pra animações de destaque
- **playOnHover**: ideal pra evitar distração — animação dispara só quando o usuário interage
- **playOnce**: bom pra success states ou animações de entrada de página
- **Peso**: cada JSON pesa 5-30 KB normalmente. Importação dinâmica do lottie-react garante que o SSR não pesa
