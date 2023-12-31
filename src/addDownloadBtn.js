const addDownloadBtn = (listener) => {
    let observer;

    const checkAndProcessButtonBar = () => {
        // buttonBar
        const $buttonBar = $('div.fbTopBar div.buttonBar');
        const buttonBarAvailable = $buttonBar.length;
        // shareForm
        const $shareTitle = $('div.share_form p.form_title');
        const $shareCloseBtn = $('div.share_form img.close');
        const $shareContent = $('div.share_form div.share_content');
        const shareFormAvailable = $shareTitle.length && $shareCloseBtn.length && $shareContent.length;
        if (buttonBarAvailable && shareFormAvailable) {
            observer.disconnect(); // 停止监听
            console.log('Found buttonBar:', $buttonBar);
            // 这里可以放置你希望执行的代码
            // const $oldElement = $buttonBar.children().eq(2);
            // const $newElement = $oldElement.clone();
            // $newElement.html(element);
            // $oldElement.replaceWith($newElement);
            // 添加点击事件
            // $newElement.on('click', listener);
            const shareElement = $buttonBar.children().eq(8);
            const $element = $(`<p id="dl-dialog-btn" style="pointer-events: none; font-size: 12px; color: rgb(255, 255, 255);">下载</p>`);
            shareElement.html($element);

            $shareTitle.html('下载');
            $shareCloseBtn.remove();
            const downloadHtml = $(`<h1>下载《${$("title").text()}》</h1
            <br><br>
            <h2 id="dl-progress">未开始下载</h1>
            <br><br>
            <button id="dl-btn" style="width: 100%; height: 50px; font-size: 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">下载</button>`);
            $shareContent.html(downloadHtml);
            $('#dl-btn').on('click', listener);
            return shareElement;
        }
    };

    const observeDOM = (execute) => {
        observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
                if (mutation.addedNodes.length) {
                    execute();
                    break; // 找到目标元素后立即跳出循环
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    };

    observeDOM(checkAndProcessButtonBar);
}
export default addDownloadBtn;