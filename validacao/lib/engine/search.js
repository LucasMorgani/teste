// configuração do Datepicker
function date_config(id){
	$(function(){
		$("#" + id).datepicker({showOn: "button",
    						   buttonImage: "imagens/data.png",
							   buttonImageOnly: true,
							   buttonText: 'Calendário'});
		$("#" + id).datepicker($.datepicker.regional["pt-BR"]);
	});
}

function foco(obj, msg){
alert(msg);
obj.focus();
return false;
}

/******************************************************************************
    Funções desta biblioteca:
    acceptNum() - permeti digitar apenas os caracteres de 0 a 9
    trim() - string - retira os espações em branco a direita e esquerda
    isAlfa() - boolean - verifica se o valor passado é string
    comparaData() - compara se uma data é maior/menor/igual a outra
    select2String() - string - monta string a partir das opções de um <select>
    truncFloat() - float - retorna o valor truncado em n casas decimais
    roundFloat() - float - retorna o valor arrendondado em n casas decimais
    float2Str() - string - retorna um valor númerico como String
 ******************************************************************************/


/******************************************************************************/
/*    Funcao: acceptNum()
    Parametros: event
    Descricao: permite que apenas os caracteres de 0 a 9 sejam digitados
/******************************************************************************/
var nav4 = window.Event ? true : false;
function acceptNum(evt){	
    // NOTE: Backspace = 8, Enter = 13, '0' = 48, '9' = 57	
    var key = nav4 ? evt.which : evt.keyCode;	
    return (key <= 13 || (key >= 48 && key <= 57));
}
function acceptNum2(evt){	
    // NOTE: Backspace = 8, Enter = 13, '0' = 48, '9' = 57, 'c' = 99, 'v' = 118
    var key = nav4 ? evt.which : evt.keyCode;
    var isCtrl = evt.ctrlKey ? true : false;
    //alert(key + ' / ' + isCtrl);
    return (key <= 13 || (key >= 48 && key <= 57) || (isCtrl && (key == 99 || key == 118)) );
}

/******************************************************************************/
/*    Funcao: trim()
    Parametros: nenhum
    Retorno: String
    Descricao: Retira os espacos em branco da esquerda e da direita
        de um objeto String*/
