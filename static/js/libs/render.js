'use strict';
/*
 * author : towne
 * version : 0.0.3
 * for : calendar
 * date : 2015.2.6
 *
*/

define(function (require, exports, module){

    var $ = jQuery = require("jquery");

    var showdown = require("src/showdown");

    var prettify = require("src/extensions/prettify");

    var converter = new Showdown.converter();

    ///console.log(converter);

    function Render(parent, str, url){

        this.str = str;
        this.box = parent;
        this.url = url;
        this.Li = $("<li>");
        this.head = $("<div>").addClass("ui_art_head");
        this.body = $('<div>').addClass("ui_art_body");
        this.foot = $("<div>").addClass("ui_art_foot");

    };

    Render.prototype.init = function (){
        
        this.con = this.str.split("<<====>>");

        this.info = $.parseJSON(this.con[0]);

    };

    Render.prototype.draw = function (){

        this.init();

        this.head.append($("<h2>").addClass("ui_art_title").html("<a href='/"+ this.info.categories +"-"+ this.info.title+" '>"+this.info.title+"</a>"));

        this.head.append($("<p>").addClass("clear").html("<a href='/" +this.info.categories+"' class='ui_target fl'>"+this.info.categories+"</a><span class='date fr'>"+ this.info.date +"</span>"));

        this.Li.append(this.head);

        if(/-/g.test(decodeURIComponent( this.url ))){

            this.con[2] && this.body.html( converter.makeHtml( this.con[1]+this.con[2] ) + "<hr>" );

        }else{

            this.body.html( converter.makeHtml( this.con[1] ) + "<hr>" );

        }

        this.Li.append(this.body);

        if(/-/g.test(decodeURIComponent( this.url ))){

            this.foot.html("<p class='clear'><span></span></p>");

        }else{

            this.foot.html("<p class='clear'><span></span><a href='/"+ this.info.categories +"-"+ this.info.title+"' class='fr'>ReadMore</a></p>");

        }

        this.Li.append(this.foot);

        this.Li.appendTo(this.box);

    }

    module.exports = Render;

})