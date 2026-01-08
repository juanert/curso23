import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { prescriptionService } from '../services/prescription.service';

export const createPrescription = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Authentication required' });
    const prescription = await prescriptionService.createPrescription(req.user.id, req.body);
    res.status(201).json(prescription);
  } catch (err) {
    next(err);
  }
};

export const listPrescriptionsForRecord = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Authentication required' });
    const prescriptions = await prescriptionService.listForRecord(req.user.id, req.params.recordId);
    res.json(prescriptions);
  } catch (err) {
    next(err);
  }
};

export const getPrescriptionPdf = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Authentication required' });

    const { prescriptionId } = req.params as { prescriptionId: string };
    const prescription = await prescriptionService.getByIdForDoctor(req.user.id, prescriptionId);

    const pdfContent = `%PDF-1.1
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 70 >>
stream
BT /F1 18 Tf 100 700 Td (Prescription ${prescription._id.toString()}) Tj ET
endstream
endobj
trailer
<< /Root 1 0 R >>
%%EOF`;

    const filename = `prescription-${prescription._id.toString()}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
    const buffer = Buffer.from(pdfContent, 'binary');
    res.send(buffer);
  } catch (err) {
    next(err);
  }
};
