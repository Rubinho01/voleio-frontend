# Voleio - Sistema de Reservas
<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" width="50" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" width="50" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" width="50" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/junit/junit-plain-wordmark.svg" width="50" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"  width="50" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" width="50" />
          
          
</p>

## Desenvolvedores

- Rubem Gustavo Krüger (Rubinho01)
- Thomas Pruner (ThomasPruner)

---

## 1. Domínio do Problema

### Contexto

O sistema tem como objetivo automatizar o processo de aluguel e reserva de quadras esportivas.  
Ele será utilizado por alunos, praticantes e instituições esportivas para Agendar aulas ou alugar quadras.

---

### Objetivo Geral

Desenvolver uma api rest e uma interface web capaz de gerenciar aluguéis, quadras, clientes e funcionários.

---

### Requisitos Funcionais

- RF01 – O sistema deve permitir cadastro de quadras.
- RF02 – O sistema deve permitir cadastro de usuários.
- RF03 – O sistema deve registrar reservas de quadras.
- RF04 – O sistema deve autenticar usuários em roles.
- RF05 – O sistema deve permitir cancelamento de aluguéis.
- RF06 – O sistema deve conter um dashboard para funcinários.
- RF07 – O sistema deve conter contatos da instituição de esportes.
- RF08 - O sistema deve enviar e-mails para o Administrador informando reservas.


---

### Requisitos Não Funcionais

- RNF01 – O sistema deve utilizar arquitetura REST.
- RNF02 – O sistema deve utilizar banco de dados relacional.
- RNF03 – O sistema deve possuir autenticação segura com JWT.
- RNF04 – Arquitetura MVC e organização package by feature no backend.
- RNF05 – A interface deve ser simples e amigável.
- RNF06 – Separação de front-end e back-end em dois repositórios.

---

## 2. Tecnologias Utilizadas e Justificativas

### Java

Escolhido por ser uma linguagem amplamente utilizada no mercado e possuir forte suporte para aplicações robustas.

---

### Spring Boot

Framework escolhido para:
- Facilidade na criação de APIs REST
- Injeção de dependência
- Integração com JPA

---

### React

Framework escolhido para:
- Facilidade na criação de componentes front-end
- Estudo geral

---


### PostgreSQL

Banco de dados relacional escolhido por:
- Confiabilidade
- Suporte a transações
- Ampla utilização no mercado
- Integração simples com Spring Data JPA

---

### Outras Tecnologias

- Maven – Gerenciamento de dependências
- Docker – Containerização da aplicação
- JWT – Autenticação baseada em token

---

## 3. Organização das Tarefas


### Organização das Atividades

As tarefas foram organizadas utilizando:
- Trello para Kanban
- Commits organizados por funcionalidade
- Branches separadas para cada feature

Exemplo de organização de branches:
- feature/cadastro-usuario
- feature/login
- feature/listagem-quadras-reservadas

---

### Estratégia de Integração

- Cada funcionalidade será desenvolvida em uma branch separada.
- Após validação, será realizado merge na branch principal.
- Conflitos serão resolvidos em conjunto.
