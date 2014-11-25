require.config({
    "baseUrl": "/",
    "paths": {
        "jquery"     : "bower_components/jquery/dist/jquery",
        "underscore" : "bower_components/underscore/underscore",
        "backbone"   : "bower_components/backbone/backbone",
        "react"      : "bower_components/react/react"
    },
    "shim": {
        "backbone": {
            "deps": [
                "jquery",
                "underscore"
            ],
            "exports": "Backbone"
        },
        "jquery" : {
            "exports": "$"
        },
        "underscore": {
            "exports": "_"
        }
    },
    map: {
        '*': {
            'css': 'bower_components/require-css/css' // or whatever the path to require-css is
        }
    }
});
 
require(["backbone", "release/router", "react", "release/view/Button.react"], function(Backbone, Router, React, Button) {
    new Router();
    Backbone.history.start();


    var App = React.createClass({
        addItem: function (ts) {
            alert('add item ' + ts);
        },
        removeItem: function (ts) {
            alert('remove item ' + ts);
        },
        disable: function () {
            console.log('disable!');
            this.refs.btn.disable();
        },
        enable: function () {
            console.log('enable!');
            this.refs.btn.enable();
        },
        render: function () {
            return (
                <div>
                    <Button>默认</Button>
                    <Button onclick={this.addItem} skin="primary" ref="btn">主要</Button>
                    <Button onclick={this.addItem} skin="success">成功</Button>
                    <Button onclick={this.removeItem} skin="danger">危险</Button>
                    <Button onclick={this.removeItem} skin="info">信息</Button>
                    <Button onclick={this.removeItem} skin="warning">警告</Button>
                    <Button onclick={this.removeItem} skin="link">链接</Button>
                    我是文字，测试排版对齐
                    <Button size="l" skin="success">大按钮</Button>
                    <Button size="m">中按钮</Button>
                    <Button>默认按钮</Button>
                    <Button size="s">小按钮</Button>
                    |
                    <Button skin="link" disabled>禁用链接</Button>
                    |
                    <Button onclick={this.disable}>禁用主要按钮</Button>
                    <Button onclick={this.enable}>启用主要按钮</Button>
                    |
                    <Button block size="m" skin="info">块状按钮</Button>
                </div>
            );
        }
    });

    React.render(
        <App/>,
        document.body
    );
});