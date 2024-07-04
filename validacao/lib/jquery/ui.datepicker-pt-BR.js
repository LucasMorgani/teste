/* Brazilian initialisation for the jQuery UI date picker plugin. */
/* Written by Leonildo Costa Silva (leocsilva@gmail.com). */

/*date_obj = new Date();
date_obj_hours = date_obj.getHours();
date_obj_mins = date_obj.getMinutes();

if (date_obj_mins < 10) { 
    date_obj_mins = "0" + date_obj_mins;
}

if (date_obj_hours < 10) {
	date_obj_hours = "0" + date_obj_mins;
}

date_obj_time = " "+date_obj_hours+":"+date_obj_mins;*/

jQuery(function($){
	$.datepicker.regional['pt-BR'] = {
		closeText: 'Fechar',
		prevText: '&#x3c;Anterior',
		nextText: 'Pr&oacute;ximo&#x3e;',
		currentText: 'Hoje',
		monthNames: ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho',
		'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
		monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun',
		'Jul','Ago','Set','Out','Nov','Dez'],
		dayNames: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],
		dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
		dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
		dateFormat: 'dd/mm/yy'/*+date_obj_time*/, firstDay: 0,
		isRTL: false};
	$.datepicker.setDefaults($.datepicker.regional['pt-BR']);
});