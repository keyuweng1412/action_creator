import React, {Component} from 'react'
import 'antd/dist/antd.css'
import {connect} from 'react-redux'

import {usernameAction} from '../action/action'
// import {USERNAME_CHANGE} from '../action/actionTypes'
import { Form, 
    Input, 
    Radio,
    DatePicker, 
    Checkbox, 
    Row, 
    Col ,
    Button } from 'antd';

const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
        xs:{span: 4},
        sm:{span: 5},
    },
    wrapperCol: { span: 8, offset:0},
  };

  class FromCustom extends Component{
    getValidateStatus(field){
        const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;

        if (isFieldValidating(field)) {
          return 'validating';
        } else if (!!getFieldError(field)) {
          return 'error';
        } else if (getFieldValue(field)) {
          return 'success';
        }
    }

     // 提交表单
     handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(err){
                console.log('error',err);
               
            }else{
                console.log('Received values of form: ', values);
            } 
        });
      };
      render(){
          const {username} = this.props
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const nameProps = getFieldProps('name',{
            rules:[{required: true, message: 'Please input your username!'},
                                   {min:6,max:18,message:'需要6-18个字符,长度不在范围内'},
                                   {pattern:new RegExp('^\\w+$','g'),message:'用户名必须为字母或者数字'}
                                ]
        })
          return(
              <div>
                 <Form layout='horizontal' onSubmit={this.handleSubmit} >
                    <Form.Item label='用户名' {...formItemLayout} 
                               hasFeedback 
                               help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}>
                        <Input {...nameProps} value={username} placeholder="请输入用户名" onChange={this.props.handleUsername}/>
                    </Form.Item>
                 </Form>
              </div>
          )
      }
  }

  const mapStateToProps =(state) =>{
      return{
          username:state.fromReducer.username
      }
  }

  const mapDispatchToProps = (dispatch) =>{
      return{
          handleUsername(e){
              const action = usernameAction(e.target.value)
              dispatch(action)
          }
      }
  }

  const WrappedNormalForm = Form.create({})(FromCustom)

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(WrappedNormalForm)