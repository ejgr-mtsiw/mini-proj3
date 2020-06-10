# mini-proj3
[PWA] Tarefa 5.2: Mini-projeto - desenvolvimento do back-end

A tarefa 5.2 corresponde ao desenvolvimento final do back-end, onde para além de criar a aplicação no Express visa o processamento dos formulários no lado do servidor com os aspetos de validação e pedidos GET e POST. Todo esta implementação de processamentos de pedidos implica a definição de rotas. 

Este projeto fornece o backend para o frontend do projeto [mini-proj2](https://github.com/ejgr-mtsiw/mini-proj2)

## Objetivos

Criar as páginas de gestão e respetivas rotas para as entidades `Voluntários` e `Membros do Comité Científico`

## Trabalho desenvolvido

Foram definidos os controladores e as rotas necessárias para a gestão das novas entidades `Conferências`, `Voluntários` e `Membros do Comité Científico`.

As conferências foram expandidas sendo possível criar novas conferências e definir os seus oradores, sponsors, membros do comité, tarefas a realizar e o(s) respetivo(s) voluntário(s), e gerir a lista de participantes.

### Notas

Foi feito um clone da base de dados original para poder fazer o desenvolvimento num ambiente mais controlado: as credenciais de acesso à base de dados disponibilizadas são demasiado permissivas. O desenvolvimento foi feito recorrendo a uma base de dados local alojada num servidor MariaDB.

Todos os controladores foram reescritos para eliminar a utilização de queries SQL raw.
Todas as consultas à base de dados são feitas recorrendo à biblioteca [Sequelize](https://sequelize.org/)

A autenticação de utilizadores é feita recorrendo à biblioteca [Passport](http://www.passportjs.org/).

A validação e sanitização de dados é feita recorrendo à extensão [express-validator](https://express-validator.github.io/docs/)

## Instalação

1. Clonar o repositório
2. Instalar as dependências: `npm install`
3. Configurar o servidor no ficheiro `bin/www`
4. Copiar/Renomear o ficheiro `config.json.default` para `config.json`
5. Configurar dados de acesso à base de dados no ficheiro `config/config.json`
6. Correr o servidor: `node bin/www`
