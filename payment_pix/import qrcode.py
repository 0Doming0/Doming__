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

print(gerar_image_link("/Lacro/client-request/zewpo"))