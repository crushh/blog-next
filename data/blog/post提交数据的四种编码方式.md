---
title: post提交数据的四种编码方式
date: 2019-11-30 12:12:51
tags: ['http']
categories: ['网络协议']
---
### application/x-www-form-urlencoded
传表单格式
键值对。

### multipart/form-data
能传文件，不仅仅是表单数据
这也是一种比较常见的post数据格式，我们用表单上传文件时，必须使form表单的enctype属性或者ajax的contentType参数等于multipart/form-data。使用这种编码格式时发送到后台的数据长得像这样子
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191103203942685.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NydXNoaF9mdW4=,size_16,color_FFFFFF,t_70)
我把值json.Stringify(val)了。
演示下，如果需要用post发送formdata格式的数据该如何配置。背景是因为我们要上传一个超长的数组。
在封装好axios请求也就是写好了请求拦截器后，在api文件中这样封装
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191103204307145.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NydXNoaF9mdW4=,size_16,color_FFFFFF,t_70)
使用时这样
```
let param = new FormData(); //创建form对象
              param.append('chatRecord',JSON.stringify(this.msgList));//你要传的键名，值 因为我要传一个数组 所以先转换成json字符串
			commitChat(this.consultId,param).then(res=>{
				console.log(res.data)
			})
```
如果没有封装，直接写，可以参考下面的写法：
日后有空补充，反正和封装的差不多
### application / json
如果使用這種編碼方式，那麼傳遞到後台的將是序列化後的json 字符串。我們可以將application / json與application / x-www-form-urlencoded發送的數據進行比較

### text/xml
传纯粹的文本，就是字符串。这种格式我没有怎么使用过。