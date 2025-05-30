

"""Explicação:

    Aqui fica as rotas para onde eu irei direcionar ao acessar tall coisa, exemplo: ao clicar em patrimonios
    serei redirecionado para o path('patrimonio/', patrimonio) onde irei devolver as informações do que me foi pedido ao acessar o path e aqui sempre recebe um request e devolve um responseS
"""

from django.contrib import admin
from django.urls import path, include
## from home import views ## as home_views coloca assim se tiver mais de um app?


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('home.urls'))
]
