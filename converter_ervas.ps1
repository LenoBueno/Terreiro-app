# Script para converter imagens de ervas de WebP para PNG
# Usa o Paint.NET para conversão

# Caminho da pasta das imagens das ervas
$herbsFolder = "f:\Terreiro-app\assets\images\herbs"

# Caminho do Paint.NET
$paintDotNetPath = "${env:ProgramFiles}\paint.net\paintdotnet.exe"

# Verifica se o Paint.NET está instalado
if (-not (Test-Path $paintDotNetPath)) {
    Write-Host "Erro: Paint.NET não foi encontrado em $paintDotNetPath" -ForegroundColor Red
    Write-Host "Por favor, instale o Paint.NET primeiro em: https://www.getpaint.net/"
    exit
}

# Verifica se a pasta existe
if (-not (Test-Path $herbsFolder)) {
    Write-Host "Erro: A pasta $herbsFolder não foi encontrada." -ForegroundColor Red
    exit
}

# Processa cada arquivo WebP
Get-ChildItem -Path $herbsFolder -Filter "*.webp" | ForEach-Object {
    $pngFile = [System.IO.Path]::ChangeExtension($_.FullName, ".png")
    
    if (-not (Test-Path $pngFile)) {
        Write-Host "Convertendo: $($_.Name) -> $([System.IO.Path]::GetFileName($pngFile))" -ForegroundColor Yellow
        
        try {
            # Usa o Paint.NET para converter a imagem
            & $paintDotNetPath "$($_.FullName)" /Save "$pngFile" /Close
            
            # Verifica se a conversão foi bem-sucedida
            if (Test-Path $pngFile) {
                Write-Host "Convertido com sucesso!" -ForegroundColor Green
                # Remove o arquivo WebP original após a conversão bem-sucedida
                # Remove-Item $_.FullName -Force
            } else {
                Write-Host "Falha ao converter $($_.Name)" -ForegroundColor Red
            }
        }
        catch {
            Write-Host "Erro ao converter $($_.Name): $_" -ForegroundColor Red
        }
    }
    else {
        Write-Host "Já existe: $([System.IO.Path]::GetFileName($pngFile))" -ForegroundColor Gray
    }
}

Write-Host "Processo de conversão concluído!" -ForegroundColor Green

# Agora vamos atualizar as referências nos arquivos
$filesToUpdate = @(
    "f:\Terreiro-app\assets\index.ts",
    "f:\Terreiro-app\app\(tabs)\herbs.tsx",
    "f:\Terreiro-app\app\(tabs)\herb_detail\lavender_detail.tsx"
)

Write-Host "`nAtualizando referências nos arquivos..." -ForegroundColor Cyan

foreach ($file in $filesToUpdate) {
    if (Test-Path $file) {
        try {
            $content = Get-Content $file -Raw
            $updatedContent = $content -replace '\.webp\b', '.png'
            
            if ($content -ne $updatedContent) {
                Set-Content -Path $file -Value $updatedContent -NoNewline
                Write-Host "Atualizado: $file" -ForegroundColor Green
            } else {
                Write-Host "Nenhuma alteração necessária em: $file" -ForegroundColor Gray
            }
        }
        catch {
            Write-Host "Erro ao atualizar $file : $_" -ForegroundColor Red
        }
    } else {
        Write-Host "Arquivo não encontrado: $file" -ForegroundColor Yellow
    }
}

Write-Host "`nProcesso concluído!" -ForegroundColor Green
Write-Host "Pressione qualquer tecla para sair..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
