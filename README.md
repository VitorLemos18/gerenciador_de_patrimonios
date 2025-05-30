> # Gerenciador de Patrimônios
>
> Sistema web para gerenciamento de patrimônios e unidades, com fluxo de aprovação de patrimônios pendentes e relatórios, desenvolvido em Django com frontend utilizando Bootstrap e armazenamento local via LocalStorage.
>
> ---
>
> ## Funcionalidades principais
>
> - Cadastro, edição, exclusão e listagem de patrimônios e unidades.
> - Fluxo de aprovação: patrimônios criados são enviados para lista de pendentes, aguardando aprovação ou recusa.
> - Relatórios dinâmicos com filtros e exportação para CSV e PDF.
> - Interface responsiva e amigável utilizando Bootstrap 5.
> - Armazenamento local dos dados via LocalStorage (sem banco de dados).
>
> ---
>
> ## Tecnologias utilizadas
>
> - Python 3.11
> - Django 5.2.1
> - Bootstrap 5
> - JavaScript (vanilla)
> - Chart.js (opcional para gráficos)
> - jsPDF e jsPDF-AutoTable (para exportação PDF)
> - HTML5 / CSS3
>
> ---
>
> ## Estrutura do projeto
>
> ```
> ├── home/                  # App Django principal
> │   ├── templates/home/    # Templates HTML
> │   │   ├── base.html
> │   │   ├── index.html
> │   │   ├── patrimonios.html
> │   │   ├── pendentes.html
> │   │   ├── unidade.html
> │   │   └── relatorios.html
> │   ├── static/js/         # Scripts JS
> │   │   ├── patrimonios.js
> │   │   ├── pendentes.js
> │   │   ├── unidade.js
> │   │   └── relatorios.js
> │   └── views.py
> ├── manage.py
> ├── requirements.txt       # Dependências do projeto
> └── README.md
> ```
>
> ---
>
> ## Como executar
>
> 1. Clone o repositório:
>
> ```bash
> git clone https://github.com/seu-usuario/gerenciador_de_patrimonios.git
> cd gerenciador_de_patrimonios
> ```
>
> 2. Crie e ative ambiente virtual:
>
> ```bash
> python -m venv venv
> source venv/bin/activate  # Linux/Mac
> venv\Scripts\activate     # Windows
> ```
>
> 3. Instale as dependências:
>
> ```bash
> pip install -r requirements.txt
> ```
>
> 4. Execute o servidor Django:
>
> ```bash
> python manage.py runserver
> ```
>
> 5. Acesse `http://127.0.0.1:8000/` no navegador.
>
> ---
>
> ## Observações
>
> - Os dados são armazenados no LocalStorage do navegador, portanto cada navegador/sessão possui dados independentes.
> - O sistema não utiliza banco de dados tradicional, sendo ideal para protótipos e estudos.
> - Para produção ou uso real, seria necessário integrar banco de dados e autenticação.
>
> ---
>
> ## Licença
>
> Este projeto está licenciado sob a MIT License.
>
> ---
>
> ## Contato
>
> Desenvolvido por Vitor Emanoel Batista Lemos.
>

