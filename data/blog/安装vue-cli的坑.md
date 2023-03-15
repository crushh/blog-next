---
title: 安装vue-cli的坑
date: 2019-05-30 16:24:55
tags: ['vue', '新手向']
categories: ['vue']
---

# webpack 下载失败

解决方法一：在 node 安装成功前提下，将 npm 替换成 cnpm
替换代码：npm install -g cnpm --registry=https://registry.npm.taobao.org
检查版本：
安装 webpack：cnpm install webpack -g

解决方法二：检查 node 版本，
检查方法 node -v
如果版本低于 v6 升级

# npm run dev 失败

显示【'webpack-dev-server' 不是内部或外部命令，也不是可运行的程序】
原因：npm install 这步 有几个文件报错没下载成功
解决方法：改用 cnpm install 下载
扩展：如果是这个报错 也有可能是 8080 端口被占
