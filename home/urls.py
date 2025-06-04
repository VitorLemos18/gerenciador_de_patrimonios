
from django.urls import path
from . import views ## as home_views coloca assim se tiver mais de um app?


urlpatterns = [
    path('', views.login, name='login'),
    path('index.html', views.home, name='home'),
    path('patrimonios.html', views.patrimonio, name='patrimonios'),
    path('pendentes.html', views.pendentes  , name='pendentes'),
    path('unidade.html', views.unidade, name='unidade'),
    path('relatorios.html', views.relatorios, name='relatorios'),
    path('usuario.html', views.usuarios, name='usuarios')
]
