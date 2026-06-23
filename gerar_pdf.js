const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora de Custas Trabalhistas</title>
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
        <h1>Calculadora de Custas Trabalhistas</h1>
        <div class="author">
            Preparado por: <strong>Mateus Matos</strong><br>
            <span class="title-role">Analista Judiciário</span>
        </div>
    </div>

    <h2>Sobre o Projeto</h2>
    <p>Este site foi desenvolvido como uma ferramenta de apoio para audiências trabalhistas, com o objetivo de facilitar a conferência de valores, agilizar cálculos e reduzir a margem de erro em momentos que exigem rapidez e precisão.</p>
    <p>A proposta é oferecer uma solução simples, acessível e de uso imediato, especialmente útil em audiências telepresenciais realizadas por Zoom, nas quais partes, advogados e servidores precisam lidar com informações de forma prática e clara. A calculadora foi pensada para apoiar a atividade forense, sem substituir a conferência oficial do processo ou os critérios adotados pela unidade judiciária.</p>

    <h2>Contexto e Motivação</h2>
    <p>O projeto nasce da experiência prática com o ambiente da Justiça do Trabalho e da percepção de que pequenas ferramentas digitais podem contribuir para mais organização, segurança e eficiência no andamento das audiências. Além disso, a iniciativa também demonstra como tecnologia, automação e conhecimento jurídico podem caminhar juntos em favor de soluções úteis e concretas.</p>
    <p>A ideia é que esta página funcione como um ponto de apoio rápido para magistrados, servidores, advogados e partes, tornando a consulta mais fácil e transparente no contexto da audiência.</p>

    <h2>Próximos Passos</h2>
    <p>Como próximo passo, o projeto pode evoluir para uma integração com Zoom Apps, permitindo acesso mais direto dentro do ambiente da audiência telepresencial.</p>

    <h2>Base Legal</h2>
    <p>A calculadora segue os critérios estabelecidos no Artigo 789 da CLT e na Portaria Interministerial MPS/MF nº 13, de 09 de janeiro de 2026, considerando:</p>
    <ul>
        <li>Mínimo legal de R$ 10,64</li>
        <li>Máximo de 4x o teto do RGPS</li>
        <li>Percentual de 2% sobre o valor do acordo</li>
    </ul>

    <h2>Como Usar</h2>
    <ol>
        <li>Insira o valor do acordo em reais</li>
        <li>Confirme o teto do RGPS (atualizado automaticamente)</li>
        <li>Clique em "Calcular"</li>
        <li>Consulte o resultado detalhado com custas integrais e pro rata</li>
    </ol>
    <p>A ferramenta aceita valores em formato brasileiro (1.000,00) e formato americano (1,000.00).</p>

    <h2>Acesso</h2>
    <p>O site está disponível em:<br>
    <a href="https://mateusfsmatos2019-ops.github.io/Calculadora-custas/" style="color: #0066cc; text-decoration: underline; font-weight: bold;">https://mateusfsmatos2019-ops.github.io/Calculadora-custas/</a></p>

    <div class="footer">
        <p>Calculadora de Custas Trabalhistas — Versão 1.1.0 — Junho de 2026</p>
        <p>Junho de 2026</p>
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
        
        const pdfPath = path.join(process.cwd(), 'APRESENTACAO.pdf');
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
        console.log('PDF gerado com sucesso: ' + pdfPath);
        process.exit(0);
    } catch (err) {
        console.error('Erro ao gerar PDF:', err);
        process.exit(1);
    }
}

generatePDF();
