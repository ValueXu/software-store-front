import React from "react";

import { Steps, Button, message, Form } from "antd";

import "./SignUp.less";
import UserPass from "./contents/user-pass/UserPass";
import Info from "./contents/info/Info";
// import Email from "./contents/email/Email";
import SignUpResult from "./contents/sign_up_result/SignUpResult";
import { ajax } from "../../ajax/myAxios";

const { Step } = Steps;

export default class SignUp extends React.Component {
  steps = [
    {
      title: "第一步",
      description: "输入用户名和密码",
      content: <UserPass />,
    },
    {
      title: "第二步",
      description: "填写相关信息",
      content: <Info />,
    },
    // {
    //   title: "第三步",
    //   description: "验证电子邮件",
    //   content: <Email />,
    // },
    {
      title: "注册结果",
      description: "当前注册流程的结果",
      content: <SignUpResult />,
    },
  ];

  state = {
    currentStep: 0,
    notVerified: true,
  };

  formValues = [];

  setFormValues = (key, value) => {
    if (key !== undefined && value !== undefined) {
      const formValues = this.formValues;
      this.formValues = { ...formValues, [key]: value };
    }
  };

  onFormFinish = (name, { values, forms }) => {
    // const currentForm = forms[name];
    let newFormValues = { ...this.formValues, ...values };
    this.formValues = newFormValues;
    console.log(this.formValues);
    if (name === "info" && Object.keys(this.formValues).length >= 5) {
      // currentForm
      this.setState({
        notVerified: false,
      });
    }
  };

  next = () => {
    const currentStep = this.state.currentStep + 1;
    this.setState({
      currentStep,
    });
  };

  prev = () => {
    const currentStep = this.state.currentStep - 1;
    this.setState({
      currentStep,
    });
  };

  submitSignUp = () => {
    let formValues = this.formValues;
    let data = new FormData();
    Object.keys(formValues).forEach((item) => {
      data.append(`${item}`, formValues[item]);
    });
    const config = {
      method: "POST",
      data,
      url: "/user/signUp",
    };
    ajax(config).then((res) => {
      if (res.code === 1) {
        message.success({
          content: "注册成功",
        });
        this.next();
      } else {
        message.error({
          content: `${res.msg}`,
        });
      }
    });
  };

  render() {
    const currentStep = this.state.currentStep;
    const actionsRender = () => {
      let actions = [];
      if (currentStep < this.steps.length - 1) {
        if (currentStep === this.steps.length - 2) {
          actions.push(
            this.state.notVerified ? (
              <Button className="button" type="primary" disabled key="complete">
                完成
              </Button>
            ) : (
              <Button
                className="button"
                type="primary"
                onClick={this.submitSignUp}
                key="complete"
              >
                完成
              </Button>
            )
          );
        } else {
          actions.push(
            <Button
              className="button"
              type="primary"
              onClick={() => {
                this.next();
              }}
              key="next"
            >
              下一步
            </Button>
          );
        }
      }
      if (currentStep > 0) {
        actions.push(
          <Button
            className="button"
            onClick={() => {
              this.prev();
            }}
            key="prev"
          >
            上一步
          </Button>
        );
      }
      return actions;
    };
    return (
      <div className="sign-up">
        <Steps className="steps" current={currentStep} direction="vertical">
          {this.steps.map((item) => {
            return (
              <Step
                key={item.title}
                title={item.title}
                description={item.description}
              />
            );
          })}
        </Steps>
        <div className="content-wrapper">
          <Form.Provider onFormFinish={this.onFormFinish}>
            <div className="steps-content">
              {this.steps[currentStep].content}
            </div>
            <div className="steps-action">{actionsRender()}</div>
          </Form.Provider>
        </div>
      </div>
    );
  }
}
