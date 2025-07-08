const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF() {
    console.log('🚀 PDF 생성을 시작합니다...');
    
    // 브라우저 실행
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
        // 새 페이지 생성
        const page = await browser.newPage();
        
        // 뷰포트 설정 (A4 크기)
        await page.setViewport({
            width: 1200,
            height: 1600,
            deviceScaleFactor: 1,
        });
        
        // 로컬 HTML 파일 로드
        const htmlPath = path.join(__dirname, 'index.html');
        await page.goto(`file://${htmlPath}`, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });
        
        // 폰트 로딩 대기
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // PDF 생성 옵션
        const pdfOptions = {
            path: path.join(__dirname, 'resume.pdf'),
            format: 'A4',
            printBackground: true,
            margin: {
                top: '10mm',
                right: '10mm',
                bottom: '10mm',
                left: '10mm'
            },
            displayHeaderFooter: false,
            preferCSSPageSize: true
        };
        
        console.log('📄 PDF를 생성하고 있습니다...');
        
        // PDF 생성
        await page.pdf(pdfOptions);
        
        console.log('✅ PDF 생성 완료!');
        console.log(`📁 저장 위치: ${path.join(__dirname, 'resume.pdf')}`);
        
    } catch (error) {
        console.error('❌ PDF 생성 중 오류 발생:', error);
    } finally {
        // 브라우저 종료
        await browser.close();
    }
}

// 스크립트 실행
generatePDF().catch(console.error); 
