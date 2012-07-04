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
    open: (function(w,h,c) {
     top.consoleRef=window.open('',
      'gitHtml',
      'width='+w+',height='+h+','+
       'menubar=0,toolbar=1,status=0,'+
       'scrollbars=1,resizable=1'
      )
     top.consoleRef.document.writeln(c);
     top.consoleRef.document.close();
    }),
    start: (function(d){
      var link = {
        bootstrap: 'http://raw.github.com/twitter'+
                   '/bootstrap/master/docs/assets'+
                   '/css/bootstrap.css'
      };
      var el = d.createElement('div');
      var hp = $(".highlight pre").html();
      var lo = location.href.replace(/\/blob\//,'/raw/');
      var bh = lo.replace(/\/[a-zA-Z0-9-_\.]+$/,'');
      var pr = hp.replace(/<div class=[\'|\"]line/g,'\n<div class="line').replace(/(<([^>]+)>)/ig,'');
          pr = pr.replace(/http\:([a-zA-Z0-9-_\.\/]+)bootstrap[a-zA-Z0-9-_\.\/\:]+css/g,link.bootstrap);
          pr = escape(gitHtml.decode(el,pr));
          pr = pr.replace(/http/g,'https'); 
  	  pr = unescape(pr).replace(/\n/g,'--githtml-newline--').replace(/\s/g,' ').replace(/--githtml-newline--/g,'\n');
      gitHtml.open(1000,700,
        unescape("%3Cbase%20href%3D%22"+escape(lo)+"%22%3E")+pr
      );
    })
  }
  gitHtml.start(d);
})(document);