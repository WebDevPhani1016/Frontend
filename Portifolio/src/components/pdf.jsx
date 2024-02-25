import jsPDF from "jspdf";
import { SectionWrapper } from "../hoc";
import html2canvas from "html2canvas";

const Pdf = () => {
    const generatePDF = () => {
        const sections = document.querySelectorAll('.pdf-section');
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Capture background
        html2canvas(document.body, { useCORS: true }).then((canvas) => {
            const bgImageData = canvas.toDataURL('image/png');

            // Add background image to each page
            for (let i = 1; i < pdf.internal.getNumberOfPages(); i++) {
                pdf.setPage(i + 1);
                pdf.addImage(bgImageData, 'PNG', 0, 0, 420, 594); // A2 size in millimeters
 // A4 size
            }

            // Function to capture content and add to PDF
            const captureSection = (index) => {
                if (index < sections.length) {
                    const section = sections[index];
                    html2canvas(section, { useCORS: true })
                        .then((canvas) => {
                            const imageData = canvas.toDataURL('image/png');
                            pdf.addPage();
                            pdf.addImage(imageData, 'PNG', 0, 0, 210, 297); // A4 size
                            captureSection(index + 1); // Capture next section
                        });
                } else {
                    // console.log(sections);
                    pdf.save('react_app.pdf'); // Save PDF when all sections captured
                }
            };

            // Start capturing sections
            captureSection(0);
        });
    };

    return (
        <div className="flex items-center justify-center">
            <button onClick={generatePDF}
                className="bg-tertiary py-3 px-8 outline-none w-fit
                 text-white font-bold shadow-md shadow-primary rounded-xl">
                Download PDF
            </button>
        </div>
    )
}

export default SectionWrapper(Pdf,"")