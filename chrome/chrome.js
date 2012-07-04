var gitHtml_r = (function(){
  var d=document,s=d.createElement('script');
  s.src='//raw.github.com/ryt/githtml/master/githtml.min.js';
  d.body.appendChild(s);
});
var gitHtml_l = (function(){
  $(".gitHtml-activate").addClass("gitHtml-clicked");
  $(".gitHtml-tip").css('display','inline');
  var tree = $(".tree-browser-wrapper"),
      trec = tree.html(),
      tren;
      tren = trec.replace(/\/blob\//g,'/raw/').
                  replace(/\.html\"/g,'.html#gitHtml"');
      tree.html(tren);
  return false;
});
(function(d){
  if(typeof jQuery !== "undefined"){
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
      
      if($("body").hasClass('page-blob')){
        $(".bubble#files .file .meta div.info").
            append("<span><a href='javascript:;' onclick='gitHtml_r();return false;' class='minibutton'>Render HTML</a></span>");
      }
      else if(location.href.indexOf('#gitHtml')!=-1){
        gitHtml_r();
      }
      else {
        $(".final-path").
            after(" <a href='javascript:;' onclick='gitHtml_l();return false;' class='minibutton gitHtml-activate'>gitHtml</a> "+
                   '<div class="tipsy tipsy-w gitHtml-tip" style="display:none;opacity:0.8;padding:2px 5px;margin-left:5px;">'+
                      '<div class="tipsy-arrow tipsy-arrow-w"></div>'+
                      '<div class="tipsy-inner" style="max-width:400px;">gitHtml activated. click on any html file below.</div>'+
                   '</div>');
     }        
    });
  } 
  else {
    gitHtml_r();
  }
})(document);