---
title: 关于如何监控vuex里对象的属性变化
date: 2021-02-30 17:05:53
tags: ['vue', '新手向']
categories: ['vue']
---

我有一个这样的数据结构，在 store 里有一个 msgList 的对象，属性是用户的 username，要在每次这个用户发出一条消息记录时 push 一个新元素进去，并响应这个变化，同时更新当前对话记录。

```
msgList:{
	'username1':[
		{},{},{}
	]
}
```

https://cn.vuejs.org/v2/guide/list.html#
这是官方写的对于数组，对象属性更新检测的注意事项。我自己使用了其中的 Object.assign()，来实现响应。

Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

官方要求我们用这种写法：

```
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

是因为如果使用下列这种写法，只是复制了源目标的值，引用地址并没有变化，本质还是属性的修改，无法检测。而上面写法相当于换了一个对象，自然就能检测到。

```
Object.assign(vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

预备知识讲完，进入正题。
在 mutations 里先按照普通写法，将 userName 作为一个对象的一个属性，并给属性赋值一个被放到数组里的 payload 对象。

```
const state={
    msgList:{},//所有消息集合
};
const mutations={
updateMsgList(state,payload){
	console.log(payload)
	if(payload.bySelf===true){//我方发给对方 存储发送消息的To 作为username
		if(!state.msgList[payload.to]){//第一次给对方发消息 第一次建立username属性
		state.msgList[payload.to]=[{
			...payload
		}];
	}else{
		state.msgList[payload.to].push({
			...payload
		})
	}
}else{//对方给我方发送消息  存储接收消息的from作为username
if(!state.msgList[payload.from]){//第一次给对方发我方消息 第一次建立username属性
		state.msgList[payload.from]=[{
			...payload
		}];
	}else{
		state.msgList[payload.from].push({
			...payload
		})
	}
}

	state.msgList = Object.assign({}, state.msgList);
	//这就是关键，将普通不会被检测到的对象变成可以被检测到的对象，因为每次都把源目标给了一个新对象

},
}
```

在组件里 这样写 用 computed 获得一个响应 msgList 变化的变量 再在 watch 中监视这个变量 当这个变量变化时 做一些操作.

```
	computed:{
...mapGetters({ //记得引入vuex
         	   stateMsgList:'GetmsgList' //绑getters时 当msglist变化时 监听到这个对象的变化,我试着直接绑定state.msgList 但是当msgList变化时 没有监听到变化
            }),
            }，
            watch:{
			stateMsgList:function(val) {
		         this.getCurrentMsg();//当msgList变化时 更新当前聊天记录的方法
		      }
		},

```
