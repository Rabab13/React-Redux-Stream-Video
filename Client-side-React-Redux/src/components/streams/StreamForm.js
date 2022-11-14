import React from "react";
import {Field , reduxForm } from 'redux-form';


class StreamForm extends React.Component {
    renderError({error, touched}){
        if(touched && error){
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            )
        }
    }

    renderInput = ({input , label, meta})=> {
        const className = `field ${meta.error && meta.touched ? 'error':''}`;
        return (
        <div className={className}>
            <label>{label}</label>
            <input {...input} autoComplete="off"/>
            {this.renderError(meta)}
        </div>
        )
    }
    onSubmit = (formValue) => {
        this.props.onSubmit(formValue)
        // console.log(formValue);
        
    }

    render() {
        console.log(this.props)
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error"> 
                <Field name='title' component={this.renderInput} label='Enter Title'/>
                <Field name='description' component={this.renderInput} label='Enter Description'/>
                <button className="ui inverted purple button">Submit</button>
            </form>
        )
    }
    
}

const validation = (formValue) => {
    const errors = {};

    if (!formValue.title) {
        errors.title = 'You must provide a title'
    }
    if (!formValue.description) {
        errors.description = 'You must provide a description'
    }
    return errors;
}

export default reduxForm({form: 'streamForm', validate: validation})(StreamForm);
//reduxForm() will return the function which created by StreamForm
