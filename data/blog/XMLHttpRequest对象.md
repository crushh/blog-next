---
title: XMLHttpRequest对象
date: 2021-01-30 21:45:17
tags: ['http', 'ajax']
categories: ['js']
---

以下简称：XHR

## 干嘛用的：

为服务器发送请求和解析服务器响应提供了流畅的接口。能够以异步的方式从服务器获得更多信息，意味着用户单击后不用刷新页面也可以取得新数据。也就是说，ajax 技术中使用 XHR 对象取得新数据，再通过 DOM 将新数据插入页面中。

## 用法：

```
var xhr=new XMLHttpRequest();
xhr.open(‘要发送的请求类型’，‘请求的url’，是否异步发送的布尔值)；
//没真发，就是启动一个请求以备发送
xhr.send();//真发了
```

收服务器响应后，响应的数据会自动填充 XHR 对象的属性，如下

responseText：作为响应主体被返回的文本；
responseXML：如果响应的主体是’text/xml‘or’application/xml‘，这个属性中将保存着响应数据的 XML DOM 文档；
status：响应的 http 状态。如：404，200
statusText:Http 状态的说明

```
var xhr=new XMLHttpRequest();
xhr.open(‘get’，‘/post.jsonl’，true)；
xhr.send();
if((xhr.status>=200 && xhr.status<300)||xhr.status==304){
  alert(xhr.responseText);
}else{
 alert(xhr.status);
}
```

还有些 xhr 属性，如：
readyState：表示请求/响应过程的活动阶段，可取的值如下
0:未初始化。还没调用 open 方法。
1：启动。调用了 open 还没 send。
2：发送。调用了 send，还没收到响应。
3：接收。已经接收部分数据。
4：完成。接收完毕所有响应数据。
只要 readyState 一改变就触发 readystatechange 事件。

```
var xhr=new XMLHttpRequest();
xhr.onreadystatechange=function(){
if(xhr.readyState==4){
    if((xhr.status>=200 && xhr.status<300)||xhr.status==304){
         alert(xhr.responseText);
    }else{
        alert(xhr.status);
         }
}
} ;
xhr.open(‘get’，‘/post.jsonl’，true)；
xhr.send();

```

##### Http 头部信息:

自定义 http 头部信息，为啥要设置这个的建议去看 http 图解一书。

```
xhr.setRequestHeader("头部字段", "头部字段的值");
把这个放在open和send中间使用。
xhr.getResponseHeader("头部字段")：得到相应的值。
xhr.getAllPesponseHeaders();
//得到一个包含所有头部信息的长字符串。
```

### get

最常见用于想服务器查询某些信息。对于 xhr 来说，url 末尾的查询字符串必须经过正确的编码才行。
tips：所有名-值对儿都必须由&分开。
查询字符串中每个参数的名称和值都必须使用 encodeURIComponent()进行编码

```
xhr.open("get","example.php?name1=value1&name2=value2",true);
```

可以使用这个函数来帮助向现有 url 末尾添加查询字符串参数

```
function addURLParam(url,name,value){
 url+=(url.indexOf("?")==-1"?":"&");
 url+=encodeURIComponent(name)+"="+encodeURIComponent(value);
return url;
}
```

下面结合实际例子来使用这个函数

```
function addURLParam(url,name,value){
 url+=(url.indexOf("?")==-1"?":"&");
 url+=encodeURIComponent(name)+"="+encodeURIComponent(value);
return url;
}
var url="example.php";
 url=addURLParam(url,"name","yourfather");
 url=addURLParam(url,"book","yourpornbook");
 xhr.open("get",url,false);

```

#### post

```
function submitData(){
var xhr=new XMLHttpRequest();
xhr.onreadystatechange=function(){
if(xhr.readyState==4){
    if((xhr.status>=200 && xhr.status<300)||xhr.status==304){
         alert(xhr.responseText);
    }else{
        alert(xhr.status);
         }
 }
 }
};
xhr.open("post","example.php",true);
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");//表单提交时的内容类型
var form=document.getElementById('user-info');
xhr.send(serialize(form));
//而在XMLHttpRequest2中规定了
FormData对象
new 一个FormData对象后，xhr.send(new FormData(form));
这样就不需要手动写请求头
```

#### 跨域

除了 ie 定义了一个 XDR(XDomainRequest)类型外，其他主流浏览器都可以直接用标准的 XHR 对象来实现跨域请求。

```
function createXHR()
{
    if (typeof XMLHttpRequest != "undefined")
    {
        return new XMLHttpRequest();
    } // end if
    else if (window.ActiveXObject)
    {
        var aVersions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0"];
        for (var i = 0; i < aVersions.length; ++i)
        {
            try
            {
                var oXHR = new ActiveXObject(aVersions[i]);
                return oXHR;
            } // end try
            catch (oError)
            {
                // do nothing
            } // end catch

        } // end for

    } // end else if

    throw new Error("XMLHttp object could not be created.")

} // end createXHR();
```

```

var xhr= createXHR();
xhr.onreadystatechange=function(){
if(xhr.readyState==4){
    if((xhr.status>=200 && xhr.status<300)||xhr.status==304){
         alert(xhr.responseText);
    }else{
        alert(xhr.status);
         }
 }
 };
 xhr.open("get","http://www.somewhere-else.com/page/",true);
 xhr.send();
```
