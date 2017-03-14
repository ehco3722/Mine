
var Mine;//用来记录每个小方块应对应的值
var markNum=8;//用来记录用户标记的数目
var mainFrame = document.getElementById('mine-game');
var markFrame = document.getElementById('markFrame');


/**
 * 布局游戏界面 size是布局大小，number是布雷数
 */
function Interface(size,number){
  markNum=number;
  markFrame.innerHTML=markNum;
  mainFrame.innerText="";
  var mine=new Array(size);
  for(var i=0;i<size;i++){
    mine[i]=new Array(size);
  }
  mine=randomNumber(mine,number);
  Mine=mine;
  for(var i=0;i<size;i++){
    mainFrame.appendChild(createRow(i,size,mine));
  }
}


/**
 * randomNumber布雷与数字提示
 * 参数mine,num分别表示一个二维数组和布雷的数目 
 */
function randomNumber(mine,num) {
  var len=mine.length;
  var i=0;
  var row;
  var col;

  //完成布雷工作
  while(i<num){
    row=Math.floor((len*Math.random()));
    col=Math.floor((len*Math.random()));
    if(mine[row][col]!="雷"){
      mine[row][col]="雷";
      console.log(mine[row][col]+row+col);
      i++;
    }
  }
  
  //完成雷数提示工作
  for(var i=0;i<len;i++){
      for(var j=0;j<len;j++){
        var mineNum=0;
        //判断左上
        if((i-1>=0)&&(j-1>=0)){
          if(mine[i-1][j-1]=="雷")
          mineNum++;
        }
        //判断正上
        if(i>=1){
          if(mine[i-1][j]=="雷")
          mineNum++;
        }
        //判断右上
        if((i-1>=0)&&(j<=len-2)){
          if(mine[i-1][j+1]=="雷")
          mineNum++;
        }
        //判断左边
        if(j>=1){
          if(mine[i][j-1]=="雷")
          mineNum++;
        }
        //判断右边 
        if(j<=len-2){
          if(mine[i][j+1]=="雷")
          mineNum++;
        }
        //判断左下
        if((i<=len-2)&&(j-1>=0)){
          if(mine[i+1][j-1]=="雷")
          mineNum++;
        }
        //判断正下
        if(i<=len-2){
          if(mine[i+1][j]=="雷")
          mineNum++;
        }
        //判断右下
        if((i<=len-2)&&(j<=len-2)){
          if(mine[i+1][j+1]=="雷")
          mineNum++;
        }
        if(mine[i][j]!="雷"){
        mine[i][j]=mineNum;
        }
      }
  }
  return mine;
}


/**
 * 创建行
 */
function createRow(row,len,mine){
  var tr=document.createElement("tr");
  for(var i=0;i<len;i++){
    var td=document.createElement("td");
    var font=document.createElement("font");
    font.id=row+"."+i;


    font.onclick=function (){//左键
      getValue(this,mine);
      if(this.innerHTML==0){
        this.className='space';
        var id=this.id;
        var row=parseInt(id.split(".")[0]);
        var col=parseInt(id.split(".")[1]);
        showSpace(row,col);
      }
      this.oncontextmenu=function (){
        return false;
      }
       judge();
    };


    font.oncontextmenu=function (){//右键
      if(this.innerHTML=="*"){
        this.innerHTML="?";
                markNum++;
        markFrame.innerHTML=markNum;       
      }else if(this.innerHTML=="?"){
        this.innerHTML="";
      }else if(this.innerHTML==""){
        this.innerHTML="*";
        markNum--;
        markFrame.innerHTML=markNum;
        judge();
      }
    }


    td.appendChild(font);
    tr.appendChild(td);
  }
  return tr;
}  

/**
 * 当点击的不是空白区或者是触动雷的时候调用下面的函数
 */
function getValue(object){
    var len = Mine.length;
    var id=object.id;
    var row=id.split(".")[0];
    var col=id.split(".")[1];

    if(Mine[row][col] != "雷"){
      object.innerHTML=Mine[row][col]; 
    }else{
      for(var i=0;i<len;i++)
        for(var j=0;j<len;j++){
          if(Mine[i][j]=="雷"){
            var marked=document.getElementById(i+"."+j);
            marked.innerHTML="*";
          }
        }
      alert("你触雷了，游戏结束！");
      if(confirm("重新开始？")){
        window.location.reload();
      }
    }
}
/**
 * 当点击的区域为空白区域时递归调用将与该区域相连的空白区域都显示出来
 */
 function showSpace(i,j){
  var len=Mine.length;
  var btn=document.getElementById(i+"."+j);

        if (i < 0 || i >= len || j < 0 || j >= len){//越界
            return;
        }
        if (Mine[i][j]==0){ 
            btn.className='space';
            Mine[i][j] = -1;//已打开
            showSpace(i - 1, j - 1);
            showSpace(i - 1, j);
            showSpace(i - 1, j + 1);
            showSpace(i + 1, j - 1);
            showSpace(i + 1, j);
            showSpace(i + 1, j + 1);
            showSpace(i, j + 1);
            showSpace(i, j - 1);
        }else{
          btn.innerHTML=Mine[i][j];
        }

 }

 /**
  * 判断是否说有的格子是否都是正确的找出来了
  */
 function judge(){
  var len=Mine.length;
  var allTrue=true;
    for(var i=0;i<cols;i++)
        for(var j=0;j<rows;j++){
           var button = document.getElementById(i+"."+j);
           
           if(Mine[i][j]=="雷"&&button.innerHTML!="*"){
               allTrue=false;
              }
           else if(Mine[i][j]!="雷"&&button.innerHTML!=Mine[i][j]&&Mine[i][j]!="-1"){
            allTrue=false;
           }
         }
    if(allTrue){
      if(confirm("全部雷已经挖出，你胜利了!重新开始?")){
        window.location.reload();
      }
     }
 }


  /**
  * 选择难度
  */
  function selectLevel(level){
    if(level=="1"){
      Interface(8,6);
    }else if(level=="2"){
      Interface(12,15);
    }else if(level=="3"){
      Interface(12,25);
    }
  }
