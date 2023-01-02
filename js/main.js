 /* ======================================================================
 *
 * Powered by MUSIGN  
 * Version 1.0
 * js/musign.js 
 * 
 ====================================================================== */ 
 /* ======================================================================
 *
 *  RUN 
 * 
 ====================================================================== */ 

 /* ======================================================================
 *
 *  ON LOAD
 * 
 ====================================================================== */ 
$(document).ready(function(){
    $('.sub_btn').click(function(){
        $('.modal, .overlay').addClass('active')
      })
      $('.overlay').click(function(){
        $('.modal, .overlay').removeClass('active')
      })
});


// <!--   calendar start -->
//Calendar start

// 임시 데이터
const data = [
  { date: '2023-04-09', content: '🎉숮🎉' },
  { date: '2023-04-15', content: '🎉션🎉' },
  { date: '2023-09-21', content: '🎉앚🎉' },
  { date: '2023-11-05', content: '🎉혠🎉' },
  { date: '2023-11-06', content: '🎉솢🎉' },
  { date: '2023-12-13', content: '🎉송🎉' },
];

// 데이터 가공
const calendarList = data.reduce(
  (acc, v) => 
    ({ ...acc, [v.date]: [...(acc[v.date] || []), v.content] })
  , {}
);

// pad method
Number.prototype.pad = function() {
  return this > 9 ? this : '0' + this;
}

//Calendar
let makeCalendar = () => {
  // 현재 년도와 월 받아오기
  let currentYear = new Date(date).getFullYear();
  let currentMonth = new Date(date).getMonth() + 1;
  
  // 첫 날 요일 구하기 - 초기 시작위치를 위해서
  let firstDay = new Date(date.setDate(1)).getDay();

  //마지막 날짜 구하기
  let lastDay = new Date(currentYear, currentMonth, 0).getDate();
  
  //남은 박스만큼 다음달 날짜 표기
  let limitDay = firstDay + lastDay;
  let nextDay = Math.ceil(limitDay / 7) * 7;
  
  let htmlDummy = '';
  
    //한달 전 날짜 표시하기
  for (let i = 0; i < firstDay; i++) {
    htmlDummy += `<div class="cal_inner cal_blank"></div>`;
  }

  //이번 달 날짜 표시하기
  for (let i = 1; i <= lastDay; i++) {
    let date = `${currentYear}-${currentMonth.pad()}-${i.pad()}`;
    
    htmlDummy += `<div class="cal_inner cal_day">${i}<p class="cal_memo">${calendarList[date]?.join('</p><p>') || ''}</p></div>`;
  }
  
  // 다음달 날짜 표시하기
  for (let i = limitDay; i < nextDay; i++) {
    htmlDummy += `<div class="cal_blank"></div>`;
  }
  
  document.querySelector(`#dateBoard`).innerHTML = htmlDummy;
  document.querySelector(`#dateTitle`).innerText = `${currentYear}년 ${currentMonth}월`;


  //오늘 날짜 표시
  let today = new Date();

  if (currentMonth === today.getMonth() + 1 && currentYear === today.getFullYear()) {
    for (let date of document.querySelectorAll('.cal_day')) {
      //해당 태그가 가지고 있는 날짜는 문자열이기 때문에 + 단항 연산자를 통해 숫자로 변경한 뒤, 오늘 날짜와 비교
      if (+date.innerText === today.getDate()) {
        date.classList.add('today');
        break;
      }
    }
  }
};

let date = new Date();
makeCalendar(date);


//이전 달 이동
document.querySelector(`.prev_day`).onclick = () => {
  makeCalendar(new Date(date.setMonth(date.getMonth()-1)));
}

//다음 달 이동
document.querySelector(`.next_day`).onclick = () => {
  makeCalendar(new Date(date.setMonth(date.getMonth() + 1)));
}


// <-- 참고 사이트 -->
//https://gurtn.tistory.com/54 - MAIN
//https://bigtop.tistory.com/66 - 오늘 날짜 표시
//https://developer0809.tistory.com/142






 /* ======================================================================
 *
 *  Default Functions
 * 
 ====================================================================== */ 