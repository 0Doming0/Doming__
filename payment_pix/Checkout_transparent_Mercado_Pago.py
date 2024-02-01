from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
import requests
import json
from urllib.parse import parse_qs
import mercadopago
from mercadopago.config import RequestOptions
from flask_ngrok import run_with_ngrok
from datetime import datetime

sdk= mercadopago.SDK('APP_USR-3555935691204376-011520-482d4ed3ca713c190657f4b2c85b14c8-198717130')


app= Flask(__name__)
run_with_ngrok(app)
CORS(app)

def reduzir_digitos(intero):
  numero= str(intero)[:3]
  return int(numero)

hours_var=0
def range_minute(minute_expiration):
  minute=datetime.now().minute+minute_expiration
  
  if(minute+8>60):
   hours_var=1
   minute_var=minute-60
  else: 
    hours_var=0
    minute_var=minute
  return f"{datetime.today().date()}T{datetime.now().hour+hours_var}:{minute_var}:{datetime.now().second}.{reduzir_digitos(datetime.now().microsecond)}-03:00"

payment_notification={
    
}

@app.route('/')
def payment_main():
    
    return render_template('checkout-mercadopago.html')
@app.route('/process_payment', methods=['POST'])
def process_payment():
    form=parse_qs(request.get_data(as_text=True))
    payment_data = {
    "transaction_amount": 0.01,
    "description": "Pagamento PIX",
    "payment_method_id": "pix",
    "notification_url":"https://5ca5-2804-52b8-c026-b100-5552-bcad-4676-2b73.ngrok-free.app/payment_data",
    "date_of_expiration":range_minute(8),
    "payer":{
        "email":"vitorkevin96@gmail.com"
    }
}
    payment_response= sdk.payment().create(payment_data)
    try:
     payment= payment_response['response']
     if payment:
      payment=payment['point_of_interaction']['transaction_data']['ticket_url']   
      return render_template('pagamento-mercadopago.html', link_pagamento= payment)
    except requests.exceptions.HTTPError as e:
     return 'Error:',e
@app.route('/payment_data',methods=['POST'])
def Get_payment_data():
    dados= request.get_json()
    payment_notification.update(dados)
    return dados
    


if(__name__=='__main__'):
    app.run()
