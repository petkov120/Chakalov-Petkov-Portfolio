import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { resumeData } from '../../data/resumeData';

interface ResumePDFProps {
  onDownloadStart?: () => void;
  onDownloadComplete?: () => void;
}

export function ResumePDF({ onDownloadStart, onDownloadComplete }: ResumePDFProps) {
  const resumeRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!resumeRef.current) return;

    onDownloadStart?.();

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgScaledWidth = imgWidth * ratio;
      const imgScaledHeight = imgHeight * ratio;

      // Calculate how many pages we need
      const pageHeight = pdfHeight;
      let heightLeft = imgScaledHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgScaledWidth, imgScaledHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgScaledHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgScaledWidth, imgScaledHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('Petkov_Richard_Resume.pdf');
      onDownloadComplete?.();
    } catch (error) {
      console.error('Error generating PDF:', error);
      onDownloadComplete?.();
    }
  };

  // Expose the generatePDF function
  React.useImperativeHandle(React.forwardRef(() => null), () => ({
    generatePDF,
  }));

  return (
    <>
      <div ref={resumeRef} className="resume-container bg-white p-8 md:p-12 max-w-4xl mx-auto">
        {/* ATS-Friendly Resume Layout */}
        <style>{`
          .resume-container {
            font-family: 'Arial', 'Helvetica', sans-serif;
            color: #000000;
            line-height: 1.6;
          }
          .resume-container h1 {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 4px;
            color: #000000;
          }
          .resume-container h2 {
            font-size: 18px;
            font-weight: bold;
            margin-top: 24px;
            margin-bottom: 12px;
            color: #000000;
            border-bottom: 2px solid #000000;
            padding-bottom: 4px;
          }
          .resume-container h3 {
            font-size: 16px;
            font-weight: bold;
            margin-top: 16px;
            margin-bottom: 8px;
            color: #000000;
          }
          .resume-container p {
            margin-bottom: 8px;
            color: #000000;
          }
          .resume-container ul {
            margin-left: 20px;
            margin-bottom: 12px;
          }
          .resume-container li {
            margin-bottom: 4px;
            color: #000000;
          }
          .resume-container .section {
            margin-bottom: 20px;
          }
          .resume-container .contact-info {
            font-size: 11px;
            margin-bottom: 16px;
            color: #000000;
          }
          .resume-container .job-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 4px;
          }
          .resume-container .job-title {
            font-weight: bold;
            font-size: 14px;
          }
          .resume-container .job-company {
            font-weight: bold;
            font-size: 14px;
          }
          .resume-container .job-period {
            font-size: 12px;
            font-style: italic;
          }
          .resume-container .job-location {
            font-size: 12px;
          }
        `}</style>

        {/* Header */}
        <div className="section">
          <h1>{resumeData.personalInfo.name}</h1>
          <p style={{ fontSize: '14px', marginBottom: '8px' }}>{resumeData.personalInfo.title}</p>
          <div className="contact-info">
            <span>Email: {resumeData.personalInfo.email}</span>
            <span style={{ marginLeft: '16px' }}>GitHub: {resumeData.personalInfo.github}</span>
            {resumeData.personalInfo.location && (
              <span style={{ marginLeft: '16px' }}>Location: {resumeData.personalInfo.location}</span>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        <div className="section">
          <h2>Professional Summary</h2>
          <p>{resumeData.summary}</p>
        </div>

        {/* Experience */}
        <div className="section">
          <h2>Professional Experience</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <div className="job-header">
                <div>
                  <span className="job-title">{exp.title}</span>
                  <span style={{ marginLeft: '8px' }}>|</span>
                  <span className="job-company" style={{ marginLeft: '8px' }}>{exp.company}</span>
                </div>
                <span className="job-period">{exp.period}</span>
              </div>
              <div className="job-location">{exp.location}</div>
              <p style={{ marginTop: '8px', marginBottom: '8px' }}>{exp.description}</p>
              <ul>
                {exp.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
              {exp.technologies && exp.technologies.length > 0 && (
                <p style={{ fontSize: '11px', fontStyle: 'italic', marginTop: '4px' }}>
                  Technologies: {exp.technologies.join(', ')}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className="section">
          <h2>Key Projects</h2>
          {resumeData.projects.map((project, index) => (
            <div key={index} style={{ marginBottom: '16px' }}>
              <div className="job-header">
                <div>
                  <span className="job-title">{project.name}</span>
                  <span style={{ marginLeft: '8px' }}>|</span>
                  <span style={{ marginLeft: '8px', fontSize: '12px' }}>{project.role}</span>
                </div>
                <span className="job-period">{project.period}</span>
              </div>
              <p style={{ marginTop: '4px', marginBottom: '8px' }}>{project.description}</p>
              <ul>
                {project.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
              <p style={{ fontSize: '11px', fontStyle: 'italic', marginTop: '4px' }}>
                Technologies: {project.technologies.join(', ')}
              </p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="section">
          <h2>Skills</h2>
          <div style={{ marginBottom: '12px' }}>
            <h3>Design</h3>
            <p>{resumeData.skills.design.join(' • ')}</p>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <h3>Development</h3>
            <p>{resumeData.skills.development.join(' • ')}</p>
          </div>
          <div>
            <h3>Tools & Technologies</h3>
            <p>{resumeData.skills.tools.join(' • ')}</p>
          </div>
        </div>

        {/* Achievements */}
        {resumeData.achievements && resumeData.achievements.length > 0 && (
          <div className="section">
            <h2>Key Achievements</h2>
            <ul>
              {resumeData.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Hidden button to trigger PDF generation */}
      <button
        onClick={generatePDF}
        style={{ display: 'none' }}
        id="generate-pdf-trigger"
        aria-hidden="true"
      >
        Generate PDF
      </button>
    </>
  );
}

// Export function to generate PDF from outside
export const generateResumePDF = async (
  onDownloadStart?: () => void,
  onDownloadComplete?: () => void
) => {
  onDownloadStart?.();

  // Create a temporary container
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  container.style.width = '210mm'; // A4 width
  container.style.backgroundColor = '#ffffff';
  container.style.padding = '20mm';
  container.style.fontFamily = 'Arial, Helvetica, sans-serif';
  container.style.color = '#000000';
  container.style.lineHeight = '1.6';
  document.body.appendChild(container);

  // Build resume HTML
  const buildResumeHTML = () => {
    let html = `
      <div style="font-family: Arial, Helvetica, sans-serif; color: #000000; line-height: 1.6;">
        <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 4px; color: #000000;">${resumeData.personalInfo.name}</h1>
        <p style="font-size: 14px; margin-bottom: 8px;">${resumeData.personalInfo.title}</p>
        <div style="font-size: 11px; margin-bottom: 16px;">
          <span>Email: ${resumeData.personalInfo.email}</span>
          <span style="margin-left: 16px;">GitHub: ${resumeData.personalInfo.github}</span>
          ${resumeData.personalInfo.location ? `<span style="margin-left: 16px;">Location: ${resumeData.personalInfo.location}</span>` : ''}
        </div>

        <h2 style="font-size: 18px; font-weight: bold; margin-top: 24px; margin-bottom: 12px; color: #000000; border-bottom: 2px solid #000000; padding-bottom: 4px;">Professional Summary</h2>
        <p>${resumeData.summary}</p>

        <h2 style="font-size: 18px; font-weight: bold; margin-top: 24px; margin-bottom: 12px; color: #000000; border-bottom: 2px solid #000000; padding-bottom: 4px;">Professional Experience</h2>
    `;

    resumeData.experience.forEach((exp) => {
      html += `
        <div style="margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <div>
              <span style="font-weight: bold; font-size: 14px;">${exp.title}</span>
              <span style="margin-left: 8px;">|</span>
              <span style="font-weight: bold; font-size: 14px; margin-left: 8px;">${exp.company}</span>
            </div>
            <span style="font-size: 12px; font-style: italic;">${exp.period}</span>
          </div>
          <div style="font-size: 12px;">${exp.location}</div>
          <p style="margin-top: 8px; margin-bottom: 8px;">${exp.description}</p>
          <ul style="margin-left: 20px; margin-bottom: 12px;">
            ${exp.achievements.map(ach => `<li style="margin-bottom: 4px;">${ach}</li>`).join('')}
          </ul>
          ${exp.technologies && exp.technologies.length > 0 ? `<p style="font-size: 11px; font-style: italic; margin-top: 4px;">Technologies: ${exp.technologies.join(', ')}</p>` : ''}
        </div>
      `;
    });

    html += `
        <h2 style="font-size: 18px; font-weight: bold; margin-top: 24px; margin-bottom: 12px; color: #000000; border-bottom: 2px solid #000000; padding-bottom: 4px;">Key Projects</h2>
    `;

    resumeData.projects.forEach((project) => {
      html += `
        <div style="margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <div>
              <span style="font-weight: bold; font-size: 14px;">${project.name}</span>
              <span style="margin-left: 8px;">|</span>
              <span style="font-size: 12px; margin-left: 8px;">${project.role}</span>
            </div>
            <span style="font-size: 12px; font-style: italic;">${project.period}</span>
          </div>
          <p style="margin-top: 4px; margin-bottom: 8px;">${project.description}</p>
          <ul style="margin-left: 20px; margin-bottom: 12px;">
            ${project.achievements.map(ach => `<li style="margin-bottom: 4px;">${ach}</li>`).join('')}
          </ul>
          <p style="font-size: 11px; font-style: italic; margin-top: 4px;">Technologies: ${project.technologies.join(', ')}</p>
        </div>
      `;
    });

    html += `
        <h2 style="font-size: 18px; font-weight: bold; margin-top: 24px; margin-bottom: 12px; color: #000000; border-bottom: 2px solid #000000; padding-bottom: 4px;">Skills</h2>
        <div style="margin-bottom: 12px;">
          <h3 style="font-size: 16px; font-weight: bold; margin-top: 16px; margin-bottom: 8px;">Design</h3>
          <p>${resumeData.skills.design.join(' • ')}</p>
        </div>
        <div style="margin-bottom: 12px;">
          <h3 style="font-size: 16px; font-weight: bold; margin-top: 16px; margin-bottom: 8px;">Development</h3>
          <p>${resumeData.skills.development.join(' • ')}</p>
        </div>
        <div>
          <h3 style="font-size: 16px; font-weight: bold; margin-top: 16px; margin-bottom: 8px;">Tools & Technologies</h3>
          <p>${resumeData.skills.tools.join(' • ')}</p>
        </div>
    `;

    if (resumeData.achievements && resumeData.achievements.length > 0) {
      html += `
        <h2 style="font-size: 18px; font-weight: bold; margin-top: 24px; margin-bottom: 12px; color: #000000; border-bottom: 2px solid #000000; padding-bottom: 4px;">Key Achievements</h2>
        <ul style="margin-left: 20px; margin-bottom: 12px;">
          ${resumeData.achievements.map(ach => `<li style="margin-bottom: 4px;">${ach}</li>`).join('')}
        </ul>
      `;
    }

    html += `</div>`;
    return html;
  };

  container.innerHTML = buildResumeHTML();

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: container.offsetWidth,
      height: container.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min((pdfWidth - 20) / imgWidth, (pdfHeight - 20) / imgHeight);
    const imgScaledWidth = imgWidth * ratio;
    const imgScaledHeight = imgHeight * ratio;

    // Calculate how many pages we need
    const pageHeight = pdfHeight - 20;
    let heightLeft = imgScaledHeight;
    let position = 10;

    // Add first page
    pdf.addImage(imgData, 'PNG', 10, position, imgScaledWidth, imgScaledHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgScaledHeight + 10;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgScaledWidth, imgScaledHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('Petkov_Richard_Resume.pdf');
    document.body.removeChild(container);
    onDownloadComplete?.();
  } catch (error) {
    console.error('Error generating PDF:', error);
    document.body.removeChild(container);
    onDownloadComplete?.();
  }
};