/******************************************************************************/
function trim(){
//    var re = / *(.*) */;
//    var retVal = this.replace(re, "$1");
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
/*    Funcao: trim()
    Parametros: nenhum
    Retorno: String
    Descricao: Retira os espacos em branco da esquerda e da direita
        de um objeto String*/
/******************************************************************************/
/*function trim(){
    var retVal = "";
    var start = 0;
    while ((start < this.length) && (this.charAt(start) == ' ')) {
    ++start;
    }
    var end = this.length;
    while ((end > 0) && (this.charAt(end - 1) == ' ')) {
    --end;
    }
    retVal = this.substring(start, end);
    return retVal;
}
String.prototype.trim = trim;*/


/******************************************************************************/
/*    Funcao: isAlfa(<value>)
    Parametros:
    - value : Valor a ser analisado como String
    Retorno: boolean
    Descricao: Verifica se um determinado valor contém apenas
        caracteres alfanuméricos */
/******************************************************************************/
function isAlfa( value)
{
    var expr= new RegExp("[A-Za-z ]+");
    return expr.test( value);
}

function isNum( value ) {
    var strValidos = "0123456789";
    var valor= new String(value);
    for( var i=0; i< valor.length; i++)
    {
        if( strValidos.indexOf(valor.charAt(i)) == -1)
            return false;
    }
    return true;
}

/******************************************************************************/
/*    Funcao: comparaData(<data_a>, <data_b>)
    Parametros:
    - data_a : String representando uma data válida
    - data_b : String representando uma data válida
    Retorno:
        -1 : menor
         0 : igual
         1 : maior
    Descricao: Verifica a data A em relação a data B */
/******************************************************************************/
function comparaData(data_a, data_b){
    var saida;
    var a_data = new Date(data_a.substr(6,4),data_a.substr(3,2),data_a.substr(0,2));
    var b_data = new Date(data_b.substr(6,4),data_b.substr(3,2),data_b.substr(0,2));
    saida = a_data.valueOf() < b_data.valueOf() ? -1 : a_data.valueOf() > b_data.valueOf() ? 1 : 0;
    return saida;
}

/******************************************************************************/
/*    Funcao: select2string(<nome_obj_in>, <nome_obj_out>){
    Parametros:
    - nome_obj_in : String representando uma entidade SELECT do HTML
    - nome_obj_out : String representando uma entidade INPUT do HTML
        (tipo HIDDEN, TEXT, ...)
    Retorno: Altera diretamente o conteúdo de "nome_obj_out"
    Descricao: Captura o conteúdo texto das opções selecionadas do "select"
        montando uma string com os dados separados por virgula /*
/******************************************************************************/
function select2string(nome_obj_in, nome_obj_out){
    var obj_in  = eval(document.getElementById(nome_obj_in) );
    var obj_out = eval(document.getElementById(nome_obj_out) );
    if (obj_in.selectedIndex >= 0 ) {
        obj_out.value = "";
        for(var i = 0 ; i < obj_in.options.length ; i++ )
            if (obj_in.options[i].selected)
                obj_out.value = (obj_out.value ? obj_out.value + ", " : "") + obj_in.options[i].text;
    }
}

/******************************************************************************/
/*    Funcao: truncFloat(<x>, <prec>){
    Parametros:
    - n : valor a ser "truncado"
    - prec : número de casas decimais
    Retorno: float
    Descricao: retorna o valor "truncado" com n casas decimais /*
/******************************************************************************/
function truncFloat(x,prec){
    var n = new Number();
    n = Math.floor(x * Math.pow(10,prec)) / Math.pow(10,prec);

    return n;
}

/******************************************************************************/
/*    Funcao: roundFloat(<x>, <prec>){
    Parametros:
    - n : valor a ser "arrendondado"
    - prec : número de casas decimais
    Retorno: float
    Descricao: retorna o valor "arrendondado" com n casas decimais /*
/******************************************************************************/
function roundFloat(x,prec){
    var n = new Number();
    n = Math.round(x * Math.pow(10,prec)) / Math.pow(10,prec);

    return n;
}

/******************************************************************************/
/*    Funcao: float2Str(<x>, <prec>){
    Parametros:
    - n : valor a ser analisado
    - prec : número de casas decimais
    Retorno: String
    Descricao: retorna um valor numérico em formato String com n casas decimais/*
/******************************************************************************/
function float2Str(x,prec){
    var n = new Number();
    n = roundFloat(x,prec);
    var s = new String();
    s = n.toString();
    if(s.indexOf('.') < 0) s += '.';

    while(s.length - s.indexOf('.') - 1 < prec) s += '0';

    return s;
}

/*
 Variáveis das funções de calendário
*/
var weekend = [0,6];
var weekendColor = "#cccccc";
var css_file = "css.css";
var classe = "edit";
var titulo = 'Calend&aacute;rio';
var fd = 0;
var formato_data = "DD/MM/YYYY"; // "MM/DD/YYYY";

var next_month = "<img src='imagens/Mes_proximo.gif'  border=0 alt='Pr&oacute;ximo M&ecirc;s'>";
var last_month = "<img src='imagens/Mes_anterior.gif' border=0 alt='M&ecirc;s Anterior'>";
var next_year  = "<img src='imagens/Ano_proximo.gif'  border=0 alt='Pr&oacute;ximo Ano'>";
var last_year  = "<img src='imagens/Ano_anterior.gif' border=0 alt='Ano Anterior'>";

var gNow = new Date();
var ggWinCal;
isNav = (navigator.appName.indexOf("Netscape") != -1) ? true : false;
isIE = (navigator.appName.indexOf("Microsoft") != -1) ? true : false;

Calendar.Months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

// Non-Leap year Month days..
Calendar.DOMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// Leap year Month days..
Calendar.lDOMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function Calendar(p_item, p_WinCal, p_month, p_year, p_format) {
    if ((p_month == null) && (p_year == null))    return;

    if (p_WinCal == null)
        this.gWinCal = ggWinCal;
    else
        this.gWinCal = p_WinCal;

    if (p_month == null) {
        this.gMonthName = null;
        this.gMonth = null;
        this.gYearly = true;
    } else {
        this.gMonthName = Calendar.get_month(p_month);
        this.gMonth = new Number(p_month);
        this.gYearly = false;
    }

    this.gYear = p_year;
    this.gFormat = p_format;
    this.gBGColor = "white";
    this.gFGColor = "black";
    this.gTextColor = "black";
    this.gHeaderColor = "black";
    this.gReturnForm = document.getElementById(p_item).form.name;
    this.gReturnItem = p_item;

}

Calendar.get_month = Calendar_get_month;
Calendar.get_daysofmonth = Calendar_get_daysofmonth;
Calendar.calc_month_year = Calendar_calc_month_year;
Calendar.print = Calendar_print;

function Calendar_get_month(monthNo) {
    return Calendar.Months[monthNo];
}

function Calendar_get_daysofmonth(monthNo, p_year) {
    /*
    Check for leap year ..
    1.Years evenly divisible by four are normally leap years, except for...
    2.Years also evenly divisible by 100 are not leap years, except for...
    3.Years also evenly divisible by 400 are leap years.
    */
    if ((p_year % 4) == 0) {
        if ((p_year % 100) == 0 && (p_year % 400) != 0)
            return Calendar.DOMonth[monthNo];

        return Calendar.lDOMonth[monthNo];
    } else
        return Calendar.DOMonth[monthNo];
}

function Calendar_calc_month_year(p_Month, p_Year, incr) {
    /*
    Will return an 1-D array with 1st element being the calculated month
    and second being the calculated year
    after applying the month increment/decrement as specified by 'incr' parameter.
    'incr' will normally have 1/-1 to navigate thru the months.
    */
    var ret_arr = new Array();

    if (incr == -1) {
        // B A C K W A R D
        if (p_Month == 0) {
            ret_arr[0] = 11;
            ret_arr[1] = parseInt(p_Year) - 1;
        }
        else {
            ret_arr[0] = parseInt(p_Month) - 1;
            ret_arr[1] = parseInt(p_Year);
        }
    } else if (incr == 1) {
        // F O R W A R D
        if (p_Month == 11) {
            ret_arr[0] = 0;
            ret_arr[1] = parseInt(p_Year) + 1;
        }
        else {
            ret_arr[0] = parseInt(p_Month) + 1;
            ret_arr[1] = parseInt(p_Year);
        }
    }

    return ret_arr;
}

function Calendar_print() {
    ggWinCal.print();
}

function Calendar_calc_month_year(p_Month, p_Year, incr) {
    /*
    Will return an 1-D array with 1st element being the calculated month
    and second being the calculated year
    after applying the month increment/decrement as specified by 'incr' parameter.
    'incr' will normally have 1/-1 to navigate thru the months.
    */
    var ret_arr = new Array();

    if (incr == -1) {
        // B A C K W A R D
        if (p_Month == 0) {
            ret_arr[0] = 11;
            ret_arr[1] = parseInt(p_Year) - 1;
        }
        else {
            ret_arr[0] = parseInt(p_Month) - 1;
            ret_arr[1] = parseInt(p_Year);
        }
    } else if (incr == 1) {
        // F O R W A R D
        if (p_Month == 11) {
            ret_arr[0] = 0;
            ret_arr[1] = parseInt(p_Year) + 1;
        }
        else {
            ret_arr[0] = parseInt(p_Month) + 1;
            ret_arr[1] = parseInt(p_Year);
        }
    }

    return ret_arr;
}

// This is for compatibility with Navigator 3, we have to create and discard one object before the prototype object exists.
new Calendar();

Calendar.prototype.getMonthlyCalendarCode = function()
{
    var vCode = "";
    var vHeader_Code = "";
    var vData_Code = "";

    // Begin Table Drawing code here..
    vCode = vCode + "    <table border=1 width='235' bgcolor=\"" + this.gBGColor + "\">\n";

    vHeader_Code = this.cal_header();
    vData_Code = this.cal_data();
    vCode = vCode + vHeader_Code + vData_Code;

    vCode = vCode + "    </table>\n";

    return vCode;
}

Calendar.prototype.show = function() {
    var vCode = "";

    this.gWinCal.document.open();

    // Setup the page...
    this.wwrite("<html>");
    this.wwrite("  <head>\n    <title>Calendario</title>");
    this.wwrite("    <link rel='stylesheet' href='" + css_file +"' type='text/css'>");
    this.wwrite("  </head>");

    this.wwrite("  <body " +
        ( this.gLinkColor ? "link=\"" + this.gLinkColor + "\" " : "" ) +
        ( this.gLinkColor ? "vlink=\"" + this.gLinkColor + "\" " : "" ) +
        ( this.gLinkColor ? "alink=\"" + this.gLinkColor + "\" " : "" ) +
        ( this.gTextColor ? "text=\"" + this.gTextColor + "\">" : "" ) );
    this.wwriteA("    <b>");
    this.wwriteA(titulo);
    this.wwrite("</b><br><br>");

    // Show navigation buttons
    var prevMMYYYY = Calendar.calc_month_year(this.gMonth, this.gYear, -1);
    var prevMM = prevMMYYYY[0];
    var prevYYYY = prevMMYYYY[1];

    var nextMMYYYY = Calendar.calc_month_year(this.gMonth, this.gYear, 1);
    var nextMM = nextMMYYYY[0];
    var nextYYYY = nextMMYYYY[1];

//    this.wwrite("<TABLE WIDTH='100%' BORDER=1 CELLSPACING=0 CELLPADDING=0 BGCOLOR='#e0e0e0'><TR><TD ALIGN=center>");
    this.wwrite("    <table class='calendario' width='235'>")
    this.wwrite("      <tr><td align=center width='15%'><a href=\"" +
        "javascript:window.opener.Build(" +
        "'" + this.gReturnItem + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)-1) + "', '" + this.gFormat + "'" +
        ");" +
        "\" alt='Ano Anterior'>" + last_year + "<\/a></td>");
    this.wwrite("        <td align=center width='14%' class='calendario'><a href=\"" +
        "javascript:window.opener.Build(" +
        "'" + this.gReturnItem + "', '" + prevMM + "', '" + prevYYYY + "', '" + this.gFormat + "'" +
        ");" +
        "\" alt='M&ecirc;s Anterior'>" + last_month + "<\/a></td>");
    this.wwrite("        <td align=center class='calendario'><b>"+this.gMonthName + " " + this.gYear+"</b></td>");
    this.wwrite("        <td align=center width='14%'><a href=\"" +
        "javascript:window.opener.Build(" +
        "'" + this.gReturnItem + "', '" + nextMM + "', '" + nextYYYY + "', '" + this.gFormat + "'" +
        ");" +
        "\" alt='Pr&oacute;ximo M&ecirc;s'>" + next_month + "<\/a></td>");
    this.wwrite("        <td align=center width='15%'><a href=\"" +
        "javascript:window.opener.Build(" +
        "'" + this.gReturnItem + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)+1) + "', '" + this.gFormat + "'" +
        ");" +
        "\" alt='Pr&oacute;ximo Ano'>" + next_year + "<\/a></td>\n      </tr>\n    </table><br>");

    // Get the complete calendar code for the month..
    vCode = this.getMonthlyCalendarCode();
    this.wwrite(vCode);

    this.wwrite("  </body>\n</html>");
    this.gWinCal.document.close();
}

