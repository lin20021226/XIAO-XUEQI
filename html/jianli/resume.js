
function createDateTimeElement() {
    var dateTimeElement = document.createElement('div');
    dateTimeElement.id = 'datetime';
    dateTimeElement.style.position = 'absolute';
    dateTimeElement.style.top = '50px'; // 调整上边距
    dateTimeElement.style.left = '50px'; // 调整左边距
    dateTimeElement.style.color = 'black';
    dateTimeElement.style.fontSize = '20px';
    dateTimeElement.style.backgroundColor = 'rgba(255, 255, 255, 0.7)'; // 添加半透明背景
    dateTimeElement.style.padding = '10px';
    document.body.appendChild(dateTimeElement);
  }
  
  // 获取当前时间和日期
  function getCurrentDateTime() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var time = currentDate.toLocaleTimeString();
    return year + '-' + month + '-' + day + ' ' + time;
  }
  
  // 更新时间和日期显示
  function updateDateTime() {
    var dateTime = getCurrentDateTime();
    var datetimeElement = document.getElementById('datetime');
    datetimeElement.textContent = dateTime;
  }
  
  // 在页面加载完成后调用相关函数
  window.addEventListener('DOMContentLoaded', function() {
    createDateTimeElement();
    updateDateTime();
    setInterval(updateDateTime, 1000); // 每秒更新一次时间和日期
  });
  
  document.addEventListener('dblclick', function() {
    var video = document.getElementById('myVideo');
    video.pause();
    // 跳转到其他页面的代码
  });
