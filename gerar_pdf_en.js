const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Labor Costs Calculator</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 40px;
            max-width: 800px;
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 3px solid #0066cc;
            padding-bottom: 20px;
        }
        .header h1 {
            margin: 0 0 10px 0;
            color: #0066cc;
            font-size: 28px;
        }
        .author {
            font-size: 14px;
            color: #666;
            margin: 10px 0;
        }
        .title-role {
            font-weight: bold;
            color: #0066cc;
            font-size: 16px;
        }
        h2 {
            color: #0066cc;
            margin-top: 30px;
            margin-bottom: 15px;
            border-left: 4px solid #0066cc;
            padding-left: 15px;
        }
        p {
            text-align: justify;
            margin-bottom: 15px;
        }
        .footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 2px solid #ccc;
            text-align: center;
            font-size: 12px;
            color: #999;
        }
        ul {
            margin-left: 20px;
        }
        li {
            margin-bottom: 8px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Labor Costs Calculator</h1>
        <div class="author">
            Prepared by: <strong>Mateus Matos</strong><br>
            <span class="title-role">Judicial Analyst</span>
        </div>
    </div>

    <h2>About the Project</h2>
    <p>This website was developed as a support tool for labor hearings, with the objective of facilitating the verification of values, accelerating calculations and reducing the margin of error in moments that require speed and precision.</p>
    <p>The proposal is to offer a simple, accessible and immediate-use solution, especially useful in telepresential hearings conducted via Zoom, in which parties, lawyers and servers need to handle information in a practical and clear manner. The calculator was designed to support forensic activity, without replacing the official verification of the process or the criteria adopted by the judicial unit.</p>

    <h2>Context and Motivation</h2>
    <p>The project stems from practical experience in the Labor Justice environment and the perception that small digital tools can contribute to greater organization, security and efficiency in the conduct of hearings. Furthermore, the initiative also demonstrates how technology, automation and legal knowledge can work together in favor of useful and concrete solutions.</p>
    <p>The idea is that this page functions as a quick point of support for judges, servers, lawyers and parties, making consultation easier and more transparent in the context of the hearing.</p>

    <h2>Next Steps</h2>
    <p>As a next step, the project can evolve into an integration with Zoom Apps, allowing more direct access within the telepresential hearing environment.</p>

    <h2>Legal Basis</h2>
    <p>The calculator follows the criteria established in Article 789 of the CLT and in the Interministerial Order MPS/MF nº 13, dated January 9, 2026, considering:</p>
    <ul>
        <li>Minimum legal amount of R$ 10.64</li>
        <li>Maximum of 4x the RGPS ceiling</li>
        <li>Percentage of 2% over the settlement value</li>
    </ul>

    <h2>How to Use</h2>
    <ol>
        <li>Enter the settlement value in Brazilian reais</li>
        <li>Confirm the RGPS ceiling (automatically updated)</li>
        <li>Click "Calculate"</li>
        <li>Consult the detailed result with full costs and pro rata</li>
    </ol>
    <p>The tool accepts values in Brazilian format (1.000,00) and American format (1,000.00).</p>

    <h2>Access</h2>
    <p>The site is available at:<br>
    <a href="https://mateusfsmatos2019-ops.github.io/Calculadora-custas/" style="color: #0066cc; text-decoration: underline; font-weight: bold;">https://mateusfsmatos2019-ops.github.io/Calculadora-custas/</a></p>

    <div class="footer">
        <p>Labor Costs Calculator — Version 1.1.0 — June 2026</p>
        <p>June 2026</p>
    </div>
</body>
</html>
`;

async function generatePDF() {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        
        const pdfPath = path.join(process.cwd(), 'PRESENTATION.pdf');
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            margin: {
                top: '10mm',
                right: '10mm',
                bottom: '10mm',
                left: '10mm'
            }
        });
        
        await browser.close();
        console.log('PDF generated successfully: ' + pdfPath);
        process.exit(0);
    } catch (err) {
        console.error('Error generating PDF:', err);
        process.exit(1);
    }
}

generatePDF();
