# Changelog

## [0.1.0] ⇒ [0.1.1] | 2022-06-22
### Fixed
    > Caminhos sendo gerados com barras duplicadas
        Local: \canicula-main\test\testlog.js ⇒ linha 6


## [0.1.1] ⇒ [0.2.0] | 2022-06-26
### Changed
    > Reestruturação completa do sistema de importação de scripts
    > Separação de blocos de código em arquivos diferentes
    > Alteração do local do arquivo 'entry-point' (app.hta) para a pasta 'root' da aplicação 
### Added 
    > Criação de um sistema de importação dinâmica e modular de scripts
    > Criação de namespaces para separação semântica de código em módulos
### Deprecated
    > Versões prévias a 0.2.0 perderam compatibilidade com a versão atual (a atualização é obrigatória)
### Removed
    > Imagens desnecessárias foram removidas, de forma a melhorar o desempenho do programa

## [0.2.0] ⇒ [0.2.1] | 2022-06-27
### Fixed
    > Bug no inicializador do FileSentry corrigido
      (Fazia o sistema continuar ativo, mesmo após pressionar o botão de parada)
### Security
    > Sistema de encerramento de processos alterado para exigir senha
### Files Altered:
    ('+' for added files | '-' for removed ones | '~' for changed ones)
    + /libs/crypto.js
    + /env/main_pass.auth.can
    ~ /app.hta
    ~ /scripts/processes.js
    ~ /views/processes.hta
