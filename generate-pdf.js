const html_to_pdf = require('html-pdf-node');
const fs = require('fs');
const path = require('path');

async function generatePhysicsLawsPDF() {
    console.log('🚀 بدء إنشاء ملف PDF احترافي لقوانين الفيزياء...');

    try {
        // قراءة ملف HTML
        const htmlPath = path.join(__dirname, 'laws_page.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');

        // استخراج محتوى القوانين فقط
        const lawsContentMatch = htmlContent.match(/<section id="laws-content">(.*?)<\/section>/s);
        if (!lawsContentMatch) {
            throw new Error('لم يتم العثور على محتوى القوانين');
        }

        const lawsContent = lawsContentMatch[1];

        // إنشاء HTML نظيف للطباعة
        const cleanHTML = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>قوانين الفيزياء - الصف الثالث الثانوي</title>
    <style>
        @page {
            size: A4;
            margin: 25mm 20mm 25mm 20mm;
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
        }

        /* تحسين وضوح النصوص والمعادلات */
        * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
        }

        /* تحسين وضوح المعادلات الرياضية */
        .formula-box, .math-equation, sup, sub {
            font-family: 'Times New Roman', 'Cambria Math', 'STIXGeneral', serif;
            font-weight: normal;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        body {
            font-family: 'Times New Roman', 'Arial', serif;
            font-size: 12pt;
            line-height: 1.4;
            color: #000000;
            background: #ffffff;
            direction: rtl;
            text-align: right;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
        }

        /* عنوان الصفحة */
        .section-header {
            text-align: center;
            margin-bottom: 20pt;
            border-bottom: 2pt solid #000000;
            padding-bottom: 10pt;
        }

        .section-title {
            font-size: 18pt;
            font-weight: bold;
            color: #000000;
            margin-bottom: 8pt;
        }

        .section-tag {
            font-size: 14pt;
            color: #333333;
            margin-bottom: 5pt;
        }

        /* أقسام القوانين */
        .law-section {
            margin-bottom: 15pt;
            page-break-inside: avoid;
        }

        .law-section h2 {
            font-size: 14pt;
            font-weight: bold;
            color: #000000;
            margin: 12pt 0 8pt 0;
            border-bottom: 1.5pt solid #333333;
            padding-bottom: 4pt;
        }

        .law-section h3 {
            font-size: 12pt;
            font-weight: bold;
            color: #000000;
            margin: 8pt 0 5pt 0;
        }

        /* صناديق الصيغ */
        .formula-box {
            background: #f8f8f8;
            border: 1.5pt solid #000000;
            border-radius: 3pt;
            padding: 6pt 10pt;
            margin: 4pt 0;
            font-family: 'Times New Roman', serif;
            font-size: 11pt;
            font-weight: normal;
            text-align: center;
            color: #000000;
            display: block;
            width: fit-content;
            margin-left: auto;
            margin-right: auto;
        }

        /* صناديق الملاحظات */
        .note-box {
            background: #ffffff;
            border-left: 3pt solid #0066cc;
            padding: 4pt 8pt;
            margin: 4pt 0;
            font-size: 10pt;
            color: #000000;
            line-height: 1.3;
        }

        /* الجداول */
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 6pt 0;
            font-size: 10pt;
            font-family: 'Times New Roman', serif;
        }

        th, td {
            border: 1pt solid #000000;
            padding: 4pt;
            text-align: center;
            font-weight: normal;
            color: #000000;
        }

        th {
            background: #f0f0f0;
            font-weight: bold;
            font-size: 10pt;
        }

        /* قوائم */
        ul, ol {
            padding-right: 15pt;
            margin: 3pt 0;
        }

        li {
            margin-bottom: 2pt;
            font-size: 10pt;
            line-height: 1.3;
        }

        /* فواصل الصفحات */
        .law-section {
            page-break-inside: avoid;
        }

        .law-section h2 {
            page-break-after: avoid;
        }

        /* إزالة العناصر غير المرغوبة */
        .section-divider {
            display: none;
        }

        /* تذييل مرئي في نهاية كل صفحة */
        .page-footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 8pt;
            color: #666666;
            padding: 5pt 0;
            border-top: 1pt solid #cccccc;
            background: #ffffff;
        }
    </style>
</head>
<body>
    ${lawsContent}
    <div class="page-footer">
        أ. إيمان عمر - واتساب: 201202906502
    </div>
</body>
</html>`;

        // إعداد خيارات PDF محسنة للوضوح العالي
        const options = {
            format: 'A4',
            margin: {
                top: '25mm',
                right: '20mm',
                bottom: '25mm',
                left: '20mm'
            },
            printBackground: true,
            preferCSSPageSize: false,
            width: '210mm',
            height: '297mm',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-web-security',
                '--disable-features=VizDisplayCompositor',
                '--high-dpi-support=1',
                '--force-device-scale-factor=2' // Higher DPI for clarity
            ],
            // Additional options for better quality
            displayHeaderFooter: false,
            printBackground: true,
            // Improve text rendering
            pageRanges: '1-100' // Allow multiple pages
        };

        // إنشاء ملف PDF
        const file = { content: cleanHTML };
        const pdfBuffer = await html_to_pdf.generatePdf(file, options);

        // حفظ ملف PDF
        const outputPath = path.join(__dirname, 'قوانين_الفيزياء_الصف_الثالث_الثانوي_كاملة.pdf');
        fs.writeFileSync(outputPath, pdfBuffer);

        console.log('✅ تم إنشاء ملف PDF احترافي بنجاح!');
        console.log(`📁 الملف محفوظ في: ${outputPath}`);
        console.log(`📊 حجم الملف: ${(pdfBuffer.length / 1024 / 1024).toFixed(2)} MB`);

    } catch (error) {
        console.error('❌ خطأ في إنشاء PDF:', error);
        console.log('💡 بديل: استخدم زر "طباعة القوانين كـ PDF" في المتصفح');
    }
}

// تشغيل الدالة
generatePhysicsLawsPDF().catch(console.error);