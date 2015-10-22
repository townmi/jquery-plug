'use strict';

/**
 * [table->$.plugin]
 * @description [表格插件]
 * @author [haixiangtang@creditease.cn]
 * @version [0.0.1]
 * @date [2015-10-22]
 */

$.fn.table = function (conf) {

	var config = {
		"rows": 10
	};

	$.extend(true, config, conf);

	var Table = function (dom) {

		this.table = dom;

	};

	Table.prototype.int = function () {

		var theadHtml = '<thead><tr>', tbodyHtml = '<tbody style="display: none;">'; 

		for(var i = 0; i < conf.colspan.length; i++) {

			theadHtml += '<th';
			if (conf.colspan[i].className) {
				theadHtml += ' class="'+conf.colspan[i].className+'"';
			}
			if (conf.colspan[i].width) {
				theadHtml += ' width="'+conf.colspan[i].width+'"';
			}
			theadHtml += '>'+conf.colspan[i].html+'</th>';
		}

		theadHtml += '</tr></thead>';

		for(var i = 0; i < conf.rows; i++) {

			var tr = '<tr>';

			for(var j = 0; j < conf.colspan.length; j++) {

				tr += '<td';
				if (conf.colspan[j].className) {
					tr += ' class="'+conf.colspan[j].className+'"';
				}
				if (conf.colspan[j].width) {
					tr += ' width="'+conf.colspan[j].width+'"';
				}
				tr += '></td>';
			}

			tr += '</tr>';

			tbodyHtml += tr;

		}

		tbodyHtml += '</tbody>';


		this.table.html(theadHtml+tbodyHtml);

		this.draw();

		conf.intComplete && conf.intComplete();

	};
	Table.prototype.http = function () {

		this.data = [
			{"dealNo": "308207278146075", "cash": "100", "callDate": "2015-10-23", "rate": "9.27", "amount": "2.76", "getCash": "0.12", "startDate": "2015-02-03 18:29:30", "statusStr": "交易取消"},
			{"dealNo": "308207278146075", "cash": "100", "callDate": "2015-10-23", "rate": "9.27", "amount": "2.76", "getCash": "0.12", "startDate": "2015-02-03 18:29:30", "statusStr": "交易取消"},
			{"dealNo": "308207278146075", "cash": "100", "callDate": "2015-10-23", "rate": "9.27", "amount": "2.76", "getCash": "0.12", "startDate": "2015-02-03 18:29:30", "statusStr": "交易取消"},
			{"dealNo": "308207278146075", "cash": "100", "callDate": "2015-10-23", "rate": "9.27", "amount": "2.76", "getCash": "0.12", "startDate": "2015-02-03 18:29:30", "statusStr": "交易取消"},
			{"dealNo": "308207278146075", "cash": "100", "callDate": "2015-10-23", "rate": "9.27", "amount": "2.76", "getCash": "0.12", "startDate": "2015-02-03 18:29:30", "statusStr": "交易取消"},
			{"dealNo": "308207278146075", "cash": "100", "callDate": "2015-10-23", "rate": "9.27", "amount": "2.76", "getCash": "0.12", "startDate": "2015-02-03 18:29:30", "statusStr": "交易取消"},
			{"dealNo": "308207278146075", "cash": "100", "callDate": "2015-10-23", "rate": "9.27", "amount": "2.76", "getCash": "0.12", "startDate": "2015-02-03 18:29:30", "statusStr": "交易取消"},
			{"dealNo": "308207278146075", "cash": "100", "callDate": "2015-10-23", "rate": "9.27", "amount": "2.76", "getCash": "0.12", "startDate": "2015-02-03 18:29:30", "statusStr": "交易取消"},
			{"dealNo": "308207278146075", "cash": "100", "callDate": "2015-10-23", "rate": "9.27", "amount": "2.76", "getCash": "0.12", "startDate": "2015-02-03 18:29:30", "statusStr": "交易取消"},
			{"dealNo": "308207278146075", "cash": "100", "callDate": "2015-10-23", "rate": "9.27", "amount": "2.76", "getCash": "0.12", "startDate": "2015-02-03 18:29:30", "statusStr": "交易取消"}
		];

	};
	Table.prototype.draw = function () {

		this.http();

		for(var i = 0; i < this.data.length; i++) {

			for(var j = 0; j < conf.colspan.length; j++) {

				var tdContent;

				if (conf.colspan[j].Mrender) {
					tdContent = conf.colspan[j].Mrender(this.data[i][conf.colspan[j].key], this.data[i]);
				} else {
					tdContent = this.data[i][conf.colspan[j].key];
				}

				this.table.find("tbody tr").eq(i).find("td").eq(j).html(tdContent);
			}

		}

		this.table.find("tbody").show();

		conf.drawCallback && conf.drawCallback();
		

	};

	new Table($(this)).int();

}