Calendar.prototype.showY = function() {
    var vCode = "";
    var i;
    var vr, vc, vx, vy;        // Row, Column, X-coord, Y-coord
    var vxf = 285;             // X-Factor
    var vyf = 180;             // Y-Factor
    var vxm = 10;              // X-margin
    var vym;                   // Y-margin
    if (isIE)    vym = 75;
    else if (isNav)    vym = 45;

    this.gWinCal.document.open();

    this.wwrite("<html>");
    this.wwrite("  <head>\n    <title>Calendar</title>");
    this.wwrite("    <link rel='stylesheet' href='" + css_file +"' type='text/css'>");
    this.wwrite("    <style type='text/css'>\n<!--");
    for (i=0; i<12; i++) {
        vc = i % 3;
        if (i>=0 && i<= 2)    vr = 0;
        if (i>=3 && i<= 5)    vr = 1;
        if (i>=6 && i<= 8)    vr = 2;
        if (i>=9 && i<= 11)    vr = 3;

        vx = parseInt(vxf * vc) + vxm;
        vy = parseInt(vyf * vr) + vym;

        this.wwrite(".lclass" + i + " {position:absolute;top:" + vy + ";left:" + vx + ";}");
    }
    this.wwrite("-->\n    </style>");
    this.wwrite("  </head>");

    this.wwrite("  <body " +
        "link=\"" + this.gLinkColor + "\" " +
        "vlink=\"" + this.gLinkColor + "\" " +
        "alink=\"" + this.gLinkColor + "\" " +
        "text=\"" + this.gTextColor + "\">");
    this.wwriteA("    <b>");
    this.wwriteA("Ano : " + this.gYear);
    this.wwrite("</b><br>");

    // Show navigation buttons
    var prevYYYY = parseInt(this.gYear) - 1;
    var nextYYYY = parseInt(this.gYear) + 1;

//    this.wwrite("<TABLE WIDTH='100%' BORDER=1 CELLSPACING=0 CELLPADDING=0 BGCOLOR='#e0e0e0'><TR><TD ALIGN=center>");
    var botoes = '';
    if (isIE){
        this.wwrite("<div id=\"button\">");
        botoes = "<div id=\"button\" style=\"{position:absolute;top:"+(vym + vyf*4)+";left:"+vxm+";}\">\n";
        }
    else if (isNav){
        this.wwrite("<layer id=\"button\">");
        botoes += "<layer id=\"button\" style=\"{position:absolute;top:"+(vym + vyf*4)+";left:"+vxm+";}\">\n";
        }
    botoes += "    <table width='"+(vxf*3)+"'>\n" +
              "      <tr><td width='150' align=center><a href=\"" +
              "javascript:window.opener.Build(" +
              "'" + this.gReturnItem + "', null, '" + prevYYYY + "', '" + this.gFormat + "'" +
              ");" +
              "\" alt='Ano Anterior'>" + last_year + "<\/a></td>\n"
    botoes += "        <td align=center class='calendario'>&nbsp;</td>\n";
    botoes += "        <td width='150'><a href=\"" +
        "javascript:window.opener.Build(" +
        "'" + this.gReturnItem + "', null, '" + nextYYYY + "', '" + this.gFormat + "'" +
        ");" +
        "\" alt='Pr&oacute;ximo Ano'>" + next_year + "<\/a></td>\n      </tr>\n    </table><br>\n";

    this.wwrite("    <table width='"+(vxf*3)+"'>");
    this.wwrite("      <tr><td width='150' align=center><a href=\"" +
        "javascript:window.opener.Build(" +
        "'" + this.gReturnItem + "', null, '" + prevYYYY + "', '" + this.gFormat + "'" +
        ");" +
        "\" alt='Ano Anterior'>" + last_year + "<\/a></td>");
    this.wwrite("        <td align=center class='calendario'>&nbsp;</td>");
    this.wwrite("        <td width='150'><a href=\"" +
        "javascript:window.opener.Build(" +
        "'" + this.gReturnItem + "', null, '" + nextYYYY + "', '" + this.gFormat + "'" +
        ");" +
        "\" alt='Pr&oacute;ximo Ano'>" + next_year + "<\/a></td>\n      </tr>\n    </table><br>");
    if (isIE) {
        this.wwrite("</div>");
        botoes += "</div>\n";
    }
    else if (isNav) {
        this.wwrite("</layer>");
        botoes += "</layer>\n";
    }
    // Get the complete calendar code for each month..
    var j;
    for (i=11; i>=0; i--) {
        if (isIE)
            this.wwrite("<div id=\"layer" + i + "\" class=\"lclass" + i + "\">");
        else if (isNav)
            this.wwrite("<layer id=\"layer" + i + "\" class=\"lclass" + i + "\">");

        this.gMonth = i;
        this.gMonthName = Calendar.get_month(this.gMonth);
        vCode = this.getMonthlyCalendarCode();
        this.wwrite(this.gMonthName + "/" + this.gYear + "<br>");
        this.wwrite(vCode);

        if (isIE)
            this.wwrite("</div>");
        else if (isNav)
            this.wwrite("</layer>");
    }
    this.wwrite(botoes);
    this.wwrite("    <br>\n  </body>\n</html>");
    this.gWinCal.document.close();
}

