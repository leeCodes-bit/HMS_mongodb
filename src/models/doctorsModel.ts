import mongoose from 'mongoose';

interface DoctorsAttr{
    doctorsName: string;
    email: string; // no duplicates allowed.
    specialization: string;
    gender: string;
    phoneNumber: string;
    password: string;
   }

interface DoctorModel extends mongoose.Model<DoctorDoc> {
    build(attrs: DoctorsAttr): DoctorDoc
}

interface DoctorDoc extends mongoose.Document {
    doctorsName: string;
    email: string;
    specialization: string;
    gender: string;
    phoneNumber: string;
    password: string;
}

const doctorSchema = new mongoose.Schema({
    doctorsName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    specialization: {type: String, required: true},
    gender:{type: String, required: true},
    phoneNumber:{type: String, required: true},
    password:{type: String, required: true}
},{
    timestamps: true,
    toJSON:{
        transform(doc, ret){
            ret.doctorsId = ret._id,
            delete ret._id,
            delete ret.password,
            delete ret.__v
        }
    }
})

doctorSchema.statics.build = (attrs: DoctorsAttr) => {
    return new Doctor(attrs)
}

const Doctor = mongoose.model<DoctorDoc, DoctorModel>('Doctor', doctorSchema);
export { Doctor }

export default Doctor;