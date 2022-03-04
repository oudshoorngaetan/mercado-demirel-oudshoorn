function printToPDF() {
    console.log('converting...');

    var printableArea = document.getElementById('invoice');
    html2canvas(printableArea, {
        useCORS: true,
        onrendered: function (canvas) {

            var pdf = new jsPDF();

            var pageHeight = 980;
            var pageWidth = 900;
            for (var i = 0; i <= printableArea.clientHeight / pageHeight; i++) {
                var srcImg = canvas;
                var sX = 0;
                var sY = pageHeight * i; // start 1 pageHeight down for every new page
                var sWidth = pageWidth;
                var sHeight = pageHeight;
                var dX = 0;
                var dY = 0;
                var dWidth = pageWidth;
                var dHeight = pageHeight;

                window.onePageCanvas = document.createElement("canvas");
                onePageCanvas.setAttribute('width', pageWidth);
                onePageCanvas.setAttribute('height', pageHeight);
                var ctx = onePageCanvas.getContext('2d');
                ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);
                var canvasDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/...';
                var canvasDataURL = 'data:image/png;base64,/9j/4AAQSkZJRgABAQEASABIAAD/...';
                var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);
                var canvasDataURL = onePageCanvas.toDataURL("image/jpeg", 1.0);
                
                var width = onePageCanvas.width;
                var height = onePageCanvas.clientHeight;

                if (i > 0) // if we're on anything other than the first page, add another page
                    pdf.addPage(612, 791); // 8.5" x 11" in pts (inches*72)

                pdf.setPage(i + 1); // now we declare that we're working on that page
                pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width * .62), (height * .62)); // add content to the page
                pdf.addImage(canvasDataURL, 'JPEG', 20, 40, (width * .62), (height * .62));
            }
            pdf.save('test.pdf');
        }
    });
}