Calendar.prototype.wwrite = function(wtext) {
    this.gWinCal.document.writeln(wtext);
}

Calendar.prototype.wwriteA = function(wtext) {
    this.gWinCal.document.write(wtext);
}

Calendar.prototype.cal_header = function() {
    var vCode = "";

    vCode = vCode + "      <tr class='calendario'>\n";
    vCode = vCode + "        <td class='calendario' width='15%'><b>Dom</b></td>\n";
    vCode = vCode + "        <td class='calendario' width='14%'><b>Seg</b></td>\n";
    vCode = vCode + "        <td class='calendario' width='14%'><b>Ter</b></td>\n";
    vCode = vCode + "        <td class='calendario' width='14%'><b>Qua</b></td>\n";
    vCode = vCode + "        <td class='calendario' width='14%'><b>Qui</b></td>\n";
    vCode = vCode + "        <td class='calendario' width='14%'><b>Sex</b></td>\n";
    vCode = vCode + "        <td class='calendario' width='15%'><b>S&aacute;b</b></td>\n";
    vCode = vCode + "      </tr>\n";

    return vCode;
}

Calendar.prototype.cal_data = function() {
    var vDate = new Date();
    vDate.setDate(1);
    vDate.setMonth(this.gMonth);
    vDate.setFullYear(this.gYear);

    var vFirstDay=vDate.getDay();
    var vDay=1;
    var vLastDay=Calendar.get_daysofmonth(this.gMonth, this.gYear);
    var vOnLastDay=0;
    var vCode = "";

    /*
    Get day for the 1st of the requested month/year..
    Place as many blank cells before the 1st day of the month as necessary.
    */

    vCode = vCode + "      <tr>\n";
    for (i=0; i<vFirstDay; i++) {
        vCode = vCode + "        <td width='14%'" + this.write_weekend_string(i) + "> </td>\n";
//        vCode = vCode + "        <td width='14%' class='colorida'><font class='" + classe + "'> </font></td>\n";
    }

    // Write rest of the 1st week
    for (j=vFirstDay; j<7; j++) {
        var style = this.format_day(vDay);
        var text = (style.search('alerta') > 0) ? "<font style='color:red'><b>" + vDay + "</b></font>" : vDay;
        vCode = vCode + "        <td width='14%'" + this.write_weekend_string(j) + style +">" +
            "<a href='#' " +
                "onClick=\"var el = self.opener.document." + this.gReturnForm + "." + this.gReturnItem + "; el.value='" +
                this.format_data(vDay) +
                "'; el.onblur(); window.close();\">" +
                text +
            "</a>" +
            "</td>\n";
        vDay=vDay + 1;
    }
    vCode = vCode + "      </tr>\n";

    // Write the rest of the weeks
    for (k=2; k<7; k++) {
        vCode = vCode + "      <tr>\n";

        for (j=0; j<7; j++) {
            var style = this.format_day(vDay);
            var text = (style.search('alerta') > 0) ? "<font style='color:red'><b>" + vDay + "</b></font>" : vDay;
            vCode = vCode + "        <td width='14%' " + ( j == 0 || j == 6 ? "class='colorida'" : '' ) + style + ">" +
                "<a href='#' " +
                    "onClick=\"var el = self.opener.document." + this.gReturnForm + "."  + this.gReturnItem + "; el.value='" +
                    this.format_data(vDay) +
                    "'; el.onblur(); window.close();\">" +
                    text +
                "</a>" +
                "</td>\n";
            vDay=vDay + 1;

            if (vDay > vLastDay) {
                vOnLastDay = 1;
                break;
            }
        }

        if (j == 6)
            vCode = vCode + "      </tr>\n";
        if (vOnLastDay == 1)
            break;
    }

    // Fill up the rest of last week with proper blanks, so that we get proper square blocks
    for (m=1; m<(7-j); m++) {
        if (this.gYearly)
            vCode = vCode + "        <td width='14%'" + this.write_weekend_string(j+m) +
            " class='colorida'></td>\n";
        else
            vCode = vCode + "        <td width='14%'" + this.write_weekend_string(j+m) +
            " class='colorida'>" + m + "</td>\n";
    }

    return vCode;
}

