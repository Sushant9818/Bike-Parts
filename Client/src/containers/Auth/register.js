import React from 'react'
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
// import CountryData from '../../countries.json';
import { message } from 'antd';
import ShowhidePassword from '../../components/showhidePassword';
import { useNavigate, Link } from 'react-router-dom';
import background from "../../images/moter.jpg";
const Register = ()=>{
    const navigate = useNavigate()

    const registerUser = async(values)=>{
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };

        const response = await fetch('http://localhost:6000/register', requestOptions);
        const data = await response.json()

        if(data){
            console.log(data)
            message.success(data.msg)
            navigate('/')
        }
    }

    const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

	const SignupSchema = Yup.object().shape({
		name: Yup.string().required('Required'),
		phoneNumber: Yup.string().required('Required'),
        permanentAddress: Yup.string().required('Required'),
		email: Yup.string().email('Invalid email').required('Required'),
        confirmPassword: Yup.string()
			.oneOf([Yup.ref('password'), null], 'Passwords doesnt match'),
		password: Yup.string()
			.required('Required')
			.min(6)
			.matches(passwordRule, { message: 'Please create a stronger password' }),
	});

    return(
        <div style={{ backgroundImage: `url(${background})`}}>
        <section className='form_section'>
            
            <div className='container'>
                <div className='form'>
                    <h1>Sign Up</h1>

                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            phoneNumber: '',
                            permanentAddress: '',
                            temporaryAddress: '',
                            userRole: '',
                            password: '',
                            confirmPassword: '',
                            country: '',
                            zipCode: ''
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={values=>{
                            registerUser(values)
                        }}
                    >

                        {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                            <Form  onSubmit={handleSubmit}>
                                <Field name="name" placeholder="Your Name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
								{errors.name && touched.name ? (<div className="error">{errors.name}</div>) : null}

                                <Field name="email" placeholder="Your Email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                {errors.email && touched.email ? (<div className="error">{errors.email}</div>) : null}

                                <Field name="phoneNumber" placeholder="Your phoneNumber" value={values.phoneNumber} onChange={handleChange} onBlur={handleBlur} />
                                {errors.phoneNumber && touched.phoneNumber ? (<div className="error">{errors.phoneNumber}</div>) : null}

                                <Field name="permanentAddress" placeholder="Your permanentAddress" value={values.permanentAddress} onChange={handleChange} onBlur={handleBlur} />
                                {errors.permanentAddress && touched.permanentAddress ? (<div className="error">{errors.permanentAddress}</div>) : null}

                                <Field name="temporaryAddress" placeholder="Your temporaryAddress" value={values.temporaryAddress} onChange={handleChange} onBlur={handleBlur} />
                                {errors.temporaryAddress && touched.temporaryAddress ? (<div className="error">{errors.temporaryAddress}</div>) : null}

                                <select name="userRole" value={values.userRole} onChange={handleChange} onBlur={handleBlur}>
                                    <option value="" disabled="disabled" label="Select a Role"></option>
                                    <option value="user" label="User">User</option>
                                    <option value="rider" label="Rider">Rider</option>
                                </select>
                                {errors.userRole && touched.userRole ? (<div className="error">{errors.userRole}</div>) : null}

                                <Field name="password" placeholder="Enter password" value={values.password} onChange={handleChange} onBlur={handleBlur} component={ShowhidePassword}/>
                                {errors.password && touched.password ? (<div className="error">{errors.password}</div>) : null}

                                <Field name="confirmPassword" placeholder="confirm password" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} component={ShowhidePassword}/>
                                {errors.confirmPassword && touched.confirmPassword ? (<div className="error">{errors.confirmPassword}</div>) : null}

                                <select name="country" value={values.country} onChange={handleChange} onBlur={handleBlur}>
                                    <option value="" disabled="disabled" label="Select a Country"></option>
                                    {/* {CountryData.map(country => {
                                        const {name} = country
                                        return(
                                            <option value={name} label={name} key={name}>{name}</option>
                                        )
                                    })} */}
                                </select>
                                
                                {errors.country && touched.country ? (<div className="error">{errors.country}</div>) : null}
                                <Field name="zipCode" placeholder="Your zipCode" value={values.zipCode} onChange={handleChange} onBlur={handleBlur} />
                                {errors.zipCode && touched.zipCode ? (<div className="error">{errors.zipCode}</div>) : null}

                                <button type="submit">Signup</button>
                            </Form>
                        )} 
                    </Formik>
                    <p style={{ marginTop: '10px' }}>Already have an account? Please <Link to="/">Login</Link> to continue</p>
                </div>
            </div>
           
        </section>
        </div>
    )
}
export default Register