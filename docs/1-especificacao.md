
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

# 6. Casos de uso
RF01 - Registrar-se na rede social
<br>

![image](https://user-images.githubusercontent.com/48717700/111547898-a03a9e00-8758-11eb-888d-a63a6cdbc4b8.png)

<br>

RF03 - Atualizar dados do perfil pessoal

<br>

![image](https://user-images.githubusercontent.com/48717700/111548194-1808c880-8759-11eb-86d0-357d212f5b5b.png)

<br>

RF04 - Avaliar Filmes, Séries e Livros

<br>

![image](https://user-images.githubusercontent.com/48717700/111548217-21923080-8759-11eb-9529-eafe9497b32a.png)

<br>

RF05 - Selecionar item para avaliação
<br>

![image](https://user-images.githubusercontent.com/48717700/111548234-29ea6b80-8759-11eb-9478-a598c0f56022.png)

<br>

RF06 – Cadastrar de Conteúdo
<br>

![image](https://user-images.githubusercontent.com/48717700/111550027-12f94880-875c-11eb-8b9f-75b621d6f941.png)


<br>

RF10 – Apresentar recomendações para Membros
<br>

![image](https://user-images.githubusercontent.com/48717700/111550131-3de39c80-875c-11eb-8892-a6ac4811c25e.png)


<br>

RF011 – Oferecer recomendações

<br>

![image](https://user-images.githubusercontent.com/48717700/111548368-5dc59100-8759-11eb-8693-40cbdee24b70.png)

<br>

RF012 – Listar avaliações realizadas

<br>

![image](https://user-images.githubusercontent.com/48717700/111550409-cb26f100-875c-11eb-9302-6a3e7b2a10cd.png)


<br>
RF013 – Propor relacionamento de amizade

<br>

![image](https://user-images.githubusercontent.com/48717700/111548483-88174e80-8759-11eb-845b-f30c77f23319.png)

<br>

RF014 – Adicionar comentários

<br>

![image](https://user-images.githubusercontent.com/48717700/111550224-71bec200-875c-11eb-8422-c445379bd46b.png)


<br>

RF015 – Adicionar “joinha”

<br>

![image](https://user-images.githubusercontent.com/48717700/111550242-7b482a00-875c-11eb-8730-7ec309a8fcf6.png)


<br>

RF016 – Mostrar avaliações e recomendações na página pessoal.

<br>

![image](https://user-images.githubusercontent.com/48717700/111550260-856a2880-875c-11eb-9624-97c7a8af4dc4.png)


<br>

RF017 – Ver amigos em comum.

<br>

![image](https://user-images.githubusercontent.com/48717700/111550274-8d29cd00-875c-11eb-92db-5037df9f459f.png)


<br>

RF018 – Receber sugestões de amigos

<br>

![image](https://user-images.githubusercontent.com/48717700/111550296-95820800-875c-11eb-9d79-99a860c235c6.png)


<br>

RF019 – Listar avaliações

<br>

![image](https://user-images.githubusercontent.com/48717700/111550311-9dda4300-875c-11eb-9917-1b23eda1a7b3.png)

<br>


RF020 – Consultar relatório gerencial

<br>

![image](https://user-images.githubusercontent.com/48717700/111550328-a7fc4180-875c-11eb-8181-f568d9c5c635.png)




