---
title: 小程序-tabber
date: 2019-09-28 20:18:53
tags: ['小程序']
categories: ['开发日记']
---

#### 生命周期

组件所在页面的生命周期,特殊的生命周期，它们并非与组件有很强的关联，但有时组件需要获知，以便组件内部处理。这样的生命周期称为“组件所在页面的生命周期”，在 pageLifetimes 定义段中定义。其中可用的生命周期包括：

```
pageLifetimes:{
show(){} //	组件所在的页面被展示时执行
}
```

在 page 页面的 js 文件中使用

```
Component({
    pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected:number
          //number对应在custom-tab-bar文件夹中的js中的list列表中data:{  list:[{}] }中list数组的下标
          //getTabBar（）通过 getTabBar 接口获取组件实例，调用 setData 更新选中态。
        })
      }
    }
  }
})
```

custom-tab-bar/index.js 中初始化好 selected，定义方法 switchTab

```
switchTab(e){
			const data=e.currentTarget.dataset
			const url=data.path
			wx.switchTab({url})
			this.setData({
				selected:data.index
			})
		}
```

```
<cover-view wx:for="{{list}}" wx:key="index" class="tab_bar_item" data-path="{{item.pagePath}}" data-index="{{index}}" bindtap="switchTab">

<cover-image src="{{selected===index?item.selectedIconPath:item.iconPath}}" class="image">
</cover-imag
```
