$(function(){
  $("h1 + ul").addClass("info");
  $("h2 + ol").addClass("items");
  $("h2, h2 + ol").filter(":last").next("ul").addClass("note");

  $("ul.info li").each(function(n){
      p = $(this).html().replace(/{ */, "<input type=text value=" ).replace(/ *}/, ">");
      $(this).html(p);
  });
      
  $("ol.items > li li").each(function() {
      ch = $(this).text()[0];
      $(this).prepend("<input type=checkbox flag=" + ch + " /> ");
  });

  $("ol.items").attr("start", 1);

  $("ol.items").each(function() {
      h = $(this).prev("h2");
      score = /\d+/.exec(/每题\s*\d+\s*分/.exec(h.text()));
      score = score ? score : 1;
      $(this).find("> li").each(function(){
          ans = /[A-Z]+/.exec(/{\s*[A-Z]+\s*}/.exec($(this).text()));
          ptxt = $(this).html().replace(/\{\s*[A-Z]+\s*\}/, "<input class=result onfocus='this.blur()' />");
          $(this).html(ptxt);
          $(this).find("input.result").attr("score", score).attr("ans", ans);
          $(this).find("li").each(function(){
              if (ans.includes($(this).find(":checkbox").attr('flag')))
                  $(this).addClass('in');
          });
      });
  });

  $("body").append("<div id=wrap> <button id=find>查找</button> <button id=clear>清空</button> <button id=correct>批改</button> <button id=submit>提交</button></div>");
})

$(document).on("click", "input:checkbox", function(e) {
    p = $(this).parents("ol.items > li");
    str = p.find("input:checked").map(function(){return $(this).attr("flag")}).get().join('');
    p.find("input.result").attr("value", str);
    e.stopPropagation();
});

$(document).on("click", "ol.items > li li", function() {
    $(this).find("input:checkbox").click();
});

$(document).on("click", "#clear", function() {
    $("ol.items > li").removeClass("wrong");
    $("input.result").attr("value", "");
    $("input:checked").prop("checked", false);
});

$(document).on("click", "#correct", function() {
    score = 0;
    $("input.result").each(function(x){
        isright = $(this).attr('value') == $(this).attr('ans');
        score += isright * $(this).attr('score');
        isright ? $(this).parents("ol.items > li").removeClass("wrong") : $(this).parents("ol.items > li").addClass("wrong"); 
    });
    alert("得分：" + score  + "，标红者为正确答案。");
});

$(document).on("click", "#find", function() {
    if (!isfilled()) {
        alert("信息未填写完整！不能查找其提交记录。");
        return false;
    }
    $.post("../cgi-bin/onfind.py", {
        dirname: getdirname(),
        filename: getfilename()},
        function(data){
            if (data == -1) {
                alert('未发现相应记录！');
                return;
            }
            $("#clear").trigger('click');
            data = JSON.parse(data);
            for (dt of data) {
                console.log(dt);
                for (i in dt.branch)
                    if (dt.branch[i])
                        $("ol.items").eq(dt.part).find("> li").eq(dt.item).find(":checkbox").eq(i).trigger('click');
            }
            alert('发现记录，并已载入！');
        });
});

$(document).on("click", "#submit", function() {
    if (!isfilled()) {
        alert("信息未填写完整！不能提交其提交记录。");
        return false;
    }
    data = [];
    $("ol.items").each(function(n){
        $(this).find("> li").each(function(i){
            dt = {};
            dt.part = n;
            dt.item = i;
            dt.ans = $(this).find("input.result").attr("ans");
            dt.score = $(this).find("input.result").attr("score");
            dt.val = $(this).find("input.result").val();
            dt.branch = $(this).find(":checkbox").map(function(){return $(this).prop("checked")}).get();
            data.push(dt);
        });
    });
    $.post("../cgi-bin/onsubmit.py", {
        dirname: getdirname(),
        filename: getfilename(), 
        data: JSON.stringify(data)}, 
        function(msg){
            if (msg == 0)
                alert('成功提交！');
            else
                alert('未成功提交！');
        });
});

function getdirname() {
    return window.location.pathname.split('/').pop();
}

function getfilename() {
    return $("ul.info input").map(function(i,e){return $(e).val();}).get().join('.') + '.json';
}

function isfilled() {
    return $("ul.info input").map(function(i,e){return $(e).val();}).get().every(x => x);
}
