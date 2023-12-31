import getFliphtml5Pages from "./getFliphtml5Pages";
import getImageData from "./getImageData";
import addDownloadBtn from "./addDownloadBtn";
import ConvertToPDF from "./ConvertToPDF";

$(async () => {
    // 获取全部页面
    const fliphtml5Pages = await getFliphtml5Pages();
    if (!fliphtml5Pages) {
        console.error('fliphtml5Pages not found');
        return;
    }
    
    // 获取页面图片
    const imagePromises = fliphtml5Pages.map(page => getImageData(page.n[0]));

    // 声明一个函数，调用时才执行 ConvertToPDF
    const convertToPDF = () => ConvertToPDF(imagePromises);

    // 添加下载按钮
    addDownloadBtn(convertToPDF);
});
