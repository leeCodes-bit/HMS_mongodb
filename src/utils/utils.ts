import Joi from 'joi'

export const signupSchema = Joi.object().keys({
    doctorsName: Joi.string().required(), 
    email: Joi.string().trim().lowercase().required(), 
    specialization: Joi.string().required(), 
    gender: Joi.string().required(), 
    phoneNumber: Joi.number().required(), 
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    //confirm_password: Joi.any().equal(Joi.ref('password')).required().label('Confirm password').messages({'any.only': '{{#label}} does not match'})
})

// to make error messages cleaner
 export const options = {
    abortEarly: false,
    errors: {
        wrap: {
            label : ''
        }
    }
 }

 export const loginSchema = Joi.object().keys({
    email: Joi.string().trim().lowercase().required(), 
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
})


export const createReportSchema = Joi.object().keys({
  patientName: Joi.string().lowercase().required(),
  age: Joi.number().required(),
  hospitalName: Joi.string().lowercase().required(),
  weight: Joi.string().lowercase().required(),
  height: Joi.string().lowercase().required(),
  bloodGroup: Joi.string().lowercase(),
  genotype: Joi.string().lowercase(),
  bloodPressure: Joi.string().lowercase(),
  HIV_status: Joi.string().lowercase(),
  hepatitis: Joi.string().lowercase()
})

export const updateReportSchema = Joi.object().keys({
    patientName: Joi.string().lowercase(),
    age: Joi.number(),
    hospitalName: Joi.string().lowercase(),
    weight: Joi.string().lowercase(),
    height: Joi.string().lowercase(),
    bloodGroup: Joi.string().lowercase(),
    genotype: Joi.string().lowercase(),
    bloodPressure: Joi.string().lowercase(),
    HIV_status: Joi.string().lowercase(),
    hepatitis: Joi.string().lowercase()
  })