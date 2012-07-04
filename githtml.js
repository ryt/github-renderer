(function(d){
/*!
 * githtml.js
 * github.com/ryt/githtml
 * Copyright 2012, Rediat Mentoses
 */
  var gitHtml = {
    decode: (function(el,str){
      if(str && typeof str === 'string'){
        str            = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
        str            = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
        el.innerHTML   = str;
        str            = el.textContent;
        el.textContent = '';
      }
      return str;
    }),
    open: (function(c,d) {
      if(!d.getElementById('iframe')){
        var ifr                = d.createElement('iframe');
            ifr.src            = 'about:blank';
            ifr.style.width    = '100%';
            ifr.style.height   = '100%';
            ifr.style.position = 'absolute';
            ifr.style.top      = '0px';
            ifr.style.zIndex   = '9999';
            ifr.id             = 'iframe';
        d.body.appendChild(ifr);
        d.body.style.padding   = '0px';
        d.body.style.margin    = '0px';
      }
      var ifrm = d.getElementById('iframe');
          ifrm = (ifrm.contentWindow) 
               ? ifrm.contentWindow 
               : (ifrm.contentDocument.document) 
                  ? ifrm.contentDocument.document 
                  : ifrm.contentDocument;
          ifrm.document.open();
          ifrm.document.write(c);
          ifrm.document.close();
    }),
    start: (function(d){
      var link = {
        bootstrap: 'http://raw.github.com/twitter'+
                   '/bootstrap/master/docs/assets'+
                   '/css/bootstrap.css'
      };
      var el = d.createElement('div');
      var hp = (typeof jQuery === "undefined") 
             ? d.getElementsByTagName('pre')[0].innerHTML 
             : $(".highlight pre").html();
      var lo = location.href.replace(/\/blob\//,'/raw/');
      var bh = lo.replace(/\/[a-zA-Z0-9-_\.]+$/,'');
      var pr = hp.replace(/<div class=[\'|\"]line/g,'\n<div class="line').replace(/(<([^>]+)>)/ig,'');
          pr = pr.replace(/http\:([a-zA-Z0-9-_\.\/]+)bootstrap[a-zA-Z0-9-_\.\/\:]+css/g,link.bootstrap);
          pr = escape(gitHtml.decode(el,pr));
          pr = pr.replace(/http/g,'https'); 
  	  pr = unescape(pr).replace(/\n/g,'--githtml-newline--').replace(/\s/g,' ').replace(/--githtml-newline--/g,'\n');
      gitHtml.open(
        unescape("%3Cbase%20href%3D%22"+escape(lo)+"%22%3E")+pr,d
      );
    })
  }
  gitHtml.start(d);
  document.onbeforeunload = function(){
    document.getElementById('iframe').style.display = 'none';
  }  
})(document);