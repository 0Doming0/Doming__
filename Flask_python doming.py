from flask import Flask, render_template,request,jsonify,redirect
from pixqrcode import PixQrCode
from flask_cors import CORS
import json
from datetime import datetime
import qrcode
from io import BytesIO
import base64

def gerar_image_link(link):
  Buffer= BytesIO()
  img= qrcode.make("http://192.168.1.13:5000"+link)
  img.save(Buffer, format="PNG")
  value_buffer= Buffer.getvalue()
  value_base64= base64.b64encode(value_buffer)
  base64_link= ''
  index_base64= 0
  for letra in str(value_base64):
   if index_base64 > 1 and index_base64 < len(str(value_base64))-1:
    base64_link+= letra
   index_base64+= 1

  return base64_link

app = Flask(__name__)
CORS(app)
access_login= False
dados_client_restaurant={
    
}
def gerar_image_pix(valor):
  dados_pix={
'nome': "VitorDomingos",
'Chave_Pix':"21969651131",
'cidade':"Rio de Janeiro",
'valor':valor,
} 
  pix=PixQrCode(dados_pix['nome'],dados_pix['Chave_Pix'],dados_pix['cidade'],dados_pix['valor'])
  
  if pix.is_valid():
      return pix.export_base64()
  else: return False

# Atualizar dados do novo cardápio alterado
@app.route('/<restaurant>/changeMenu', methods= ["POST"])
def alterar_menu_restaurant(restaurant):
    data= request.get_json()
    with open('data.json', "r") as registros:
     registros= json.load(registros)
     
     with open('data.json', "w") as reescrever_cardapio:
      for registro in registros:
       if restaurant in registro:
        registro[restaurant]['cardapio']= data['cardapio']
        json.dump(registros, reescrever_cardapio, indent=2)
        break
    return 'Cardápio foi atualizado no servidor'

# Receber dados de nova mesa criada
@app.route('/<restaurant>/addMesa', methods=["GET"])
def add_mesa_restaurant(restaurant):
    data_mesa= request.args.get('code_mesa')
    data_mesaIndex= request.args.get('mesaIndex')
    link= request.args.get('link')
    link= gerar_image_link(link)
    with open('data.json', "r") as registros:
     registros= json.load(registros)
     with open('data.json', "w") as adicionar_registros:
      for registro in registros:
       if restaurant in registro:
        registro[restaurant]["Mesas"]["mesa "+data_mesa]= {"settings":[int(data_mesaIndex),link,False], "solicitacao":['','','',['','']]}
        json.dump(registros, adicionar_registros, indent=2)
        return 'Mesa '+data_mesaIndex+' foi adicionada'    
    return 'Mesa não foi adicionada'

# Registrar dados de pedido entregue
@app.route('/<restaurant>/finish-order-data', methods=["POST"])
def register_order_data(restaurant):
    data= request.get_json()
    order_data= {f"{restaurant}":data}
    with open('data.json', "r") as registros:
     registros= json.load(registros)
     with open('data.json',"w") as limpar_solicitacao:
      for registro in registros:
       if restaurant in registro:
        registro[restaurant]["Mesas"][list(data.keys())[0]]["solicitacao"]= ['','','',['','']]
        json.dump(registros, limpar_solicitacao, indent=2)
          
    return order_data

# Receber solicitações da mesa
@app.route('/<restaurant>/solicitar-pedido', methods=["POST", "GET"])
def chamar_garçom_client(restaurant):
    data = request.get_json()  
 
    with open('data.json', "r") as registros:
     registros= json.load(registros)
     with open('data.json', "w") as reescrever_solicitação:
      for registro in registros:
       if restaurant in registro:
        registro[restaurant]["Mesas"][list(data.keys())[0]]["solicitacao"]= data[list(data.keys())[0]]["solicitacao"]
        json.dump(registros, reescrever_solicitação, indent=2)
        return registro[restaurant]["Mesas"]
    
@app.route('/<restaurant>/ocupar-mesa/<code_mesa>', methods=["GET"])
def ocupar_mesa(restaurant,code_mesa):
    print(code_mesa)
    with open('data.json',"r") as registros:
      registros= json.load(registros)
      with open('data.json',"w") as reescrever_ocupacao:
       for registro in registros:
        if restaurant in registro:
         if registro[restaurant]["Mesas"]:
          if code_mesa in registro[restaurant]["Mesas"]:
           registro[restaurant]["Mesas"][code_mesa]["settings"][2]= True
           json.dump(registros, reescrever_ocupacao, indent=2)
          else:
           return 'Mesa não encontrada'
    return 'Mesa ocupada'

