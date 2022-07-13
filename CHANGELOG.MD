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
    > Logo do projeot adicionado aos assets
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
    + /libs/crypto.js
    + /env/main_pass.auth.can
    ~ /app.hta
    ~ /scripts/processes.js
    ~ /views/processes.hta


## [0.2.1] ⇒ [0.2.2] | 2022-07-08
### Changed
    > Sistema de engines da aplicação agora se inicializa automaticamente por padrão 
        (inicialização explícita com 'Eng.StartAppEngines()' não é mais necessária)
### Files Altered:
    ~ /app.js
    ~ /core/eng.js


## [0.2.2] ⇒ [0.2.3] | 2022-07-12
### Added
    > Algoritmos de categorização de processos implementados: IPCRM(v2) e FRAR
### Changed
    > Sistema de logs de testes alterado para produzir resultados em formato CSV
### Files Altered:
    ~ /test/testlog.js
    ~ /core/trg.js
    ~ /func/procsentry.js
    ~ /func/procsutils.js
    ~ /app.hta
    ~ /app.js


## [0.2.3] ⇒ [0.2.4] | 2022-07-12
### Fixed
    > Correção de bugs da versão 0.2.3
### Files Altered:
    ~ /test/testlog.js
    ~ /func/procsentry.js
    ~ /func/procsutils.js


## [0.2.4] ⇒ [0.3.0] | 2022-07-13
### Changed
    > hierarquia de diretórios alterada, para incluir todos os arquivos de UI e de componentes front-end no diretório 'public'
### Deprecated
    > As alterações na hierarquia de diretórios forçaram a quebra de compatibilidade com versões anteriores
    > versõaes anteriores a esta (0.3.0) agora estão obsoletas
### Files Altered:
    - /scripts/index.js
    - /scripts/processes.js
    - /styles/global.css
    - /styles/index.css
    - /styles/processes.css
    - /views/processes.hta
    + /public/scripts/index.js
    + /public/scripts/processes.js
    + /public/styles/global.css
    + /public/styles/index.css
    + /public/styles/processes.css
    + /public/views/processes.hta
    ~ /public/views/processes.hta
    ~ /app.hta


## [0.3.0] ⇒ [0.3.1] | 2022-07-13
### Fixed
    > Correção de bugs no sistema de logs dos índices IPCRM(v2)
        (Gerava resultados indefinidos no arquivo de log)
### Files Altered:
    ~ /func/procsutils.js
    ~ /test/testlog.js


## [0.3.1] ⇒ [1.3.2] | 2022-07-13
### Added
    > Suporte (polifill) à funções nativas implementadas sobre Arrays (sumUp() e getAverage())
    > Base de cálculo para comparação de valores IPCRM(v2)
### Changed
    > Formato de versionamento do projeto alterado para comformidade com os padrões ECMA e com a engine Node-Semver
        (Versão '0' no campo 'major' não pode existir, logo, a numeração desta versão foi alterada de 0.3.2 para 1.3.2)
    > Estado do programa alterado de 'unstable | alpha' para 'stable | dev' devido ao lançamento do patch major da versão 1
### Files Altered:
    ~ /core/eng.js
    ~ /test/testlog.js
    ~ /func/procsutils.js
    ~ /README.MD