import mongoose from 'mongoose';

interface ReportAttr {
    patientName: string,
    age: number,
    hospitalName: String,
    weight: string,
    height: string,
    bloodGroup: string,
    genotype: string,
    bloodPressure: string,
    HIV_status: string,
    hepatitis: string,
    doctorsId: string
}

const reportSchema = new mongoose.Schema({
    patientName: {type: String, required: true},
    age: {type: String, required: true},
    hospitalName: {type: String, required: true},
    weight:{type: String, required: true},
    height:{type: String, required: true},
    bloodGroup:{type: String, required: true},
    genotype:{type: String, required: true},
    bloodPressure:{type: String, required: true},
    HIV_status:{type: String, required: true},
    hepatitis:{type: String, required: true},
    doctorsId:{type: String, required: true}
},{
    timestamps: true,
    toJSON:{
        transform(doc, ret){
            ret.patientId = ret._id,
            delete ret._id,
            delete ret.password,
            delete ret.__v
        }
    }
})

const Report = mongoose.model<ReportAttr>("Report", reportSchema);

export default Report;