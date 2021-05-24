import { Button, Form, Input, message } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { ajax } from "../../ajax/myAxios";
import { signIn } from "../../redux/action/signActions";

import "./SignIn.less";
// import "./SignIn.css";

const FormItem = Form.Item;

class SignInBasic extends React.Component {
  state = {
    toShow: true,
  };
  componentDidMount() {
    this.changeToShow();
  }
  formLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };
  tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  changePath = (path) => {
    this.props.history.push(path);
  };
  onFinish = (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((item) => {
      formData.append(item, values[item]);
    });
    const config = {
      url: "/user/signIn",
      method: "POST",
      data: formData,
      // params:values,
      headers: {
        // ...formData.getHeaders(),
      },
    };
    ajax(config)
      .then((res) => {
        if (res.code === 0) {
          localStorage.setItem("token", res.result.token);
          message
            .success({
              content: `登陆成功，即将进入首页`,
            })
            .then(() => {
              // window.location.pathname = "/homepage";

              this.changePath("/homepage");
            });
          let userInfo = res.result.userInfo;
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          const { dispatch } = this.props;
          dispatch(signIn(userInfo));
        } else if(!res.msg) {
          message.error({
            content: `${res.msg}`,
          });
        }
      })
      .catch((e) => {});
  };
  changeToShow = () => {
    this.setState({
      toShow: !this.state.toShow,
    });
  };
  render() {
    return (
      <CSSTransition in={this.state.toShow} timeout={2000} className="sign-in">
        <div
        // 此处的div会被CssTransition给去掉
        >
          <div className="sign-in-form">
            <h2>登录</h2>
            <Form {...this.formLayout} onFinish={this.onFinish}>
              <FormItem
                label="用户名"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "请输入用户名",
                  },
                ]}
              >
                <Input
                  className="sign-in-input"
                  type="text"
                  placeholder="在这输入您的用户名称"
                ></Input>
              </FormItem>
              <FormItem
                label="密码"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "请输入密码",
                  },
                ]}
              >
                <Input
                  className="sign-in-input"
                  type="password"
                  placeholder="在这输入您的密码"
                />
              </FormItem>
              <FormItem
              // {...this.tailLayout}
              >
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
              </FormItem>
            </Form>
            <p className="sign-in-to-signup">
              没有账号？<Link to="/signup">点击注册</Link>
            </p>
          </div>
          {/* This is sign in page. 没有帐号？<Link to="/signup">点这注册</Link> */}
        </div>
      </CSSTransition>
    );
  }
}

let SignInWithRouter = withRouter(SignInBasic);

const SignIn = connect()(SignInWithRouter);

export default SignIn;
