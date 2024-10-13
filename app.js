/* app.js ke ander element ko access karna padega taki unke ander changes ko track kar sake */
/* toh hum sare boxes and reset button ko toh access karna chahte hi hai */

let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-button");
/* query selector ki madad se sari chije winner show karnae ke liye access ho gaye and winner ko dikhane ke liye new function banayege showWinner naam se or showWinner 
function call hoga checkWinner function mai if condition ke ander */
let newGameButton = document.querySelector("#new-button");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

/* ab game ko khelne ke liye kuch variables ki jarurat hogi */

/* 1. */
/* ye track karna hai, ki X wale player ki turn hai ya O wale player ki turn hai - kyuki jabhi tic tac toe khela jata humare pass alternate turns aati hai */
/* toh humare game ko pata hona chahiye ki next jo hoga vo O hoga ya X */

let turnO = true; // player X, player O.

/* ab hum dono mai se ek ki turn ko access kar sakte hai, toh hum O wale player ki turn ko track karte hai --> toh turn O ko suru ko kar dege true */
/* agar O wale player ki turn hai toh humare button ke upper O print hoke aayega */
/* agar turnO = true hai toh humare pass O aayega or agar false hai toh X aayega */

/* 2. */
/* hum apne sare ke sare winning pattern ko store kar sakte hai */
/* toh winning pattern ke bases mai check karege ki konsa player hai jo humare jitne ki condtion ko satisfied karra hai */
/* and winning patterns ko store karne ke liye use karege arrays ka */

/* 1D array --> let arr1 = ["apple", "banana", "lichi"]; */
/* 2D array --> let arr2 = [["apple", "banana"], ["lichi", "pototo"], ["pants", "shirts"]]; */
/* how to access 2D array --> agar apple ko access karna hai we do - arr2 [0] [0] --> iss tarah se index ke ander jake index ko check kar sakte hai */
/* en pattern ko String ke form mai bhi store kar sakte hai but array of array ke better way ho jata hai iss tarah ke data ko store karne ke liye */

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

/* har ek box ka ek bar click count karege or sath mai gameWon false rakhege to track ki abhi game kisi ne nhi jita */
let boxCount = 0;
let gameWon = false;
/* put values in boxes */
/* now sare ke sare boxes hai or enke click par kuch hona chahiye - kuch action hona chahiye */
/* toh har ek button or box ke upper, event listener add kar sakte hai */
/* toh sare ke sare boxes pe evnet listener add karne ke liye hum likh sakte hai */

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    /* har ek box pe add kar sakte hai ek eventListener() toh jese hi box pe click kia jayega toh jo humara arrow function hai () => {} --> ye work karna chahiye */
    /* and jese hi box ko click kia jayega pehle check hoga ki box mai koe text nhi hai or game kisi ne bhi nhi jita and then agar hai sab true hai vese hi boxes ko text de sakte hai X or O --> hum box.innerText use karege */

    if (box.innerText === "" && !gameWon) {
      if (turnO) {
        /* X dena hai ya O ye kese pata chalega ye hume turnO btayega */
        /* jese hi button ko click kia jara check karre hai kya O ki turn hai toh uss case mai O print kar dege and turnO ko kar dege false, yani player X ki turn hai*/
        box.innerText = "O";
        turnO = false;
      } else {
        /*dushri case mai player X ki turn hai toh X print karwa dege or fir turn O ki chali jayegi*/
        box.innerText = "X";
        turnO = true;
      }

      /* and problem ye aari isme agar hum kisi button ko dubara click karre vo change ho jayega to X or O */
      /* pr vese toh ye hona chahiye agar koe value store ho jati hai toh vo change nhi hona chahiye --> toh ye same logic lagane ke liye hume kya karna padega? -- ki jese hi uss box ke ander innerText likh dia vese hi uss box/button ko disable karna padega */
      /* toh button disable karna ke liye likh dege 'box.disabled = true' --> jo empty box ke ander value ko add kar sakte hai */

      box.disabled = true;

      /* ab values ko toh add kar pa rahe but track kese karre kon game jit raha hai toh game jitne ke upper kuch hona chahiye */
      /* toh hume kya karna hoga, jese hi koe bhi button click ho raha ussi tym par check karna hoga kya humare pass koe winner aa raha hai */
      /* ek seperate function bana yege checkWinner() --> checkWinner se check karege winner ke liye*/
      boxCount++;
      checkWinner();
      checkDraw();
    }
  });
});