# Enviar dados atualizados do restaurante
@app.route('/updateDataRestaurant', methods=["GET"])
def atualizar_dados_restaurant():
    restaurant= request.args.get('restaurant')
    with open('data.json', "r") as registros:
     try:    
      registros= json.load(registros)
      for registro in registros:
       if restaurant in registro:
        return jsonify(registro[restaurant])
      return {'error': 'Registro não encontrado'}
     except: return {'error':'Erro ao processar a solicitação'}
    
# Registrar novo restaurante cadastrado
@app.route('/registrarRestaurant', methods=['POST'])
def register_dados_restaurant():
    global access_login
    restaurant= request.form.get('nameRestaurant')
    restaurant_register=[
    {
    restaurant:{
      "Mesas":{},
      "cardapio":{},
      "dataRegister":str(datetime.today().date())
      }
     } 
    ]
    with open('data.json') as registros:
     try:
      registros= json.load(registros)
      registros+= restaurant_register
      with open('data.json', "w") as reescrever_register:
       json.dump(registros, reescrever_register, indent=4)
     except:
      with open('data.json', "w") as reescrever_register:
       json.dump(restaurant_register, reescrever_register, indent=4)
    access_login= True
    return redirect(f'/{restaurant}/restaurantManager/mesas')
    
     
    
# Criar página de pagamentos da mesa criada
@app.route('/<restaurant>/client-payment/<code_mesa>', methods=['GET'])
def página_pagamentos(restaurant,code_mesa):
    qrcodePIX_image=gerar_image_pix(str(request.args.get('valor')))
    if(qrcodePIX_image):
      return render_template('payment_client.html',restaurant=restaurant,code_mesa=code_mesa,image_pix=qrcodePIX_image)

# Criar página da nova mesa criada
@app.route('/<restaurant>/client-request/<code_mesa>', methods={'GET'})
def página_pedidos(restaurant,code_mesa):
    global access_login
    
    return render_template('tableClient.html',restaurant=restaurant,code_mesa=code_mesa)
    
    
# Redirecionar para página de gerenciamento dos pedidos do restaurante
@app.route('/<restaurant>/restaurantManager/pedidos')
def gerenciador_pedidos_restaurante(restaurant):
    nameRestaurant= restaurant
    global access_login
    if access_login:
     return render_template('restaurantMain_pedidos.html',nameRestaurant=nameRestaurant)
    else: return redirect('/')
    
# Redirecionar para página de gerenciamento do cardápio do restaurante
@app.route('/<restaurant>/restaurantManager/cardápio')
def gerenciador_cardapio_restaurante(restaurant):
    nameRestaurant= restaurant
    global access_login
    if access_login:
     return render_template('restaurantMain_cardapio.html',nameRestaurant=nameRestaurant)
    else: return redirect('/')
    
# Redirecionar para página de gerenciamento de mesas do restaurante
@app.route('/<restaurant>/restaurantManager/mesas', methods={'GET'})
def gerenciador_mesas_restaurante(restaurant):
    global access_login
    nameRestaurant= restaurant
    cnpjRestaurant= request.args.get('cnpjRestaurant')
    if access_login:
     return render_template('restaurantMain_mesas.html',nameRestaurant=nameRestaurant,cnpjRestaurant=cnpjRestaurant)
    else: return redirect('/')

# Cadastro do restaurante
@app.route('/')
def Home_page():
    global access_login
    
    access_login= False
    return render_template('restaurantCadaster.html')

# Verificar se o registro é possível
@app.route('/verificar-registro', methods=['POST'])
def verificar_registro():
    restaurant_register= request.get_json()
    
    with open('data.json', "r") as registros:
     registros= json.load(registros)
     if(len(str(registros))==0): return {"settings":[True,'Restaurante cadastrado']}
     for registro in registros:
      try:
       if restaurant_register['restaurant'] in registro:
        return {"settings":[False,'Nome do restaurante já está registrado']} 
      except:
        return {"settings":[True,'Restaurante cadastrado']}
     return {"settings":[True,'Restaurante cadastrado']}

if __name__=='__main__':
 app.run(host='0.0.0.0')