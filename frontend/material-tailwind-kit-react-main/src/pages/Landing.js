//首先引入需要的图片路径
import Background from 'assets/img/UIUC.jpg';
import { Component } from 'react';
//定义背景样式

var sectionStyle = {
  width: "100%",
  height: "1200px",
// makesure here is String确保这里是一个字符串，以下是es6写法
  backgroundImage: `url(${Background})` 
};

export default class Login extends Component{
//渲染页面
render(){
        return (
    <div style={sectionStyle}></div>
        )

    }

}
 