/* kisi bhi winner ko check karne ke liye kya karna padega? --> agar humare pass tic tac toe hai toh winner ko check karne ke liye hume ek ek winning pattern ko check karna padega  */
/* yani sabse pehle [0, 1, 2] ko check karo --> apne 0th box pe dekho konsa element hai, 1st pe dekho konsa element hai and then 2nd pe dekho */
/* 0 = 1st position, 1 = 2nd position, 2 = 3rd postition ho jayegi */
/* agar tino ki tino position mai same element (O, X) toh  uss case mai winner aa gaya or --> Q. winner kon aayega? --> A. jo tino position pe element same hai */
/* manlo tino position mai se koe khali hai ya same element nhi hai toh hum 2nd winning pattern ko check karege and so on... */

/* function to show winner */
/* and showWinner function mai winner pass kar sakte hai and winner kon hai? jo pos1Val mai value hai vo winner hai */
const showWinner = (winner) => {
  /* winner pass kar dia toh msg p tag hai uske ander innerHtml/innerText mai value dal sakte hai - congratulation, winner is posi1Val */
  msg.innerText = `Congratulation, Winner is ${winner}`;

  /* jese hi msg mai winner add kar dia vese hi msgContainer hai uski classList se remove kar dege class hide ko */
  msgContainer.classList.remove("hide");

  /* and jesi hi ek winner aa gaya baki sare button ko disable karna hoga uske liye disableBoxes () ko call karege */
  disableBoxes();
  gameWon = true; // Set gameWon to true once a winner is declared
};

