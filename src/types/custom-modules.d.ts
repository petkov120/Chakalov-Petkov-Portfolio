declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.pdf' {
  const src: string;
  export default src;
}

declare module 'figma:asset/*' {
  const src: string;
  export default src;
}

declare module 'motion/react' {
  import type { ComponentType } from 'react';

  // Provide a very loose typing fallback so motion-based components keep working.
  export const motion: Record<string, ComponentType<any>>;
}
