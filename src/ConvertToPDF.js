import { jsPDF } from "jspdf";

// 定义一个异步延迟函数
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const pdf = new jsPDF();

const ConvertToPDF = async (imagePromises) => {
    const $dlprogress = $('#dl-progress');
    const $dlbtn = $('#dl-btn');
    $dlbtn.html('下载中...');
    $dlbtn.prop('disabled', true);
    $dlbtn.css('background-color', '#808080');
    $dlbtn.css('cursor', 'not-allowed');
    $dlprogress.html('准备下载...');
    const title = $("title").text();

    try {
        const images = await Promise.all(imagePromises);
        for (let index = 0; index < images.length; index++) {
            // 更新下载进度
            const progress = `下载中：${index + 1} / ${images.length} 页`;
            $dlprogress.html(progress);
            console.log(`Downloading: ${progress}`);
            if (index > 0) pdf.addPage();
            pdf.addImage(images[index], 'WEBP', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

            // 在每次迭代后等待 500ms
            await delay(1000);
        }
    } catch (error) {
        console.error('Error processing images:', error);
    }

    // 保存 PDF
    $dlbtn.html('下载 PDF');
    $dlbtn.prop('disabled', false);
    $dlbtn.css('background-color', '#007bff');
    $dlbtn.css('cursor', 'pointer');
    $dlprogress.html('下载完成');
    console.log(`Downloading: ${title}.pdf`);
    DownloadConvertedPDF();
    $dlbtn.off('click').on('click', DownloadConvertedPDF);
}

const DownloadConvertedPDF = async () => {
    pdf.save(`${title}.pdf`);
}


export default ConvertToPDF;
