// Permite a importação de módulos com extensão .js em TypeScript
declare module '*.js' {
  const content: any;
  export default content;
}

// Permite a importação de módulos CSS/SCSS
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

// Permite a importação de arquivos de imagem
declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.jpg' {
  const value: any;
  export default value;
}

declare module '*.jpeg' {
  const value: any;
  export default value;
}

declare module '*.gif' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

// Extensões para o Node.js
namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    EXPO_PUBLIC_API_URL?: string;
    // Adicione outras variáveis de ambiente aqui
  }
}

// Extensões para objetos globais
declare module '*.json' {
  const value: any;
  export default value;
}
