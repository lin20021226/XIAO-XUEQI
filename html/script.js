var mediaList = [
    { type: 'image', src: 'image1.jpg' },
    { type: 'image', src: 'image3.jpg' },
    { type: 'image', src: 'image2.jpg' },
    { type: 'image', src: 'image4.jpg' },
    // 添加更多的图片或视频
];

var mediaContainer = document.getElementById('media-container');
var nextBtn = document.getElementById('next-btn');
var currentIndex = 0;

function playMedia(index) {
    mediaContainer.innerHTML = '';

    var media;
    if (mediaList[index].type === 'image') {
        media = document.createElement('img');
        media.src = mediaList[index].src;
    } else if (mediaList[index].type === 'video') {
        media = document.createElement('video');
        media.src = mediaList[index].src;
        media.autoplay = true;
        media.loop = true;
    }

    mediaContainer.appendChild(media);
    currentIndex = index;
}

nextBtn.addEventListener('click', function() {
    var newIndex = (currentIndex + 1) % mediaList.length;
    playMedia(newIndex);
});

playMedia(currentIndex);