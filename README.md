# Site Clinica de Psicologia
Este código refere-se a um site que gerencia pacientes, psicólogos e uma secretaria, onde cada usuário possui seu próprio login e interface, adaptados às suas funções específicas. Há uma aba de cadastro com permissões distintas e funcionalidades específicas para cada tipo de usuário. Foi adicionada uma funcionalidade de notificação através do Electron, utilizando os controllers nativos do Laravel.

# Laravel Template

### Passo a passo
***Clone o repositório criado a partir do template, entre na pasta e execute os comandos abaixo.***

*Entre na pasta:*
```sh
cd Projeto
```

*Crie o Arquivo .env:*
```sh
cp .env.example .env
```

*Atualize as variáveis de ambiente do arquivo .env:*
```dosini
APP_NAME=Laravel
APP_URL=http://localhost:8080

DB_PASSWORD=root
```

*Suba os containers do projeto:*
```sh
docker compose up -d
```
*Acesse o container:*
```sh
docker compose exec app bash
```
*Instale as dependências do projeto:*
```sh
composer install
```

```sh
php artisan migrate
```

```sh
composer require railsware/mailtrap-php symfony/http-client nyholm/psr7
```

```sh
php artisan migrate:fresh --seed --env=testing
```

*Para gerar a key do projeto Laravel:*

```sh
php artisan key:generate
```
*Fora do terminal do laravel (em outra aba de terminal de preferencia):*
```sh
cd Projeto
```
```sh
npm install
```
```sh
npm run dev
```
*Em outro terminal:*
```sh
npm install
```
```sh
npm start
```

**Acesse o projeto ->**
[http://localhost:8080](http://localhost:8080)

**Acesse o phpmyadmin ->**
[http://localhost:8081](http://localhost:8081)

