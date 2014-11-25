define(['jquery', 'react', 'css!src/view/Button.react'], function ($, React) {
    "use strict";

    var Button = React.createClass({
        getInitialState: function () {
            return {
                disabled: !!this.props.disabled,
                text: this.props.children.toString() || (this.props.text ? '获取中...' : '按钮'),
                skin: this.props.skin || null
            };
        },
        componentDidMount: function () {
            if (this.props.text) {
                $.ajax({
                    url: this.props.text,
                    dataType: 'json',
                    success: function(data) {
                        this.setState({
                            text: data.text
                        });
                    }.bind(this),
                    error: function(xhr, status, err) {
                        this.setState({
                            skin: 'danger',
                            text: '加载失败'
                        });
                    }.bind(this)
                });
            }
        },
        /**
         * @private
         */
        _clickHandle: function () {
            if (!this.state.disabled) {
                this.props.onclick(+new Date());
            }
        },
        /**
         * 启用按钮
         * @public
         */
        enable: function () {
            this.setState({
                disabled: false
            });
        },
        /**
         * 禁用按钮
         * @public
         */
        disable: function () {
            this.setState({
                disabled: true
            });
        },
        /**
         * 改变按钮样式
         * @public
         * @param  {String} skin primary, danger, warning, info, success, link
         */
        skin: function (skin) {
            this.setState({
                skin: skin || null
            });
        },
        render: function () {
            var className = ["ui-button"];
            //设置尺寸
            this.props.size && className.push("ui-button-" + this.props.size);
            //is block?
            this.props.block && className.push("ui-button-block");
            //is disabled?
            this.state.disabled && className.push("ui-button-disabled");
            //设置皮肤
            this.state.skin && className.push("ui-button-" + this.state.skin);

            //根据是否有onclick属性来决定是否挂接点击事件
            return (
                <button 
                    className={className.join(" ")} 
                    onClick={this.props.onclick ? this._clickHandle : null}
                >
                    {this.state.text}
                </button>
            );
        }
    });

    return Button;
});