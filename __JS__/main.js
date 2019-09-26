var music = document.getElementById('bgmusic');
document.addEventListener("WeixinJSBridgeReady", function () {
  music.play();
}, false); 

//loading
var num = 0, point = 0;
var img = new Image();
img.src = imgSrc + "/one.png"
img.onload = function () {
  $('#s1 .back').html(this)
  var setI = setInterval(function () {
    time1 += Math.round(Math.random() * 10);
    if (time1 >= 100) {
      clearInterval(setI)
      $(".loading p").html("100%");
      $('.loading').fadeOut();
      $('.music').show();
      $('#s1').show();
    } else {
      $(".loading p").html(Math.floor(time1) + "%");
    }
  }, 100);
}


var time1 = 0;
var video = document.getElementById('video');
var video2 = document.getElementById('video2');
var video3 = document.getElementById('video3');

var r = [
  {
    nameImg: imgSrc + '/far_21.png',
    IMG: imgSrc + '/one.gif',
    NewIMG: imgSrc + '/new_one.png',
    PhotoImg: imgSrc + '/far_3.png',
    touxiangImg: 'new_one'
  },
  {
    nameImg: imgSrc + '/far_22.png',
    IMG: imgSrc + '/two.gif',
    NewIMG: imgSrc + '/new_two.png',
    PhotoImg: imgSrc + '/far_31.png',
    touxiangImg: 'new_two'
  },
  {
    nameImg: imgSrc + '/far_23.png',
    IMG: imgSrc + '/four.gif',
    NewIMG: imgSrc + '/new_fours.png',
    PhotoImg: imgSrc + '/far_32.png',
    touxiangImg: 'new_fours'
  },
  {
    nameImg: imgSrc + '/far_24.png',
    IMG: imgSrc + '/three.gif',
    NewIMG: imgSrc + '/new_three.png',
    PhotoImg: imgSrc + '/far_33.png',
    touxiangImg: 'new_three'
  },


]
var reslut_index = 0;
// var setI = setInterval(function () {
//   time1 += Math.round(Math.random() * 10);
//   if (time1 >= 100) {
//     clearInterval(setI)
//     $(".loading p").html("100%");

//   } else {
//     $(".loading p").html(Math.floor(time1) + "%");
//   }
// }, 100);


//点击按钮
$(".btn_one").on('click', function () {
  sendAjax('btn_one')
  $('#s1').hide();
  $('#s2').show();
  $('.music').hide();
  music.pause();
  $('.music').removeClass('play');
  video.play()
  video2.play()
  video3.play()
  video.pause()
  video2.pause()
  video3.pause()
})
//问题一

var answerFun = function (index, id, res = '') {

  if (index == "1") {
    sendAjax($(res).attr('class'))

    reslut_index = id;
    $('.img_one').attr('src', r[reslut_index].NewIMG);
    $('.fra_one').attr('src', r[reslut_index].IMG);


    $('.touxiang').find('img').eq(id).css('opacity', 1)

    $('.frame-3>img').attr('src', r[reslut_index].nameImg);
    $('#s3').show();
    $('#s2').hide();
    // music.pause();
    video.play();
  } else {

    sendAjax($(res).attr('class'))
    $('.frame-5>img').attr('src', r[id].PhotoImg);
    $('.mianshuang').find("img").eq(id).css('opacity', 1)
    setTimeout(function(){

      $("#s10").append($(" .box>.s9").clone(true));
      $('#s10>.s9 .frame-6').show();
      $('.s9').hide();
      $('.music').show();
      $('.music').addClass('play');
      music.play();
      setTimeout(function () {
        $('.s9').css({ top: 0, left: 0, display: 'block' });
        $('#s8').hide();
        html2canvas(document.querySelector("#s10>.s9 .bg-box")).then(canvas => {
          var url = canvas.toDataURL('image/png');
          $('.saveImg').attr('src', url)
          // $('.saveImg').css('opacity',1)
        });
      }, 200);
      
    }, 100);
    //生成图片
  }

}


