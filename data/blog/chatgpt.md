---
title: windows用ssh连接aws实例的报错集锦
date: '2023-03-20'
tags: ['服务器']
draft: false
summary: windows连aws服务器真是坎坷
images: []
layout: PostLayout
canonicalUrl:
---
自己二月份的时候已经注册了chatgpt的帐号，这两天各行各业的朋友都找来问怎么注册，要从科学上网到谷歌邮箱，折腾的心累，正好github上有现成的[微信接入chatgpt](https://github.com/zhayujie/chatgpt-on-wechat)的项目，我只要提供一台云服务器就行。

选择了亚马逊的免费服务器，EC2套餐，除了12月免费外，这个配置满足我之后想部署需要GPU资源的服务。
选择套餐，创造实例，启动服务都很丝滑，根据亚马逊的[文档](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/openssh.html)选择openSSH连接。
将pem密钥文件保存在目录下后，powershell在该目录下运行命令行：
```
ssh -i <pemName>.pem <instance-user-name>@<instance-public-dns-name>
```

从这开始坎坷。

ssh报错：

1. 
```
Bad owner or permissions on C:\\Users\\<username>/.ssh/config
```
 这篇[教程](https://windowsreport.com/bad-owner-or-permissions-on-ssh-config/)一步步教人怎么修改ssh文件夹的权限。

2. 
```
kex_exchange_identification: Connection closed by remote host
```
![image][错误]
根据chatgpt的解释是在进行密钥交换时连接被重置了，导致ssh连接失败。可能是因为网络问题，服务端配置错误或防火墙等因素引起。

在一个论坛里翻到有人说自己ip地址用错了，服务器商提供了两个ip地址，Private和Public。

再对着命令行看，发现自己ip用的是Private IPv4 addresses而正确地址是Public IPv4 address，或者Public IPv4 DNS。

改了ip地址后还是报这个错误，试着把clash的代理改为直连，连接成功。

后续我在安全组那删了那些允许任何ip地址连接实例的规则，根据[Linux实例授权入站流量](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/authorizing-access-to-an-instance.html)添加了一条Source 为my Ip的规则。

接下来在aws上安装git,pip3，clone项目，安装依赖，一步步浑然天成扫码登录微信号。

现在朋友可以直接在微信里使用chatgpt了。

[错误]:data:image/png;base64,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