require("dotenv").config()

exports.handler = async function (event, context) {
  try {
    return {
      statusCode:200,
      body:JSON.stringify({
        keys:{
          apiKey : "AIzaSyDlbbB4bE3it7f6z2gyPdgf9Z8xFvyfEcA",
          authDomain : "doming-data.firebaseapp.com",
          databaseURL : "https://doming-data-default-rtdb.firebaseio.com",
          projectId : "doming-data",
          storageBucket : "doming-data.appspot.com",
          messagingSenderId : "677420543825",
          appId : "1:677420543825:web:8b6a3012dc2a3513b52d70",
          measurementId : "G-7L7HYQC1PJ",
        }
      })
    }
  }
  catch (error) {
    return {
      statusCode:500,
      body:JSON.stringify({
        error:"Algo deu errado com as chaves"
      })
    }
  }
};
