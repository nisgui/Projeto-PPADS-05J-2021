
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
- [7. Diagramas de sequência ](#7-diagramas-de-sequência)
- [8. Wireframes](#8-wireframes)
- [9. Diagrama de classes de domínio](#9-diagrama-de-classes-de-domínio)
- [10. Diagrama de classes](#10-diagrama-de-classes)

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
> Obs: Requisitos funcionais aqui não representados são porque o caso de uso é repetido ao requisito acima

<br> 

## RF01 - Registrar-se na rede social
<br>

![image](https://user-images.githubusercontent.com/48717700/111547898-a03a9e00-8758-11eb-888d-a63a6cdbc4b8.png)

<br>

|  |  Descrição  |
| ------------------- | ------------------- |
|  Objetivo | O sistema deverá permitir que qualquer pessoa da empresa pode se registrar nesta rede social  |
|  Ator | Colaborador  |
|  Pré-condições |  Ser colaborador da empresa |
|  Fluxo principal | 1 - Usuário acessa a página da rede social. <br /> 2 - Sistema carrega a página principal. <br /> 3 - Usuário clica em "Cadastrar-se". <br /> 4 - Sistema redireciona o usuário para a página de cadastro. <br /> 5 - Usuário preenche os campos: Nome completo, username , senha, data de nascimento, cidade e estado. Finalmente clica em "Cadastrar". <br /> 6 - Sistema valida os campos preenchidos e redireciona para a página principal com o perfil novo logado.|
|  Fluxo Alternativo |  1 - Dados ja cadastrados - Sistema retorna que os dados já existem. <br /> 2 - Dados incompletos - Sistema retorna que o formulário precisa ser preenchido. |


<br>

## RF03 - Atualizar dados do perfil pessoal

<br>

![image](https://user-images.githubusercontent.com/48717700/111548194-1808c880-8759-11eb-86d0-357d212f5b5b.png)

|  |  Descrição  |
| ------------------- | ------------------- |
|  Objetivo | Cada membro poderá, a qualquer momento, atualizar os dados do seu perfil.  |
|  Ator | Colaborador  |
|  Pré-condições | Necessário estar cadastrado e logado. |
|  Fluxo principal | 1- Usuário acessa a página de perfil da rede social. <br /> <br /> 2 - O sistema carrega a tela de perfil do usuário logado. <br /> 3 - Usuário atualiza os campos: Nome completo, senha, data de nascimento, cidade ou estado. Finalmente clicaem "Atualizar Cadastro". <br /> 4 - Sistema valida os campos preenchidos pelo usuário e redireciona para a página principal com o perfil carregado.|
|  Fluxo Alternativo | 1 - Usuário deixa de preencher algum campo necessário. <br /> 2 - Sistema informa os campos obrigatórios que devem ser preenchidos e não atualiza o perfil do usuário. <br /> 3 - Usuário é mantido no passo 3 do fluxo principal para completar o preenchimento de atualização cadastro antes de prosseguir.|

<br>

## RF04 - Avaliar Filmes, Séries e Livros

<br>

![image](https://user-images.githubusercontent.com/48717700/111548217-21923080-8759-11eb-9529-eafe9497b32a.png)

|  |  Descrição  |
| ------------------- | ------------------- |
|  Objetivo | O sistema permite a avaliação de três tipos de ítens: Livro, Série, Filme.  |
|  Ator | Colaborador  |
|  Pré-condições |  Usuário estar logado |
|  Fluxo principal |1 - Usuário acessa página <br /> 2 - Sistema mostra opção de escolha entre: livro, filme ou série <br /> 3 - Usuário seleciona o tipo de item <br /> 4 - Sistema habilita opções de busca <br /> 5 - Usuário escreve na caixa de busca o nome do item <br /> 6 - Sistema retorna os resultados da busca <br /> 7 - Usuário seleciona o item oriundo da busca <br />  8 - Sistema abre uma página do item selecionado <br /> 9 - Usuário atribui nota de 0 a 10 <br /> 10 - Caso ache relevante, usuário escreve comentários <br /> 11 - Sistema indica que a avaliação foi atribuida e comentário postado |
|  Fluxo Alternativo |  1.1 - Sistema não encontra ocorrência de resultados na busca <br /> 1.2 - Sistema não valida todos os campos <br /> 1.3 -  Sistema indica número de caracteres no comentário |

<br>

## RF05 - Selecionar item para avaliação
<br>

![image](https://user-images.githubusercontent.com/48717700/111548234-29ea6b80-8759-11eb-9478-a598c0f56022.png)

|  |  Descrição  |
| ------------------- | ------------------- |
|  Objetivo |Para entrar uma avaliação, o membro seleciona o tipo de item (livro, filme ou série), busca pelo nome do item, atribui uma nota de 0 a 10 (somente valores inteiros) e escreve os comentários que julgar relevantes (com limite de 1024 caracteres).  |
|  Ator | Colaborador  |
|  Pré-condições |  Usuário estar logado |
|  Fluxo principal |1 - Usuário acessa página <br /> 2 - Sistema mostra opção de escolha entre: livro, filme ou série <br /> 3 - Usuário seleciona o tipo de item <br /> 4 - Sistema habilita opções de busca <br /> 5 - Usuário escreve na caixa de busca o nome do item <br /> 6 - Sistema retorna os resultados da busca <br /> 7 - Usuário seleciona o item oriundo da busca <br />  8 - Sistema abre uma página do item selecionado <br /> 9 - Usuário atribui nota de 0 a 10 <br /> 10 - Caso ache relevante, usuário escreve comentários <br /> 11 - Sistema indica que a avaliação foi atribuida e comentário postado |
|  Fluxo Alternativo |  1.1 - Sistema não encontra ocorrência de resultados na busca <br /> 1.2 - Sistema não valida todos os campos <br /> 1.3 -  Sistema indica número de caracteres no comentário |

<br>

## RF06 – Cadastrar de Conteúdo
<br>

![image](https://user-images.githubusercontent.com/48717700/111550027-12f94880-875c-11eb-8b9f-75b621d6f941.png)

|  |  Descrição  |
| ------------------- | ------------------- |
|  Objetivo | O sistema permite a criação de três tipos de ítens: Livro, Série, Filme.|
|  Ator | Colaborador  |
|  Pré-condições |  Usuário estar logado |
|  Fluxo principal |1 - Usuário entra ná página de cadastro. <br /> 2 - Sistema apresenta tela de cadastro e solicita que escolha entre Livro, série ou filme. <br /> 3 - Usuário escolhe o ítem que deseja cadastrar. <br /> 4 - Sistema apresenta os campos que devem ser preenchidos. <br /> 5 - Usuário preenche as informações necessárias para o cadastro, as informações de avaliação e finalmente clica em "Enviar". <br /> 6 - Sistema valida o preenchimento dos campos e informa que a criação foi salva e enviada para aprovação do administrador.|
| Fluxo Alternativo |  1 - Usuário deixa de preencher algum campo necessário. <br/>  2 - Sistema informa os campos obrigatórios que devem ser preenchidos e não envia para aprovação. <br /> 3 - Usuário é mantido no passo 5 do fluxo principal para completar o preenchimento antes de prosseguir.|


<br>

## RF10 – Apresentar recomendações para Membros
<br>

![image](https://user-images.githubusercontent.com/48717700/111550131-3de39c80-875c-11eb-8892-a6ac4811c25e.png)

|  |  Descrição  |
| ------------------- | ------------------- |
|  Objetivo | Após o sistema ter pelo menos 10 membros cadastrados e cada membro entrar pelo menos 10 avaliações, o sistema passará a apresentar para cada membro recomendações de filmes, séries e livros que podem ser de seu interesse. |
|  Ator | Sistema  |
|  Pré-condições |  Necessário que o sistema tenha 10 membros cadastrados e cada membro tenha pelo menos 10 avaliações |
|  Fluxo principal | 1.	Sistema valida as avaliações que um membro forneceu <br /> 2.	Com base nas avaliações, apresenta títulos semelhantes aos de seu interesse |
|  Fluxo Alternativo | 1. O sistema ainda não ter o número necessário para mostrar as recomendações para os membros. |


<br>

## RF011 – Oferecer recomendações

<br>

![image](https://user-images.githubusercontent.com/48717700/111548368-5dc59100-8759-11eb-8693-40cbdee24b70.png)

|  |  Descrição  |
| ------------------- | ------------------- |
|  Objetivo | O sistema deverá utilizar um algoritmo colaborativo para oferecer as recomendações a um determinado membro. Isto quer dizer que o sistema deverá identificar membros que têm um perfil semelhante com base nas avaliações já realizadas e oferecer recomendações com base no que estes membros avaliaram bem |
|  Ator | Sistema  |
|  Pré-condições |  Necessário existir uma ou mais recomendações de perfil semelhante.|
|  Fluxo principal | 1.	Executar algoritmo que examine perfis semelhantes; <br /> 2.	Selecionar as recomendações já realizadas; <br /> 3.	Apresentar lista de recomendações ao usuário; |
|  Fluxo Alternativo |  1. Não existir nenhum perfil com semelhanças com o seu. |

<br>

## RF012 – Listar avaliações realizadas

<br>

![image](https://user-images.githubusercontent.com/48717700/111550409-cb26f100-875c-11eb-9302-6a3e7b2a10cd.png)

|  |  Descrição  |
| ------------------- | ------------------- |
|  Objetivo | Cada membro terá uma página pessoal que listará todas as avaliações que ele já realizou. Os membros logados poderão pesquisar por outros membros pelo nome e acessar as suas páginas pessoais |
|  Ator | Colaborador  |
|  Pré-condições |  Necessário estar cadastrado e logado. |
|  Fluxo principal | 1.	Apresentar sua página pessoal com todas as avaliações realizadas. <br /> 2.	Permitir pesquisar outros membros; <br /> 3.	Visualizar paginas pessoais de outros membros;|
|  Fluxo Alternativo |  1. O membro ainda não possuir nenhuma avaliação. |


<br>

## RF013 – Propor relacionamento de amizade

<br>

![image](https://user-images.githubusercontent.com/48717700/111548483-88174e80-8759-11eb-845b-f30c77f23319.png)

|  |  Descrição  |
| ------------------- | ------------------- |
|  Objetivo | Cada membro poderá propor relacionamento de amizade a outro membro. O relacionamento de amizade será estabelecido quando o outro membro aceitar a proposta|
|  Ator | Colaborador  |
|  Pré-condições | Estar Logado, pesquisar membros ou receber sugestões. |
|  Fluxo principal | 1- Usuário pesquisa outro membro e propõe amizade <br /> 2 - Sistema exibe que solicitação foi enviada. <br /> 3 - Sistema envia solicitação para o outro usuário. |
|  Fluxo Alternativo | 1- Usuário pesquisa outro membro e propõe amizade. <br /> 2 - Sistema exibe sugestões de amizade. <br /> 3 - Usuário propõe amizade para o outro membro.|

<br>

## RF014 – Adicionar comentários

<br>

![image](https://user-images.githubusercontent.com/48717700/111550224-71bec200-875c-11eb-8422-c445379bd46b.png)

|  |  Descrição  |
| ------------------- | ------------------- |
|  Objetivo | O sistema deverá permitir que qualquer pessoa da empresa pode se registrar nesta rede social  |
|  Ator | Colaborador  |
|  Pré-condições |  Necessário estar cadastrado e logado. |
|  Fluxo principal |1 - Usuário acessa a avaliação de outro membro <br /> 2 - Sistema apresenta a página do avaliação. 3 - Usuário adiciona o comentário e clica em "Publicar". <br /> 4 - Sistema valida comentário e publica o mesmo. |
|  Fluxo Alternativo | 1 - Usuário clica em publicar com o campo de comentário vazio. <br />  2. Sistema avisa que o comentário não pode estar vazio |


<br>

## RF015 – Adicionar “joinha”

<br>

![image](https://user-images.githubusercontent.com/48717700/111550242-7b482a00-875c-11eb-8730-7ec309a8fcf6.png)

|  |  Descrição  |
| ------------------- | ------------------- |
|  Objetivo | Um membro poderá das um "joinha" nas avaliações de outro membro. Em cada avaliação aparecerá o número de "joinhas" que ela já recebeu. O membro que deu o “joinha” para a avaliação poderá retirá-lo posteriormente se assim desejar. |
|  Ator | Colaborador  |
|  Pré-condições |  Necessário estar cadastrado e logado. |
|  Fluxo principal | 1. Membro entrar no perfil de uma de suas amizades. <br /> 	2. Clicar no botão “Ver Avaliações” <br /> 3. Na página “Avaliações”, listar as avaliações realizadas por outros membros; <br /> 4.	Clicar no botão “Adicionar “joinha” <br /> 5.	Somar o número de “joinha” na avaliação|
|  Fluxo Alternativo | 1.	Clicar no botão “Ver Avaliações”; <br /> 2.	Na página “Avaliações”, listar as avaliações realizadas por outros membros; <br /> 3.	Clicar no botão “Remover “joinha”; <br /> 4.	Subtrair o número de “joinha” na avaliação;  |


<br>

## RF016 – Mostrar avaliações e recomendações na página pessoal.

<br>

![image](https://user-images.githubusercontent.com/48717700/111550260-856a2880-875c-11eb-9624-97c7a8af4dc4.png)

|  |  Descrição  |
| ------------------- | ------------------- |
|  Objetivo | A página pessoal de um membro mostrará, além das avaliações que ele fez, uma lista com os seus amigos e o número de recomendações que ele já recebeu |
|  Ator | Sistema  |
|  Pré-condições | Necessário estar cadastrado e logado. |
|  Fluxo principal | 1. Membro entrar no seu perfil ou no de outro membro <br /> 2.	Listar avaliações realizadas pelo usuário; 3.	Listar seus amigos com o número de recomendações que recebeu.|
|  Fluxo Alternativo |  1. Membro ainda não ter nenhuma avaliação e nenhum amigo. |


<br>

## RF017 – Ver amigos em comum.

<br>

![image](https://user-images.githubusercontent.com/48717700/111550274-8d29cd00-875c-11eb-92db-5037df9f459f.png)

|  |  Descrição  |
| ------------------- | ------------------- |
|  Objetivo | Quando um membro acessar a página de outro, o sistema deverá mostrar os amigos que eles têm em comum.  |
|  Ator | Colaborador  |
|  Pré-condições |  Necessário estar cadastrado e logado |
|  Fluxo principal | 1. Entrar na pagina pessoal de outro membro. <br /> 2. Mostrar lista de amigos em comum; |
|  Fluxo Alternativo | 1. Membro ainda não ter nenhum amigo em comum. |


<br>

## RF018 – Receber sugestões de amigos

<br>

![image](https://user-images.githubusercontent.com/48717700/111550296-95820800-875c-11eb-9d79-99a860c235c6.png)

|  |  Descrição  |
| ------------------- | ------------------- |
|  Objetivo | Sempre que um membro acessar o sistema, ele deverá receber a sugestão de 3 membros que poderiam ser seus amigos. O critério será sugerir membros que têm preferências semelhantes, com base nas avaliações já realizadas. |
|  Ator | Sistema  |
|  Pré-condições |  Membro ter feito alguma prévia avaliação. |
|  Fluxo principal |1.	Listar sugestões de amigos segundo critérios de preferencias; |
|  Fluxo Alternativo |  1. Membro não tem nada em comum com outros membros. <br /> 2. Membro ainda não ter feito nenhuma avaliação |


<br>

## RF019 – Listar avaliações

<br>

![image](https://user-images.githubusercontent.com/48717700/111550311-9dda4300-875c-11eb-9917-1b23eda1a7b3.png)

|  |  Descrição  |
| ------------------- | ------------------- |
|  Objetivo | Cada filme, série e livro deverá ter uma página no sistema que reunirá todas as avaliações já realizadas daquele item, ordenadas pelo número de "joinhas" recebidos.  |
|  Ator | Sistema  |
|  Pré-condições |  Necessário existir filmes, série ou livro cadastrados no sistema. |
|  Fluxo principal |1. Entrar na página pessoal de um membro. <br /> 2.	Clicar no link “Mais avaliados”; <br /> 3.	Na página de “Mais avaliados”, listar filmes, séries e livros ordenados por quantidade de avaliações.|
|  Fluxo Alternativo | |

<br>


## RF020 – Consultar relatório gerencial

<br>

![image](https://user-images.githubusercontent.com/48717700/111550328-a7fc4180-875c-11eb-8181-f568d9c5c635.png)

|  |  Descrição  |
| ------------------- | ------------------- |
|  Objetivo | O sistema deverá permitir que o gerente do serviço consulte: a. O número médio de amigos dos membros da rede social. b. Uma lista com os 10 membros mais conectados (com o maior número de amigos). c. Um gráfico mostrando a relação entre o número de amigos e o estado onde mora. |
|  Ator | Administrador  |
|  Pré-condições |  Estar logado com perfil de gerente |
|  Fluxo principal |1. Logar com o perfil de um gerente <br /> 2.	Listar os números médios de amigos de cada membro <br /> 3.	Listar o número de membros mais conectados com maior número de amigos. <br /> 4.	Mostrar gráfico com membros com o numero de amigos e estado onde mora. |
|  Fluxo Alternativo |   |



# 7. Diagramas de sequência

## RF01 - Registrar-se na rede social

![image](https://github.com/nisgui/Projeto-PPADS-05J-2021/blob/main/docs/driagramas/registro.png)

## RF03 - Atualizar dados do perfil pessoal

![image](https://github.com/nisgui/Projeto-PPADS-05J-2021/blob/main/docs/driagramas/atualizar.png)

## RF04 - Avaliar Filmes, Séries e Livros

![image](https://github.com/nisgui/Projeto-PPADS-05J-2021/blob/main/docs/driagramas/avaliar.png)

## RF06 – Cadastrar de Conteúdo

## RF10 – Apresentar recomendações para Membros

## RF011 – Oferecer recomendações

## RF012 – Listar avaliações realizadas

## RF013 – Propor relacionamento de amizade

## RF014 – Adicionar comentários

## RF015 – Adicionar “joinha”

## RF016 – Mostrar avaliações e recomendações na página pessoal.

## RF017 – Ver amigos em comum.

## RF018 – Receber sugestões de amigos

## RF019 – Listar avaliações

## RF020 – Consultar relatório gerencial

# 8. Wireframes

# 9. Diagrama de classes de domínio


![image](https://user-images.githubusercontent.com/48717700/111570244-1eac3580-8783-11eb-9fad-1d85dfc92407.png)



# 10. Diagrama de classes
