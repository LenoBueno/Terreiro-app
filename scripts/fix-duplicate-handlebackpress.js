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

// Função para remover a declaração duplicada de handleBackPress
function fixDuplicateHandleBackPress(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Verifica se o arquivo tem a declaração duplicada
  const hasDuplicate = content.includes('const handleBackPress = () => {') && 
                      content.includes('const { navigation, handleBackPress } = useNavigationWithBack();');
  
  if (!hasDuplicate) {
    console.log(`Nenhuma duplicata encontrada em: ${filePath}`);
    return;
  }
  
  // Remove a declaração manual de handleBackPress
  content = content.replace(/\s*const handleBackPress = \(\) => \{[^}]*\};?\s*/g, '');
  
  // Salva as alterações
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Arquivo corrigido: ${filePath}`);
}

// Executa a correção em todas as telas
function fixAllScreens() {
  try {
    const screenFiles = listScreenFiles(screensDir);
    console.log(`Verificando ${screenFiles.length} arquivos...`);
    
    screenFiles.forEach(file => {
      fixDuplicateHandleBackPress(file);
    });
    
    console.log('Correção concluída com sucesso!');
  } catch (error) {
    console.error('Erro ao corrigir os arquivos:', error);
  }
}

// Executa o script
fixAllScreens();
