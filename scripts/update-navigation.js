const fs = require('fs');
const path = require('path');

// Diretório raiz do projeto
const rootDir = path.join(__dirname, '..');
// Diretório das telas
const screensDir = path.join(rootDir, 'app', '(tabs)');

// Lista de arquivos para ignorar
const ignoreFiles = ['_layout.tsx', 'index.tsx'];

// Função para listar todos os arquivos .tsx no diretório de telas
function listScreenFiles(dir) {
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.tsx') && !ignoreFiles.includes(file))
    .map(file => path.join(dir, file));
}

// Função para atualizar um arquivo de tela
function updateScreenFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Verifica se o arquivo já foi atualizado
  if (content.includes('useNavigationWithBack')) {
    console.log(`Arquivo já atualizado: ${filePath}`);
    return;
  }
  
  // Adiciona a importação do hook
  if (content.includes("from '@react-navigation/drawer'")) {
    content = content.replace(
      "import { DrawerNavigationProp } from '@react-navigation/drawer';",
      "import { useNavigationWithBack } from '@/hooks/useNavigationWithBack';"
    );
  } else {
    content = content.replace(
      /import { useNavigation } from 'expo-router';?\n/g,
      "import { useNavigationWithBack } from '@/hooks/useNavigationWithBack';\n"
    );
  }
  
  // Atualiza o uso do hook
  content = content.replace(
    /const navigation = useNavigation<DrawerNavigationProp<\{\s*\}>>\(\);/g,
    "const { navigation, handleBackPress } = useNavigationWithBack();"
  );
  
  // Remove a função handleBackPress existente
  content = content.replace(
    /const handleBackPress = \(\) => \{\s*navigation\.goBack\(\);?\s*\};?\s*/g,
    ''
  );
  
  // Salva as alterações
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Arquivo atualizado: ${filePath}`);
}

// Executa a atualização em todas as telas
function updateAllScreens() {
  try {
    const screenFiles = listScreenFiles(screensDir);
    console.log(`Encontrados ${screenFiles.length} arquivos para atualizar.`);
    
    screenFiles.forEach(file => {
      updateScreenFile(file);
    });
    
    console.log('Atualização concluída com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar as telas:', error);
  }
}

// Executa o script
updateAllScreens();