//问题二
$(".qu ,.qu1").on('click', function () {
  sendAjax($(this).attr('class'))
  $('#s4').hide();
  $('#s5').show();
  // $('.music').hide();
  // music.pause();
  video2.play();

})
//问题三
$(".fu ,.fu1").on('click', function () {
  sendAjax($(this).attr('class'))
  $('#s7').show();
  $('#s6').hide();
  // $('.music').hide();
  // music.pause();
  video3.play();
})

//第一个视频
video.addEventListener("timeupdate", function () {
  //用秒数来显示当前播放进度
  var timeDisplay = Math.floor(video.currentTime);

  if (timeDisplay >= 8) {
    // $('.music').show();
    // music.play();
    $('#s4').show();
    $('#s3').hide();
    // document.getElementById("s4").style.display = "block";
    // document.getElementById("s3").style.display = "none";
  }
})
//第二个视频
video2.addEventListener("timeupdate", function () {
  //用秒数来显示当前播放进度
  var timeDisplay = Math.floor(video2.currentTime);

  if (timeDisplay >= 12) {
    // $('.music').show();
    // music.play();
    $('#s6').show();
    $('#s5').hide();

    // document.getElementById("s6").style.display = "block";
    // document.getElementById("s5").style.display = "none";
  }
})
//第三个视频
video3.addEventListener("timeupdate", function () {
  //用秒数来显示当前播放进度
  var timeDisplay = Math.floor(video3.currentTime);

  if (timeDisplay >= 2) {
    // $('.music').show();
    // music.play();
    $('#s8').show();
    $('#s7').hide();
    // document.getElementById("s8").style.display = "block";
    // document.getElementById("s7").style.display = "none";
  }
})


document.body.addEventListener('touchmove', function (e) {
  e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
}, { passive: false }); //passive 参数不能省略，用来兼容ios和android




$(document).ready(function () {


  $('.seleted_box').each(function () {
    var t = parseInt($(this).css('top'))
    var H = $(window).height() - 1150
    if (H < 0) {
      $(this).css('bottom', H)
    }

  })

})

//ajax封装
function sendAjax(name) {
  // return false
  $.ajax({
    type: "post",
    url: 'https://wx.sephora.cn/h5/guerlainar-cream/index.php?s=/Home/index/setButtonRecord',
    data: { "name": name },
    dataType: 'json',
    success: function (res) {
    }
  });
}

//长按保存
var status = 0
$(".saveImg").on({
  touchstart: function (e) {
    // 长按事件触发
    timeOutEvent = setTimeout(function () {
      if (status == 0) {
        sendAjax('长按保存');
        status = 1;
      }
    }, 500);
    //长按400毫秒
    // e.preventDefault();
  },
  touchmove: function () {
    clearTimeout(timeOutEvent);
    timeOutEvent = 0;
  },
  touchend: function () {
    clearTimeout(timeOutEvent);
    return false;
  }
})
//音频

$(".music").click(function (event) {
  $(this).toggleClass('play');
  if ($(this).hasClass('play')) {
    music.play();
    // isPlay = false;
  } else {
    music.pause();
    // isPlay = true;
  }
});

$('.btn1').on('click', function () {
  sendAjax('jingxi')
  var url = "/sp/sam/lan?id=44&utm_medium=seco&utm_source=h5&utm_content=guerlaingph5"
  wx.miniProgram.navigateTo({ url: url })
})
$('.btn2').on('click', function () {
  sendAjax('miji')
  var url = "/pages/webView?url=https://ssl2.sephorastatic.cn/html/mp/sephora/campaign/guerlain20190808/&utm_source=h5"
  wx.miniProgram.navigateTo({ url: url })
})

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // 页面被挂起,暂停播放
    music.pause();

  } else {
    // 页面呼出
    music.play();

  }
});




