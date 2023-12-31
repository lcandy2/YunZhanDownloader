const getFliphtml5Pages = async () => {
    try {
        // 查找指定的 script 元素
        const scriptTag = document.querySelector('script[src*="javascript/config.js"]');
        if (!scriptTag) {
            throw new Error('Script tag not found');
        }

        // 获取 script 的 src
        const src = scriptTag.getAttribute('src');

        // Fetch the script content
        const response = await fetch(src);
        const scriptContent = await response.text();

        // 提取 htmlConfig 对象
        const configMatch = scriptContent.match(/var htmlConfig = ({.*});/);
        if (!configMatch || !configMatch[1]) {
            throw new Error('htmlConfig not found in the script');
        }

        // 将 JSON 字符串转换为对象
        const configObject = JSON.parse(configMatch[1]);

        const fliphtml5_pages = configObject.fliphtml5_pages;
        // 打印到控制台
        //console.log(configObject.fliphtml5_pages);
        return fliphtml5_pages
    } catch (error) {
        console.error('Error:', error.message);
    }
}

export default getFliphtml5Pages;