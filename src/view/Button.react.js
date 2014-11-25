define(['react', 'css!src/view/Button.react'], function (React) {
    var Button = React.createClass({
        getInitialState: function () {
            return {
                disabled: !!this.props.disabled
            };
        },
        /**
         * 点击回调函数
         * @return {[type]} [description]
         */
        _clickHandle: function () {
            if (!this.state.disabled) {
                this.props.onclick(+new Date());
            }
        },
        /**
         * 启用按钮
         * @return {[type]} [description]
         */
        enable: function () {
            this.setState({
                disabled: false
            });
        },
        /**
         * 禁用按钮
         * @return {[type]} [description]
         */
        disable: function () {
            this.setState({
                disabled: true
            });
        },
        render: function () {
            var className = ["ui-button"];
            //设置皮肤
            this.props.skin && className.push("ui-button-" + this.props.skin);
            //设置尺寸
            this.props.size && className.push("ui-button-" + this.props.size);
            //is block?
            this.props.block && className.push("ui-button-block");
            //is disabled?
            this.state.disabled && className.push("ui-button-disabled");

            //根据是否有onclick属性来决定是否挂接点击事件
            return (
                <button 
                    className={className.join(" ")} 
                    onClick={this.props.onclick ? this._clickHandle : null}
                >
                    {this.props.children}
                </button>
            );
        }
    });

    return Button;
});