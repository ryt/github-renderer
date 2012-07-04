(function(d){
/*!
 * githtml.js
 * github.com/ryt/githtml
 *
 * Copyright 2012, Rediat Mentose
 * 
 */
  
  var gitHtml = {
    decode: (function(el,str){
      if(str && typeof str === 'string'){
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
        el.innerHTML = str;
        str = el.textContent;
        el.textContent = '';
      }
      return str;
    }),
    open: (function(w,h,c) {
     top.cr=window.open('',
      'gitHtml',
      'width='+w+',height='+h+','+
       'menubar=,'+
       'toolbar=1,'+
       'status=,'+
       'scrollbars=1,'+
       'resizable=1'
      )
     top.cr.document.writeln(c);
     top.cr.document.close();
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
      var pr = hp.replace(/(<([^>]+)>)/ig,'');
          pr = pr.replace(/[a-zA-Z0-9-_\.\/\:]+bootstrap[a-zA-Z0-9-_\.\/\:]+/g,link.bootstrap);
          pr = pr.replace(/(href|src)=\"\//g,'$1="'+bh.replace('https','http')+'/');
          pr = escape(gitHtml.decode(el,pr));
          pr = pr.replace(/http/g,'https');
      gitHtml.open(1000,700,
        '<scr'+'ipt>'+
          'document.write(unescape("%3Cbase%20href%3D%22'+escape(lo)+'%22%3E'+pr+'"));'+
        '</scr'+'ipt>'
      );
    })
  }
  gitHtml.start(d);
})(document);