/* function to check winner */
const checkWinner = () => {
  /* toh iss tarah se kar ek pattern ke upper jake ek ek karke traverse karna hoga - means ek ek ko check karna padega kya humare pass yaha se winner nikal raha kya? */
  /* jo humari array hai - winning pattern ki, iske upper loop chalana hoga */

  for (let pattern of winPatterns) {
    /* yani jo patterns hai unme se humne apne patterns nikal rahe hai*/
    /* console.log(pattern); --> klsi bhi box ko click karege (eventListener wala code ki baat hori) vese hi kya hoga? --> vese hi checkWinner() ke pass call jayegi or checkWinner ek ek karke sare patterns ko nikalega

    console.log(pattern);  ye sab 
      |
    Output
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [3, 4, 5],
      [6, 7, 8],
    */
    /* mtlb ek box ko click kia, toh kya hua ? --> box toh click hua par sath ke sath sare patterns check huye --> or ye sare pattern array hai */
    /* toh ye 'pattern' (variable) humare pass aa raha hai --> this is an array */
    /* ab inn patterns se position nikal sakte hai --> ex agar pattern hai [1, 4, 7] --> toh isme 1st position mai konsa element hai then 4th position mai konsa element hai and then 7th position mai konsa element hai or enn elements ki value batani hai */
    /* toh sabse pehle jo pattern(means winPattern se jo ek pattern nikal raha hai - ex: 0 1 2) array hai isme se individual index nikal lete hai, individual index kese nikale hai --> pattern[0] ho jayega 1st index(means 0 of 0 1 2) - pattern[1] ho jayega 2nd index means 1 of 0 1 2- and pattern[2] ho jaygega 3rd index means 2 of 0 1 2*/
    console.log(pattern[0], pattern[1], pattern[2]);
    /* --> so console.log(pattern[0], pattern[1], pattern[2]) karne se array ke badle bs unke index aa rahe hai means jinke liye check karna hai

    console.log(pattern[0], pattern[1], pattern[2]);  
      |
    Output
      0, 1, 2,
      0, 3, 6,
      0, 4, 8,
      1, 4, 7,
      2, 5, 8,
      2, 4, 6,
      3, 4, 5,
      6, 7, 8,
    */
    /* agar pattern 1 4 7 ka example le toh pehle check padega 1st position pe konsa element hai. and 1st position wala element kese pata chalega ?
      -->  toh jo boxes array jisme buttons hai usme 1st index ke liye check karege fir 4th index ke liye check karege at last 7th index ke liye check karege or en index ko check kese karege ?
      --> toh boxes[pattern[0]] = 1 ho gaya, boxes[pattern[1]] = 4, boxes[pattern[2]] = 7 ho gaya

    console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]);  
      |
    Output
      0 1 2
      0 3 6
      0 4 8
      1 4 7
      2 5 8
      2 4 6
      3 4 5
      6 7 8
    */
    /* toh boxes ki value aa gaye but agar enke ander ki value print karni hai, uske liye use kar sakte hai innerText */

    console.log(
      boxes[pattern[0]].innerText,
      boxes[pattern[1]].innerText,
      boxes[pattern[2]].innerText
    );

    /* console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText); toh jese hi ek box ke upper click kia - means 1st box pe click kia toh 
      0 1 2
      //O
      0 3 6
      //O
      0 4 8
      //O
      1 4 7
      2 5 8
      2 4 6
      3 4 5
      6 7 8
      toh jis jis box pattern mai 0th index hai waha O print ho raha hai so in console.log(boxes[pattern[1]].innerText, boxes[pattern[4]].innerText, boxes[pattern[7]].innerText);
      boxes[pattern[0]].innerText --> this is position 1
      boxes[pattern[1]].innerText --> this is position 2
      boxes[pattern[2]].innerText --> this is position 3
      means tino position ke upper kya hai vo calculate kar sakte hai or tino ko individual variable ke ander store karwa sakte hai
    */

    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    /*  ab check posVal1 and posVal2 and posVal3 mai same values hai kya or same check karne se pehle check karna padega kya koe khali toh nhi hai - mtlb tino ke tino ke ander valid value honi chahiye */
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      /* agar tino position empty nhi tabhi hum winning pattern check karege and winning pattern check karne ke liye karna padega niche wala if likhege or console kardege winner and winner hoga 1st position ki value */
      if (pos1Val == pos2Val && pos2Val == pos3Val) {
        console.log("winner", pos1Val);
        /* yaha showWinner () call hoga and isme winner param jayega or winner hai pos1Val */
        showWinner(pos1Val);
        return;
      }
    }
    /* or apne winner ko display karna ke liye main ke upper container banna sakte hai .msg-container naame se jiske ander apna winning msg de sakte hai */
  }
};

/* function to check draw game */
const checkDraw = () => {
  if (boxCount === 9 && !gameWon) {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
  }
};

/* function to reset game */
const resetGame = () => {
  /* reset game kehne ka mtlb h agar turn0 thi toh dubara turn0 ho jaye - yani turn0 var reset ho jaye */
  turnO = true;

  /* uske sath sare ke sare button enable ho jaye uske liye call karege enableBoxes() ko */
  enableBoxes();

  /* and msg container ko hide karna padega jesi game reset hoga */
  msgContainer.classList.add("hide");
  boxCount = 0;
};

/* and ye eventListener tab trigger hoga jab new game button pe click hoga and reset game button click hoga */
newGameButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);

/* function to disabled boxes */
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

/* funcstion to enable boxes */
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    /* and sare ke sare boxes ko reset karna padega vo bhi enable box ke sath kar sakte hai. and inke innerText ko remove karne ke liye empty text lagayega */
    box.innerText = "";
  }
};