Calendar.prototype.format_day = function(vday) {
    var vNowDay = gNow.getDate();
    var vNowMonth = gNow.getMonth();
    var vNowYear = gNow.getFullYear();
    var style = '';
    var classe = '';

    var vDate =  eval(document.getElementById(this.gReturnItem)).value;

    if (vDate != '') {
        var Day = vDate.substr(0,2) * 1;
        var Month = vDate.substr(3,2) * 1 - 1;
        var Year = vDate.substr(6,4);
    }
    if (vday == vNowDay && this.gMonth == vNowMonth && this.gYear == vNowYear)
        classe = "class='alerta'";

    if (vday == Day && this.gMonth == Month && this.gYear == Year)
        style = " style='background-color:#8FFFFF;'";
    return (classe + style);

}

Calendar.prototype.write_weekend_string =
function(vday) {
    var i;

    // Return special formatting for the weekend day.
    for (i=0; i<weekend.length; i++) {
        if (vday == weekend[i])
            return (" bgcolor=\"" + weekendColor + "\"");
    }

    return "";
}

Calendar.prototype.format_data = function(p_day) {
    var vData;
    var vMonth = 1 + this.gMonth;
    vMonth = (vMonth.toString().length < 2) ? "0" + vMonth : vMonth;
    var vMon = Calendar.get_month(this.gMonth).substr(0,3).toUpperCase();
    var vFMon = Calendar.get_month(this.gMonth).toUpperCase();
    var vY4 = new String(this.gYear);
//    var vY2 = new String(this.gYear.substr(2,2));
    var vDD = (p_day.toString().length < 2) ? "0" + p_day : p_day;

    switch (this.gFormat) {
        case "MM\/DD\/YYYY" :
            vData = vMonth + "\/" + vDD + "\/" + vY4;
            break;
        case "MM\/DD\/YY" :
            vData = vMonth + "\/" + vDD + "\/" + vY2;
            break;
        case "MM-DD-YYYY" :
            vData = vMonth + "-" + vDD + "-" + vY4;
            break;
        case "MM-DD-YY" :
            vData = vMonth + "-" + vDD + "-" + vY2;
            break;

        case "DD\/MON\/YYYY" :
            vData = vDD + "\/" + vMon + "\/" + vY4;
            break;
        case "DD\/MON\/YY" :
            vData = vDD + "\/" + vMon + "\/" + vY2;
            break;
        case "DD-MON-YYYY" :
            vData = vDD + "-" + vMon + "-" + vY4;
            break;
        case "DD-MON-YY" :
            vData = vDD + "-" + vMon + "-" + vY2;
            break;

        case "DD\/MONTH\/YYYY" :
            vData = vDD + "\/" + vFMon + "\/" + vY4;
            break;
        case "DD\/MONTH\/YY" :
            vData = vDD + "\/" + vFMon + "\/" + vY2;
            break;
        case "DD-MONTH-YYYY" :
            vData = vDD + "-" + vFMon + "-" + vY4;
            break;
        case "DD-MONTH-YY" :
            vData = vDD + "-" + vFMon + "-" + vY2;
            break;

        case "DD\/MM\/YYYY" :
            vData = vDD + "\/" + vMonth + "\/" + vY4;
            break;
        case "DD\/MM\/YY" :
            vData = vDD + "\/" + vMonth + "\/" + vY2;
            break;
        case "DD-MM-YYYY" :
            vData = vDD + "-" + vMonth + "-" + vY4;
            break;
        case "DD-MM-YY" :
            vData = vDD + "-" + vMonth + "-" + vY2;
            break;

        default :
            vData = vMonth + "\/" + vDD + "\/" + vY4;
    }

    return vData;
}

function Build(p_item, p_month, p_year, p_format) {
    var p_WinCal = ggWinCal;
    var gCal = new Calendar(p_item, p_WinCal, p_month, p_year, p_format);

    // Customize your Calendar here..
    gCal.gBGColor="white";
    gCal.gLinkColor="black";
    gCal.gTextColor="black";
    gCal.gHeaderColor="darkgreen";

    // Choose appropriate show function
    if (gCal.gYearly)
        gCal.showY();
    else
        gCal.show();
}

function show_calendar() {
    /*
        p_month : 0-11 for Jan-Dec; 12 for All Months.
        p_year    : 4-digit year
        p_format: Date format (mm/dd/yyyy, dd/mm/yy, ...)
        p_item    : Return Item.
    */
    var p_item = eval( document.getElementById(arguments[0]) );
//    var strData = eval(p_item);

    var strData = p_item;
    if (strData.value) {
        var dia = strData.value.substr(0,2);
        var mes = strData.value.substr(3,2);
        var ano = strData.value.substr(6,4);
        var strData2 = new String(ano+'-'+mes+'-'+dia);
    }

    p_month = (arguments[1] == null) ? ( (mes == null || mes == "" ) ? new String( gNow.getMonth() ) : mes * 1 - 1 ) :  arguments[1];
    p_year = (arguments[2] == "" || arguments[2] == null) ? ( (ano == null || ano == "") ? new String( gNow.getFullYear().toString() ) : ano * 1 ) :  arguments[1];
    p_format = (arguments[3] == null) ? formato_data : arguments[3];

    vWinCal = window.open("", "Calendar", "width=250,height=250,status=no,resizable=no,top=200,left=200");
    vWinCal.opener = self;
    ggWinCal = vWinCal;

    Build(p_item.id, p_month, p_year, p_format);
}
/*
Yearly Calendar Code Starts here
*/
function show_yearly_calendar(p_item, p_year, p_format) {
    // Load the defaults..
    if (p_year == null || p_year == "")
        p_year = new String(gNow.getFullYear().toString());
    if (p_format == null || p_format == "")
        p_format = formato_data;

    var vWinCal = window.open("", "Calendar", "scrollbars=yes,resizable=yes,status=no");
    vWinCal.opener = self;
    ggWinCal = vWinCal;

    Build(p_item, null, p_year, p_format);
}


