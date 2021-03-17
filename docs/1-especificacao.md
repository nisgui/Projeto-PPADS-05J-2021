
<h1>Especificação de requisitos </h1>
<h2> PROJETO: Aplicativo para Recomendação de Filmes, Séries e Livros </h2>
<h3> Curso de Sistemas de Informação/ Análise e Desenvolvimento de Sistemas </h3> 
<h3> Prática Profissional em ADS </h3>
<h3> Turma 05J </h3>
<h3>1º semestre de 2021</h3>

* Nicole Francani Godinho. TIA: 31716946
* Aleixo Afonso da Cunha Menezes Neto
* Marcos Vinicius Lozardo da Rosa

<br>


**Índice**

- [1. Introdução](#1-introdução)
- [2. Escopo do projeto](#2-escopo-do-projeto)
- [3. Interessados](#3-interessados)
- [4. Objetivos funcionais](#4-objetivos-funcionais)
- [5. Objetivos não-funcionais](#5-objetivos-não-funcionais)
- [6. Casos de uso](#6-casos-de-uso)
  - [6.1. Acessar funções restritas](#61-acessar-funções-restritas)
  - [6.2. Efetuar registro](#62-efetuar-registro)
  - [6.3. Efetuar seu próprio pedido](#63-efetuar-seu-próprio-pedido)
  - [6.4. Efetuar pedido para o cliente](#64-efetuar-pedido-para-o-cliente)
- [7. Wireframes](#7-wireframes)
- [8. Diagrama de classes de domínio](#8-diagrama-de-classes-de-domínio)

# 1. Introdução

Este é um documento de especificação de requisitos para um aplicativo para recomendação de Filmes, Séries e Livros. <br>
Considerando que os serviços de streaming nunca estiveram tão em alta graças à pandemia do coronavírus, bem como, escolher entre milhares de filmes, séries ou livros disponíveis pode ser uma tarefa um tanto quanto estressante. Sendo assim, nossa empresa optou por criar um sistema que deverá permitir o acesso de qualquer pessoa da empresa na plataforma e os mesmos a fazerem avaliações e recomendações de séries, filmes e livros nessa rede social.

Este documento descreve os requisitos não-funcionais, modela os requisitos funcionais com casos de uso e modela os conceitos do domínio do problema.


# 2. Escopo do projeto
O escopo deste projeto é um sistema web que permite a interação dos colaboradores da empresa entre si, da forma em que eles podem adicionar novos filmes, series e livros que não estiverem fazendo parte da nossa database ainda. A publicidade e venda de tais produtos não fazem parte do objetivo desse projeto. 
Estamos também levando em consideração a parte da segurança dos usuarios, como informações cadastrais e transacionais estão assegurados contra eventuais invasões ao site do sistema.

# 3. Interessados
Aqueles que irão se beneficiar diretamente e aqueles que serão afetados pelo novo sistema:

Colaboradores: Conseguirão navegar pelo site qualquer pessoa da empresa e de qualquer cargo e encontrar interesses em comum com outros colaboradores, enviar pedidos de amizade e encontrar novas recomendações de amizade por gostos similiares ao dele, assim criando uma atmosfera amigavel na empresa e estimulando a interação entre os membros.


# 4. Objetivos funcionais


<img src="https://github.com/nisgui/Projeto-PPADS-05J-2021/blob/main/docs/driagramas/r1.png" title="hover text">

<img src="https://github.com/nisgui/Projeto-PPADS-05J-2021/blob/main/docs/driagramas/r2.png" title="hover text">

<img src="https://github.com/nisgui/Projeto-PPADS-05J-2021/blob/main/docs/driagramas/r3.png" title="hover text">

<img src="https://github.com/nisgui/Projeto-PPADS-05J-2021/blob/main/docs/driagramas/r4.png" title="hover text">

<img src="https://github.com/nisgui/Projeto-PPADS-05J-2021/blob/main/docs/driagramas/r5.png" title="hover text">

<img src="https://github.com/nisgui/Projeto-PPADS-05J-2021/blob/main/docs/driagramas/r6.png" title="hover text">

<img src="https://github.com/nisgui/Projeto-PPADS-05J-2021/blob/main/docs/driagramas/r7.png" title="hover text">

<img src="https://github.com/nisgui/Projeto-PPADS-05J-2021/blob/main/docs/driagramas/r8.png" title="hover text">

<img src="https://github.com/nisgui/Projeto-PPADS-05J-2021/blob/main/docs/driagramas/r9.png" title="hover text">

<img src="https://github.com/nisgui/Projeto-PPADS-05J-2021/blob/main/docs/driagramas/r10.png" title="hover text">

<img src="https://github.com/nisgui/Projeto-PPADS-05J-2021/blob/main/docs/driagramas/r11.png" title="hover text">

<img src="https://github.com/nisgui/Projeto-PPADS-05J-2021/blob/main/docs/driagramas/r12.png" title="hover text">

<img src="https://github.com/nisgui/Projeto-PPADS-05J-2021/blob/main/docs/driagramas/r13.png" title="hover text">
<img src="https://github.com/nisgui/Projeto-PPADS-05J-2021/blob/main/docs/driagramas/r14.png" title="hover text">

<img src="https://github.com/nisgui/Projeto-PPADS-05J-2021/blob/main/docs/driagramas/r15.png" title="hover text">

<img src="https://github.com/nisgui/Projeto-PPADS-05J-2021/blob/main/docs/driagramas/r16.png" title="hover text">

<img src="https://github.com/nisgui/Projeto-PPADS-05J-2021/blob/main/docs/driagramas/r17.png" title="hover text">

<img src="https://github.com/nisgui/Projeto-PPADS-05J-2021/blob/main/docs/driagramas/r18.png" title="hover text">

<img src="https://github.com/nisgui/Projeto-PPADS-05J-2021/blob/main/docs/driagramas/r19.png" title="hover text">

<img src="https://github.com/nisgui/Projeto-PPADS-05J-2021/blob/main/docs/driagramas/r20.png" title="hover text">


# 5. Objetivos não-funcionais

| ID  |  Descrição  |
| ------------------- | ------------------- |
|  RNF001 |  O site web do sistema deverá ser visível através da web ou por aplicativos móveis - somente por meio do navegador disponível no dispositivo. |
|  RNF002 |  A aplicação deve ser responsiva e leve, evitando demoras no carregamento das funcionalidades. |
|  RNF003 |  O tempo de carregamento de uma página não deve ser superior a 5 segundos. |
|  RNF004 |  A disponibilidade da aplicação deverá atender o padrão 99,99% em regime 24h/7 |
|  RNF005 |  O sistema deve apresentar em sua documentação como os dados cadastrais e transacionais serão assegurados |
|  RNF006 |  O sistema deve funcionar em diversos dispositivos. |
|  RNF007 |  Os dados do sistema devem ser persistidos em uma base de dados (Relacional ou NoSQL). |
