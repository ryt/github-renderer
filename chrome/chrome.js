
var gitHtml_r = (function(){
  var d = document,s=d.createElement('script');
  s.src = '//raw.github.com/ryt/github-renderer/master/render.js';
  d.body.appendChild(s);
});

var gitHtml_l = (function(e){
  e.addClass("gitHtml-clicked");
  e.parents("div").children(".gitHtml-tip").css('display','inline');
  $(".content").each(function(){
      var trec = $(this).html(), tren;
          tren = trec.replace(/\/blob\//g,'/raw/').
                      replace(/\.htm(l?)\"/g,'.htm$1#gitHtml"');
      $(this).html(tren);
  });
  $(".content .js-slide-to").removeClass();
  return false;
});

(function(d){
  if ( typeof jQuery !== "undefined" ) {
    $(document).ready(function(){
      $("body").append(''+
        "<style type='text/css'>"+
          ".gitHtml-clicked{"+
              "color:#fff;"+
              "text-decoration:none;"+
              "text-shadow:0 -1px 0 rgba(0,0,0,0.3);"+
              "border-color:#518cc6;"+
              "border-bottom-color:#2a65a0;"+
              "background:#599bdc;"+
              "background:-moz-linear-gradient(#599bdc,#3072b3);"+
              "background:-webkit-linear-gradient(#599bdc,#3072b3);"+
              "-ms-filter:\"progid:DXImageTransform.Microsoft.gradient(startColorstr='#599bdc',endColorstr='#3072b3')\";"+
            "}"+
        "</style>"
      );
      if ( location.href.indexOf('.htm') > 5 ) {
        $(".bubble#files .file .meta div.info").
            append("<span class='gitrends git-html-btn'><a href='javascript:;' onclick='gitHtml_r();return false;' class='minibutton git-html-btn'>git-html</a></span>");      
      } 
      else {
        $(".breadcrumb").append(' '+
                   "<a href='javascript:;' onclick='gitHtml_l($(this));return false;' class='minibutton gitHtml-activate gitact git-html-btn'>git-html</a> "+
                   '<div class="tipsy tipsy-w gitHtml-tip" style="display:none;opacity:0.8;padding:2px 5px;margin-left:5px;">'+
                      '<div class="tipsy-arrow tipsy-arrow-w"></div>'+
                      '<div class="tipsy-inner git-html-btn" style="max-width:400px;">gitHtml activated. click on any html file below.</div>'+
                   '</div>');
      }

      $("body").click(function(e){
        if ( $(e.target).hasClass("git-html-btn") === false ) {
          var ca = setInterval(function(){ 
            if ( $(".file-edit-link").is(":visible")) {
              if ( location.href.indexOf('.html') > 5 ) {
                  $(".gitrends").remove();
                  $(".bubble#files .file .meta div.info").
                      append("<span class='gitrends git-html-btn'><a href='javascript:;' onclick='gitHtml_r();return false;' class='minibutton git-html-btn'>github-renderer</a></span>");
              }
              clearInterval(ca);
            }
          },10);

          var ah = setInterval(function(){
              if ( $("div[data-path='"+(location.href.split('tree/master/')[1]+'/')+"']").is(":visible") && $(".file-edit-link").is(":visible") === false ) {
                $(".gitact").remove();
                $(".gitips").remove();
                $(".breadcrumb").
                    append(' '+
                           "<div style='display:inline;'><a href='javascript:;' onclick='gitHtml_l($(this));return false;' class='minibutton gitHtml-activate gitact git-html-btn'>git-html</a> "+
                           '<div class="tipsy tipsy-w gitHtml-tip gitips" style="display:none;opacity:0.8;padding:2px 5px;margin-left:5px;">'+
                              '<div class="tipsy-arrow tipsy-arrow-w"></div>'+
                              '<div class="tipsy-inner git-html-btn" style="max-width:400px;">gitHtml activated. click on any html file below.</div>'+
                           '</div></div>');
              clearInterval(ah);
            }
          },10);

          if ( location.href.indexOf('#gitHtml') > 5 ) {
            gitHtml_r();
          }
       }
      });
    });
  } 

  else if ( location.href.indexOf('#gitHtml') > 5 ) {
    gitHtml_r();
  }

})(document);
