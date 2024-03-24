import csv
import json
import os

caminho_csv = 'dados.csv'

for arquivo in os.listdir():
    if arquivo.lower().endswith('.csv'):
        caminho_csv = arquivo
        break

dados = []

with open(caminho_csv, mode='r', encoding='utf-8') as csvfile:
    leitor = csv.DictReader(csvfile, delimiter=';')
    for linha in leitor: dados.append(linha)

dados_json = json.dumps(dados, indent=4)

caminho_json = caminho_csv.lower().replace('.csv','.js')
with open(caminho_json, 'w', encoding='utf-8') as jsonfile:
    jsonfile.write('export const produtosDados = ' + dados_json)