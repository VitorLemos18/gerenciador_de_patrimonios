from django.shortcuts import render

def home(request):
    return render(
        request,
        'index.html'
    )

def patrimonio(request):
    return render(
        request,
        'patrimonios.html'
    )
def pendentes(request):
    return render(
        request,
        'pendentes.html'
    )
def unidade(request):
    return render(
        request,
        'unidade.html'
    )
def relatorios(request):
    return render(
        request,
        'relatorios.html'
    )