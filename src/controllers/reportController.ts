import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Doctor from "../models/doctorsModel";
import Report from "../models/reportModel";
import { createReportSchema, options, updateReportSchema } from "../utils/utils";

/*=======================API=============================== */
export const CreateReport = async(req:Request | any, res: Response) => {
    try{
        const validationResult = createReportSchema.validate(req.body, options);
        if(validationResult.error){
            return res.status(400).json({Error: validationResult.error.details[0].message})
        };

        const {doctorsId} = req.user

        const reportRecord = new Report({
            ...req.body,
            doctorsId
        });

        await reportRecord.save();

        return res.status(201).json({
            msg: 'you have sucessfully created a report',
            reportRecord
        });

        }catch(err){
            console.log(err);
        }
}

export const getReports =async (req:Request, res: Response) => {
    try{
      const getAllReports = await Report.find({});

      return res.status(200).json({
          msg: "You have successfully retrieved all reports",
          getAllReports
      })
    }catch(error){
      console.log(error);
    }
  }

  export const updateReport = async (req:Request, res: Response) => {
    try{
    const validationResult = updateReportSchema.validate(req.body, options);
    if(validationResult.error){
        return res.status(400).json({Error: validationResult.error.details[0].message})
    };

    const patientId =  req.params.id
    const { 
      patientName,
      age,
      hospitalName,
      weight,
      height,
      bloodGroup,
      genotype,
      bloodPressure,
      HIV_status,
      hepatitis, } = req.body;

    const updateReport = await Report.findOne({patientId})

    if(!updateReport){
        return res.status(400).json({
            error: "cannot find existing todo"
        })
    }

    const updatedReport = await updateReport.updateOne({
      patientName: patientName,
      age: age,
      hospitalName: hospitalName,
      weight: weight,
      height: height,
      bloodGroup: bloodGroup,
      genotype: genotype,
      bloodPressure: bloodPressure,
      HIV_status: HIV_status,
      hepatitis: hepatitis,
    });

    return res.status(200).json({
        message: "Patient report successfully updated",
        report: updatedReport
      });

    }catch(error){
        console.log(error);
    }
}

  export const deleteReport = async(req: Request, res: Response)=>{
    try{
        const patientId = req.params.id
        const report = await Report.findOne({patientId})
        
        if(!report){
            return res.status(400).json({
                error: "cannot find existing report"
            })
        }

        const deletedReport = await report.deleteOne()

        return res.status(200).json({
            message: "Patient report successfully deleted",
            report: deletedReport
          });
    }catch(error){
        console.log(error);
    }
    }