/**********************
    Outras funções
 **********************/

        function FiltraCampo(campo){
        if (fd == 1) return false;
        var s = "";
        var cp = "";
        vr = campo.value.trim();
        tam = vr.length;
        // Função alterada por Ariel em 16/10/2006 para funcionar no inventário na ELV
		s = vr;
		s = s.replace(/\//g, '');
		s = s.replace(/-/g, '');
		s = s.replace(/\./g, '');
		s = s.replace(/,/g, '');
        if ( isNum(s) ) {
            campo.value = s;
            return cp = campo.value
        }
        else {
            foco(campo, 'O campo de tipo DATA deve ter o formato DDMMYYYY.')
            return cp = '';
        }
      }
/*
      function FiltraCampo(campo){
        if (fd == 1) return false;
        var s = "";
        var cp = "";
        vr = campo.value.trim();
        tam = vr.length;
        for (i = 0; i < tam ; i++) {
            if (vr.substring(i,i + 1) != "/" && vr.substring(i,i + 1) != "-" && vr.substring(i,i + 1) != "."  && vr.substring(i,i + 1) != "," ) {
                s = s + vr.substring(i,i + 1);
            }
        }
        if ( isNum(s) ) {
            campo.value = s;
            return cp = campo.value
        }
        else {
            foco(campo, 'O campo de tipo DATA deve ter o formato DDMMYYYY.')
            return cp = '';
        }
      }

	  */
      function FormataData(campo){
        fd = 0;
        campo.value = FiltraCampo(campo);
        var vr = campo.value;
        var tam = vr.length;
        if ( (tam) && ( tam != 8 ) ) {
            fd = 1;
            foco(campo, 'O campo de tipo DATA deve ter o formato DD/MM/YYYY.')
            return false;
        }
        if ( tam > 2 && tam < 5 )
            campo.value = vr.substr( 0, tam - 2  ) + '/' + vr.substr( tam - 2, tam );
        if ( tam >= 5 && tam <= 10 )
            campo.value = vr.substr( 0, 2 ) + '/' + vr.substr( 2, 2 ) + '/' + vr.substr( 4, 4 );
        return true;
      }

//**** Função Valida Campo Data / Gera Mensagem***
// Esta função gera uma mensagem se o campo data estiver errado.
//
//************************************
function validaDataMSG(campo){
    var obj_data, data;
    obj_data = eval(campo);
    data = obj_data.value;
    if ( (obj_data.value) && !validaData(obj_data) ) {
        alert('Data inválida.');
        obj_data.focus();
        obj_data.value = data;
        return false
    }
}


/****** Função Válida Campo Data **
Esta função ignora qualquer caracter que não seja numero e "_", invalida demais
teclas, permitindo uma quantidade determinada de numeros e trata outras condições
impedindo que o usuário altere o campo data (senão a partir do final do campo).
*/

/***********************************/
function validaData(campo)
{
    var strData = campo.value;
    dia = strData.substr(0,2);
    mes = strData.substr(3,2);
    ano = strData.substr(6);

    if (strData.value == '' || strData.length == 0) {
        return false;
    }
    if (mes < 1 || mes > 12) {
        return false;
    }
    if (dia < 1 || dia > 31) {
        return false;
    }
    if ((mes==4 || mes==6 || mes==9 || mes==11) &&
        dia==31) {
        return false;
    }
    if (strData.indexOf("_") != -1) {
        return false;
    }
    if (mes == 2) {
        var isleap = (ano % 4 == 0 && (ano % 100 != 0 || ano % 400 == 0))
        if (dia>29 || (dia==29 && !isleap)) {
            return false;
        }
    }
    return true;
}

/**********************************
Funções de edição
**********************************/

function search_select(suf, query, chave){
    var id_display = 'display_' + suf;
    var id_search = 'search_' + suf;

    var display = document.getElementById(id_display);
    var search = document.getElementById(id_search);

    open('sistema.php?ACAO=search_consulta.php&QUERY='+mnsEncodeURL(query)+'&INPUT='+id_search+'&CHAVE='+mnsEncodeURL(chave),'consulta');

    mnsClearSelect(id_search);
    display.style.display = 'none';
    search.style.display = 'inline';
    var timeout = setTimeout('document.getElementById(\''+id_search+'\').focus()',100);
}

function search_select_pk(suf, query, chave) {
    var id = document.getElementById(suf);
    if (id.value != chave && chave != '') {
	    search_select(suf, query, chave);
    }
    if (chave == '') {
	    var id_display = 'display_' + suf;
	    var id_search = 'search_' + suf;

	    var display = document.getElementById(id_display);
	    var search = document.getElementById(id_search);
	    var id = document.getElementById(suf);
	    
	    display.value = '';
		search.value = '';
		id.value = '';

    }
}

function search_show_pk(suf) {
    search_show(suf);
    var pk = document.getElementById('pk_' + suf);
    var id = document.getElementById(suf);
	pk.value = id.value;
}

function search_show(suf) {
    var id_display = 'display_' + suf;
    var id_search = 'search_' + suf;

    var display = document.getElementById(id_display);
    var search = document.getElementById(id_search);
    var id = document.getElementById(suf);

    search.style.display = 'none';
    display.style.display = 'inline';

    id.value = search.value;
    if(id.value) display.value = search.options[search.selectedIndex].text;
    else display.value = '';
}

function MM_openBrWindow(theURL,winName,features) {
    window.open(theURL,winName,features);
}

function windowOpen(theURL,winName,features) {
    window.open(theURL,winName,features);
}

function mnsEncodeURL(str0){
    var str = new String(str0);
    str = str.replace(/%/g,'%25');
    str = str.replace(/'/g,'%27');
    str = str.replace(/\+/g,'%2B');
    str = str.replace(/ /g,'+');
    str = str.replace(/#/g,'%23');
    str = str.replace(/&/g,'%26');
    str = str.replace(/=/g,'%3D');
    str = str.replace(/à/g,'%E0');
    str = str.replace(/À/g,'%C0');
    str = str.replace(/á/g,'%E1');
    str = str.replace(/Á/g,'%C1');
    str = str.replace(/é/g,'%E9');
    str = str.replace(/É/g,'%C9');
    str = str.replace(/í/g,'%ED');
    str = str.replace(/Í/g,'%CD');
    str = str.replace(/ó/g,'%F3');
    str = str.replace(/Ó/g,'%D3');
    str = str.replace(/ú/g,'%FA');
    str = str.replace(/Ú/g,'%DA');
    str = str.replace(/â/g,'%E2');
    str = str.replace(/Â/g,'%C2');
    str = str.replace(/ê/g,'%EA');
    str = str.replace(/Ê/g,'%CA');
    str = str.replace(/ô/g,'%F4');
    str = str.replace(/Ô/g,'%D4');
    str = str.replace(/ã/g,'%E3');
    str = str.replace(/Ã/g,'%C3');
    str = str.replace(/õ/g,'%F5');
    str = str.replace(/Õ/g,'%D5');
    str = str.replace(/ç/g,'%E7');
    str = str.replace(/Ç/g,'%C7');
	str = str.replace(/º/g,'%BA');
	str = str.replace(/ª/g,'%AA');
	str = str.replace(/:/g,'%3A');

    return str;
}

function mnsClearSelect(n) {
    document.getElementById(n).options.length = 0;
}

function mnsAddOption(n, k, v) {
    var e = document.getElementById(n)
    e[e.options.length] = new Option(v, k);
}

function mnsSearch(iframe, db, sql, n, v, c) {
    s = '';
    s = s + 'sistema.php?ACAO=consulta.php';
    s = s + '&DB=' + mnsEncodeURL(db);
    s = s + '&SQL=' + mnsEncodeURL(sql);
    s = s + '&SELECT=' + mnsEncodeURL(n);
    s = s + '&OPTION_VALUE=' + mnsEncodeURL(v);
    s = s + '&OPTION_CONTENT='+ mnsEncodeURL(c);

    open(s, iframe);
}

function mnsSetInputValue(n, v) {
    var e = document.getElementById(n);

    e.value = v;
}

function mnsSetDivValue(n, v) {
    var e = document.getElementById(n);

    e.innerHTML = v;
}

function mnsSoma(classe, destino) {
    var c = document.edicao.elements;

    l = c.length;

    t = 0;

    for (i = 0; i < l; i++) {
        e = c[i];

        if (e.className.indexOf(classe) != -1 && e.className.indexOf('DEL') == -1) {
            v = parseFloat(e.value);

            if (!isNaN(v)) {
                if(e.className.indexOf('SUBTR') == -1)
                    t = t + parseFloat(e.value);
                else
                    t = t - parseFloat(e.value);
            }
        }
    }

    destino.value = t;
}

function mnsMarkDeleted(classe, o) {
    var c = document.edicao.elements;

    l = c.length;

    t = 0;

    for (i = 0; i < l; i++) {
        e = c[i];

        if (e.className.indexOf(classe) != -1) {
            if (o.checked) {
                if (e.type == 'text' || e.type == 'password' || e.type == 'textarea') { // acrescentada verificação para textarea, modificado por Jefferson em15/4/2003
                    e.readOnly = true;
                }
                else {
                    e.disabled = true;
                }

                e.style.textDecoration = 'line-through';
                e.style.backgroundColor = 'silver';
                e.className = e.className + ' ' + o.id;
            }
            else {
                e.className = e.className.replace(o.id, '');
                e.className = e.className.replace('  ', ' ');

                if (e.className.indexOf('DEL') == -1) {
                    if (e.type == 'text' || e.type == 'password' || e.type == 'textarea') { // acrescentada verificação para textarea, modificado por Jefferson em15/4/2003
                        e.readOnly = false;
                    }
                    else {
                        e.disabled = false;
                    }

                    e.style.textDecoration = '';
                    e.style.backgroundColor = '';
                }
            }
        }
    }
}

function mnsEnableDel() {
    var c = document.edicao.elements;

    l = c.length;

    t = 0;

    for (i = 0; i < l; i++) {
        e = c[i];

        if (e.type == 'checkbox' && e.className.indexOf('exc') != -1) {
            if (e.disabled) {
                e.disabled = false;
            }
        }
    }
}

function mnsReviewDeleted() {
    var c = document.edicao.elements;

    l = c.length;

    t = 0;

    for (i = 0; i < l; i++) {
        e = c[i];

        if (e.className.indexOf('DEL') != -1) {
            if (e.type == 'text' || e.type == 'password' || e.type == 'textarea') { // acrescentada verificação para textarea, modificado por Jefferson em15/4/2003
                e.readOnly = true;
            }
            else {
                e.disabled = true;
            }

            e.style.textDecoration = 'line-through';
            e.style.backgroundColor = 'silver';
        }
    }
}

var mns_aux;

function mnsTotalizar(id,coluna){
    var total = 0, i = 0, e, eTotal, v, r;

    r = new RegExp(/[^0-9,\.-]/);
    while(e = document.getElementById(id + '_' + i + '_DADOS_' + coluna)){
        // validação
        if(res = r.exec(e.value) != null){
            alert('Dado inválido');
            mns_aux = e;
            setTimeout('mns_aux.focus()', 100);
            return;
        }
        v = e.value.replace(/,/, '.');
        v = parseFloat(v);

        if(!isNaN(v)){
            total += v;
            e.value = moeda(v);
        }
        i++;
    }
    eTotal = document.getElementById('mnsTotal_' + id + '_' + coluna);
    eTotal.value = moeda(total);
}

function parseFloatBr(v){
	v = new String(v);
	v = v.replace(/,/, '.');
	if(v == '') v = 0;
	v = parseFloat(v);
	return v;
}

function moeda(v){
    var s;

	v = parseFloatBr(v);
	if(isNaN(v)) v = 0;
    v = Math.round(v * 100) / 100;
    s = new String(v);
    if(s.indexOf('.') == -1) s += '.00';
    else if(s.indexOf('.') == s.length - 2) s += '0';
    return s.replace(/\./, ',');
}

function mnsContador(id,coluna){
    var total = 0, i = 0, e, eTotal, v;

    while(e = document.getElementById(id + '_' + i + '_DADOS_' + coluna)){
        v = new String(e.value);

        if(v != '') total ++;
        i++;
    }
    eTotal = document.getElementById('mnsContador_' + id + '_' + coluna);
	var s_string = ((total > 1) ? 's' : '');
    eTotal.innerHTML = '<nobr><b>Total :</b> ' + total + ' registro' + s_string + '</nobr>';
}

var entidade_i, id_i, campos_i;
var ultimo_i = -1;
var proximo_i = 0;
var fila_i = new Array();

function exec_area(area){	
	fila_i[++ultimo_i] = [entidade_i, id_i, campos_i];
	setTimeout("exec_area2('" + area + "', " + ultimo_i + ")", 10);
}

var entidade_i2, id_i2, campos_i2;
function exec_area2(area, posicao){

    var i, c, s;

	if(posicao != proximo_i){
		setTimeout("exec_area2('" + area + "', " + posicao + ")", 10);
		return;
	}
	//alert('Teste Mannesoft2: '+posicao_i);
	entidade_i2 = fila_i[posicao][0];
	id_i2 = fila_i[posicao][1];
	campos_i2 = fila_i[posicao][2];
	
    s = '';
	tam = campos_i2.length;
    for(i = 0; i < tam; i++){
        c = document.getElementById(id_i2 + campos_i2[i]);
		if(!c)
			c = document.getElementById(campos_i2[i]);
        if(c) s += '&DADOS[' + campos_i2[i] + ']=' + mnsEncodeURL(c.value);
    }
    
    window.open('sistema.php?ACAO=5&TRANSID=' + transid + s + '&AREA=' + mnsEncodeURL(area), 'area');
}

function campo(col){
    var obj;
    if(document.getElementById(id_i2 + col))
        obj = document.getElementById(id_i2 + col);
    else
        obj = document.getElementById(id_i+ col);

	if(!obj)
		obj = document.getElementById(col);
	return obj;
}

function campo_display(col){
	return document.getElementById('display_' + id_i2 + col);
}



	function constroi_ajax() {
		var xmlhttp=false;
		if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
			try {
				xmlhttp = new XMLHttpRequest();
			}
			catch (e) {
				xmlhttp=false;
			}
		}
		if (!xmlhttp && window.createRequest) {
			try {
				xmlhttp = window.createRequest();
			} catch (e) {
				xmlhttp = false;
			}
		}
		if (!xmlhttp && window.ActiveXObject) {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		return(xmlhttp);
	}

xmlhttp = new Array();

/*
Função para executar códigos ajax.
Recebe a página a ser executada e os parametros a serem passados
*/		
function executa_ajax() {
	/*
	parametros: valores a serem repassados para a página de execução do ajax. Ex. "VALOR1=1&VALOR2=2..."
	pag: Endereço da fonte que executa o ajax. Ex. "sistema.php?ACAO=pagina_php.php"
	metodo: GET ou POST ou alert
	*/	
	var parametros;
	var pag;
	var metodo;
	var mostra = false;
    var idInput;
	
	var argv = executa_ajax.arguments;
	var argc = argv.length;
	if (argc < 2){
		alert('Erro ao utilizar função executa_ajax. Verifique em search.js');
		return false;
	}
	if(argv[0]){
		parametros = argv[0];
	}
	if(argv[1]){
		pag = argv[1];
	}
	if(argv[2]){
		metodo = argv[2];
	}else{
		metodo = '';
	}
	if(argv[3]){
		mostra = true;
	}
    if(argv[4]){//Input que vai receber a resposta.
        idInput = argv[4];
    }
	
	/*alert(parametros);
	alert(pag);
	alert(metodo);
	alert(mostra);*/
	
	var get = '';
	if (metodo == ''){//padrão é o method POST.
		metodo = "POST";
	}
	if (metodo == "POST"){//É possivel utilizar o metodo POST ou GET
		get = 'ajax=POST';//identificador de execução do ajax.
	}else if (metodo == "GET"){
		get = 'ajax=GET&'+parametros;//O "ajax=1" é passado sempre por GET, na página utilizar $_GET['ajax'] ou $_REQUEST['ajax'], para recuperar o valor.
	}else{
        alert ('O metodo passado para a função é inválido!('+metodo+')');
		return false;
	}
	
	var pos = pag.indexOf("?");
	
	if (pos < 0){
		get = "?"+get;
	}else{
		get = "&"+get;
	}	
	var i = xmlhttp.length;
	i++;		
	xmlhttp[i] = constroi_ajax();		
	if (xmlhttp[i]) {
		xmlhttp[i].open(metodo, pag+get, true);//Adiciona o get Ajax para sempre ser usado como indicador de execução do código ajax.            		
		xmlhttp[i].setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp[i].setRequestHeader("Content-length", parametros.length);
		xmlhttp[i].setRequestHeader("Connection", "close");
		xmlhttp[i].setRequestHeader('Accept', 'message/x-jl-formresult');
		xmlhttp[i].send(parametros);
		xmlhttp[i].onreadystatechange = function() {
			if (xmlhttp[i].readyState == 4){
				var res = xmlhttp[i].responseText;				
                //se for adicionado o mnsEncodeURL não ira funcionar a execução.
                //res = mnsEncodeURL(res);
				if(mostra){
					alert(res);  				
				}
                if (idInput) {
                    document.getElementById(idInput).innerHTML = res;
                }else{
				eval(res);  				
			}
		}
        }
	} else {
        alert('Erro Ajax. Contate o suporte.');
	}
	
}
function limpa_combo_js(id){//recebe o id da combo de cidade
  //alert(id);
		var elSel = document.getElementById (id); 
		if (elSel.length != 'undefined'){
			
			var i; 
			for (i = elSel.length; i >= 0; i--) { 
				if (elSel.options [i]) { 
					elSel.remove (i); 
				}
			} 
	    }
		var novo = document.createElement('option');
		novo.value = '';
		novo.text  = 'Aguarde...';
		document.getElementById(id).options.add(novo);
}