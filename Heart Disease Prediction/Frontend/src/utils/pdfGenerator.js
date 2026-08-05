import jsPDF from 'jspdf';

export const generatePDFReport = (resultData, patientVitals = {}) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 15;

  // Colors
  const primaryColor = [15, 23, 42]; // Dark Slate
  const blueAccent = [37, 99, 235]; // Royal Blue
  const redAlert = [220, 38, 38]; // Red
  const greenSuccess = [22, 163, 74]; // Green
  const grayText = [71, 85, 105];

  // Header Banner
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('CARDIOCHECK AI - CLINICAL DIAGNOSTIC REPORT', 14, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225);
  doc.text(`Report ID: ${resultData.id || 'HD-REPORT'}  |  Date: ${resultData.timestamp || new Date().toLocaleString()}`, 14, 24);

  y = 38;

  // Patient Info & Summary Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, pageWidth - 28, 24, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...primaryColor);
  doc.text(`Patient ID: ${resultData.patient_id || 'PT-2026-CLIENT'}`, 18, y + 8);

  const inputs = resultData.input_data || patientVitals;
  const gender = inputs.sex == 1 ? 'Male' : 'Female';

  doc.setFont('helvetica', 'normal');
  doc.text(`Age: ${inputs.age || 'N/A'} yrs   |   Sex: ${gender}   |   Resting BP: ${inputs.trestbps || 'N/A'} mmHg   |   Cholesterol: ${inputs.chol || 'N/A'} mg/dl`, 18, y + 17);

  y += 32;

  // Diagnostic Outcome Banner
  const isPositive = resultData.prediction?.includes('Detected') || resultData.is_positive;
  const outcomeBg = isPositive ? [254, 242, 242] : [240, 253, 244];
  const outcomeBorder = isPositive ? redAlert : greenSuccess;

  doc.setFillColor(...outcomeBg);
  doc.setDrawColor(...outcomeBorder);
  doc.setLineWidth(0.8);
  doc.roundedRect(14, y, pageWidth - 28, 32, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...outcomeBorder);
  doc.text(resultData.prediction || 'Diagnostic Outcome', 20, y + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...grayText);
  doc.text(`Probability Score: ${resultData.probability}%   |   Risk Level: ${resultData.risk_level}   |   Confidence: ${resultData.confidence || 'High'}`, 20, y + 23);

  y += 40;

  // Key Clinical Inputs Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...primaryColor);
  doc.text('1. Clinical Vitals & Diagnostic Parameters', 14, y);
  y += 6;

  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, pageWidth - 28, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...primaryColor);
  doc.text('Parameter Name', 18, y + 5);
  doc.text('Value Observed', 100, y + 5);
  doc.text('Clinical Threshold', 145, y + 5);
  y += 9;

  doc.setFont('helvetica', 'normal');
  const tableRows = [
    ['Resting Blood Pressure', `${inputs.trestbps || 'N/A'} mmHg`, '< 120 mmHg (Normal)'],
    ['Serum Cholesterol', `${inputs.chol || 'N/A'} mg/dl`, '< 200 mg/dl (Desirable)'],
    ['Fasting Blood Sugar', inputs.fbs == 1 ? '> 120 mg/dl (High)' : '< 120 mg/dl (Normal)', '< 120 mg/dl'],
    ['Max Heart Rate Achieved', `${inputs.thalach || 'N/A'} bpm`, 'Age-adjusted max HR'],
    ['ST Depression (Oldpeak)', `${inputs.oldpeak || '0.0'} mm`, '< 1.0 mm (Normal)'],
    ['Exercise Induced Angina', inputs.exang == 1 ? 'Yes (Present)' : 'No (Absent)', 'Absent'],
    ['Major Vessels (Fluoroscopy)', `${inputs.ca || '0'} vessel(s)`, '0 vessels']
  ];

  tableRows.forEach(([param, val, ref]) => {
    doc.text(param, 18, y);
    doc.text(val, 100, y);
    doc.text(ref, 145, y);
    doc.setDrawColor(241, 245, 249);
    doc.line(14, y + 2, pageWidth - 14, y + 2);
    y += 7;
  });

  y += 6;

  // Identified Risk Factors
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...primaryColor);
  doc.text('2. Identified Cardiovascular Risk Factors', 14, y);
  y += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...grayText);

  const riskFactors = resultData.risk_factors || ['No major risk factors detected'];
  riskFactors.forEach((rf) => {
    doc.text(`• ${rf}`, 18, y);
    y += 6;
  });

  y += 6;

  // Medical Recommendations & Lifestyle
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...primaryColor);
  doc.text('3. Cardiologist Recommendation & Preventive Advice', 14, y);
  y += 7;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 58, 138);

  const recText = doc.splitTextToSize(resultData.recommendation || 'Consult your physician for routine follow up.', pageWidth - 32);
  doc.text(recText, 18, y);
  y += recText.length * 5 + 4;

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...grayText);
  const tips = resultData.lifestyle_tips || ['Maintain balanced diet and regular physical activity.'];
  tips.forEach((tip) => {
    const splitTip = doc.splitTextToSize(`- ${tip}`, pageWidth - 36);
    doc.text(splitTip, 18, y);
    y += splitTip.length * 5;
  });

  // Footer Disclaimer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.setDrawColor(226, 232, 240);
  doc.line(14, 280, pageWidth - 14, 280);
  doc.text('DISCLAIMER: CardioCheck AI is a machine learning decision-support tool (Accuracy: 80.33%). Not a replacement for professional medical diagnosis.', 14, 285);

  doc.save(`CardioCheck_Report_${resultData.id || 'HD-2026'}.pdf`);
};
