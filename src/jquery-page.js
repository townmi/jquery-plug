'use strict';

/**
 * [page->$.plugin]
 * @description [分页插件]
 * @author [haixiangtang@creditease.cn]
 * @version [0.0.1]
 * @date [2015-10-01]
 */

$.fn.page = function () {

    var Page = function (dom, total) {
        this.dom = dom
        this.total = total;
        this.currentPage = 0;
        this.onePageLength = 5;
        this.btns = 15;
        this.size = Math.floor(this.total/this.onePageLength);
    };

    Page.prototype.http = function() {
        this.data = {
            "category": null,
            "start": this.currentPage*this.onePageLength,
            "end": this.currentPage*this.onePageLength+this.onePageLength
        }
        console.log(this.data);
    };

    Page.prototype.refreshView = function (currentPage) {

        this.currentPage = currentPage*1;

        var btns = $(this.dom).find('.js_page');

        $(this.dom).find(".js_page").removeClass("active");

        if(this.currentPage === 0){
            $(this.dom).find(".js_page_prev").addClass("ui_disabled");
        } else {
            $(this.dom).find(".js_page_prev").removeClass("ui_disabled");
        }

        if(this.currentPage === this.size){
            $(this.dom).find(".js_page_next").addClass("ui_disabled");
        } else {
            $(this.dom).find(".js_page_next").removeClass("ui_disabled");
        }

        if(this.size<this.btns){
            btns.eq(this.currentPage).addClass("active");
            return this.http();
        }

        if(this.currentPage<Math.ceil(this.btns/2)){
            for (var i = 0; i < this.btns; i++) {
                btns.eq(i).html(i+1);
            };
            btns.eq(this.currentPage).addClass("active");
            return this.http();
        }

        if(this.currentPage>(this.size-Math.floor(this.btns/2))){
            for (var i = 0; i < this.btns; i++) {
                btns.eq(i).html(this.size+i-this.btns+2);
            };
            btns.eq(this.btns-(this.size-this.currentPage+1)).addClass("active");
            return this.http();
        }

        for (var i = 0; i < this.btns; i++) {
            btns.eq(i).html(this.currentPage+i-Math.floor(this.btns/2)+1);
        };
        btns.eq(Math.ceil(this.btns/2)-1).addClass("active");
        this.http();
    };

    Page.prototype.event = function () {

        var self = this;

        $(this.dom).on("click", ".js_page", function () {
            if($(this).hasClass("active")) return;
            self.refreshView($(this).html()-1);
        });

        $(this.dom).on("click", ".js_page_prev", function () {
            if($(this).hasClass("disabled")) return;
            self.currentPage--;
            self.currentPage = self.currentPage<0 ? 0 : self.currentPage;
            self.refreshView(self.currentPage);
        });

        $(this.dom).on("click", ".js_page_next", function () {
            if($(this).hasClass("disabled")) return;
            self.currentPage++;
            self.currentPage = self.currentPage>self.size ? self.size : self.currentPage;
            self.refreshView(self.currentPage);
        });

    };

    Page.prototype.int = function () {

        var intSize = this.size>=this.btns ? this.btns : this.size+1;

        btnsHtml = [
            '<a href="javascript:;" class="ui_btn ui_first js_page_prev ui_disabled">上一页</a>',
            '<a href="javascript:;" class="ui_btn ui_last js_page_next">下一页</a>'
        ];
        for (var i = intSize-1; i >= 0 ; i--) {
            var str = i === 0 ? '<a href="javascript:;" class="ui_btn js_page active">'+(this.currentPage+1+i)+'</a>' : '<a href="javascript:;" class="ui_btn js_page">'+(this.currentPage+1+i)+'</a>';
            btnsHtml.splice(1, 0, str);
        };
        btnsHtml = btnsHtml.join("");

        $(this.dom).html(btnsHtml);

        this.event();

    };

    var page = new Page(this, 356);

    page.int();

}