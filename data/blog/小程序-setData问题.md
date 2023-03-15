---
title: 小程序-setData问题
date: 2019-10-28 20:18:53
tags: ['小程序']
categories: ['开发日记']
---

### 接口

```
    onLoad:function(options){
    	 const that=this;
    	wx.request({
    		url:'你的接口地址',
    		success(res){
    			console.log(res.data.data.recommendList)
    			const recommendList=res.data.data.recommendList;
    			that.setData({
    				banner:recommendList
    			})

    		}
    	})

    },
```

正确的写法：
一：将 res.data 存在一个变量中，再把这个变量用 this.setData 赋值给 banner

二：将 this 改为 that

### swiper 的渲染

如果把微信：for=“{{banner}}”，绑到 swiper 上
那么渲染出来的就是一个又一个 swiper，很长，没有想象中的轮播图，
正确做法是： 

```
 	<swiper class="banner-details"  indicator-dots="{{indicatorDots}}"  autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}">
  		<block wx:for="{{banner}}" wx:for-index="index">
  		<swiper-item class="banner-detail" >
  		<image bindTap="tapBanner" data-id="{{item.productId}}" src="{{item.productIcon}}" class="banner-detail" width="702rpx" height="324rpx" />
  		</swiper-item>
  		</block>
  	</swiper>
```

#### 图片

1.在手机端预览小程序时，域名必须是合法的、配置在小程序管理后台的，裸露 ip 无法在 APP 端预览到。此时的现象也是：在编辑器上能图片能显示，手机上无法预览！！！（多半都是服务端问题）

2.小程序开发工具右上角->详情->域名->不效验合法域名。虽然这样方便我们测试，但是通过这样的接口拿到的图片，直接点击预览，无法在真机上显示。但是如果选择真机调试，在真机调试的页面去除不效验合法域名的钩，就可以看到。

3.写在 wxml 里的图片的 url 里有中文，特别是写在 wxml 里的，要特别注意。 4.路径错了，写 url（/images/xxxx.png）就好了。
