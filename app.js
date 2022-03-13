
//เมื่อคลิกปุ่มบันทึก
const form = document.querySelector('#addForm');
form.addEventListener('submit',(e)=>{
    
    e.preventDefault();
    
    var point = form.rating.value;
    var comment = form.comment.value;
    if(point !== ''){
        save(point, comment);
    }else{
        alert('กดให้ดาวฉันหน่อยสิขอห้าดาวได้มั้ย!');
        return
    }
});

// 1 star
document.getElementById('r5').onclick = function() {
    document.querySelector("#smiley").style.backgroundImage = "url('./asset/img/bad.png')";
}
// 2 star
document.getElementById('r4').onclick = function() {
    document.querySelector("#smiley").style.backgroundImage = "url('./asset/img/sad.png')";
}
// 3 star
document.getElementById('r3').onclick = function() {
    document.querySelector("#smiley").style.backgroundImage = "url('./asset/img/neutral.png')";
}
// 4 star
document.getElementById('r2').onclick = function() {
    document.querySelector("#smiley").style.backgroundImage = "url('./asset/img/happy.png')";
}
// 5 star
document.getElementById('r1').onclick = function() {
    document.querySelector("#smiley").style.backgroundImage = "url('./asset/img/amazing.png')";
}

//บันทึกข้อมูลลงใน firestore
function save(point, comment){
    //ซ่อนแสดงเลร์เอาท์
    document.querySelector("#success").style.display = "block";
    document.querySelector("#main").style.display = "none";
       
    let data = {
        timestamp: Date.now(),
        score: point,
        complain: comment
    }

     //save data to Session Storage
     AddDataInSessionStorage('vote', data);

                setTimeout(function(){ 
                //ซ่อนคอมเม้นและปุ่มส่ง
                document.querySelector("#comment").value = "";

                //ปิดการทำงานเลือกดาว
                var inputs = document.querySelectorAll('input[type="radio"]');
                for (var i = 0; i < inputs.length; i++) {
                inputs[i].checked = false;
                }

                //ซ่อนแสดงเลร์เอาท์
                document.querySelector("#main").style.display = "block";
                document.querySelector("#success").style.display = "none";
            }, 5000);

} 


//เพิ่มข้อมูลลงใน Session Storage
function AddDataInSessionStorage(sessionName, obj) {
    //กรณีเพิ่มเป็นครั้งแรก
    if (sessionStorage.getItem(sessionName) == null) {
        var itemsArray = [];
        itemsArray.push(obj);
        sessionStorage.setItem(sessionName, JSON.stringify(itemsArray));
    } else { //กรณีเพิ่มเป็นครั้งที่สองขึ้นไป
        //แปลง json เป็น object
        var itemsArray = JSON.parse(sessionStorage.getItem(sessionName));
        itemsArray.push(obj);
        //แปลง object เป็น json บันทึกลงใน Session Storage 
        sessionStorage.setItem(sessionName, JSON.stringify(itemsArray));
    }
}

