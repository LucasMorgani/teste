/******************************************************************************/
/*  Funcao: somente_numeros(obj){
    Parametros:
    - campo: campo a ser analisado
    Retorno: string
    Descricao: retorna a string do objeto somente com os números digitados    /*
/******************************************************************************/

function somente_numeros(campo){
   var campo_saida;
   campo_saida = '';

   total = campo.length;
   for(i = 0; i < total; i++){
      if ((campo.charCodeAt(i) > 47) && (campo.charCodeAt(i) < 58)){
         campo_saida = campo_saida + campo.charAt(i);
      }
   }

   campo = campo_saida;
   return campo;
}




/******************************************************************************/
/*  Funcao: trim()
    Parametros: nenhum
    Retorno: String
    Descricao: retira os espacos em branco da esquerda e da direita
               de um objeto String                                            */
/******************************************************************************/

function trim(){
    var retVal = this.ltrim();
    retVal = retVal.rtrim();
    return retVal;
}
String.prototype.trim = trim;

function ltrim(){
    var start = 0;
    var end = this.length;
    var retVal = this.substring(start, end);
    var esq = /^ /;
    while (retVal.match(esq)) {
        retVal = this.substring(++start, end);
    }
    return retVal;
}
String.prototype.ltrim = ltrim;
function rtrim(){
    var end = this.length;
    var retVal = this.substring(0, end);
    var dir = / $/;
    while (retVal.match(dir)) {
        retVal = this.substring(0, --end);
    }
    return retVal;
}
String.prototype.rtrim = rtrim;


/******************************************************************************/
/*  Funcao: validaData(data)
    Parametros: obj
    Retorno: String
    Descricao: valida e formata data informada pelo usuário                   */
/******************************************************************************/

function validaData(obj){
   var dia, mes, ano, ok, erro;
   data = somente_numeros(obj.value);
   dia = data.substring(0,2);
   mes = data.substring(2,4);
   ano = data.substring(4,8);

   if(data.length == 8){
      if((dia > 0) && (dia < 32)){
         if((mes > 0) && (mes < 13)){
            if(mes == 2){
               if(dia < 30){
                  if(dia == 29){
                     if(ano % 4 == 0){
                        ok = 1;
                     } else {
                        erro = 1;
                     }
                  } else {
                     ok = 1;
                  }
               } else {
                  erro = 1;
               }
            } else {
               if((mes == 4) || (mes == 6) || (mes == 9) || (mes == 11)){
                  if(dia < 31){
                     ok = 1;
                  } else {
                     erro = 1;
                  }
               } else {
                  ok = 1;
               }
            }
         } else {
            erro = 1;
         }
      } else {
         erro = 1;
      }
   } else {
      erro = 1;
   }

   if(ok == 1){
      data = dia + '/' + mes + '/' + ano;
   } else if(data != '') {
      data = '';
      alert('É necessário informar uma data válida!');
   }

   return data;
}

function validaHora(obj){
   var hora, minuto, segundo, ok, erro;
   hora_informada = somente_numeros(obj.value);
   hora = hora_informada.substring(0,2);
   minuto = hora_informada.substring(2,4);
   segundo = hora_informada.substring(4,6);

   if(hora_informada.length == 6){
      if((hora > 0) && (hora < 24)){
         if((minuto > 0) && (minuto < 60)){
			if((segundo > 0) && (segundo < 60)){
				ok = 1;
			} else {
				erro = 1;
			}
         } else {
            erro = 1;
         }
      } else {
         erro = 1;
      }
	} else{
		erro = 1;
	}

   if(ok == 1){
      hora_informada = hora + ':' + minuto + ':' + segundo;
   } else if(hora_informada != '') {
      hora_informada = '';
      alert('É necessário informar uma hora válida!');
   }

   return hora_informada;
}

function validaControle(obj){
   var  ok, erro;
   controle_informado = (obj.value);

   if(controle_informado.length == 19){
		ok = 1;
   } else{
		erro = 1;
	}

   if(ok == 1){
      controle_informado = controle_informado;
   } else if(controle_informado != '') {
      controle_informado = '';
      alert('Código de controle inválido!');
   }

   return controle_informado;
}

function validaCPF(valor) {
	var res;
	var resb;
	value = valor.trim();
	if (value.length < 11) resb = 1;
	if ((value.length == 11)){ //formato 000000000
		if (!(isNaN(value))){
			value = value.substr(0,3) + '.' +
					value.substr(3,3) + '.' +
					value.substr(6,3) + '-' +
					value.substr(9,2);
		}
	}
	else{ //formato 00.000.000-00
		if (value.length < 14)         resb = 1;
		if (isNaN(value.substr(0,3)))  resb = 1;
		if (value.substr(3,1) != '.')  resb = 1;
		if (isNaN(value.substr(4,3)))  resb = 1;
		if (value.substr(7,1) != '.')  resb = 1;
		if (isNaN(value.substr(8,3)))  resb = 1;
		if (value.substr(11,1) != '-') resb = 1;
		if (isNaN(value.substr(12,2))) resb = 1;
	}
	
	for (y = 0; y <= 9; y++){ //Testa se é tipo 00.000.000/0000-00
		t = y.toString(); 
		inv = t+t+t+'.'+t+t+t+'.'+t+t+t+'-'+t+t;
		if (value == inv)
			resb = 1;
	}
	
	if (res != 1){
		sum1 = 	(10 * Number(value.substr(0,1))) + 
				(9 * Number(value.substr(1,1))) + 
				(8 * Number(value.substr(2,1))) + 
				(7 * Number(value.substr(4,1))) + 
				(6 * Number(value.substr(5,1))) + 
				(5 * Number(value.substr(6,1))) + 
				(4 * Number(value.substr(8,1))) + 
				(3 * Number(value.substr(9,1))) + 
				(2 * Number(value.substr(10,1)));
		sum1 = sum1 % 11;
		if (sum1 < 2) {
		 res1 = 0;
		} else {
		 res1 = 11 - sum1;
		}
		sum = 	(11 * Number(value.substr(0,1))) + 
				(10 * Number(value.substr(1,1))) + 
				(9 * Number(value.substr(2,1))) + 
				(8 * Number(value.substr(4,1))) + 
				(7 * Number(value.substr(5,1))) + 
				(6 * Number(value.substr(6,1))) + 
				(5 * Number(value.substr(8,1))) + 
				(4 * Number(value.substr(9,1))) + 
				(3 * Number(value.substr(10,1)))+
				(2 * res1);
		sum = sum % 11;
		if (sum < 2) {
		 res = 0;
		} else {
		 res = 11 - sum;
		}
	}
	res_calculado = res1.toString() + res.toString();
	if (res_calculado != Number(value.substr(12,2)) || resb == 1) {
	//if (res != Number(value.substr(13,1)) || resb == 1) {
		return '';
	}
	return (value);
}

function validacpf_cnpj(fieldId) {
	
	e = document.getElementById(fieldId);
	
	if (e.value.trim() != '') {
		
		result = validaCPF(e.value);
		
		if (!result) {
			alert('CPF inválido!');
			e.focus();
			return false;
		}
		else {
			e.value = result;
			return true;
		}
	}
}