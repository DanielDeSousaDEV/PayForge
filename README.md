<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->






<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/DanielDeSousaDEV/PayForge">
    <img src="public/favicon.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">PayForge</h3>

  <p align="center">
    Um e-commerce simples, seguro e confiável! 
    <br />
    <a href="https://github.com/DanielDeSousaDEV/PayForge/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/DanielDeSousaDEV/PayForge/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<div align="center">

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Unlicense License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
</div>

<!-- ABOUT THE PROJECT -->
## Sobre o Projeto

[![Product Name Screen Shot][product-screenshot]](https://github.com/DanielDeSousaDEV/PayForge)

PayForge é um **mini e-commerce pensado para oferecer uma experiência de compra simples, segura e confiável**. Este projeto foi criado para ajudar vendedores a gerenciar produtos e facilitar a vida dos clientes que buscam praticidade e confiança ao comprar online.

Por que criamos este projeto:
* Facilitar o acesso a produtos de qualidade, escolhidos com cuidado
* Tornar o processo de compra rápido, seguro e sem complicações
* Proporcionar uma experiência de usuário agradável, mesmo para quem não tem experiência em e-commerce
* Ajudar vendedores a gerenciar vendas de forma prática e eficiente

Este README serve como guia para entender o projeto, suas funcionalidades e como utilizá-lo. Fique à vontade para sugerir melhorias, criar pull requests ou abrir issues — toda contribuição é bem-vinda!

<p align="right">(<a href="#readme-top">Voltar para o topo</a>)</p>



## Tecnologias Utilizadas

No desenvolvimento deste projeto, as seguintes tecnologias foram utilizadas para estruturar o sistema e facilitar a manutenção do código. 

* [![Laravel][Laravel.com]][Laravel-url]
* [![Inertia][Inertia.com]][Inertia-url]
* [![React][React.js]][React-url]
* [![Tailwind][Tailwind.com]][Tailwind-url]

<p align="right">(<a href="#readme-top">Voltar para o topo</a>)</p>

## Configuração inicial

Este é um exemplo de como fornecer instruções para configurar o projeto localmente.  
Para obter uma cópia local e colocar o sistema em funcionamento, siga esses passos:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas e configuradas:
* Node.JS e NPM
* PHP (Recomendado Versão maior que 8.0)
* Composer
* MySQL (ou outro banco de dados compatível)    
* Git
* Conta no Stripe

### Instalação

_Siga o passo a passo abaixo para configurar o projeto em seu ambiente local._

1. Coloque sua conta do Stripe em modo de teste [Documentação](https://docs.stripe.com/testing)
2. Clone o repositório
   ```sh
   git clone https://github.com/DanielDeSousaDEV/PayForge.git
   ```
3. Instale os pacote do NPM
   ```sh
   npm install
   ```
4. Instale os pacote do Composer
   ```sh
   composer install
   ```
5. Copie o arquivo `.env` e configure as seguintes variáveis de ambiente
   ```
   DB_CONNECTION=sqlite
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=laravel
   DB_USERNAME=root
   DB_PASSWORD=

   MAIL_MAILER=log
   MAIL_SCHEME=null
   MAIL_HOST=127.0.0.1
   MAIL_PORT=2525
   MAIL_USERNAME=null
   MAIL_PASSWORD=null

   STRIPE_KEY=your-stripe-key
   STRIPE_SECRET=your-stripe-secret
   STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
   ```
6. Crie a chave do laravel
   ```sh
   php artisan key:generate
   ```
7. Execute as migrations
   ```sh
   php artisan migrate
   ```
8. Execute o seeder
   ```sh
   php artisan db:seed
   ```
9. Execute o projeto
   ```sh
   composer dev
   ```
10. Faça login com a CLI do Stripe (somente caso não tenha feito)
   ```sh
   ./stripe login
   ```
11. Adicione um ouvidor de evento do Stripe Local
   ```sh
   ./stripe listen --forward-to localhost:8000/stripe/webhook
   ```
12. Faça login com um usuário Admin
   ```
   email      =>   gabriel.dev@gmail.com,
   password   =>   Admin@123,
   ```

<p align="right">(<a href="#readme-top">Voltar para o topo</a>)</p>


<!-- CONTACT -->
## Contato

Daniel De Sousa - danieldesousa.dev@gmail.com

Link do repositório: [https://github.com/DanielDeSousaDEV/PayForge](https://github.com/DanielDeSousaDEV/PayForge)

<p align="right">(<a href="#readme-top">Voltar para o topo</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/DanielDeSousaDEV/PayForge?style=for-the-badge
[contributors-url]: https://github.com/DanielDeSousaDEV/PayForfe/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/DanielDeSousaDEV/PayForge?style=for-the-badge
[forks-url]: https://github.com/DanielDeSousaDEV/PayForge/network/members
[stars-shield]: https://img.shields.io/github/stars/DanielDeSousaDEV/PayForge?style=for-the-badge
[stars-url]: https://github.com/DanielDeSousaDEV/PayForge/stargazers
[issues-shield]: https://img.shields.io/github/issues/DanielDeSousaDEV/PayForge?style=for-the-badge
[issues-url]: https://github.com/DanielDeSousaDEV/PayForge/issues
[license-shield]: https://img.shields.io/github/license/DanielDeSousaDEV/PayForge?style=for-the-badge
[license-url]: https://github.com/DanielDeSousaDEV/PayForge/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/daniel-de-sousa-257275314/
[product-screenshot]: public/banner.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Inertia.com]: https://img.shields.io/badge/Inertia-20232A?style=for-the-badge&logo=inertia&logoColor=b1b6ff
[Inertia-url]: https://inertiajs.com/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[Tailwind.com]: https://img.shields.io/badge/Tailwind-030712?style=for-the-badge&logo=tailwindcss&logoColor=00bcff
[Tailwind-url]: https://tailwindcss.com/
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 


# tarefas
- [x] fazer a integração com cashier
- [x] atualização de perfil
- [x] Fazer a páginação funcionar
- [x] delete me
- [x] admin users
- [x] fazer um email quando o carrinho for pago
- [x] middleware de admin
- [ ] melhorar interface